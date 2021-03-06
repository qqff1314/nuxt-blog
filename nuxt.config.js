const webpack = require('webpack');
module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: '云寒的个人博客-前路漫漫',
    meta: [
      { charset: 'utf-8' },
      { name:'baidu-site-verification',content:'9FiF8Zag7I'},
      { name: 'viewport', content: 'width=device-width, initial-scale=1'},
      { hid: 'description', name: 'description', content: '这里是前端工程师云寒的个人博客-加紧学习,抓住中心,宁精勿杂,宁专勿多-云寒的个人博客记录了前端的成长之路,生活之路-欢迎来到云寒的个人博客' },
      { hid: 'keywords', name: 'keywords', content: '云寒的个人博客,前端博客,前端技术分享' },
      { hid: 'author', name: 'author', content: '云寒' },
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
    vendor: ['axios'],
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
    { src: '~plugins/axios'}
  ],
  css: [
    '~assets/css/main.css'
  ]
}
