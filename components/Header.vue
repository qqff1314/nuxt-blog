<template>
    <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
      <el-menu-item index="index">首页</el-menu-item>
      <el-menu-item index="message">留言</el-menu-item>
      <el-menu-item index="about">关于我们</el-menu-item>
    </el-menu>
</template>
<script>
  export default {
    data() {
      return {
        activeIndex: this.$route.name
      };
    },
    watch:{
      '$route'(val){
        this.activeIndex=val.name
      }
    },
    methods: {
      handleSelect(key) {
          this.$router.push('/'+(key!=='index'?key:''));
      }
    }
  }
</script>
<style>
</style>
