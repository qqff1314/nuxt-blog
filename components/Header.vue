<template>
    <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
      <el-menu-item index="index">
        <nuxt-link :to="{path:'/'}">首页</nuxt-link>
      </el-menu-item>
      <el-menu-item index="message">
        <nuxt-link :to="{path:'/message'}">留言</nuxt-link>
      </el-menu-item>
      <el-menu-item index="about">
        <nuxt-link :to="{path:'/about'}">关于我们</nuxt-link>
       </el-menu-item>
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
