# 📘 UIX Recap – Documentation collaborative

Bienvenue dans **UIX Recap** ! 🎨

Ce projet est un site de documentation qui reprend une **grande partie des bases du design UX/UI**, réalisé initialement dans le cadre de ma formation.

👉 L’objectif est simple : fournir un **récapitulatif clair, pratique et accessible** à tous les étudiants et passionnés qui souhaitent apprendre ou réviser rapidement les fondamentaux de l’UX/UI.

> 🔧 Le site est construit avec **Astro + Starlight** pour garantir **rapidité**, **accessibilité** et **simplicité d’édition**.

---

## 🚀 Objectifs du projet

✨ Centraliser les **notions essentielles** en UX/UI.  
✨ Offrir une ressource **gratuite, ouverte et partageable**.  
✨ Favoriser l’**amélioration continue** grâce à vos contributions.

---

## 🤝 Comment contribuer ?

Vous avez repéré une erreur, une explication manquante ou vous souhaitez enrichir le contenu ?  
Parfait ! 🎉 Vous pouvez contribuer de deux façons principales :

### 1️⃣ Créer une _Issue_

- Allez dans l’onglet **Issues** du repo.
- Décrivez clairement le problème ou la suggestion.
  > Exemple : _“La définition des personas est trop brève, je propose d’ajouter un exemple concret.”_
- Une fois validée, elle pourra être reprise par vous-même ou un autre contributeur.

### 2️⃣ Faire une _Pull Request_

```bash
# 1. Forkez le repo puis clonez-le en local
git clone https://github.com/ton-compte/nom-du-repo.git
cd nom-du-repo

# 2. Installez les dépendances
npm install

# 3. Lancez le serveur de développement
npm run dev
```

- Faites vos modifications dans src/content/docs/ (les fichiers .md ou .mdx).
- Vérifiez le rendu en local puis committez vos changements.
- Enfin, ouvrez une Pull Request vers le repo principal.

---

## 📂 Structure du projet

```csharp
.
├── public/              # Images & assets statiques (favicon, logos, etc.)
├── src/
│   ├── assets/          # Illustrations utilisées dans la doc
│   ├── content/
│   │   ├── docs/        # Documentation UX/UI (Markdown & MDX)
│   └── content.config.ts
├── astro.config.mjs     # Configuration Astro/Starlight
├── package.json         # Dépendances & scripts
└── tsconfig.json
```

Les pages de documentation se trouvent dans src/content/docs/.
Chaque fichier Markdown correspond à une page de contenu.

---

## 🧞 Commandes utiles

| Commande          | Explication                               |
| ----------------- | ----------------------------------------- |
| **npm install**   | Installe les dépendances                  |
| **npm run dev**   | Démarre le serveur local (localhost:4321) |
| **npm run build** | Génère le site pour la production         |

---

## 👀 Ressources utiles

| Ressource                | Lien                                                   |
| ------------------------ | ------------------------------------------------------ |
| Documentation Starlight  | [starlight.astro.build](https://starlight.astro.build) |
| Documentation Astro      | [docs.astro.build](https://docs.astro.build)           |
| Communauté Astro Discord | [astro.build/chat](https://astro.build/chat)           |

---

## 📢 Conclusion

Ce projet est pensé comme un **manuel vivant**.  
L’UX/UI évolue vite, et grâce à vos contributions, nous pouvons maintenir une ressource **fiable, complète et collaborative** au service de tous.

> 💡 **Astuce :** même une petite correction (fautes, typo, lien manquant) est une contribution précieuse.

---

## 📝 Crédits & Utilisation

- Ce site a été réalisé initialement dans le cadre de ma **formation en UX/UI Design**.
- Il a pour but d’être un **outil pédagogique** : un récapitulatif clair, simple et réutilisable par les étudiants, enseignants ou toute personne souhaitant apprendre les bases.
- Les contenus sont issus de mes notes de cours, de synthèses personnelles et de ressources ouvertes.

### 📌 Utilisation autorisée

✔️ Vous pouvez **lire, partager et utiliser librement** ce contenu à des fins personnelles ou pédagogiques.  
✔️ Vous pouvez **l’adapter ou le compléter** dans vos propres projets, à condition de citer la source.

### ⚠️ Limites

❌ Ce projet n’a pas vocation à remplacer des ouvrages spécialisés ou une formation complète.  
❌ Toute utilisation commerciale directe du contenu (revente, copie intégrale payante) est interdite.

### 🙏 Remerciements

Un grand merci à :

- Mes formateurs et camarades de promo pour les échanges enrichissants.
- La communauté **Astro / Starlight** pour l’outil de documentation.
- Tous ceux qui contribueront à améliorer ce projet dans le futur 🚀.
