import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/summarize-visualizer/' : '/',
  plugins: [react(), viteSingleFile()],
  build: {
    assetsInlineLimit: Infinity, // this is enough
  },
}))
