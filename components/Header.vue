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
    <div class="pv" v-if="pv!==0">累计访问量「{{pv}}」</div>
  </div>

</template>
<script>
  import Axios from '~/plugins/axios'
  export default {
    data() {
      return {
        pv:0,
        activeIndex: this.$route.name
      };
    },
    watch:{
      '$route'(val){
        this.activeIndex=val.name
      }
    },
    mounted(){
      this.init()
    },
    methods: {
      init(){
        if(!sessionStorage['pv']){
          Axios.axios.get('com/pvAdd').then(()=>{
            sessionStorage['pv']=1;
          });
        }
        Axios.axios.get('com/pvTotal').then((res)=>{
          this.pv=res.data;
        });
      },
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
  .nav .pv{
    color: #909399;
    font-size: 12px;
    line-height: 60px;
  }
</style>
