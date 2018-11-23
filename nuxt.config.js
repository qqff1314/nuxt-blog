const webpack = require('webpack');
module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: '云寒的个人空间-爱生活,爱学习',
    meta: [
      { charset: 'utf-8' },
      { name:'baidu-site-verification',content:'9FiF8Zag7I'},
      { name: 'viewport', content: 'width=device-width, initial-scale=1'},
      { hid: 'description', name: 'description', content: '前端工程师云寒的个人网站,欢迎大家关注云寒的个人空间,一起爱生活,爱学习' },
      { hid: 'keywords', name: 'keywords', content: '云寒的个人空间,e签宝云寒,前端的个人博客' },
      { hid: 'author', name: 'author', content: 'e签宝-云寒' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'renderer', content: 'webkit|ie-comp|ie-stand' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    vendor: ['axios','element-ui'],
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  plugins: [
    { src: '~plugins/axios'},
    { src: '~plugins/element-ui'}
  ],
  css: [
    '~assets/css/main.css',
    '~assets/css/quill.snow.css',
    '~assets/css/quill.bubble.css',
  ]
}
