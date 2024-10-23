import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import cesium from 'vite-plugin-cesium';

export default defineConfig({
  plugins: [react(), cesium()],  // Add cesium plugin here
  server: {
    port: 5555,  // Your preferred port
  },
});
