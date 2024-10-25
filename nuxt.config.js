const config = require('config')
const environment = config.get('environment')

module.exports = {
  env: environment,
  mode: 'universal',
  srcDir: 'src',

  /*  server: {
    port: 3110, // default: 3000
    host: 'localhost' // default: localhost      
  }, */

  head: {
    titleTemplate: '%s - Acceso',
    htmlAttrs: {
      lang: 'es',
    },
    meta: [
      {
        charset: 'utf-8',
      },
      {
        name: 'theme-color',
        content: '#ffffff',
      },
      {
        name: 'viewport',
        content:
          'width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,minimal-ui,user-scalable=0',
      },
      {
        name: 'google',
        content: 'notranslate',
      },
    ],
    link: [
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/icon?family=Material+Icons',
      },
    ],
    script: [
      {
        src: '/js/tracking.js',
        type: 'text/javascript',
      },
      {
        src: '/widget/selphi/FPhi.Widget.wasm.js',
        type: 'text/javascript',
      },
    ],
  },

  /*
   ** Customize the progress-bar color
   */
  loading: false,

  /*
   ** Global CSS
   */
  css: ['~/assets/style/own.css'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/vuelidate',
    '~plugins/store-helpers',
    '~plugins/axios',
    { src: '~/plugins/google-maps', ssr: true },
    {
      src: '@/plugins/veelidate.js',
      ssr: true,
    },
    {
      src: '@/plugins/vue-the-mask.js',
      ssr: true,
    },
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/proxy',
    'nuxt-webfontloader',
    [
      '@nuxtjs/recaptcha',
      {
        hideBadge: true, // Hide badge element (v3)
        siteKey: environment.SITEKEY_CAPTCHA,
        version: 3, // Version
      },
    ],
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    [
      '@nuxtjs/google-analytics',
      {
        id: environment.ID_ANALYTICS,
      },
    ],
    [
      'nuxt-facebook-pixel-module',
      {
        /* module options */
        track: 'PageView',
        pixelId: '469673586902976',
        disabled: false,
      },
    ],
    [
      '@nuxtjs/google-gtag',
      {
        id: environment.ID_ANALYTICS,
        debug: true, // enable to track in dev mode
        disableAutoPageTrack: true, // disable if you don't want to track each page route with router.afterEach(...).
        additionalAccounts: [
          {
            id: environment.ID_ADS, // required if you are adding additional accounts
            config: {
              send_page_view: false, // optional configurations
            },
          },
        ],
      },
    ],
  ],
  icon: {
    iconSrc: '@/static/icon.png',
  },
  manifest: {
    name: 'Oficina Virtual',
    short_name: 'Oficina Virtual',
    theme_color: '#ffffff',
    background_color: '#fff',
    display: 'standalone',
    Scope: '/',
    start_url: '/promotor',
  },
  /*
   ** Axios module configuration
   */
  axios: {
    // modulo axios
    proxy: true,
    credentials: true,
  },
  //https://oficina.acceso.com.pe/v4/prospecto/v2.0/producto/lde?tipo=1 --> https://api.acr.pe/prospecto/v2.0/producto/lde?tipo=1
  proxy: {
    '/api/': {
      target: environment.NUXT_ENV_BASE_URL,
      pathRewrite: {
        '^/api/': '',
      },
    },
    '/test/': {
      target: environment.NUXT_ENV_TEST_BASE_URL,
      pathRewrite: {
        '^/test/': '',
      },
    },
    '/v4/': {
      target: environment.NUXT_ENV_V4_BASE_URL,
      pathRewrite: {
        '^/v4/': '',
      },
    },
    '/v5/': {
      target: environment.NUXT_ENV_V5_BASE_URL,
      pathRewrite: {
        '^/v5/': '',
      },
    },
    '/v6/': {
      target: environment.NUXT_ENV_V6_BASE_URL,
      pathRewrite: {
        '^/v6/': '',
      },
    },
    '/v7/': {
      target: environment.NUXT_ENV_V7_BASE_URL,
      pathRewrite: {
        '^/v7/': '',
      },
    },
    '/v8/': {
      target: environment.NUXT_ENV_V8_BASE_URL,
      pathRewrite: {
        '^/v8/': '',
      },
    },
    '/v9/': {
      target: environment.NUXT_ENV_V9_BASE_URL,
      pathRewrite: {
        '^/v9/': '',
      },
    },
    '/kong/': {
      target: environment.NUXT_ENV_BASE_KONG,
      pathRewrite: {
        '^/kong/': '',
      },
    },
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    transpile: [/^vue2-google-maps($|\/)/],
    extend(config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
          options: {
            fix: true,
          },
        })
      }
    },
  },
  buildModules: ['@nuxtjs/vuetify'],
  vuetify: {
    /* module options */
    optionsPath: '~/assets/js/options.js',
    treeShake: true,
    defaultAssets: {
      font: {
        family: 'Exo 2',
      },
    },
  },
  webfontloader: {
    google: {
      families: ['Exo+2:400,700,800&display=swap'],
    },
  },
  telemetry: false,
}
