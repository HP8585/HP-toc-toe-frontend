// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  pinia: {
    storesDirs: ['./stores/**', './custom-folder/stores/**']
  },
  modules: [
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@nuxt/icon',
    'floating-vue/nuxt',
    '@nuxt/ui', 
  ],
  vite:{
    server:{
      proxy:{
        '/socket':{
          target: 'http://localhost:4000/',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/socket/, '')
        }
      }
    }
  },
  build: {
    transpile: [
      'pinia-plugin-persistedstate',
    ]
  }
})