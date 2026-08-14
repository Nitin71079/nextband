import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),

    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.png", "favicon.ico", "apple-touch-icon.png", "icon-192.png", "icon-512.png", "logo.png"],
      workbox: {
        maximumFileSizeToCacheInBytes: 35 * 1024 * 1024, // 35MB limit
        globPatterns: ["**/*.{js,css,html,ico,png,svg,jpg,jpeg,webp,woff2}"],
      },
      manifest: {
        id: "/",
        name: "Knarrow — AI IELTS Platform",
        short_name: "Knarrow",
        description:
          "Master IELTS with AI-powered Writing & Speaking evaluation, realistic CBT mock tests, Reading, Listening, and personalized analytics.",
        theme_color: "#000000",
        background_color: "#000000",
        display: "standalone",
        orientation: "portrait-primary",
        start_url: "/",
        scope: "/",
        categories: ["education", "productivity"],
        icons: [
          {
            src: "/icon-192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "/apple-touch-icon.png",
            sizes: "180x180",
            type: "image/png",
          },
        ],
        shortcuts: [
          {
            name: "My Dashboard",
            short_name: "Dashboard",
            description: "View your IELTS progress and recent scores",
            url: "/dashboard",
            icons: [{ src: "/icon-192.png", sizes: "192x192" }],
          },
          {
            name: "Full Mock Tests",
            short_name: "Mock Tests",
            description: "Take full CBT-style IELTS mock exams",
            url: "/full-mocks",
            icons: [{ src: "/icon-192.png", sizes: "192x192" }],
          },
          {
            name: "AI Speaking Practice",
            short_name: "Speaking",
            description: "Practice IELTS Speaking with live AI examiner",
            url: "/speaking",
            icons: [{ src: "/icon-192.png", sizes: "192x192" }],
          },
        ],
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