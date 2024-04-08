import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter({
      pages: "build",
      assets: "build",
      fallback: "index.html",
      precompress: true,
      strict: true,
    }),
  },
  onwarn(warning, defaultHandler) {
    if (warning.code === "a11y-no-redundant-roles") {
      if (warning.message.includes("Redundant role 'navigation'")) {
        return;
      }
    }
    defaultHandler(warning);
  },
};

export default config;
