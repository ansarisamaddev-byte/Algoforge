import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  envDir: '..', // read the shared .env from the repo root
  server: {
    port: 5173,
    proxy: { '/api': process.env.VITE_DEV_API || 'http://localhost:5000' },
  },
});
