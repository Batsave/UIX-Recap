import { useEffect, useRef, useState } from "react";
import { FaPlay, FaPause, FaAngleRight } from "react-icons/fa";
import "./srtPlayer.scss";

function parseSRT(srt) {
  return srt
    .trim()
    .split(/\r?\n\r?\n/)
    .map((block) => {
      const [_, timeLine, ...textLines] = block.split("\n");
      const [startStr, endStr] = timeLine.split(" --> ");
      const toSeconds = (str) => {
        const [h, m, s] = str.replace(",", ".").split(":");
        return +h * 3600 + +m * 60 + +s;
      };
      return {
        start: toSeconds(startStr),
        end: toSeconds(endStr),
        text: textLines.join("\n"),
      };
    });
}

function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min}:${sec < 10 ? "0" : ""}${sec}`;
}

export default function SrtPlayer({
  audioSrc,
  srtUrl,
  onNext,
  nextEpisodeTitle,
}) {
  const audioRef = useRef(null);
  const containerRef = useRef(null);
  const lineRefs = useRef([]);
  const canvasRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);
  const lastProgrammaticScroll = useRef(0);

  const [subs, setSubs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [seekValue, setSeekValue] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [isAutoScroll, setIsAutoScroll] = useState(true);
  const [hasSubtitles, setHasSubtitles] = useState(true);
  const [showBanner, setShowBanner] = useState(false);
  const [hasRedirected, setHasRedirected] = useState(false);
  const [shouldAutoPlayAudio, setShouldAutoPlayAudio] = useState(false);
  const [shouldAutoRedirect, setShouldAutoRedirect] = useState(true); // séparé

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("autoplay") === "true") {
      const tryAutoPlay = () => {
        const audio = audioRef.current;
        if (!audio) return;

        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.warn(
              "Lecture automatique bloquée, en attente d'une interaction utilisateur :",
              error
            );
          });
        }
      };

      // Attendre que les métadonnées soient prêtes
      const audio = audioRef.current;
      if (audio) {
        const onReady = () => {
          tryAutoPlay();
          audio.removeEventListener("loadedmetadata", onReady);
        };
        audio.addEventListener("loadedmetadata", onReady);
      }
    }
  }, []);

  useEffect(() => {
    fetch(window.location.origin + srtUrl)
      .then((res) => res.text())
      .then((text) => {
        const parsed = parseSRT(text);
        setSubs(parsed);
        setHasSubtitles(parsed.length > 0);
      })
      .catch((err) => {
        console.error("Erreur de chargement des sous-titres :", err);
        setHasSubtitles(false);
      });
  }, [srtUrl]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTime = () => {
      const t = audio.currentTime;
      setCurrentTime(t);
      if (!isSeeking) setSeekValue(duration ? (t / duration) * 100 : 0);

      const idx = subs.findIndex(
        (s, i) =>
          t >= s.start && (i === subs.length - 1 || t < subs[i + 1].start)
      );
      if (idx !== -1 && idx !== currentIndex) setCurrentIndex(idx);

      if (duration && t >= duration - 5 && !showBanner) {
        setShowBanner(true);
      }
    };

    audio.addEventListener("timeupdate", handleTime);
    audio.addEventListener("play", () => setIsPlaying(true));
    audio.addEventListener("pause", () => setIsPlaying(false));
    audio.addEventListener("loadedmetadata", () => setDuration(audio.duration));

    return () => {
      audio.removeEventListener("timeupdate", handleTime);
    };
  }, [subs, currentIndex, isSeeking, duration, showBanner]);

  useEffect(() => {
    const shouldRedirect =
      showBanner &&
      shouldAutoRedirect &&
      typeof onNext === "string" &&
      duration > 0 &&
      currentTime >= duration - 0.25 &&
      !hasRedirected;

    if (shouldRedirect) {
      setHasRedirected(true);
      setTimeout(() => {
        window.location.href = `${onNext}?autoplay=true`;
      }, 1500);
    }
  }, [
    currentTime,
    showBanner,
    shouldAutoRedirect,
    duration,
    hasRedirected,
    onNext,
  ]);

  const handleCancel = () => {
    setShowBanner(false);
    setHasRedirected(false);
  };

  useEffect(() => {
    if (!isAutoScroll) return;
    const container = containerRef.current;
    const activeLine = lineRefs.current[currentIndex];
    if (!container || !activeLine) return;

    const containerHeight = container.offsetHeight;
    const scrollOffset =
      activeLine.offsetTop + activeLine.offsetHeight / 2 - containerHeight / 2;

    lastProgrammaticScroll.current = Date.now();
    const timeout = setTimeout(() => {
      container.scrollTo({ top: scrollOffset, behavior: "smooth" });
    }, 100);

    return () => clearTimeout(timeout);
  }, [currentIndex, isAutoScroll]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (showBanner && !isPlaying) handleCancel();

    if (!audioContextRef.current) {
      const context = new (window.AudioContext || window.webkitAudioContext)();
      context.resume();
      const analyser = context.createAnalyser();
      const source = context.createMediaElementSource(audio);

      analyser.fftSize = 256;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      source.connect(analyser);
      analyser.connect(context.destination);

      audioContextRef.current = context;
      analyserRef.current = analyser;
      dataArrayRef.current = dataArray;

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      const renderBars = () => {
        if (!analyserRef.current || !dataArrayRef.current) return;
        requestAnimationFrame(renderBars);

        analyserRef.current.getByteFrequencyData(dataArrayRef.current);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const barCount = 5;
        const barWidth = canvas.width / (barCount * 1.5);
        const gap = barWidth / 2;

        for (let i = 0; i < barCount; i++) {
          const value =
            dataArrayRef.current[
              Math.floor(((i + 1) * bufferLength) / (barCount + 1))
            ];
          const barHeight = (value / 255) * canvas.height;
          ctx.fillStyle = "#1A1A1A";
          ctx.fillRect(
            i * (barWidth + gap),
            canvas.height / 2 - barHeight / 2,
            barWidth,
            barHeight
          );
        }
      };

      renderBars();
    }

    isPlaying ? audio.pause() : audio.play();
  };

  return (
    <div className="srt-wrapper">
      <div className="srt-player-box">
        <div
          className="srt-text"
          ref={containerRef}
          onScroll={() => {
            if (Date.now() - lastProgrammaticScroll.current > 1000)
              setIsAutoScroll(false);
          }}
        >
          <div className="srt-text-inner">
            {hasSubtitles ? (
              subs.map((line, i) => (
                <p
                  key={i}
                  ref={(el) => (lineRefs.current[i] = el)}
                  className={i === currentIndex ? "active" : ""}
                  onClick={() => {
                    audioRef.current.currentTime = line.start;
                    setCurrentTime(line.start);
                    setSeekValue((line.start / duration) * 100);

                    // NEW: marquer ce scroll comme programmatique
                    lastProgrammaticScroll.current = Date.now();
                  }}
                >
                  {line.text}
                </p>
              ))
            ) : (
              <p className="srt-empty">Aucune transcription trouvée.</p>
            )}
          </div>
        </div>

        <div className="srt-controls">
          <button onClick={togglePlay} title="Play/Pause" aria-label="Play/Pause">
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          <div className="srt-timer-spectrum">
            <canvas
              ref={canvasRef}
              className="srt-spectrum"
              width={40}
              height={20}
            />
            <span className="srt-time">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>
        </div>

        <input
          type="range"
          min="0"
          max="100"
          value={seekValue}
          onInput={(e) => setSeekValue(+e.target.value)}
          onChange={(e) => {
            const newTime = (+e.target.value / 100) * duration;
            if (newTime < duration - 5 && showBanner) handleCancel();
            audioRef.current.currentTime = newTime;
            setCurrentTime(newTime);
            setIsSeeking(false);

            // NEW: protéger l’auto-scroll
            lastProgrammaticScroll.current = Date.now();
          }}
          className="srt-progress"
          style={{ "--progress": `${seekValue}%` }}
        />

        <audio ref={audioRef} src={audioSrc} className="srt-audio" />

        {!isAutoScroll && (
          <button
            className="srt-scroll-button"
            onClick={() => setIsAutoScroll(true)}
          >
            Défilement automatique
          </button>
        )}

        {showBanner && nextEpisodeTitle && (
          <div className="srt-banner">
            <p className="srt-banner-timer">
              Prochain épisode dans{" "}
              <strong>{Math.ceil(duration - currentTime)}</strong> secondes
            </p>
            <p className="srt-banner-eptitle">{nextEpisodeTitle}</p>
            <div className="srt-banner-buttons">
              <button onClick={handleCancel}>Rester ici</button>
              <div className="auto-next-button">
                <button
                  style={{
                    "--fill": `${
                      ((duration - currentTime) / 5 > 1
                        ? 0
                        : 1 - (duration - currentTime) / 5) * 100
                    }%`,
                  }}
                  onClick={() => (window.location.href = `${onNext}`)}
                >
                  Épisode suivant <FaAngleRight />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
