<template>
  <el-container :style="{paddingLeft: paddingLeft+'px'}">
    <el-header><Header/></el-header>
    <main><nuxt/></main>
  </el-container>
</template>
<script>
import Header from '~/components/Header.vue'
export default {
  components: {
    Header,
  },
  data(){
    return {
      paddingLeft:0
    }
  },
  mounted(){
    this.init(this.$route)
  },
  watch:{
    '$route'(val){
      this.init(val)
    }
  },
  methods:{
    init(val){
      if(val.name!=='index'){
        this.paddingLeft=0
      }else{
        this.paddingLeft=300
      }
    }
  }
}
</script>
<style>
  main{
    padding: 20px;
    flex: 1;
    background: #F6FAFB;
  }
  @media  screen and (max-width: 768px){
    .el-container.is-vertical{
      padding-left: 0!important;
    }
  }
</style>