<template>
  <div class="about">
    <div class="about-us w1200">
      <img src="~assets/img/webwxgetmsgimg.jpg" alt="">
      <div class="about-info">
      </div>
      <div class="about-ico">
        <ul>
          <li><a href="" class="github"></a></li>
          <li><a href="" class="weiBo"></a></li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {

      };
    },
    methods: {

    }
  }
</script>
<style>
  .about-ico ul{
    display: flex;
    align-items: center;
  }
  .about-ico a{
    display: block;
    width: 40px;
    height: 40px;
    cursor: pointer;
  }
  .about-ico .weiBo{
    background-image: url("~assets/img/weibo.png");
    background-size: cover;
    background-repeat: no-repeat;
  }
  .about-ico .github{
    background-image: url("~assets/img/github.png");
    background-size: cover;
    background-repeat: no-repeat;
  }
  .about-us img{
    max-width: 100%;
    margin: 0 auto 20px;
    display: block;
  }
  .about-info{
    font-size: 16px;
    color: #666;
    line-height: 40px;
    word-break: break-all;
  }
</style>
