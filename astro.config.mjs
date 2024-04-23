import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import AutoImport from "astro-auto-import";
import { defineConfig, squooshImageService } from "astro/config";
import remarkCollapse from "remark-collapse";
import remarkToc from "remark-toc";
import config from "./src/config/config.json";

import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  site: config.site.base_url ? config.site.base_url : "https://e.sanchezcarlosjr.com",
  base: config.site.base_path ? config.site.base_path : "/",
  trailingSlash: config.site.trailing_slash ? "always" : "never",
  image: {
    service: squooshImageService()
  },
  integrations: [react(), sitemap(),
    starlight({
      title: "EvaNote",
      customCss: [
        './src/styles/typography.scss',
        './src/styles/palette.scss'
      ],
      locales: {
        root: {
          label: 'English',
          lang: 'en',
        }
      }
    }),
    tailwind({
    config: {
      applyBaseStyles: false
    }
  }), AutoImport({
    imports: ["@/shortcodes/Button", "@/shortcodes/Accordion", "@/shortcodes/Notice", "@/shortcodes/Video", "@/shortcodes/Youtube", "@/shortcodes/Tabs", "@/shortcodes/Tab"]
  })],
  markdown: {
    remarkPlugins: [remarkToc, [remarkCollapse, {
      test: "Table of contents"
    }]], shikiConfig: {
      theme: "one-dark-pro", wrap: true
    }, extendDefaultPlugins: true
  }
});
