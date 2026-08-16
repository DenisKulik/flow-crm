import { config } from 'dotenv'
config()

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    [
      '@nuxtjs/google-fonts',
      {
        families: {
          Lato: {
            wght: [300, 400, 700],
            ital: [300]
          }
        }
      }
    ],
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt'
  ],
  shadcn: {
    componentDir: './app/components/ui'
  },
  pinia: {
    storesDirs: ['./app/stores/**']
  },
  build: {
    transpile: ['vee-validate']
  },
  nitro: { preset: 'vercel' },
  runtimeConfig: {
    appwriteKey: process.env.APPWRITE_KEY,
    public: {
      appwriteEndpoint: process.env.NUXT_PUBLIC_APPWRITE_ENDPOINT,
      appwriteProjectId: process.env.NUXT_PUBLIC_APPWRITE_PROJECT,
      appUrl: process.env.NUXT_PUBLIC_APP_URL
    }
  }
})
