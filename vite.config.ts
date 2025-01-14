import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import cesium from 'vite-plugin-cesium';
import { resolve } from 'path';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  base: './', // Ensures relative paths in built files
  plugins: [
    react(),
    cesium(), // Adds Cesium plugin to handle Cesium assets
  ],
  define: {
    CESIUM_BASE_URL: JSON.stringify('./cesium'),
    'process.env.REACT_APP_CESIUM_ION_ACCESS_TOKEN': JSON.stringify(
      process.env.REACT_APP_CESIUM_ION_ACCESS_TOKEN
    ),
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
      output: {
        assetFileNames: (assetInfo) => {
          // Check if assetInfo.names exists and includes 'Cesium' in its path
          if (assetInfo.names && assetInfo.names.some((name) => name.includes('Cesium'))) {
            return 'cesium/[name][extname]';
          }
          return 'assets/[name][extname]';
        },
      },
    },
    outDir: 'dist',
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
