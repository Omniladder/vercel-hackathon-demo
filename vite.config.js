import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

/**
 * Sends /r/:code to the redirect page while developing. Vercel does this with a
 * rewrite in vercel.json, but the Vite dev server does not read that file.
 */
const shortLinksInDev = {
  name: 'short-links-in-dev',
  configureServer(server) {
    server.middlewares.use((request, response, next) => {
      if (request.url.startsWith('/r/')) request.url = '/redirect.html';
      next();
    });
  },
};

/**
 * Lists every HTML page the build should include.
 * Each page has its own file (see docs/arch/0009). Add a new page here when you create its file.
 */
export default defineConfig({
  plugins: [shortLinksInDev],
  build: {
    rollupOptions: {
      input: {
        login: fileURLToPath(new URL('./index.html', import.meta.url)),
        dashboard: fileURLToPath(new URL('./dashboard.html', import.meta.url)),
        create: fileURLToPath(new URL('./create.html', import.meta.url)),
        redirect: fileURLToPath(new URL('./redirect.html', import.meta.url)),
      },
    },
  },
});
