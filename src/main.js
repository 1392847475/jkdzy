// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

    import Vue from "vue"
    import router from './router'
    import Vuex from 'vuex'
    import Mint from 'mint-ui'
    import  'mint-ui/lib/style.css'
import App from './App'
import store from './store/store'
import './assets/iconfont/iconfont.css'
import Swiper from "swiper"
import wx from "weixin-js-sdk"
import fastClick from 'fastclick'

Vue.config.productionTip = false
fastClick.attach(document.body)
Vue.use(Mint,wx)
Vue.use(Vuex)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  wx,
  store,
  router,
  Mint,
  Swiper,
  components: { App },
  template: '<App/>'
})
