<template>
  <div class="detail">
    <el-row type="flex" justify="center">
      <el-col :xs="24" :sm="22" :md="18" :lg="15" :xl="15" >
          <p class="detail-tit">{{detail.Title}}</p>
          <div class="detail-head">
            <time :datetime="detail.Time" itemprop="datePublished">发布于 {{detail.Time}}</time>
            / <a href="/category/SOFA">{{detail.ClassName}}</a> / <a href="#comments">没有评论</a> /
            {{detail.ReadNum}}浏览
        </div>
          <article v-html="detail.Detail" class="ql-editor"></article>
          <el-form ref="form" :model="form" label-width="80px" class="form">
            <el-form-item label="用户昵称" required>
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="邮箱名称">
              <el-input v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item label="留言内容" required>
              <el-input type="textarea" v-model="form.desc" :autosize="{ minRows: 3, maxRows: 4}"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary">提交</el-button>
            </el-form-item>
          </el-form>
          <div class="comment">
            <ul>
              <li>
                <p class="name">博文视点编辑</p>
                <div class="content">博文视点编辑博文视点编辑博文视点编辑博文视点编辑</div>
                <div class="opera">
                  <span class="time">1923.23.23</span>
                  <span class="btn">回复</span>
                </div>
                <ul>
                  <li>
                    <p class="name">博文视点编辑</p>
                    <div class="content">博文视点编辑博文视点编辑博文视点编辑博文视点编辑</div>
                    <div class="opera">
                      <span class="time">1923.23.23</span>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Axios from '~/plugins/axios'
export default {
  async asyncData ({ query }) {
    const {data} = await Axios.axios.get('article/detail', {
        params: {
            Id:query.id,
        },
    })
    return { detail: data }
  },
  data () {
    return {
      form: {
        name: '',
        email:'',
        desc: ''
      }
    }
  },
  mounted(){
  },
  methods:{

  }
}
</script>
<style>
    .detail .form{
      margin: 30px 10px 0;
    }
    .comment{
      margin: 30px 10px;
    }
    .comment li{
      padding: 0 20px;
      cursor: pointer;
      border: 1px solid rgba(184,197,214,.2);
      border-radius: 5px;
      margin-bottom: 10px;
    }
    .comment li:hover .btn{
      display: inline-block;
    }
    .comment .name{
      color: #5f5f5f;
      font-size: 13px;
      line-height: 45px;
      display: inline-block;
    }
    .comment .opera{
      font-size: 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 0;
    }
    .comment .opera .time{
      color: #5f5f5f;
    }
    .comment .opera .btn{
      color: #eb5055;
      display: none;
      transition: .3s all;
    }
    article img{
        max-width: 100%;
        display: block;
    }
    .detail-head,.detail-head a{
        font-size: 12px;
        color: #5f5f5f;
    }
    .detail-head{
        padding-bottom: 20px;
        margin-bottom: 20px;
        border-bottom: 1px solid #e0e0e0;
    }
   .detail-tit{
        line-height: 40px;
        font-weight: 400;
        font-size: 21px;
        text-decoration: none;
        color: #313131;
        outline: 0;
    }
</style>
