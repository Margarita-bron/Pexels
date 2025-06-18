import react from '@vitejs/plugin-react';
import path from 'node:path';
import { defineConfig } from 'vitest/config';
import packageJson from './package.json' with { type: 'json' };
import { API_KEY } from './src/components/Photos/constants';

export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      '/api': {
        target: 'https://api.pexels.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        headers: {
          Authorization: API_KEY,
        },
      },
    },
    port: 4200,
  },

  test: {
    root: import.meta.dirname,
    name: packageJson.name,
    environment: 'jsdom',

    typecheck: {
      enabled: true,
      tsconfig: path.join(import.meta.dirname, 'tsconfig.json'),
    },

    globals: true,
    watch: false,
    setupFiles: ['./src/setupTests.ts'],
  },
});
