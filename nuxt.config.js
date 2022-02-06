export default {
  target: 'static',

  srcDir: 'docs/',

  head: {
    title: 'Vue CMD Menu',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Build beautiful and extensible Command + k menus with Vue' },
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/icon.png' }
    ]
  },

  css: [
  ],

  plugins: [
  ],

  components: true,

  buildModules: [
    '@nuxt/typescript-build',
  ],

  modules: [
    '@nuxt/content',
    '@blokwise/dynamic'
  ],

  content: {},

  build: {
  },

  telemetry: false
}
