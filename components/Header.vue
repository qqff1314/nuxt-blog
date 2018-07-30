<template>
  <div class="nav">
    <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
      <el-menu-item index="index">
        <nuxt-link :to="{path:'/'}">首页</nuxt-link>
      </el-menu-item>
      <el-menu-item index="message">
        <nuxt-link :to="{path:'/message'}">留言</nuxt-link>
      </el-menu-item>
    </el-menu>
    <img class="hidden-sm-and-up" src="~assets/img/logo-text.png"  alt="没下雨" title="没下雨">
  </div>

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
<style scoped>
  .nav{
    display: flex;
    justify-content: space-between;
  }
</style>
