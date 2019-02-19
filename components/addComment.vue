<template>
  <div id="comment">
    <div class="comment">
      <input type="text" placeholder="昵称" maxlength="6" v-model.trim="userName" class="comment-name"/>
      <textarea type="text" placeholder="内容" maxlength="200" v-model.trim="content" class="comment-content"/>
      <button class="comment-btn" @click="send">提 交 评 论</button>
      <span class="comment-mark">{{replayUser.Id?`回复 ( ${replayUser.CommentUserName} )`:'评论'}}</span>
    </div>
  </div>
</template>
<script>
  import { mapState } from 'vuex'
  export default {
    data() {
      return {
        content:'',
        userName:'',
      };
    },
    computed: mapState({
      replayUser: state => state.comment.replayUser
    }),
    methods: {
      clear(){
        this.userName=''
        this.content=''
        this.$store.commit('comment/setReplayUser', {});
      },
      send(){
        if(!this.userName||!this.content) return
        let config={}
        if(this.replayUser.Id){
          config={
            key:"replay",
            params:{
              ReplayContent:this.escape(this.content),
              CommentId:this.replayUser.Id,
              ReplayUserName:this.escape(this.userName),
              CommentArticleId:this.replayUser.CommentArticleId
            }
          }
        }else{
          config={
            key:"add",
            params:{
              CommentArticleId:this.$route.params.id,
              CommentUserName:this.escape(this.userName),
              Comment:this.escape(this.content)
            }
          }
        }
        this.$emit('send',config)
      },
      escape(str) {
        str = str.replace(/&/g, '&amp;')
        str = str.replace(/</g, '&lt;')
        str = str.replace(/>/g, '&gt;')
        str = str.replace(/"/g, '&quto;')
        str = str.replace(/'/g, '&#39;')
        str = str.replace(/`/g, '&#96;')
        str = str.replace(/\//g, '&#x2F;')
        return str
      }
    }
  }
</script>
<style scoped lang="less">
  #comment{
    padding: 50px 0;
  }
  .comment{
    border: 1px solid #dedede;
    padding: 40px 30px 30px;
    width: 50%;
    font-size: 20px;
    position: relative;
    &-mark{
      position: absolute;
      line-height: 40px;
      top: -20px;
      left: 10px;
      color: #333;
      display: inline-block;
      padding: 0 20px;
      background: #fff;
    }
    &-btn{
      cursor: pointer;
      height: 40px;
      width: 100%;
      border-radius: 5px;
      background: green;
      color: #fff;
    }
    &-name{
      padding: 10px;
      height: 40px;
      width: 100%;
      display: block;
      margin-bottom: 10px;
      border: 1px solid #dedede;
      transition: .3s all;
      border-radius: 5px;
      &:focus{
        box-shadow: 0px 0px 15px #dedede;
      }
    }
    &-content{
      padding: 10px;
      height: 200px;
      width: 100%;
      resize: none;
      margin-bottom: 10px;
      border-radius: 5px;
      display: block;
      border: 1px solid #dedede;
      transition: .3s all;
      &:focus{
        box-shadow: 0px 0px 15px #dedede;
      }
    }
  }
  @media  screen and (max-width: 768px){
    .comment {
      width: 100%;
    }
  }
</style>
