// @ts-check
import alpinejs from "@astrojs/alpinejs";
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://speedcubingcolombia.org",
  integrations: [alpinejs()],

  vite: {
    plugins: [tailwindcss()],
  },
});
