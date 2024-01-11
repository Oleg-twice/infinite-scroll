// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  typescript: {
    typeCheck: true
  },
  css: ['animate.css'],
  app: {
    baseURL: 'https://oleg-twice.github.io/infinite-scroll/index.html', // baseURL: '/<repository>/'
    buildAssetsDir: 'assets', 
  },
})
