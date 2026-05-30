import {
  defineConfig
} from "vite";

import react
from "@vitejs/plugin-react";

import {
  VitePWA
} from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),

    VitePWA({
      registerType:
        "autoUpdate",

      manifest: {
        name: "NextBand",

        short_name:
          "NextBand",

        description:
          "AI IELTS Preparation Platform",

        theme_color:
          "#22d3ee",

        background_color:
          "#ffffff",

        display:
          "standalone"
      }
    })
  ],

  build: {
    chunkSizeWarningLimit:
      1000
  }
});