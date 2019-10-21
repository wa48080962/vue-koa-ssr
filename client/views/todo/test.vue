<template>
    <input type="text" v-model="fatherword.word">
</template>
<script>
export default {
  props: {
    fatherword: {
      type: Object,
      required: true
    }
  }
}
</script>
<style>

</style>
