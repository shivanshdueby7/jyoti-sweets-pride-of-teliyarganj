
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    // Increase the warning limit to 1000KB to prevent warnings for slightly larger chunks
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // Manually split vendor libraries into separate chunks to improve performance and caching
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-framer': ['framer-motion'],
          'vendor-utils': ['lucide-react', '@google/genai'],
        },
      },
    },
  },
});
