import Mark from "mark.js";

export function highlightSearch() {
  let hash = decodeURIComponent(window.location.hash.replace(/^#/, ""));
  if (!hash) return;

  const context = document.querySelector("main");
  if (!context) return;

  const instance = new Mark(context);

  instance.unmark({
    done: () => {
      instance.mark(hash, {
        separateWordSearch: true,
        caseSensitive: false,
        className: "highlighted",
      });
    },
  });
}

// Relance le highlight si on change de hash en navigation interne
window.addEventListener("DOMContentLoaded", highlightSearch);
window.addEventListener("hashchange", highlightSearch);
