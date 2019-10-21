export default {
  updateCountAsync (store, data) { // 异步请求或操作必须用actions触发mutations方法才能修改数据
    // console.log('123')
    setTimeout(() => {
      store.commit('updateCount', {
        num: data.num
      })
    }, data.time)
  }
}
