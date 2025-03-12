// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },

  tailwindcss: {
    cssPath: ["~/assets/css/tailwind.css", { injectPosition: "first" }],
    configPath: "tailwind.config",
    exposeConfig: {
      level: 2,
    },
    config: {},
    viewer: true,
  },

  future: {
    compatibilityVersion: 4,
  },

  runtimeConfig: {
    coreBaseUrlQR: process.env.NUXT_CORE_BASE_URLQR,
    xOdooApiKeyQR: process.env.NUXT_X_ODOO_API_KEYQR,
    coreBaseUrlBooking: process.env.NUXT_CORE_BASE_URLBooking,
    xOdooApiKeyBooking: process.env.NUXT_X_ODOO_API_KEYBooking,
    coreBaseUrlLoyalty: process.env.NUXT_CORE_BASE_URLLoyalty,
    xOdooApiKeyLoyalty: process.env.NUXT_X_ODOO_API_KEYLoyalty,
  },

  ssr: true,

  // when enabling ssr option you need to disable inlineStyles and maybe devLogs
  features: {
    inlineStyles: false,
    devLogs: false,
  },

  build: {
    transpile: ["vuetify"],
  },

  vite: {
    ssr: {
      noExternal: ["vuetify"],
    },
  },

  css: [],
  modules: [
    "@nuxt/fonts",
    "vuetify-nuxt-module",
    "@nuxt/eslint",
    "@nuxt/image",
    "@nuxtjs/tailwindcss",
  ],

  vuetify: {
    moduleOptions: {
      // check https://nuxt.vuetifyjs.com/guide/server-side-rendering.html
      ssrClientHints: {
        reloadOnFirstRequest: false,
        viewportSize: true,
        prefersColorScheme: false,

        prefersColorSchemeOptions: {
          useBrowserThemeOnly: false,
        },
      },

      // /* If customizing sass global variables ($utilities, $reset, $color-pack, $body-font-family, etc) */
      // disableVuetifyStyles: true,
      styles: {
        configFile: "assets/settings.scss",
      },
    },
  },
});
