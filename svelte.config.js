import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/kit/vite";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter({
      pages: "build",
      assets: "build",
      fallback: undefined,
      precompress: true,
      strict: true,
    }),
    csp: {
      mode: "auto",
      directives: {
        "base-uri": ["none"],
        "default-src": ["self"],
        "require-trusted-types-for": ["script"],
        "object-src": ["none"],
        "script-src": ["self", "strict-dynamic", "unsafe-inline"],
        "style-src": ["self", "unsafe-inline"],
        "img-src": ["self", "data:"],
        "frame-ancestors": ["none"],
      },
    },
  },
  vitePlugin: {
    inspector: {
      showToggleButton: "always",
      toggleButtonPos: "bottom-right",
    },
  },
};

export default config;
