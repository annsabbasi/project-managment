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
  server: {
    proxy: {
      '/api': {
        target: 'https://workbackend-ten.vercel.app/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Musr add this api before any route EXP:('/api/your-route)
      }
    }
  }
});