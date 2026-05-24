import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { copyFileSync } from 'node:fs';
import { resolve } from 'node:path';

// Resolve the public base path so the build works on GitHub Pages with no
// manual configuration.
//   • Local dev/build → "/" (clean root URLs).
//   • In GitHub Actions → derived from the repo name: a project site lives at
//     "/<repo>/", while a user/org site (<owner>.github.io) and custom domains
//     live at "/".
//   • VITE_BASE always wins if set (e.g. a custom domain on a project repo).
function resolveBase() {
  if (process.env.VITE_BASE) return process.env.VITE_BASE;
  const repo = process.env.GITHUB_REPOSITORY; // "owner/name" inside Actions
  if (process.env.GITHUB_ACTIONS && repo) {
    const name = repo.split('/')[1];
    return name.endsWith('.github.io') ? '/' : `/${name}/`;
  }
  return '/';
}

// Copy index.html → 404.html after the build. GitHub Pages serves 404.html for
// any path it can't find, so this lets BrowserRouter deep-links and refreshes
// (e.g. /newsroom/financial-statements) resolve to the SPA instead of erroring.
function spaFallback() {
  let outDir = 'dist';
  let root = process.cwd();
  return {
    name: 'spa-404-fallback',
    configResolved(c) {
      outDir = c.build.outDir;
      root = c.root;
    },
    closeBundle() {
      const dir = resolve(root, outDir);
      copyFileSync(resolve(dir, 'index.html'), resolve(dir, '404.html'));
    },
  };
}

export default defineConfig({
  base: resolveBase(),
  plugins: [react(), spaFallback()],
});
