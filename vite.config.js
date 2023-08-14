import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8080,
  },
  proxy: {
    // Proxy API requests to Express server
    '/api': 'http://localhost:3000',
  },
  build: {
    outDir: 'build', // Output directory for the built files
  },
});
