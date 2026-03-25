import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    ViteImageOptimizer({
      png: { quality: 80 },
      webp: { quality: 85 },
      includePublic: true,
      logStats: true,
    }),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "apple-touch-icon.png"],
      manifest: {
        name: "Prayer Companion",
        short_name: "Prayer",
        description: "A calm, intentional prayer companion app",
        start_url: "/",
        scope: "/",
        display: "standalone",
        background_color: "#E4DED5",
        theme_color: "#E4DED5",
        orientation: "portrait",
        icons: [
          {
            src: "/icons/icon-192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/icons/icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,webp,svg,woff2,ttf}"],
        cleanupOutdatedCaches: true,
        navigateFallback: "index.html",
        maximumFileSizeToCacheInBytes: 12 * 1024 * 1024,
      },
      devOptions: {
        enabled: true,
        type: "module",
      },
    }),
  ],
});
