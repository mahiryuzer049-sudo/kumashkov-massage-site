import { defineConfig } from "vite";
import handlebars from "vite-plugin-handlebars";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import { getTemplateContext } from "./site.config.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: "src",
  publicDir: "../public",
  plugins: [
    handlebars({
      partialDirectory: "./src/partials",
      context: (pagePath) => getTemplateContext(pagePath),
    }),
  ],
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        privacy: resolve(__dirname, "src/privacy.html"),
        landingClassic: resolve(__dirname, "src/landing-classic.html"),
        landingLymph: resolve(__dirname, "src/landing-lymph.html"),
        landingRelax: resolve(__dirname, "src/landing-relax.html"),
        landingPosture: resolve(__dirname, "src/landing-posture.html"),
      },
    },
  },
  server: {
    port: 8000,
  },
});
