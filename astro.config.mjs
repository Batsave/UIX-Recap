// astro.config.mjs
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import { fileURLToPath } from "url";
import rehypeCallouts from "rehype-callouts";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import TableAccessibility from "./scripts/table-accessibility.js";

export default defineConfig({
  site: "https://uix.batsave.tv",
  content: {
    dir: "./content",
  },
  markdown: {
    rehypePlugins: [rehypeCallouts, TableAccessibility],
  },
  integrations: [
    react(),
    sitemap(),
    starlight({
      title: "UIX Récap",
      description: "Récapitulatif de l'essentiel UI/UX",
      favicon: "/favicon.svg",
      logo: {
        src: "./public/assets/svg/logo.svg",
      },
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/Batsave/UIX-Recap",
        },
      ],
      head: [
        { tag: "meta", attrs: { name: "robots", content: "index, follow" } },
        { tag: "meta", attrs: { name: "author", content: "Baptiste SAVE" } },
        {
          tag: "meta",
          attrs: {
            name: "keywords",
            content:
              "UX, UI, design, expérience utilisateur, documentation, référence",
          },
        },
        { tag: "meta", attrs: { property: "og:type", content: "article" } },
        {
          tag: "meta",
          attrs: {
            property: "og:title",
            content: "UIX Récap – UX, UI, Design",
          },
        },
        {
          tag: "meta",
          attrs: {
            property: "og:description",
            content: "Feuille récapitulative sur l’UX et l’UI design.",
          },
        },
        {
          tag: "meta",
          attrs: {
            property: "og:image",
            content: "/assets/png/share-cover.png",
          },
        },
        {
          tag: "meta",
          attrs: { property: "og:url", content: "https://uix.batsave.tv" },
        },
        {
          tag: "meta",
          attrs: { name: "twitter:card", content: "summary_large_image" },
        },
        {
          tag: "meta",
          attrs: {
            name: "google-site-verification",
            content: "ANXl8OG3ubA9eai8sI34GhInc6-KmJ-P8SirJEWHE5k",
          },
        },
        {
          tag: "script",
          attrs: {
            defer: true,
            src: "/_vercel/insights/script.js",
          },
        },
        {
          tag: "script",
          attrs: {
            defer: true,
            src: "/scripts/aside-accessibility.js",
          },
        },
      ],
      defaultLocale: "fr",
      locales: {
        fr: { label: "Français", lang: "fr" },
        en: { label: "English", lang: "en" },
      },
      customCss: ["./src/styles/custom.css"],

      sidebar: [
        { label: "Accueil", translations: { en: "Home" }, link: "/" },
        {
          label: "Psychologie cognitive",
          translations: { en: "Cognitive Psychology" },
          link: "/ux-cognitive-psychology",
        },
        {
          label: "Recherche Utilisateur",
          translations: { en: "User Research" },
          link: "/ux-user-research",
        },
        {
          label: "Personae & Empathie",
          translations: { en: "Personas & Empathy" },
          link: "/ux-personas-and-empathy",
        },
        {
          label: "UX Mapping",
          translations: { en: "UX Mapping" },
          link: "/ux-mapping",
        },
        {
          label: "Architecture de l'information",
          translations: { en: "Information Architecture" },
          link: "/information-architecture",
        },
        {
          label: "UX Writing",
          translations: { en: "UX Writing" },
          link: "/ux-writing",
        },
        {
          label: "Personnalisation & UX",
          translations: { en: "Personalization & UX" },
          link: "/ux-personalization",
        },
        {
          label: "Accessibilité",
          translations: { en: "Accessibility" },
          link: "/accessibility",
        },
        {
          label: "Amélioration continue",
          translations: { en: "Continuous Improvement" },
          link: "/continuous-improvement",
        },

        {
          label: "Design Thinking",
          collapsed: true,
          items: [
            {
              label: "Introduction",
              translations: { en: "Introduction" },
              link: "/design-thinking/",
            },
            {
              label: "Définition",
              translations: { en: "Definition" },
              link: "/design-thinking/definition",
            },
            {
              label: "Idéation",
              translations: { en: "Ideation" },
              link: "/design-thinking/ideation",
            },
            {
              label: "Prototypage",
              translations: { en: "Prototyping" },
              link: "/design-thinking/prototyping",
            },
            {
              label: "Tests",
              translations: { en: "Testing" },
              link: "/design-thinking/tests",
            },
          ],
        },
        {
          label: "Design Sprint",
          collapsed: true,
          items: [
            {
              label: "Introduction",
              translations: { en: "Introduction" },
              link: "/design-sprint/",
            },
            {
              label: "Understand, Sketch, Decide",
              translations: { en: "Understand, Sketch, Decide" },
              link: "/design-sprint/understand-sketch-decide",
            },
            {
              label: "Storyboarding, Prototypage & Tests",
              translations: { en: "Storyboarding, Prototyping & Testing" },
              link: "/design-sprint/storyboarding-prototyping-testing",
            },
          ],
        },
        {
          label: "Marketing",
          collapsed: true,
          items: [
            {
              label: "Introduction",
              translations: { en: "Introduction" },
              link: "/marketing/",
            },
            {
              label: "Landing Pages",
              translations: { en: "Landing Pages" },
              link: "/marketing/landing-page",
            },
            {
              label: "SEO",
              translations: { en: "SEO" },
              link: "/marketing/seo",
            },
            {
              label: "Stratégie Social Media",
              translations: { en: "Social Media Strategy" },
              link: "/marketing/strategy-social-media",
            },
            {
              label: "RGPD",
              translations: { en: "GDPR" },
              link: "/marketing/rgpd",
            },
          ],
        },
        {
          label: "Webflow",
          collapsed: true,
          items: [
            {
              label: "Introduction",
              translations: { en: "Introduction" },
              link: "/webflow/",
            },
            {
              label: "Les bases",
              translations: { en: "Basics" },
              link: "/webflow/basics",
            },
            {
              label: "CMS",
              translations: { en: "CMS" },
              link: "/webflow/cms",
            },
            {
              label: "Animation et interaction",
              translations: { en: "Animation and Interaction" },
              link: "/webflow/animation-and-interaction",
            },
            {
              label: "Avec Spline",
              translations: { en: "With Spline" },
              link: "/webflow/with-spline",
            },
            {
              label: "SEO",
              translations: { en: "SEO" },
              link: "/webflow/seo",
            },
            {
              label: "E-Commerce",
              translations: { en: "E-Commerce" },
              link: "/webflow/e-commerce",
            },
            {
              label: "Components",
              translations: { en: "Components" },
              link: "/webflow/components",
            },
            {
              label: "Limitations",
              translations: { en: "Limitations" },
              link: "/webflow/limitations",
            },
          ],
        },
      ],
    }),
  ],
  vite: {
    resolve: {
      alias: {
        "~": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  },
});
