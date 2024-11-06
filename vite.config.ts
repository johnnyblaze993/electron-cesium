import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import cesium from 'vite-plugin-cesium';

export default defineConfig({
  plugins: [react(), cesium()],
  base: './',
  server: {
    port: 5555, // Set the port to 5555 explicitly
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.names && assetInfo.names.some(name => name.includes('Cesium'))) {
            return 'assets/Cesium/[name][extname]';
          }
          return 'assets/[name][extname]';
        },
      },
    },
  },
});
