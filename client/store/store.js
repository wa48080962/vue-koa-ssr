import Vuex from 'vuex'
import defaultState from './state/state'
import mutations from './mutations/mutations'
import getters from './getters/getters'
import actions from './actions/actions'
const isDev = process.env.NODE_ENV === 'development'

export default () => {
  const store = new Vuex.Store({
    strict: isDev, // 在生产环境严格控制store对象只能通过commit方法修改
    state: defaultState,
    mutations, // 处理state的修改
    actions, // 处理异步的修改
    getters, // getters与vue中的computed属性类似
    modules: {
      a: { // 为不同的模块添加命名空间
        namespaced: true,
        state: {
          text: 'textA'
        },
        mutations: {
          updateText (state, text1) {
            // console.log('state.a: ', state)
            state.text = text1
          }
        },
        getters: {
        // 第二个参数是所有的getter方法，第三个参数是全局的getter
          textPlus (state, getter, rootState) {
            return `${state.text} ${rootState.b.text}`
          }
        },
        actions: {
          add ({ state, commit, rootState }) {
            commit('updateCount', {
              num: rootState.a.text,
              num2: 0
            }, { root: true })// root: true代表调用的是全局对象
          }
        }
      },
      b: {
        state: {
          text: 'textB'
        }
      }
    },
    plugins: [ // 插件数组按照数组顺序执行
      (store) => {
        //   该函数里面可以使用store对象的任何api去监听一个state或mutation,action
        store.subscribe((mutation, state) => {
          console.log(mutation.type)
          console.log(mutation.payload)
        })
      }
    ]
  })
  // 热更新配置
  if (module.hot) {
    module.hot.accept([
      './state/state',
      './mutations/mutations',
      './actions/actions',
      './getters/getters'
    ], () => { // 开启热更新
      const newState = require('./state/state').default
      const newMutations = require('./mutations/mutations').default
      const newActions = require('./actions/actions').default
      const newGetters = require('./getters/getters').default

      store.hotUpdate({
        state: newState,
        mutations: newMutations,
        getters: newGetters,
        actions: newActions
      })
    })
  }

  return store
}
