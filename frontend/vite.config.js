import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server : {
    historyApiFallback: true,
    proxy : {

      '/api' : 'http://localhost:4003',
      '/auth' : 'http://localhost:4003',
      '/property' : 'http://localhost:4003',
      '/buyersData' : "http://localhost:4003",
      '/tenantData' : 'http://localhost:4003'
    }

  },
  plugins: [
    tailwindcss(),
    react()],
  resolve: {
    alias: {
        "@": path.resolve(__dirname, "./"),
      },
  },
})
