<!--
 * @Author: your name
 * @Date: 2020-05-05 13:32:53
 * @LastEditTime: 2020-12-01 21:14:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /wrx/src/components/home.vue
-->
<template>
  <div class="HomeWrapper">
    <div class="mainContent">
      <div class="nav">
        <keep-alive>
          <router-link to="/list">List</router-link>
          <router-link to="/item">Item</router-link>
        </keep-alive>
      </div>
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
    margin: 0 auto;
    padding: 10px;
    min-height: 100vh;
    margin-top: 15px;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    .nav{
      a{
        margin-right: 10px;
      }
    }
  }
}
</style>