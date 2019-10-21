import Router from 'vue-router'
import routes from './routes'

export default () => {
  return new Router({
    routes,
    mode: 'history', // url设置为html5 histroy模式
    // base: '/base/', // 自动添加一个url前缀，不常用
    linkActiveClass: 'a', // 当前激活的链接样式
    linkExactActiveClass: 'b', // 当前完全匹配路径激活的链接样式
    scrollBehavior (to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition // 记录页面之前的滚动行为
      } else {
        return { x: 0, y: 0 }
      }
    }
    // parseQuery (query) {

    // },
    // stringifyQuery (obj) {

    // }
  })
}
