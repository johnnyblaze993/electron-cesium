import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import cesium from 'vite-plugin-cesium';

export default defineConfig({
  plugins: [react(), cesium()],
  base: './',  // Ensures relative paths for assets
  server: {
    port: 5555,
  },
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.names && assetInfo.names[0] === 'Cesium') {
            return 'assets/Cesium/[name][extname]';
          }
          return 'assets/[name][extname]';
        },
      },
    },
  },
});
