<template>
  <div class="message w1200">
    <div class="comment">
      想对作者说点什么？
      <el-button type="success" @click="dialogVisible = true">我来说一句</el-button>
    </div>
    <el-dialog
      title="留言"
      :close-on-click-modal="false"
      :before-close="clear"
      :lock-scroll="false"
      :visible.sync="dialogVisible">
      <el-input
        type="textarea"
        :rows="5"
        class="comment-text"
        resize="none"
        maxlength="200"
        placeholder="说点什么吧"
        v-model.trim="val">
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="clear">取 消</el-button>
        <el-button type="primary" @click="addComment" :loading="loading">确 定</el-button>
      </span>
    </el-dialog>
    <div class="message-list">
      <ul>
        <li v-for="(item,index) in list" :key="index"><p>{{item.Time}}</p>{{item.Content}}</li>
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
    async asyncData ({ store }) {
      const message = store.state.message;
      if (message.List.length === 0) {
        const {data} = await Axios.axios.get('message/list', {
          params: {
            Page: message.Page,
            Limit: message.Limit,
          }
        });
        store.commit('message/setList', data.list);
        store.commit('message/setTotal', data.Total);
      }
    },
    computed: mapState({
      list: state => state.message.List,
      page: state => state.message.Page,
      total: state => state.message.Total,
      limit: state => state.message.Limit,
    }),
    data() {
      return {
        val:'',
        loading:false,
        dialogVisible:false
      }
    },
    mounted(){
    },
    methods: {
      clear(){
        [this.dialogVisible,this.val,this.loading]=[false,'',false]
      },
      addComment(){
        if(!this.val){
          this.$message.error('没有哦，请输入');
          return false;
        }
        let [t,content]=[this,this.val.toString().replace(/</g,'〈').replace(/>/g,'〉')];
        t.loading=true;
        Axios.axios.post('message/add', {
          Content:content,
        }).then((res)=>{
          t.$message({
            message: '留言成功',
            type: 'success'
          });
          t.loading=false;
          t.$store.commit('message/updateList', res.data);
          t.clear();
        })
      },
      init(){
        Axios.axios.get('message/list',{
          params: {
            Page: this.page,
            Limit: this.limit,
          }
        }).then((res)=>{
          document.body.scrollTop = 0;
          document.documentElement.scrollTop = 0;
          this.$store.commit('message/setList', res.data.list);
          this.$store.commit('message/setTotal', res.data.Total);
        });
      },
      handleCurrentChange(number){
        this.$store.commit('message/setPage',number);
        this.init();
      }
    }
  }
</script>
<style>
   .message .comment {
    text-align: center;
    padding: 19px 0;
    background-color: #eaeaea;
    color: #3d3d3d;
    width: 60%;
    margin: 0 auto;
    border-radius: 5px;
  }
  .message-list{
    width: 60%;
    margin: 0 auto 20px;
  }
  .message-list li{
    padding: 20px 0;
    font-size: 16px;
    word-break: break-all;
    color: #666;
    border-bottom: 1px dashed #dedede;
  }
  .message-list p{
    color: #aaa;
    line-height: 30px;
    font-size: 14px;
  }
  @media  screen and (max-width: 768px){
    .message-list,.message .comment {
      width: 100%;
    }
  }
</style>
