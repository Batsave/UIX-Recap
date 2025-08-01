// astro.config.mjs
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import { fileURLToPath } from "url";
import rehypeCallouts from "rehype-callouts";
import react from "@astrojs/react";

export default defineConfig({
  content: {
    dir: "./content",
  },
  markdown: {
    rehypePlugins: [rehypeCallouts],
  },
  integrations: [
    react(),
    starlight({
      title: "UIX Récap",
      description: "Récapitulatif de l'essentiel UI/UX",
      favicon: "/favicon.svg",
      logo: {
        src: "./public/favicon.svg",
      },
      markdown: {
        rehypePlugins: [rehypeCallouts],
      },

      head: [
        {
          tag: "meta",
          attrs: { name: "robots", content: "index, follow" },
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
            { label: "Stratégie Social Media", link: "/marketing/strategy-social-media" },
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
