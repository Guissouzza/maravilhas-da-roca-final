import { defineConfig } from 'vite'
// @ts-ignore
import vue from '@vitejs/plugin-vue' // <-- Adicionado o '-plugin' que estava faltando aqui!
// @ts-ignore
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  root: 'frontend',
  plugins: [
    vue(),
    tailwindcss()
  ]
})