<template>
  <div id="detail">
    <Header></Header>
    <div class="page">
      <div class="page__head">
        <h1 class="page__title">{{data.Title}}</h1>
        <time class="page__time" datetime="2018-04-01T12:41:00+08:00" itemprop="datePublished">{{data.Time.split(' ')[0]}}</time>
         · 
        <a class="page__class">{{data.ClassName}}</a>
      </div>
      <div class="page__content markdown-body" v-html="data.Detail"></div>
      <addComment ref="addComment" @send="commentSend" :loading="loading"></addComment>
      <commentList v-if="commentList.length" :data="commentList"></commentList>
    </div>
  </div>
</template>
<script>
  import Axios from '~/plugins/axios'
  import Header from '~/components/Header.vue'
  import addComment from '~/components/addComment.vue'
  import commentList from '~/components/commentList.vue'
  export default {
    async asyncData({params,app }) {
      const {data} = await Axios.axios.get('article/detail', {
        params: {
          Id: params.id,
        },
      });
      app.head.title = data.Title+' - 云寒的个人博客'
      return {data}
    },
    components: {
      Header,
      addComment,
      commentList
    },
    head: {
      meta: [
        { hid: 'keywords', name: 'keywords', content: '' },
        { hid: 'description', name: 'description', content: '' }
      ]
    },
    data() {
      return {
        loading:false,
        commentList:[]
      }
    },
    mounted(){
      this.getCommentList()
    },
    methods:{
      getCommentList(){
        Axios.axios.get('commit/list', {
          params:{
            ArticleId:this.$route.params.id,
            Page:1,
            Limit: 20
          }
        }).then((res)=>{
          this.commentList=res.data.list;
        })
      },
      commentSend(config){
        if(this.loading) return
        this.loading=true
        let url={
          'add':'commit/addCommit',
          'replay':'commit/replayCommit',
        }
        Axios.axios.post(url[config.key], config.params).then((res)=>{
          this.$refs.addComment.clear()
          if(config.key=='add'){
            this.commentList.unshift(res.data)
            location.replace('#review')
          }else{
            for(let i=0;i< this.commentList.length;i++){
              if(this.commentList[i].Id===config.params.CommentId) {
                this.commentList[i].Replay.unshift(res.data)
                location.replace('#review'+(i+1))
              }
            }
          }
          this.loading=false
        }).catch(()=> {this.loading=false})
      }
    },
  }
</script>
<style scope lang="less">
@import url('https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/github.min.css');
@import url('https://cdn.bootcss.com/github-markdown-css/2.10.0/github-markdown.min.css');
.page{
  padding: 30px 30px 100px;
  margin: 0 auto;
  &__head{
    border-bottom: 1px solid #ecf0f1;
    padding-bottom: 15px;
    margin-bottom: 30px;
  }
  &__time{
    font-size: 14px;
    color: #ccc;
  }
  &__class{
    font-size: 14px;
    color: #2687fb;
  }
  &__title{
    line-height: initial;
    font-size: 36px;
    padding-bottom: 20px;
    
  }
  img{
    max-width: 100%;
    display: block;
  }
}
@media  screen and (min-width: 1200px){
  .page {
    width: 60%;
  }
}
@media  screen and (min-width: 768px) and (max-width: 1200px) {
  .page {
    width: 80%;
  }
}
@media  screen and (max-width: 768px){
  .page {
    padding: 30px 20px;
    width: 100%;
    &__title{
      font-size: 26px;
      padding-bottom: 10px;
    }
  }
}
</style>
