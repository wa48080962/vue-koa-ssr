// 服务端渲染入口文件
// import createApp from './create-app'

// 这里的 context 等于 server-render 里的 context
// export default context => {
//   return new Promise((resolve, reject) => {
//     const { app, router } = createApp()
//     router.push(context.url) // 给路由推一条记录，才能进入路由调用组件
//     router.onReady(() => {
//       const matchedComponents = router.getMatchedComponents()
//       if (!matchedComponents.length) {
//         reject(new Error('no component matched'))
//       }
//       context.meta = app.$meta()
//       resolve(app)
//     })
//   })
// }

import createApp from './create-app'

export default context => {
  return new Promise((resolve, reject) => {
    const { app, router } = createApp()

    // 给路由push一条记录
    router.push(context.url)

    // 等到 router 将可能的异步组件和钩子函数解析完
    router.onReady(() => {
      // 根据url匹配组件
      const matchedComponents = router.getMatchedComponents()

      if (!matchedComponents.length) {
        return reject(new Error('404 not fount'))
      }
      context.meta = app.$meta() // 拿到客户端的meta对象
      resolve(app)
    //   Promise.all(matchedComponents.map(Component => {
    //     if (Component.asyncData) {
    //       return Component.asyncData({
    //         store,
    //         route: router.currentRoute
    //       })
    //     }
    //   })).then(() => {
    //     context.state = store.state
    //     console.log(store.state)
    //     resolve(app)
    //   }).catch(reject)
    })
  })
}
