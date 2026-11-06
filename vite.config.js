import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

/**
 * Lists every HTML page the build should include.
 * Each page has its own file (see docs/arch/0009). Add a new page here when you create its file.
 */
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        login: fileURLToPath(new URL('./index.html', import.meta.url)),
        dashboard: fileURLToPath(new URL('./dashboard.html', import.meta.url)),
      },
    },
  },
});
