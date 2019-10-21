/* eslint-disable no-unused-vars */
/* component 高级属性 */
import Vue from 'vue'

/* 继承与父子组件 */
const component = {
  name: 'root',
  data () {
    return {
      text: 'root is your parent'
    }
  },
  template: '<div>{{text}}</div>'
}
// 方法一：直接声明一个Vue的子类，然后进行实例化操作
// const CompVue = Vue.extend(component)
// new CompVue({

const Component2 = {
  // 方法二：在选项中配置继承属性
  extends: component,
  data () {
    return {
      text: '123'
    }
  },
  mounted () {
    // 父组件是该组件挂载上的组件
    console.log(this.$parent.$options.name)
  }
}

const RootComponent = new Vue({
//   el: '#root',
  name: 'root',
  data: {
    abc: '123'
  },
  components: {
    comp1: Component2
  },
  mounted () {
  },
  template: '<div><comp1></comp1></div>'
})

/* 组件内部的双向绑定 */

const CompA = {
  model: {
    prop: 'value1',
    event: 'changeInput'
  },
  props: ['value1'],
  template: '<div><div><input type="text" :value = "value1" @input="handleInput"/></div><input type="text" /></div>',
  methods: {
    handleInput (e) {
      this.$emit('changeInput', e.target.value)
    }
  }
}

const TwiBindComp = new Vue({
//   el: '#root',
  data: {
    value: '123'
  },
  components: {
    CompA
  },
  template: '<div><CompA v-model="value"></CompA></div>'
})

/* 插槽 */
const CompB = {
  template: `<div :style = "style">
                <!--<slot></slot>-->
                <slot name="header"></slot>
                <slot name="body" :value="value"></slot>

            </div>`,
  data () {
    return {
      style: {
        width: '100px',
        height: '100px',
        border: '1px solid #000'
      },
      value: 'scopeValue'
    }
  }
}

new Vue({
  el: '#root',
  components: {
    CompB
  },
  data: {
    value: 'value'
  },
  template: `<div>
                <CompB>
                  <!--具名插槽-->
                  <span slot="header">header</span>
                  <!--作用域插槽-->
                  <span slot="body" slot-scope="props">{{props.value}}</span>
                </CompB>
             </div>`
})

/* provider inject 选看 */
