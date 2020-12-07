<!--
 * @Author: your name
 * @Date: 2020-05-05 15:06:29
 * @LastEditTime: 2020-12-02 22:48:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /wrx/src/components/component/hooker/list.vue
-->
<template>
  <div class="page_list_wrapper">
    <div class="content_left">
      <el-input v-model="input" placeholder="请输入内容"></el-input>
      <button @click="clickChild">调用子组件</button>
    </div>
    <list-item :items='items' @fromChild='fromChild' ref="child" :updateParent.sync='items' v-if="show"></list-item>
  </div>
</template>

<script>
import listItem from './list-item'
export default {
  data() {
    return {
      input: '',
      show: false,
      items: [
        {
          id: 1,
          name: '嘻嘻'
        },
        {
          id: 2,
          name: '哈哈'
        },
        {
          id: 3,
          name: '嘿嘿'
        }
      ]
    }
  },
  components: {
    listItem
  },
  methods: {
    fromChild (val) {
      this.$message.success(`something from ${val.name}`)
    },
    clickChild () {
      this.$refs.child.fnFromChild()
    },
    fromParent () {
      this.$message.success(`something from fromParent`)
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
  .content_left{
    width: 50%;
  }
}
</style>