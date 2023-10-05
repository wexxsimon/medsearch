// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  alias: {
    css: '/<rootDir>/assets/css',

  },
  // app: {
  //   baseURL: process.env.BASE_URL || "http://localhost:3000/",
  // },
  css: [
    '@/assets/css/main.css',
    'bootstrap/dist/css/bootstrap.css',
  ],
  modules: ['@nuxt/ui'],
  ssr: false,
});
