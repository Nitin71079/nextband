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
name: "Knarrow",
        short_name: "Knarrow",

        description:
"AI-powered IELTS Preparation Platform with Writing, Speaking, Reading and Listening.",

       theme_color:"#2563eb",

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