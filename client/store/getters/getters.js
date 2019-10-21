export default {
  fullName (state) { // getters与vue中的computed属性类似
    return `${state.firstName} ${state.lastName}`
  }
}
