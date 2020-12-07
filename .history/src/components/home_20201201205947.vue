<!--
 * @Author: your name
 * @Date: 2020-05-05 13:32:53
 * @LastEditTime: 2020-12-01 20:59:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /wrx/src/components/home.vue
-->
<template>
  <div class="HomeWrapper">
    <div class="mainContent">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

  export default {
    components:{
      Headers
    },
    methods: {
    },

  }
</script>

<style lang="scss" scoped>
.HomeWrapper{
  .mainContent{
    width: 1200px;
    margin: 0 auto;
    height: 100vh;
    margin-top: 85px;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
  }
}
</style>