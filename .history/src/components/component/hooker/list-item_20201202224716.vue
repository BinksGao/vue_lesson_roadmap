<!--
 * @Author: your name
 * @Date: 2020-12-02 22:23:28
 * @LastEditTime: 2020-12-02 22:47:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /wrx/src/components/component/hooker/list-item.vue
-->
<template>
  <div>
    <li v-for="(item) of items" :key="item.id" @click="sendVal(item)">{{item.name}}</li>
    <button @click="clickParent">调用父组件</button>
    <button @click="changeParent">改变父组件</button>
  </div>
</template>

<script>
  export default {
    props: {
        // items: {
        //     type: Array
        // }
    },
    data() {
        return {
            items: [{
                id: 1,
                name: 1
            }]
        }
    },
    methods: {
        sendVal(val) {
            this.$emit('fromChild', val)
        },
        fnFromChild () {
            this.$message.success('父组件调用了子组件的方法 fnFromChild')
        },
        clickParent () {
            this.$parent.fromParent()
        },
        changeParent () {
            this.$emit('update:updateParent', items)
        }
    }
  }
</script>

<style lang="scss" scoped>

</style>