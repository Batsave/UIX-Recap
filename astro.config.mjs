// astro.config.mjs
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import { fileURLToPath } from "url";
import { resolve } from "path";
import react from "@astrojs/react";

export default defineConfig({
  content: {
    dir: "./content",
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

      head: [
        {
          tag: "meta",
          attrs: { name: "robots", content: "noindex, nofollow" },
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
        { label: "Architecture de l'information", link: "/information-architecture" },


        {
          label: "Mods",
          translations: { en: "Mods" },
          autogenerate: { directory: "mods" },
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
