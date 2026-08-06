import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    watch: {
      ignored: ['**/*.zip', '**/temp-videos/**', '**/BhangadiyaTemp/**', '**/*Temp/**']
    }
  },
  build: {
    chunkSizeWarningLimit: 700,
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Isolate Firebase into its own lazy chunk — only loads on /admin
          if (id.includes('node_modules/firebase')) {
            return 'firebase-vendor';
          }
          // Isolate heavy animation libs into a separate vendor chunk
          if (id.includes('node_modules/gsap') || id.includes('node_modules/framer-motion')) {
            return 'animation-vendor';
          }
          // Core React/router vendor chunk
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom') || id.includes('node_modules/react-router')) {
            return 'react-vendor';
          }
        }
      }
    }
  }
})


