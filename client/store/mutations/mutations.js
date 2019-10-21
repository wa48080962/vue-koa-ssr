export default {
  updateCount (state, { num, num2 }) { // commit方法只能定义一个自定义参数，如果有多个参数要传，则将第二个参数包装成一个对象
    state.count = num
    // console.log(num2)
    // console.log('123')
  }
}
