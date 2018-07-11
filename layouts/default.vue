<template>
  <el-container>
    <el-header><Header/></el-header>
    <main class="layout"><nuxt/></main>
    <el-footer></el-footer>
  </el-container>
</template>
<script>
import Header from '~/components/Header.vue'
export default {
  components: {
    Header
  }
}
</script>
<style>
  .layout{
    padding: 20px;
  }
</style>
