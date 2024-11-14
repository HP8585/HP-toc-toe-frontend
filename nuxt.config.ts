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
    '@vueuse/nuxt',
    '@nuxt/scripts'
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
  },
  app:{
    head:{
      script:[
        {
          type: 'text/javascript',
          children: `
          window.RAYCHAT_TOKEN = "88634213-22fe-47b0-98ee-6fc0dd9d5ccc";
          (function () {
            var d = document;
            var s = d.createElement("script");
            s.src = "https://widget-react.raychat.io/install/widget.js";
            s.async = true;
            d.getElementsByTagName("head")[0].appendChild(s);
          })();
        `
        }
      ]
    }
  }
})