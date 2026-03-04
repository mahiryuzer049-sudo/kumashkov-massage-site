import { defineConfig } from "vite";
import handlebars from "vite-plugin-handlebars";
import Handlebars from "handlebars";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import { getTemplateContext } from "./site.config.mjs";
import { buildWhatsAppLink } from "./src/features/messenger/lib/wa-link-builder.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

function collapseWhitespaceHtml() {
  return {
    name: "collapse-whitespace-html",
    enforce: "post",
    transformIndexHtml: {
      order: "post",
      handler(html) {
        const jsonLdMinified = html.replace(
          /<script([^>]*?)type=(['"])application\/ld\+json\2([^>]*)>([\s\S]*?)<\/script>/gi,
          (fullMatch, beforeType, quote, afterType, jsonText) => {
            try {
              const compactJson = JSON.stringify(JSON.parse(jsonText));
              return `<script${beforeType}type=${quote}application/ld+json${quote}${afterType}>${compactJson}</script>`;
            } catch {
              return fullMatch;
            }
          }
        );

        return jsonLdMinified
          .replace(/<!--[\s\S]*?-->/g, "")
          .replace(/>\s+</g, "><")
          .trim();
      },
    },
  };
}

export default defineConfig({
  root: "src",
  publicDir: "../public",
  resolve: {
    alias: {
      "@app": resolve(__dirname, "src/app"),
      "@features": resolve(__dirname, "src/features"),
      "@shared": resolve(__dirname, "src/shared"),
      "@entities": resolve(__dirname, "src/entities"),
      "@scripts": resolve(__dirname, "src/scripts"),
    },
  },
  plugins: [
    handlebars({
      partialDirectory: "./src/partials",
      context: (pagePath) => getTemplateContext(pagePath),
      helpers: {
        waLink: (phoneDigits, text) => new Handlebars.SafeString(buildWhatsAppLink(phoneDigits, text)),
      },
    }),
    collapseWhitespaceHtml(),
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
