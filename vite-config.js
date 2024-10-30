import { defineConfig } from "vite"

export default defineConfig({
  server: {
    port: 3000,
  },
  build: {
    rollupOptions: {
      output: {
        assetFileNames: 'png/[name]-[hash][extname]'
      }
    }
  },
  base: '/',
})
