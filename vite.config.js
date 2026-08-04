import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),

    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        maximumFileSizeToCacheInBytes: 15 * 1024 * 1024, // 15MB limit
      },

      manifest: {
        name: "Knarrow",
        short_name: "Knarrow",

        description:
          "AI-powered IELTS Preparation Platform with Writing, Speaking, Reading and Listening.",

        theme_color: "#2563eb",
        background_color: "#ffffff",
        display: "standalone",
      },
    }),
  ],

  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
  },

  build: {
    chunkSizeWarningLimit: 1000,
  },
});