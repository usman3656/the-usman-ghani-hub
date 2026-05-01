// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1];
/** GitHub Actions sets this for static Pages builds (no Cloudflare Workers runtime). */
const isGitHubPages = process.env.GITHUB_PAGES === "true";

export default defineConfig({
  // Cloudflare adapter emits a Worker-shaped server bundle (`index.js`). TanStack's prerender
  // preview server expects `server.js`; disable Cloudflare only for static GitHub Pages builds.
  cloudflare: isGitHubPages ? false : undefined,
  tanstackStart: isGitHubPages
    ? {
        prerender: {
          enabled: true,
          crawlLinks: true,
          autoStaticPathsDiscovery: true,
        },
      }
    : undefined,
  vite: {
    // GitHub Pages serves this app under /<repo-name>/, not domain root.
    base: repositoryName ? `/${repositoryName}/` : "/",
  },
});
