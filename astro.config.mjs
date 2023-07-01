import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import compress from "astro-compress";
import sitemap from "@astrojs/sitemap";

import robotsTxt from "astro-robots-txt";

// https://astro.build/config
export default defineConfig({
  site: 'https://thanhtrang16490.github.io/',
  base: '/fullstack-nodejs',
  integrations: [tailwind({
    config: {
      applyBaseStyles: false
    }
  }), sitemap({}), compress({
    css: false,
    js: false
  }), robotsTxt()]
});