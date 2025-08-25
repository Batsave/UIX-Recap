document.addEventListener('DOMContentLoaded', () => {
  // 🔧 Correction des <aside> sans aria-labelledby
  const asides = document.querySelectorAll('aside');

  asides.forEach((aside, index) => {
    if (aside.hasAttribute('aria-labelledby')) return;

    let heading = aside.querySelector('h1, h2, h3, h4, h5, h6');
    let headingId;

    if (heading) {
      if (!heading.id) {
        headingId = `aside-heading-${index + 1}`;
        heading.id = headingId;
      } else {
        headingId = heading.id;
      }
    } else {
      headingId = `aside-heading-${index + 1}`;
      const h2 = document.createElement('h2');
      h2.id = headingId;
      h2.className = 'sr-only'; // heading masqué visuellement
      h2.textContent = 'Table des matières / Table of Contents';
      aside.prepend(h2);
    }

    aside.setAttribute('aria-labelledby', headingId);
  });

  // ✅ Ajout automatique du lien "Aller au contenu" dans une <nav>
  const skipLink = document.querySelector('a[href="#_top"]');
  if (skipLink && !skipLink.closest('nav')) {
    const nav = document.createElement('nav');
    nav.setAttribute('aria-label', 'Accès rapide');
    skipLink.parentNode.insertBefore(nav, skipLink);
    nav.appendChild(skipLink);
  }

  // 🔧 Correction du texte de lien pour .site-title
  const siteTitleLink = document.querySelector('a.site-title');
  if (siteTitleLink) {
    if (!siteTitleLink.hasAttribute('aria-label')) {
      siteTitleLink.setAttribute('aria-label', 'Accueil UIX Recap');
    }
  }

  
});
