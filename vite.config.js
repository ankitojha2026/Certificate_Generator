import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/certificate_system/api': {
        target: 'http://localhost/certificate_system/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/certificate_system\/api/, ''),
      },
    },
  },
});