<template>
  <el-container :style="{paddingLeft: paddingLeft+'px'}">
    <canvas id="canvas"></canvas>
    <el-header><Header/></el-header>
    <main><nuxt/></main>
    <Footer/>
  </el-container>
</template>
<script>
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
export default {
  components: {
    Header,
    Footer
  },
  data(){
    return {
      balls:[],
      isMobile:'',
      paddingLeft:0
    }
  },
  mounted(){
    this.isMobile = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
    let t=this;
    (function loop(){
      t.canvas();
      requestAnimationFrame(loop);
    })();
    t.init(this.$route)
  },
  watch:{
    '$route'(val){
      this.init(val)
    }
  },
  methods:{
    canvas(){
      let canvas = document.getElementById("canvas");
      let context = canvas.getContext("2d");
      canvas.width = document.documentElement.clientWidth;
      canvas.height = document.documentElement.clientHeight;
      context.fillStyle = "rgba(0, 0, 0, 0.08)";
      context.strokeStyle = "rgba(0, 0, 0, 0.05)";
      context.lineWidth = 0.5;
      let num = this.isMobile?10:30;
      let t=this;
      for(let i = 0; i < num; i++) {
          t.createBall();
      }
      for(let k = 0; k < num; k++) {
        context.save();
        context.beginPath();
        context.arc(t.balls[k].x, t.balls[k].y, t.balls[k].r, 0, Math.PI*2 );
        context.fill();
        context.restore();
      }
      for(let i = 0; i < num; i++) {
        for(let j = i + 1; j < num; j++) {
          if( t.distance( t.balls[i], t.balls[j] ) < 500 ) {
            context.beginPath();
            context.moveTo(  t.balls[i].x,  t.balls[i].y );
            context.lineTo(  t.balls[j].x,  t.balls[j].y );
            context.stroke();
          }
        }
      }
      for(let k = 0; k < num; k++) {
        t.balls[k].x += t.balls[k].vx;
        t.balls[k].y += t.balls[k].vy;

        if( t.balls[k].x - t.balls[k].r > canvas.width ) {
          t.balls[k].x = 0 - t.balls[k].r;
        }
        if( t.balls[k].x + t.balls[k].r < 0 ) {
          t.balls[k].x = canvas.width + t.balls[k].r;
        }
        if( t.balls[k].y - t.balls[k].r > canvas.height ) {
          t.balls[k].y = 0 - t.balls[k].r;
        }
        if( t.balls[k].y + t.balls[k].r < 0 ) {
          t.balls[k].y = canvas.height + t.balls[k].r;
        }
      }
    },
    distance(point1, point2){
        return Math.sqrt( Math.pow( (point1.x - point2.x), 2 ) + Math.pow( (point1.y - point2.y), 2 ) );
    },
    createBall(){
      // x坐标
      let _x = Math.random() * canvas.width;
      // y坐标
      let _y = Math.random() * canvas.height;
      // 半径 [0.01, 15.01]
      let _r = Math.random() * 15 + 0.01;
      // 水平速度 [±0.0, ±0.5]
      let _vx = Math.random() * 0.5 * Math.pow( -1, Math.floor(Math.random() * 2 + 1) );
      // 垂直速度 [±0.0, ±0.5]
      let _vy = Math.random() * 0.5 * Math.pow( -1, Math.floor(Math.random() * 2 + 1) );
      // 把每一个圆的信息存放到数组中
      this.balls.push({
        x: _x,
        y: _y,
        r: _r,
        vx: _vx,
        vy: _vy
      });
    },
    init(val){
      if(val.name!=='index'){
        this.paddingLeft=0
      }else{
        this.paddingLeft=150
      }
    }
  }
}
</script>
<style>
  main{
    padding: 20px;
    flex: 1;
  }
  canvas{
    background-color: #f7fafc;
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: -1;
  }
  @media  screen and (max-width: 768px){
    .el-container.is-vertical{
      padding-left: 0!important;
    }
  }

</style>
