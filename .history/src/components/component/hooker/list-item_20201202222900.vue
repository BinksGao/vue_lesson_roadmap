<!--
 * @Author: your name
 * @Date: 2020-12-02 22:23:28
 * @LastEditTime: 2020-12-02 22:28:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /wrx/src/components/component/hooker/list-item.vue
-->
<template>
  <div>
    <li v-for="(item, i) of items" :key="item.id">{{item.name}}</li>
  </div>
</template>

<script>
  export default {
    props: {
        items: {
            type: Array
        }
    }
  }
</script>

<style lang="scss" scoped>

</style>