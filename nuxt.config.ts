import { resolve } from 'path'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint'],
  nitro: { preset: 'vercel' },
    alias: {
    '@': resolve(__dirname, '/')
  },
})
