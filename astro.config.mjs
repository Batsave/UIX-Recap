// astro.config.mjs
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import { fileURLToPath } from "url";
import rehypeCallouts from "rehype-callouts";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://uix.batsave.tv",
  content: {
    dir: "./content",
  },
  markdown: {
    rehypePlugins: [rehypeCallouts],
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
      markdown: {
        rehypePlugins: [rehypeCallouts],
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
        { tag: "meta", attrs: { name: "keywords", content: "UX, UI, design, expérience utilisateur, documentation, référence" } },
        { tag: "meta", attrs: { property: "og:type", content: "article" } },
        { tag: "meta", attrs: { property: "og:title", content: "UIX Récap – UX, UI, Design" } },
        { tag: "meta", attrs: { property: "og:description", content: "Feuille récapitulative sur l’UX et l’UI design." } },
        { tag: "meta", attrs: { property: "og:image", content: "/assets/share-cover.png" } },
        { tag: "meta", attrs: { property: "og:url", content: "https://uix.batsave.tv" } },
        { tag: "meta", attrs: { name: "twitter:card", content: "summary_large_image" } },
        { tag: "meta", attrs: { name: "google-site-verification", content: "ANXl8OG3ubA9eai8sI34GhInc6-KmJ-P8SirJEWHE5k" } },
        {
          tag: "script",
          attrs: {
            defer: true,
            src: "/_vercel/insights/script.js",
          },
        },
      ],
      defaultLocale: "fr",
      locales: {
        fr: { label: "Français", lang: "fr" },
      },
      customCss: ["./src/styles/custom.css"],

      sidebar: [
        { label: "Accueil", link: "/" },
        { label: "Psychologie cognitive", link: "/ux-cognitive-psychology" },
        { label: "Recherche Utilisateur", link: "/ux-user-research" },
        { label: "Personae & Empathie", link: "/ux-personas-and-empathy" },
        { label: "UX Mapping", link: "/ux-mapping" },
        {
          label: "Architecture de l'information",
          link: "/information-architecture",
        },
        { label: "UX Writing", link: "/ux-writing" },
        { label: "Personnalisation & UX", link: "/ux-personalization" },
        { label: "Accessibilité", link: "/accessibility" },
        { label: "Amélioration continue", link: "/continuous-improvement" },

        {
          label: "Design Thinking",
          items: [
            { label: "Introduction", link: "/design-thinking/" },
            { label: "Définition", link: "/design-thinking/definition" },
            { label: "Idéation", link: "/design-thinking/ideation" },
            { label: "Prototypage", link: "/design-thinking/prototyping" },
            { label: "Tests", link: "/design-thinking/tests" },
          ],
        },
        {
          label: "Design Sprint",
          items: [
            { label: "Introduction", link: "/design-sprint/" },
            {
              label: "Understand, Sketch, Decide",
              link: "/design-sprint/understand-sketch-decide",
            },
            {
              label: "Storyboarding, Prototypage & Tests",
              link: "/design-sprint/storyboarding-prototyping-testing",
            },
          ],
        },
        {
          label: "Marketing",
          items: [
            { label: "Introduction", link: "/marketing/" },
            { label: "Landing Pages", link: "/marketing/landing-page" },
            { label: "SEO", link: "/marketing/seo" },
            {
              label: "Stratégie Social Media",
              link: "/marketing/strategy-social-media",
            },
            { label: "RGPD", link: "/marketing/rgpd" },
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
