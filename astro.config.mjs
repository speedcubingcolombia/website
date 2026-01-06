// @ts-check
import alpinejs from "@astrojs/alpinejs";
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://speedcubingcolombia.org",
  integrations: [alpinejs()],
  i18n: {
    defaultLocale: "es",
    locales: ["es", "en", "pt"],
    routing: {
      prefixDefaultLocale: false, // /blog/sac-2026 para español (sin /es/)
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
