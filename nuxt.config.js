const webpack = require('webpack');
module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: '没下雨',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1'},
      { hid: 'description', name: 'description', content: '并不是一个前端博客站点，希望能用来更好的发掘生活，发现乐趣' },
      { hid: 'keywords', name: 'keywords', content: '没下雨,生活,乐趣,前端,web前端,前端开发,web前端开发,前端博客,前端开发网,前端资源,CSS,CSS3,html,html5,jQuery,jQuery案例' },
      { hid: 'author', name: 'author', content: '云寒 - www.wxxxy.cn' },
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
    { src: '~plugins/axios', ssr: true },
    { src: '~plugins/element-ui',  ssr: true}
  ],
  css: [
    '~assets/css/main.css',
    '~assets/css/quill.snow.css',
  ]
}
