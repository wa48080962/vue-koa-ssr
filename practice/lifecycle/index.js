import Vue from 'vue'
new Vue({
  el: '#root',
  template: '<div>{{text}}</div>',
  data: {
    text: 'aaa'
  },
  beforeCreate () {
    console.log(this, 'beforeCreate')
  }
})
