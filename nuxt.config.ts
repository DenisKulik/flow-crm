// https://nuxt.com/docs/api/configuration/nuxt-config
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
    componentDir: './components/ui'
  },
  pinia: {
    storesDirs: ['./stores/**']
  },
  build: {
    transpile: ['vee-validate']
  }
})
