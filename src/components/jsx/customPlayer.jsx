// components/CustomPlayer.jsx
import React, { useRef, useState, useEffect } from "react";
import "./podcastPlayer.scss";

const CustomPlayer = ({ title, date, duration, src }) => {
  const audioRef = useRef(null);
  const progressBarRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const togglePlay = () => {
    if (!audioRef.current) return;
    playing ? audioRef.current.pause() : audioRef.current.play();
  };

  const seekTo = (clientX) => {
    const bar = progressBarRef.current;
    if (!audioRef.current || !bar) return;

    const rect = bar.getBoundingClientRect();
    const clickX = clientX - rect.left;
    const width = rect.width;
    const percent = Math.max(0, Math.min(1, clickX / width));
    setProgress(percent * 100);
    audioRef.current.currentTime = percent * audioRef.current.duration;
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    seekTo(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (isDragging) seekTo(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      if (!isDragging) {
        const percent = (audio.currentTime / audio.duration) * 100;
        setProgress(percent || 0);
      }
    };

    audio.addEventListener("timeupdate", updateProgress);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div className="custom_episode">
      <audio
        ref={audioRef}
        src={src}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      <div className="custom_episode_top">
        <button className="custom_episode_button" onClick={togglePlay}>
          {playing ? "❚❚" : "▶"}
        </button>
        <div className="custom_episode_info">
          <h3>{title}</h3>
          <p>{date}</p>
        </div>
        <div className="custom_episode_duration">{duration}</div>
      </div>
      <div
        className="custom_episode_progress"
        ref={progressBarRef}
        onMouseDown={handleMouseDown}
      >
        <div className="custom_episode_bar" style={{ width: `${progress}%` }} />
        <div
          className="custom_episode_handle"
          style={{ left: `calc(${progress}% - 8px)` }}
        />
      </div>
    </div>
  );
};

export default CustomPlayer;
