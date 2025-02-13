/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  test: {
    setupFiles: './src/setupTests.ts',
    globals: true,
    environment: 'jsdom',
    coverage: {
      provider: 'istanbul',
      all: true,
    },
  },
});
