import Vue from 'vue'
import app from './app.vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import createRouter from './config/router'
import createStore from './store/store'
import './assets/styles/global.styl'
Vue.use(VueRouter)
Vue.use(Vuex)
const router = createRouter()
const store = createStore()
// 注册一个新的模块c
store.registerModule('c', {
  state: {
    text: 3
  }
})
// 注销一个模块c
store.unregisterModule('c')

/* store.watch: */
// 第一个方法是返回一个新的值，相当于一个getter方法,当count的值发生变化时，第一个方法会被调用，
// 第二个方法是当第一个方法内的state发生变化后的回调函数
// store.watch((state) => state.count + 1, (newCount) => { console.log('new count watched:', newCount) })

/* store中任意一个mutation被调用都会执行下面的方法，可以作为mutation的回调，简单的用法可以用于打log */
// store.subscribe((mutation, state) => {
//   console.log('name:' + mutation.type) // mutation方法的名称
//   console.log(mutation.payload) // 更改以后的state对象
// })

/* store中任意一个action被调用都会执行下面的方法，可以作为action的回调 */
// store.subscribeAction((action, state) => {
//   console.log(action.type)
//   console.log(action.payload)
// })

// 验证需要登录的一批页面，组件加载前
router.beforeEach((to, from, next) => {
  console.log('全局导航：beforeEach')
  next()
})
// 进入导航前，组件加载后被调用
router.beforeResolve((to, from, next) => {
  console.log('全局导航：beforeResolve')
  next()
})
// 成功跳转之后
router.afterEach((to, from) => {
  console.log('全局导航：afterEach')
})

// const root = document.createElement('div')
// document.body.appendChild(root)

new Vue({
  render: (h) => h(app),
  router: router, // 必须和导航守卫是同一个对象
  store
}).$mount('#root')
