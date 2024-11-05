import { defineConfig } from "vite"
import type { UserConfig } from "vite"
import path from "path"

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler", // or "modern"
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        assetFileNames: "png/[name]-[hash][extname]",
      },
    },
  },
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  base: "/",
}) satisfies UserConfig