<template>
  <div class="index">
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
      @current-change="handleCurrentChange"
      :current-page="articlePage"
      class="pagination"
      :page-size="articleLimit"
      layout="prev, pager, next"
      :total="articleTotal">
    </el-pagination>
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
      })
      store.commit('article/setArticleList', data.list);
      store.commit('article/setArticleTotal', data.Total);
    }
  },
  computed: mapState({
    articleList: state => state.article.articleList,
    articlePage: state => state.article.articlePage,
    articleTotal: state => state.article.articleTotal,
    articleLimit: state => state.article.articleLimit,
  }),
  mounted(){

  },
  methods:{
    async getArticleList(){
      const article = this.$store.state.article
      const {data} = await Axios.axios.get('article/list', {
        params: {
          Page:article.articlePage,
          Limit: article.articleLimit,
        },
      })
      this.$store.commit('article/setArticleList', data.list);
      this.$store.commit('article/setArticleTotal', data.Total);
    },
    handleCurrentChange(number){
      this.$store.commit('article/setArticlePage',number);
      this.getArticleList();
    }
  }
}
</script>

<style>
  .index .pagination{
    text-align: center;
    padding: 40px;
  }
  .index .item{
    display: block;
    border-radius: 5px;
    cursor: pointer;
    box-shadow: 0 20px 40px -10px rgba(0,0,0,.1);
    padding: 20px;
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
      padding: 0 200px
    }
  }
  @media  screen and (min-width: 1200px) and (max-width: 1920px) {
    .index {
      padding: 0 150px
    }
  }
  @media  screen and (min-width: 992px) and (max-width:  1200px) {
    .index {
      padding: 0 100px
    }
  }
  @media  screen and (min-width: 768px) and (max-width: 1200px) {
    .index {
      padding: 0 50px
    }
  }
</style>
