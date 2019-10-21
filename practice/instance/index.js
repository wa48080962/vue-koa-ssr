import Vue from 'vue'

const app = new Vue({
  el: '#root',
  data: {
    text: 'bye'
  },
  mounted () {
    console.log('hello')
  }
})

app.text = '123'
console.log(app.text)

export default app
