<template>
  <div class="index">
    <div class="slider hidden-xs-only" v-if="list.length">
      <div class="slider-img">
        <img src="~assets/img/logo.png" width="150px" height="82px" alt="没下雨" title="没下雨">
        <img src="~assets/img/logo-text.png" width="80px"  height="60px" alt="没下雨" title="没下雨">
      </div>
      <div class="slider-class">
        <ul>
          <li :class="articleClassId===item.ClassId?'active':''" v-for="(item,index) in list" :key="index" @click="classSearch(item.ClassId)">{{item.ClassName}}{{item.ClassArticleNum&&'('+item.ClassArticleNum+')'}}</li>
        </ul>
      </div>
    </div>
    <el-row :gutter="40">
      <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" v-for="(i,index) in articleList" :key="index">
        <div class="item">
          <div class="img-box">
            <div class="img" :style="{backgroundImage:'url('+(i.Img||'/favicon.ico')+')'}"></div>
          </div>
          <h1><nuxt-link class="tit" :to="{name:'detail',query:{ id: i.Id }}">{{i.Title}}</nuxt-link></h1>
        </div>
      </el-col>
    </el-row>
    <el-pagination
      v-if="articleTotal>=articleLimit"
      @current-change="handleCurrentChange"
      :current-page="articlePage"
      class="pagination"
      :pager-count="5"
      :page-size="articleLimit"
      layout="prev, pager, next"
      :total="articleTotal">
    </el-pagination>
    <div class="slider-xs hidden-sm-and-up">
      <ul>
        <li :class="articleClassId===item.ClassId?'active':''" v-for="(item,index) in list" :key="index" @click="classSearch(item.ClassId)">{{item.ClassName}}{{item.ClassArticleNum&&'('+item.ClassArticleNum+')'}}</li>
      </ul>
    </div>
  </div>
</template>
<script>
import Axios from '~/plugins/axios'
import { mapState } from 'vuex'

export default {
  async asyncData ({ store }) {
    const article = store.state.article;
    if (article.articleList.length === 0) {
      const {data} = await Axios.axios.get('article/listSearch', {
        params: {
          Page:article.articlePage,
          Limit: article.articleLimit,
          KeyWord:'',
          ClassId:article.articleClassId
        },
      });
      store.commit('article/setArticleList', data.list);
      store.commit('article/setArticleTotal', data.Total);
    }
  },
  computed: mapState({
    articleList: state => state.article.articleList,
    articlePage: state => state.article.articlePage,
    articleTotal: state => state.article.articleTotal,
    articleLimit: state => state.article.articleLimit,
    articleClassId: state => state.article.articleClassId,
  }),
  data(){
    return{
      list:[]
    }
  },
  mounted(){
     this.init();
  },
  methods:{
    init(){
      Axios.axios.get('classify/pagelist').then((res)=>{
        res.data.list.unshift({ClassId:'',ClassName:'全部'});
        this.list=res.data.list
      });
    },
    classSearch(id){
      if(id===this.articleClassId) return false;
      this.$store.commit('article/setClassId',id);
      this.$store.commit('article/setArticlePage',1);
      this.getArticleList();
    },

    async getArticleList(){
      const article = this.$store.state.article;
      const {data} = await Axios.axios.get('article/listSearch', {
        params: {
          Page:article.articlePage,
          Limit: article.articleLimit,
          KeyWord:'',
          ClassId:article.articleClassId
        },
      });
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      this.$store.commit('article/setArticleList', data.list);
      this.$store.commit('article/setArticleTotal', data.Total);
    },
    handleCurrentChange(number){
      this.$store.commit('article/setArticlePage',number);
      this.getArticleList();
    }
  },
}
</script>
<style>
  .slider{
    position: fixed;
    width: 300px;
    top: 0;
    left: 0;
    bottom: 0;
    background: #fafafa;
    z-index: 10;
    transition: 1s all;
    box-shadow: 0 10px 20px 5px #dedede;
  }
  .slider .slider-img{
    width: 100%;
    margin: 30px 0;
  }
  .slider .slider-img img{
    display: block;
    margin: 0 auto;
  }
  .slider .slider-class{
    position: absolute;
    top: 220px;
    bottom: 50px;
    left: 0;
    width: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
  .slider:before{
    position: absolute;
    content: '';
    top: 220px;
    width: 200px;
    left: 50px;
    height: 1px;
    background: #eee;
  }
  .slider:after{
    position: absolute;
    content: '';
    bottom: 50px;
    width: 200px;
    left: 50px;
    height: 1px;
    background: #eee;
  }
  .slider li{
    text-align: center;
    padding: 20px;
    line-height: 20px;
    font-size: 14px;
    cursor: pointer;
    position: relative;
    color: #909399;
    transition: .3s all;
    word-break: break-all;
  }
  .slider li.active,.slider li:hover{
    color: #333;
  }
  .slider-xs ul{
     display: flex;
  }
  .slider-xs ul li{
    margin: 0 10px 10px 0;
    padding: 5px 10px;
    border-radius: 4px;
    border: 1px solid #dedede;
    cursor: pointer;
    background: #fff;
    z-index: 10;
  }
  .slider-xs ul li.active{
    border-color: rgb(59, 128, 112);
    color:  rgb(59, 128, 112);;
  }

  .index .pagination{
    text-align: center;
    padding: 40px 0;
  }

  .index .item{
    display: block;
    border-radius: 5px;
    background: #fff;
    box-shadow: 10px 0 40px 0 rgba(0,0,0,.1);
    margin-bottom: 20px;
    align-items: center;
    padding-bottom: 20px;
  }
  .index .item .img:hover{
    transform: scale(1.2)
  }
  .index .item .img-box{
    width: 100%;
    height: 200px;
    overflow: hidden;
  }
  .index .item .tit{
    height: 46px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    margin: 20px 20px 0;
    font-size: 16px;
    line-height: 23px;
    word-break: break-all;
    color: #333;
    cursor: pointer;
    font-weight: normal;
  }
  .index .item .img{
    transition: .3s all;
    width: 100%;
    height: 100%;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    display: block;
    margin: 0 auto;
  }
  .index .item .tit:hover{
    text-decoration:underline
  }
  @media  screen and (min-width: 1920px) {
    .index {
      padding: 40px 100px
    }
  }
  @media  screen and (min-width: 1200px) and (max-width: 1920px) {
    .index {
      padding: 40px 80px
    }
  }
  @media  screen and (min-width: 992px) and (max-width:  1200px) {
    .index {
      padding: 40px 70px
    }
  }
  @media  screen and (min-width: 768px) and (max-width: 1200px) {
    .index {
      padding: 40px 20px
    }
  }
</style>
