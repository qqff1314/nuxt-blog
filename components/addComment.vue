<template>
  <div class="comment">
    <input type="text" placeholder="昵称" maxlength="6" v-model.trim="userName" class="comment-name"/>
    <textarea type="text" placeholder="内容" maxlength="200" v-model.trim="content" class="comment-content"/>
    <button class="comment-btn" @click="send">提 交 评 论</button>
    <span class="comment-mark">评论</span>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        content:'',
        userName:''
      };
    },
    mounted(){
    },
    methods: {
      clear(){
        this.userName=''
        this.content=''
      },
      send(){
        if(!this.userName||!this.content) return
        let obj={
          CommentUserName:this.userName,
          Comment:this.content,
        }
        this.$emit('send',obj)
      }
    }
  }
</script>
<style scoped lang="less">
  .comment{
    margin: 50px 0;
    border: 1px solid #dedede;
    padding: 40px 30px 30px;
    width: 50%;
    font-size: 30px;
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
