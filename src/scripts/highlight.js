import Mark from "mark.js";

export function highlightSearch() {
  const params = new URLSearchParams(window.location.search);
  const query = params.get("q");
  if (!query) return;

  // Cible : ton contenu principal (adapter si besoin)
  const context = document.querySelector("main");
  if (!context) return;

  // Init mark.js
  const instance = new Mark(context);

  // Supprime d’anciens surlignages (si navigation interne)
  instance.unmark({
    done: () => {
      instance.mark(query, {
        separateWordSearch: true,
        caseSensitive: false,
        className: "highlighted", // custom CSS
      });
    },
  });
}

window.addEventListener("DOMContentLoaded", highlightSearch);
