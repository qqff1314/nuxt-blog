<template>
  <div class="review" id="review">
    <ul>
      <li :id="'review'+(index+1)" v-for="(item,index) in data" :key="index">
        <i class="review-btn" @click="replay(item)">回复</i>
        <div class="review-info">
          <span class="review-name" v-html="item.CommentUserName"></span>
          <span class="review-time">{{item.CommentTime}}</span>
        </div>
        <div class="review-content" v-html="item.Comment"></div>
        <div class="review-replay" v-for="(i,index) in item.Replay" :key="index">
          <div class="review-info">
            <span class="review-author" v-if="i.IsAdmin===1">作者</span>
            <span class="review-name" v-else v-html="i.ReplayUserName"></span>
            <span class="review-time">{{i.ReplayTime}}</span>
          </div>
          <div class="review-content"  v-html="i.ReplayContent"></div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    data() {
      return {
       
      };
    },
    props:['data'],
    mounted(){
    },
    methods: {
      replay(data){
        this.$store.commit('comment/setReplayUser', data);
        location.replace('#comment')
      }
    }
  }
</script>
<style scoped lang="less">
  .review {
    margin:50px 0;
    overflow: hidden;
    li {
      list-style: none;
      margin-bottom: 18px;
      padding: 20px 0;
      position: relative;
      border-bottom: 1px dashed #e0e0e0;
      cursor: pointer;
      position: relative;
      &:hover .review-btn{
        opacity: 1;
        animation: right-in ease-in-out 1s 1;
      }
    }
    &-btn{
      opacity: 0;
      display: inline-block;
      position: absolute;
      right: 30px;
      top: 25px;
      width: 40px;
      height: 40px;
      text-align: center;
      color: #fff;
      line-height: 40px;
      border-radius: 100%;
      background-color: green;
      &:hover{

      }
    }
    &-info {
      margin-bottom: 8px;
      display: flex;
      align-items: center;
    }
    &-author {
      display: inline-block;
      background: #ff8a00;
      color: #fff;
      padding: 2px 5px;
      text-align: center;
      border-radius: 3px;
      vertical-align: middle;
    }
    &-replay{
      margin: 20px 0 5px 30px;
      padding-left: 20px;
      border-left: 1px solid #e0e0e0;
    }
    &-name {
      font-size: 14px;
      font-weight: bold;
      color: #6b6b6b;
    }
    &-time {
      margin-left: 16px;
      font-size: 12px;
      color: #6b6b6b;
    }
    &-content {
      color: #4d4d4d;
      word-break: break-all;
    }
  }
  @keyframes right-in {
    0% {
      transform: translateX(500px);
    }
    60% {
      transform: translateX(-30px);
    }
    80% {
      transform: translateX(10px);
    }
    100% {
      transform: translateX(0);
    }
  }
</style>
