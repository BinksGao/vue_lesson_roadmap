<!--
 * @Author: your name
 * @Date: 2020-05-05 15:06:29
 * @LastEditTime: 2020-12-01 21:13:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /wrx/src/components/component/hooker/list.vue
-->
<template>
  <div class="page_list_wrapper">
    <div class="content_left">
      <el-input v-model="input" placeholder="请输入内容"></el-input>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: ''
    }
  },
  beforeRouteLeave(to, from, next) {
    // 这里需要elementui的支持，如果使用其他界面组件自行替换即可
    this.$confirm("正在离开本页面，本页面内所有未保存数据都会丢失", "警告", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    })
      .then(() => {
        // 正常跳转
        next();
      })
      .catch(() => {
        // 如果取消跳转地址栏会变化，这时保持地址栏不变
        window.history.go(1);
      });
  },
};
</script>

<style lang="scss" scoped>
.page_list_wrapper{
  padding: 10px;
}
</style>