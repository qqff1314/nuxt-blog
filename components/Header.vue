<template>
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1"><nuxt-link tag="div" to="/">归档</nuxt-link></el-menu-item>
      <el-menu-item index="2">关于我们</el-menu-item>
      <el-menu-item index="3">联系我们</el-menu-item>
  </el-menu>
</template>
<script>
  export default {
    data() {
      return {
        activeIndex: '1'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>
<style>
</style>
