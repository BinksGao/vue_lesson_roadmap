<template>
  <div class="HomeWrapper" @click.stop="clickHome">
    <headers ref="headers"></headers>
    <div class="mainContent">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Headers from '@/components/component/common/header.vue'

  export default {
    components:{
      Headers
    },
    methods: {
      clickHome () {
        this.$refs.headers.$emit('tiggle')
      }
    },

  }
</script>

<style lang="scss" scoped>
.HomeWrapper{
  .mainContent{
    width: 1200px;
    margin: 0 auto;
    height: 100vh;
    // margin-top: 85px;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
  }
}
</style>