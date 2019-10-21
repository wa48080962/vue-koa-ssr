import Todo from '../views/todo/todo.vue'
import Login from '../views/login/login.vue'
import Child from '../views/todo/child/child.vue'
import Error from '../views/error/error.vue'

export default [
  {
    path: '/',
    redirect: '/app'
  },
  {
    path: '/app',
    name: 'app',
    // 路由懒加载,会使得服务端渲染出错
    // component: () => import('../views/todo/todo.vue'), // children 显示在Todo的router-view里
    components: { // 命名路由，场景：随着导航改变侧栏导航时
      default: Todo,
      a: Login
    },
    children: [
      {
        path: 'child',
        component: Child
        // component: () => import('../views/todo/child/child.vue')
      }
    ],
    beforeEnter (to, from, next) {
      console.log(' before enter app ')
      next()
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login
    // component: () => import('../views/login/login.vue')

  },
  {
    path: '*',
    component: Error
    // component: () => import('../views/error/error.vue')
  }
]

/* 完整的导航解析流程 */
// 1.导航被触发。
// 2.组件内守卫：在失活的组件里调用离开守卫(beforeRouteLeave).离开守卫通常用来禁止用户在还未保存修改前突然离开。该导航可以通过 next(false) 来取消。
// 3.全局守卫：调用全局的 beforeEach 守卫(router.beforeEach)。
// 4.组件内守卫：在重用的组件里调用 beforeRouteUpdate 守卫 (2.2+),从app/123到app/456。
// 5.路由配置内守卫：在路由配置里调用 beforeEnter。
// 6.解析异步路由组件。
// 7.组件内守卫：在被激活的组件里调用 beforeRouteEnter。
// 8.全局守卫：调用全局的 beforeResolve 守卫 (2.5+)，router.beforeResolve。
// 9.导航被确认。
// 10.全局守卫：调用全局的 afterEach 钩子,router.afterEach。
// 11.触发 DOM 更新。
// 12.用创建好的实例调用 beforeRouteEnter 守卫中传给 next 的回调函数。
