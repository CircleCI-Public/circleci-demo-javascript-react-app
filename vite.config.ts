import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
  },
  build: {
    // Keep CRA's output directory so existing deploy tooling and .gitignore still apply
    outDir: 'build',
  },
  test: {
    environment: 'jsdom',
    maxWorkers: 2,
    reporters: ['default', 'junit'],
    outputFile: {
      junit: 'test-results/junit.xml',
    },
  },
});
