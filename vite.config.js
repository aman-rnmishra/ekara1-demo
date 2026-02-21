import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/ekara-portfolio-static-website/',
  plugins: [react()],
})
