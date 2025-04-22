module.exports = function (/* ctx */) {
  return {
    boot: [
      'axios',
      'emailjs'
    ],
    css: [
      'app.scss'
    ],
    extras: [
      'roboto-font',
      'material-icons'
    ],
    build: {
      vueRouterMode: 'history',
      extendWebpack(cfg) {
        // additional webpack configurations can be added here
      }
    },
    devServer: {
      https: false,
      port: 8080,
      open: true // opens browser window automatically
    },
    framework: {
      iconSet: 'material-icons', // options: 'material-icons', 'mdi', 'fontawesome', 'eva-icons'
      lang: 'en-US', // language pack
      config: {
        // config options for Quasar components
      },
      components: [
        'QLayout',
        'QHeader',
        'QFooter',
        'QPage',
        'QPageContainer',
        'QSelect',
        'QInput',
        'QBtn',
        'QFile',
        'QList',
        'QItem',
        'QItemSection',
        'QItemLabel',
        'QDialog',
        'QSpinner'
      ],
      directives: [
        'Ripple'
      ],
      plugins: [
        'Notify',
        'Dialog'
      ]
    },
    animations: 'all', // includes all animations
    mode: 'spa' // single page application mode
  }
}