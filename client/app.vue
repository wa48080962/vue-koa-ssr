<template>
    <div id="app">
        <div id="cover">
        </div>
        <Header></Header>
        <div>computed: {{ counter }}</div>
        <div>getters: {{ fullName }}</div>
        <div>data: {{ num }}</div>
        <div>{{ textA }}</div>
        <div>{{ textAPlus }}</div>
        <!-- <todo></todo> -->
        <router-link to="/app">Todo</router-link>
        <router-link to="/login">Login</router-link>
        <router-link to="/app/child">Todo child</router-link>
        <router-view></router-view>
        <!-- <router-view name="a"></router-view> -->
        <Footer></Footer>
    </div>
</template>
<script>
import {
  mapState,
  mapGetters,
  mapActions,
  mapMutations
} from 'vuex'
import Header from './layout/header.vue'
import Footer from './layout/foot.jsx'
// import todo from './views/todo/todo.vue'
export default {
  metaInfo: {
    title: 'Wq\'s todo page' // 需要配合vue-meta插件来使用
  },
  components: {
    Header,
    Footer
    // todo
  },
  data () {
    return {
      num: this.$store.state.count // 用data获取的state不是响应式的，必须用computed获取的数据才是响应式
    }
  },
  mounted () {
    console.log(this.$store.state.a.text)
    console.log(this.$store.state.b.text)
    console.log(this.$store.getters['a/textPlus'])
    let i = 0

    /* 用commit修改一个state */
    // setInterval(() => {
    //   this.$store.commit('updateCount', {
    //     num: i++,
    //     num2: 2
    //   })
    // }, 1000)

    /* 通过dispatch方法来调用一个commit异步改动一个state */
    // this.$store.dispatch('updateCountAsync', {
    //   num: 5,
    //   time: 1000
    // })

    /* 用mapMutations返回的方法简化commit */
    setInterval(() => {
      this.updateCount({
        num: i++,
        num2: 2
      })
    }, 1000)

    /* 用mapActions返回的方法简化dispatch */
    // this.updateCountAsync({
    //   num: 5,
    //   time: 1000
    // })

    this['a/updateText']('123') // 模块a的mutation
    this['a/add']() // a的action调用主作用域的mutation
  },
  methods: {
    ...mapActions(['updateCountAsync', 'a/add']),
    ...mapMutations(['updateCount', 'a/updateText'])
  },
  computed: {
    ...mapState({
    //   counter: 'count',
      counter: (state) => state.count, // 返一个函数也可用
      textA: (state) => state.a.text
    }),
    ...mapGetters({ // 语法与mapState同
      fullName: 'fullName',
      textAPlus: 'a/textPlus'
    })
  }
}
</script>
<style lang="stylus" scoped>
    #app{
        position absolute
        left 0
        right 0
        top 0
        bottom 0
    }
    #cover{
        position absolute
        left 0
        top 0
        right 0
        bottom 0
        background-color #999
        opacity .9
        z-index -1
    }
</style>
