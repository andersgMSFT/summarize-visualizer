import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// vite.config.ts
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/summarize-visualizer/' : '/',
  plugins: [react()],
}))
