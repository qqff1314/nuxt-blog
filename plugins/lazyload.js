import Vue from 'vue'
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {
 preLoad: 1.3,
 error: require('@/assets/img/default.jpg'),   //请求失败后显示的图片
 loading: require('@/assets/img/loading.gif'),   //加载的loading过渡图片
 attempt: 1     // 加载图片数量
})