<template>
  <div id="index">
    <div class="background" style="background-image: url(http://resource.mxxxy.cn/i-bg.jpg)"> 
      <div class="background__content"> 
        <div class="background__title"> CLOUD COLD </div> 
        <div class="background__description"> 云 寒 的 个 人 博 客 </div> 
      </div> 
    </div>
    <Header></Header>
    <div class="page">
      <article class="page__box" v-for="(item,index) in data.articleList" :key='index'> 
        <div class="page__card">
          <nuxt-link class="page__image" :to="{path:'page/'+item.Id}" :style="{backgroundImage:'url(' + item.Img + ')'}"></nuxt-link>
          <nuxt-link class="page__info" :to="{path:'page/'+item.Id}">
            <time class="page__time" :datetime="item.Time"> {{item.Time.split(' ')[0]}} 「{{item.ClassName}}」</time>
            <h2> {{item.Title}} </h2> 
          </nuxt-link>
        </div>
      </article>
    </div>
    <infinite-loading spinner="waveDots" @infinite="onInfinite" :distance="100">
      <div slot="no-more"></div>
      <div slot="no-results"></div>
    </infinite-loading>
  </div>
</template>
<script>
import InfiniteLoading from 'vue-infinite-loading';
import Axios from '~/plugins/axios'
import Header from '~/components/Header.vue'
import { mapState } from 'vuex'
export default {
  components: {
    Header,
    InfiniteLoading
  },
  head: {
    title: '云寒的个人博客-前路漫漫'
  },
  beforeRouteEnter(to,from,next){
    next(vm => {
      let top=vm.data.articleScroll
      document.documentElement.scrollTop=top
      window.pageYOffset=top
      document.body.scrollTop=top
    })
  },
  beforeRouteLeave(to, from, next) {
      let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
      this.$store.commit('article/setArticleScroll', scrollTop);
      next()
  },
  async asyncData ({ store }) {
    let article = store.state.article;
    if (article.articleList.length === 0) {
      const {data} = await Axios.axios.get('article/listSearch', {
        params: {
          Page:article.articlePage,
          Limit: article.articleLimit,
          KeyWord:'',
          ClassId:''
        },
      });
      store.commit('article/setArticleTotal', data.Total);
      store.commit('article/setArticleList', data.list);
    }
  },
  computed: mapState({
    data: state => state.article
  }),
  methods:{
    onInfinite($state){
      if(this.data.articleTotal/this.data.articleLimit>this.data.articlePage){
        setTimeout(() => {
          let page=this.data.articlePage+1
          Axios.axios.get('article/listSearch', {
            params: {
              Page:page,
              Limit: this.data.articleLimit,
              KeyWord:'',
              ClassId:''
            },
          }).then((res)=>{
            this.$store.commit('article/setArticlePage', page);
            let data=res.data.list
            let list=this.data.articleList.concat(data)
            this.$store.commit('article/setArticleList', list);
            $state.loaded();
          });
        },1000)
      }else{
        $state.complete();
      }
    }
  },
}
</script>
<style scoped lang="less">
  #index{
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }
  .page{
    padding: 30px 15px 0;
    display: flex;
    flex-wrap:wrap;
    width:100%;
    background-color: #fff;
    &__box{
      display: flex;
      position: relative;
      padding: 0 15px 25px 15px;
    }
    &__card{
      cursor: pointer;
      display: flex;
      flex-direction: column;
      background: #fff;
      position: relative; 
      width: 100%;
      transition: .3s box-shadow;
      box-shadow: 0 0.1rem 0.2rem rgba(0,0,0,.05);
      &:hover{
        box-shadow: 0 0.2rem 0.6rem rgba(0,0,0,.15);
      }
    }
    &__image{
      display: block;
      overflow: hidden;
      position: relative;
      background-color: #ecf0f1;
      background-position: 50%;
      background-repeat: no-repeat;
      background-size: cover;
      &:hover:after{
        opacity: .1;
      }
      &:after{
        transition: .4s;
        position: absolute;
        top: 0;
        height: 100%;
        width: 100%;
        content: '';
        background-color: #000;
        opacity: 0;
      }
      &:before {
        content: "";
        display: block;
        width: 100%;
        padding-bottom: 56.25%;
      }
    }
    &__time{
      text-transform: uppercase;
      font-size: 14px;
      line-height: 22px;
      color: #7e7e7e;
    }
    &__info{
      word-break: break-all;
      background-color: #fff;
      text-decoration: none;
      padding: 20px;
    }
  }
  .background{
    position: relative;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    z-index: -1;
    &::after{
      position: absolute;
      top: 0;
      height: 100%;
      width: 100%;
      content: '';
      background-color: #222228;
      opacity: .3;
    }
    &::before{
      content: '';
      display: block;
      padding-bottom: 56.25%;
    }
    &__content{
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      z-index: 1;
      -webkit-transform: translateY(-50%);
      transform: translateY(-50%);
      padding: 0 16px;
      color: #fff;
      text-align: center;
      letter-spacing: 1px;
    }
    &__description{
      font-style: italic;
      letter-spacing: 1px;
    }
    &__title{
      position: relative;
      display: inline-block;
      text-transform: uppercase;
      margin-bottom: 10px;
      padding: 2px 0;
      font-size: 24px;
      line-height: 40px;
      &::after,{
        content: '';
        position: absolute;
        bottom:0;
        left: 30px;
        width: 100%;
        height: 1px;
        background: #fff;
        position: absolute;
        opacity: 0.6;
        animation: line-after 0.6s infinite alternate;
      }
      &::before {
        content: '';
        position: absolute;
        top:0;
        width: 100%;
        right:30px;
        height: 1px;
        background: #fff;
        position: absolute;
        opacity: 0.6;
        animation: line-before 0.6s infinite alternate;
      }
    }
  }
  @keyframes line-after {
    to {
      opacity: 1;
      transform: translateX(20px);
    }
  }
  @keyframes line-before {
    to {
      opacity: 1;
      transform: translateX(-20px);
    }
  }
  @media  screen and (min-width: 1200px){
    .page__box {
      width: 25%;
    }
  }
  @media  screen and (min-width: 768px) and (max-width: 1200px) {
    .page__box {
      width: 50%;
    }
  }
  @media  screen and (max-width: 768px){
    .page__box {
      width: 100%;
    }
  }
  @media  screen and (min-width: 768px){
    .background{
      position: fixed;
      height: calc(100vh - 80px);
      top: 0;
      left: 0;
      right: 0;
    }
    .header{
      margin-top: calc(100vh - 80px);
    }
  }
</style>
