<!--
 * @Author: your name
 * @Date: 2020-12-02 22:23:28
 * @LastEditTime: 2020-12-02 22:34:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /wrx/src/components/component/hooker/list-item.vue
-->
<template>
  <div>
    <li v-for="(item) of items" :key="item.id" @click="sendVal(item)">{{item.name}}</li>
  </div>
</template>

<script>
  export default {
    props: {
        items: {
            type: Array
        }
    },
    methods: {
        sendVal(val) {
            this.$emit('fromChild', val)
        },
        fnFromChild () {
            this.$message.success('父组件调用了子组件的方法')
        }
    }
  }
</script>

<style lang="scss" scoped>

</style>