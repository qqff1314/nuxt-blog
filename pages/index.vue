<template>
  <div class="index">
    <div class="slider hidden-xs-only" v-if="list.length">
      <ul>
        <li :class="articleClassId===item.ClassId?'active':''" v-for="(item,index) in list" :key="index" @click="classSearch(item.ClassId)">{{item.ClassName}}{{item.ClassArticleNum&&'('+item.ClassArticleNum+')'}}</li>
      </ul>
    </div>
    <el-row :gutter="40">
      <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6" v-for="(i,index) in articleList" :key="index">
        <nuxt-link :to="{name:'detail',query:{ id: i.Id }}" class="item">
          <div class="img-box">
            <div class="img" :style="{backgroundImage:'url('+(i.Img||'/favicon.ico')+')'}"></div>
          </div>
          <p class="tit">{{i.Title}}</p>
        </nuxt-link>
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
      const {data} = await Axios.axios.get('article/list', {
        params: {
          Page:article.articlePage,
          Limit: article.articleLimit,
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
<style >

  .slider{
    position: fixed;
    width: 150px;
    top: 0;
    left: 0;
    bottom: 0;
    background: #fafafa;
    z-index: 10;
    transition: 1s all;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    box-shadow: 0 10px 20px 5px #dedede;
  }
  .slider li{
    margin-bottom: 10px;
    padding: 20px 20px;
    line-height: 20px;
    font-size: 14px;
    cursor: pointer;
    position: relative;
    color: #999;
    transition: .3s all;
    word-break: break-all;
  }
  .slider li:before{
    transition: .3s all;
    content: '';
    width: 0;
    height: 2px;
    border-radius: 2px;
    position: absolute;
    bottom: 0;
    left: 0;
    background: rgb(59, 128, 112);
  }
  .slider li.active{
    color: rgb(59, 128, 112);
    font-weight: bold;
  }
  .slider li:hover{
    color: rgb(59, 128, 112);
  }
  .slider li.active:before{
    content: '';
    width: 80px;
    height: 2px;
    border-radius: 2px;
    position: absolute;
    bottom: 0;
    left: 0;
    background: rgb(59, 128, 112);
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
    cursor: pointer;
    background: #fff;
    box-shadow: 10px 0 40px 0 rgba(0,0,0,.1);
    padding: 20px;
    margin-bottom: 20px;
    align-items: center;
  }
  .index .item:hover .img{
    transform: scale(1.2)
  }
  .index .item .img-box{
    width: 100%;
    height: 150px;
    overflow: hidden;
  }
  .index .item .tit{
    height: 66px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    padding-top: 20px;
    font-size: 17px;
    line-height: 23px;
    word-break: break-all;
    color: #313131;
  }
  .index .item .img{
    transition: .3s all;
    width: 100%;
    height: 100%;
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    display: block;
    margin: 0 auto;
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
      padding: 40px 50px
    }
  }
</style>
