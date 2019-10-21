import Vue from 'vue'
import App from './app.vue'

import VueRouter from 'vue-router'
import Vuex from 'vuex'
import Meta from 'vue-meta' // 用于服务端渲染处理meta信息

import createStore from './store/store'
import createRouter from './config/router'
import { sync } from 'vuex-router-sync'

import './assets/styles/global.styl'

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(Meta)

export default () => {
  const router = createRouter()
  const store = createStore()
  // 同步路由状态到store
  sync(store, router)

  const app = new Vue({
    router,
    store,
    render: (h) => h(App)
  })

  return { app, router, store }
}
