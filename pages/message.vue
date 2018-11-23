<template>
  <div class="message w1200">
    <div class="comment">
      想对作者说点什么？
      <el-button type="success" @click="dialogVisible = true">此处留言</el-button>
    </div>
    <el-dialog
      title="留言"
      :close-on-click-modal="false"
      :before-close="clear"
      :lock-scroll="false"
      width="30%"
      :visible.sync="dialogVisible">
      <div class="comment-box">
        <el-input
          type="textarea"
          :rows="5"
          class="comment-text"
          resize="none"
          maxlength="200"
          placeholder="说点什么吧"
          v-model.trim="val">
        </el-input>
        <el-popover
          v-model="emoType"
          placement="bottom"
          width="300"
          @show="emoType=true"
          @hide="emoType=false"
          trigger="click">
          <div class="emoji">
            <ul>
              <li @click="emojiSelect(item)" v-for="(item,index) in emoji" :key="index"><img :src="item.src" alt=""></li>
            </ul>
          </div>
          <div :class="['emoji-btn',{'active':emoType}]" slot="reference"></div>
        </el-popover>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="clear">取 消</el-button>
        <el-button type="primary" @click="addComment" :loading="loading">确 定</el-button>
      </span>
    </el-dialog>
    <div class="message-list">
      <ul>
        <li v-for="(item,index) in list" :key="index">
          <p><span>{{item.Time}}</span><span class="floor">#{{item.Id}}楼</span></p>
          <div v-html="item.Content"></div>
        </li>
      </ul>
    </div>
    <el-pagination
      v-if="total>limit"
      style="text-align: center"
      @current-change="handleCurrentChange"
      :current-page="page"
      class="pagination"
      :pager-count="5"
      :page-size="limit"
      layout="prev, pager, next"
      :total="total">
    </el-pagination>
  </div>
</template>
<script>
  import Axios from '~/plugins/axios'
  import { mapState } from 'vuex'
  export default {
    computed: mapState({
      list: state => state.message.List,
      page: state => state.message.Page,
      total: state => state.message.Total,
      limit: state => state.message.Limit,
    }),
    head: {
      title: '留言-云寒的个人空间',
      meta: [
        { hid: 'keywords', name: 'keywords', content: '' },
        { hid: 'description', name: 'description', content: '' }
      ]
    },
    data() {
      return {
        emoType:false,
        val:'',
        loading:false,
        dialogVisible:false,
        emoji:[{src:'/arclist/1.gif',mark:'[emoji_1]'},{src:'/arclist/3.gif',mark:'[emoji_3]'},
          {src:'/arclist/4.gif',mark:'[emoji_4]'},{src:'/arclist/5.gif',mark:'[emoji_5]'},
          {src:'/arclist/6.gif',mark:'[emoji_6]'},{src:'/arclist/11.gif',mark:'[emoji_11]'},
          {src:'/arclist/12.gif',mark:'[emoji_12]'},{src:'/arclist/13.gif',mark:'[emoji_13]'},
          {src:'/arclist/17.gif',mark:'[emoji_17]'},{src:'/arclist/19.gif',mark:'[emoji_19]'},
          {src:'/arclist/20.gif',mark:'[emoji_20]'},{src:'/arclist/21.gif',mark:'[emoji_21]'},
          {src:'/arclist/27.gif',mark:'[emoji_27]'},{src:'/arclist/28.gif',mark:'[emoji_28]'},
          {src:'/arclist/29.gif',mark:'[emoji_29]'},{src:'/arclist/30.gif',mark:'[emoji_30]'},
          {src:'/arclist/35.gif',mark:'[emoji_35]'},{src:'/arclist/36.gif',mark:'[emoji_36]'},
          {src:'/arclist/37.gif',mark:'[emoji_37]'},{src:'/arclist/38.gif',mark:'[emoji_38]'},
          {src:'/arclist/39.gif',mark:'[emoji_39]'},{src:'/arclist/67.gif',mark:'[emoji_67]'},
          {src:'/arclist/41.gif',mark:'[emoji_41]'},{src:'/arclist/48.gif',mark:'[emoji_48]'},
          {src:'/arclist/57.gif',mark:'[emoji_57]'},{src:'/arclist/58.gif',mark:'[emoji_58]'},
          {src:'/arclist/52.gif',mark:'[emoji_52]'},{src:'/arclist/54.gif',mark:'[emoji_54]'},
          {src:'/arclist/62.gif',mark:'[emoji_62]'},{src:'/arclist/63.gif',mark:'[emoji_63]'},
          {src:'/arclist/64.gif',mark:'[emoji_64]'},{src:'/arclist/65.gif',mark:'[emoji_65]'},
          {src:'/arclist/71.gif',mark:'[emoji_71]'}]
      }
    },
    mounted(){
      this.init();
    },
    methods: {
      emojiSelect(item){
        if(this.val.length+item.mark.length<=200){
          this.val=this.val.toString()+item.mark;
          this.emoType=false;
        }
      },
      clear(){
        [this.dialogVisible,this.val,this.loading]=[false,'',false]
      },
      addComment(){
        if(!this.val){
          this.$message.error('没有哦，请输入');
          return false;
        }
        let content=this.val.toString().replace(/</g,'〈').replace(/>/g,'〉');
        this.loading=true;
        Axios.axios.post('message/add', {
          Content:content,
        }).then((res)=>{
          this.$message({
            message: '留言成功',
            type: 'success'
          });
          this.loading=false;
          this.reset(res.data);
          this.$store.commit('message/updateList', res.data);
          this.clear();
        })
      },
      async init(){
        Axios.axios.get('message/list',{
          params: {
            Page: this.page,
            Limit: this.limit,
          }
        }).then((res)=>{
          document.body.scrollTop = 0;
          document.documentElement.scrollTop = 0;
           res.data.list.map((item)=>{
              this.reset(item)
          });
          this.$store.commit('message/setList', res.data.list);
          this.$store.commit('message/setTotal', res.data.Total);
        });
      },
      reset(item){
        let content=item.Content.toString();
        item.Content = content.replace(/\</g,'&lt;');
        item.Content = content.replace(/\>/g,'&gt;');
        item.Content = content.replace(/\n/g,'<br/>');
        item.Content = content.replace(/\[emoji_([0-9]*)\]/g,'<img src="arclist/$1.gif" border="0" />');
      },
      handleCurrentChange(number){
        this.$store.commit('message/setPage',number);
        this.init();
      }
    }
  }
</script>
<style>

  .emoji ul{
    flex-wrap: wrap;
    display: flex;
    cursor: pointer;
    justify-content: start;
  }
  .emoji-btn{
    cursor: pointer;
    position: absolute;
    right: 0;
    bottom: 0;
    width: 40px;
    height: 40px;
    transition: .3s all;
    background: url("../assets/img/emo.png") no-repeat center;
    background-size: 20px;
  }
  .emoji-btn.active{
    background: url("../assets/img/emo-active.png") no-repeat center;
    background-size: 20px;
  }
  .comment-box .el-textarea__inner{
    padding-bottom: 40px;
  }
  .comment-box{
    position: relative;
  }
   .message .comment {
    text-align: center;
    padding: 19px 0;
    color: #3d3d3d;
    width: 60%;
    margin: 0 auto;
    border-radius: 5px;
  }
  .message-list{
    width: 60%;
    margin: 0 auto 20px;
  }
  .message-list img{
    height: auto;
    vertical-align: middle;
  }
  .message-list li{
    padding: 20px 0;
    font-size: 16px;
    word-break: break-all;
    color: #666;
    border-bottom: 1px dashed #dedede;
  }
  .message-list p{
    display: flex;
    justify-content: space-between;
    color: #aaa;
    line-height: 30px;
    font-size: 14px;
    margin-bottom: 10px;
  }
  .message-list p .floor{
    color: green;
  }
  @media  screen and (max-width: 768px){
    .message-list,.message .comment {
      width: 100%;
    }
  }
</style>
