// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import tailwind from '@astrojs/tailwind';

import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  
  integrations: [tailwind(), icon()],
  
  vite: {
    plugins: [tailwindcss()]
  }
  
});