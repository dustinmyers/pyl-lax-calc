import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    open: true,
    hmr: {
      overlay: true,
    },
  },
  plugins: [
    react(),
    cssInjectedByJsPlugin(),
  ],
  build: {
    cssCodeSplit: false,
    outDir: 'dist',
    rollupOptions: {
      input: {
        app: './src/main.tsx',
        main: resolve(__dirname, 'index.html'),
      },
    },
    sourcemap: true
  },
})
