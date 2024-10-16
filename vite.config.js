import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      // Specify the server directory to be ignored in the build
      external: ['./server/**'],
    },
  },
});