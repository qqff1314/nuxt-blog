<template>
  <div class="detail">
    <el-row type="flex" justify="center">
      <el-col :xs="24" :sm="22" :md="18" :lg="15" :xl="15">
        <p class="detail-tit">{{detail.Title}}</p>
        <div class="detail-head">
          <time :datetime="detail.Time" itemprop="datePublished">发布于 {{detail.Time}}</time>
          / <a href="/category/SOFA">{{detail.ClassName}}</a> / {{detail.ReadNum}}浏览
          {{detail.Link?'/原文地址：'+detail.Link:''}}
        </div>
        <article v-html="detail.Detail" class="ql-editor" v-highlight></article>
        <div class="comment">
          想对作者说点什么？
          <el-button type="success" @click="dialogVisible = true">我来说一句</el-button>
        </div>
        <div class="review">
          <ul>
            <li v-for="(item,index) in list" :key="index">
              <div class="review-info">
                <span class="review-name">{{item.CommentUserName}}</span>
                <span class="review-time">{{item.CommentTime}}</span>
              </div>
              <div class="review-content">{{item.Comment}}</div>
              <div class="review-replay" v-for="(i,index) in item.Replay" :key="index">
                <div class="review-info">
                  <span class="review-author" v-if="i.IsAdmin===1">作者</span>
                  <span class="review-name" v-else>{{i.ReplayUserName}}</span>
                  <span class="review-time">{{i.ReplayTime}}</span>
                </div>
                <div class="review-content">{{i.ReplayContent}}</div>
              </div>
              <el-button @click="commentId=item.Id;dialogVisible=true" class="review-btn" type="primary" icon="el-icon-edit" circle></el-button>
            </li>
          </ul>
        </div>
        <el-pagination
          v-if="total>=limit"
          style="text-align: center"
          @current-change="handleCurrentChange"
          :current-page="page"
          class="pagination"
          :pager-count="5"
          :page-size="limit"
          layout="prev, pager, next"
          :total="total">
        </el-pagination>
      </el-col>
    </el-row>
    <el-dialog
      title="评论"
      :close-on-click-modal="false"
      :before-close="clear"
      :lock-scroll="false"
      :visible.sync="dialogVisible">
      <el-input v-model.trim="name" placeholder="请输入昵称" maxlength="6"></el-input>
      <el-input
        type="textarea"
        :rows="5"
        class="comment-text"
        resize="none"
        maxlength="200"
        placeholder="提问和评论都可以，用心的回复会被更多人看到和认可"
        v-model.trim="comment">
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="clear">取 消</el-button>
        <el-button type="primary" @click="addComment" :loading="loading">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import Axios from '~/plugins/axios'
  import hljs from 'highlight.js'
  import 'highlight.js/styles/github.css' //样式文件
  export default {
    async asyncData({query}) {
      const {data} = await Axios.axios.get('article/detail', {
        params: {
          Id: query.id,
        },
      });
      return {detail: data}
    },
    directives: {
      highlight: {
        // 指令的定义
        bind: function (el) {
          let blocks = el.querySelectorAll('pre');
          blocks.forEach((block)=>{
            hljs.highlightBlock(block)
          });
        }
      }
    },
    data() {
      return {
        name:'',
        comment:'',
        dialogVisible:false,
        loading:false,
        commentId:'',
        page:1,
        limit:10,
        total:0,
        list:[]
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      init(){
        let t=this;
        Axios.axios.get('commit/list', {
          params:{
            ArticleId:t.$route.query.id,
            Page:t.page,
            Limit: t.limit
          }
        }).then((res)=>{
          t.total=res.data.Total;
          t.list=res.data.list;
        })
      },
      handleCurrentChange(number){
        this.page=number;
        this.init();
      },
      clear(){
        [this.dialogVisible,this.dialogVisible,this.name,this.comment,this.commentId] = [false,false];
      },
      addComment(){
        if(!this.name){
          this.$message.error('没有哦，请输入昵称');
          return false;
        }
        if(!this.comment){
          this.$message.error('没有哦，请输入评论');
          return false;
        }
        let [t,post,url,id,name,comment]=[this,{},'',this.$route.query.id,this.name.toString().replace(/</g,'〈').replace(/>/g,'〉'),this.comment.toString().replace(/</g,'〈').replace(/>/g,'〉')];
        t.loading=true;
        if(t.commentId){
          url='commit/replayCommit';
          post={
            ReplayContent:comment,
            CommentId:t.commentId,
            ReplayUserName:name,
            CommentArticleId:id
          }
        }else{
          url='commit/addCommit';
          post={
            CommentUserName:name,
            Comment:comment,
            CommentArticleId: id
          }
        }
        Axios.axios.post(url, post).then((res)=>{
            t.$message({
              message: '评论成功',
              type: 'success'
            });
            t.loading=false;
            if(t.commentId){
              t.list.map((item)=>{
                if(item.Id===t.commentId){
                  item.Replay.push(res.data)
                }
              });
            }else {
              t.list.unshift(res.data);
            }
            t.clear();
        })
      }
    }
  }
</script>
<style>
  .review li {
    margin-bottom: 18px;
    padding: 20px 0;
    position: relative;
    border-bottom: 1px dashed #e0e0e0;
    cursor: pointer;
  }
  .review li:hover .review-btn{
    opacity: 1;
  }
  .review .review-info {
    margin-bottom: 8px;
    display: flex;
    align-items: center;
  }
  .review .review-author {
    display: inline-block;
    background: #ff8a00;
    color: #fff;
    padding: 2px 5px;
    text-align: center;
    border-radius: 3px;
    vertical-align: middle;
  }

  .review .review-replay{
    margin: 20px 0 5px 30px;
    padding-left: 20px;
    border-left: 1px solid #e0e0e0;
  }
  .review .review-name {
    font-size: 14px;
    font-weight: bold;
    color: #6b6b6b;
  }
  .review .review-time {
    margin-left: 16px;
    font-size: 12px;
    color: #6b6b6b;
  }
  .review .review-btn {
    position: absolute;
    right: 20px;
    top: 22px;
    transition: .3s all;
    opacity: 0;
  }
  .review .review-content {
    color: #4d4d4d;
    word-break: break-all;
  }
  .detail .comment {
    text-align: center;
    padding: 19px 0;
    background-color: #eaeaea;
    color: #3d3d3d;
    margin: 100px 0 10px;
    border-radius: 5px;
  }
  .detail .comment-text{
    margin-top: 10px;
  }
  .detail article img {
    max-width: 100%;
    display: block;
  }
  .detail .detail-head,.detail .detail-head a {
    font-size: 12px;
    color: #5f5f5f;
  }

  .detail .detail-head {
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #e0e0e0;
  }

  .detail .detail-tit {
    line-height: 40px;
    font-weight: 400;
    font-size: 21px;
    text-decoration: none;
    color: #313131;
    outline: 0;
  }
</style>
