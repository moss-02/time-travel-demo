import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // UUMit serves static folders below an application-specific path.
  base: "./",
  plugins: [react()],
})
