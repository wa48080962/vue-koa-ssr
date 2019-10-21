<template>
    <section class="real-app">
        <input
            type="text"
            class="add-input"
            autofocus="autofocus"
            placeholder="接下去要做什么"
            @keyup.enter="addTodo"
        >
        <item
            :todo="todo"
            v-for="todo in filteredTodos"
            :key="todo.id"
            @del="deleteTodo"
        >
        </item>
        <tabs
            :filter = "filter"
            :todos="todos"
            @toggle="toggleFilter"
            @clearAllCompleted="clearAllCompleted"
        ></tabs>
        <!--<test :fatherword="faterword"></test>-->
        <!-- 显示该链接下的子路由 -->
        <router-view></router-view>
    </section>
</template>
<script>
import item from './item.vue'
import Tabs from './tabs.vue'
import Test from './test.vue'
let id = 0
// 引用类型赋值的是一个堆的地址（指针），所以每个等于该地址的变量操作这个堆以后，所有等于这个堆的值都将改变
const obj1 = {
  id: 0,
  value: '123'
}
var obj2 = obj1
obj2.value = '345'
// console.log(obj1);

export default {
  metaInfo: {
    title: 'The Todo App'
  },
  data () {
    return {
      todos: [],
      faterword: {
        word: '123'
      },
      filter: 'all'
    }
  },
  mounted () {
    // console.log(this.$route)
  },
  computed: {
    filteredTodos () {
      if (this.filter === 'all') { return this.todos }
      const completed = this.filter === 'completed'
      return this.todos.filter(todo => todo.completed === completed)
    }
  },
  methods: {
    addTodo (e) {
      this.todos.unshift({
        id: id++,
        content: e.target.value, // e.target=input
        completed: false
      })
      e.target.value = ''
    },
    deleteTodo (id) {
      // this.todos =  this.todos.filter((item,index)=>{
      //      return item.id!=id;
      //  });
      this.todos.splice(this.todos.findIndex(item => item.id === id), 1)
    },
    toggleFilter (state) {
      this.filter = state
    },
    clearAllCompleted () {
      this.todos = this.todos.filter(todo => !todo.completed)
    }
  },
  components: {
    item,
    Tabs,
    Test
  },
  beforeRouteEnter (to, from, next) { // 这里组件还未加载，this拿不到
    console.log('组件内：beforeRouteEnter')
    next(vm => {
      console.log(vm.filter)
    })
  },
  beforeRouteUpdate (to, from, next) { // 子路径或带参数的同路径
    console.log('组件内：beforeRouteUpdate')
    next()
  },
  beforeRouteLeave (to, from, next) {
    console.log('组件内：beforeRouteLeave')
    const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
    if (answer) {
      next()
    } else {
      next(false)
    }
  }
}
</script>
<style lang="stylus" scoped>
    .real-app{
        width 600px
        margin 0 auto
        box-shadow 0 0 5px #666
    }
    .add-input{
        position: relative;
        margin: 0;
        width: 100%;
        font-size: 24px;
        font-family: inherit;
        font-weight: inherit;
        line-height: 1.4em;
        border: 0;
        outline: none;
        color: inherit;
        padding: 6px;
        border: 1px solid #999;
        box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
        box-sizing: border-box;
        font-smoothing: antialiased;
        padding: 16px 16px 16px 60px;
        border: none;
        box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
    }
</style>
