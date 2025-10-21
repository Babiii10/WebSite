import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true, // Expose to network for Windows compatibility
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'plotly': ['plotly.js', 'react-plotly.js'],
          'xlsx': ['xlsx'],
          'papaparse': ['papaparse']
        }
      }
    }
  },
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis (Windows compatibility)
      define: {
        global: 'globalThis'
      }
    },
    // Force include these dependencies for better Windows compatibility
    include: ['react', 'react-dom', 'zustand']
  }
})
