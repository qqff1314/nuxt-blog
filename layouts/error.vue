<template>
  <nuxt-link class="circle" to="/">
    <div class="circle-line">
        <span class="circle-block"></span><span>404</span><span class="circle-block"></span>
    </div>
  </nuxt-link>
</template>
<script>
export default {
 
}
</script>
 <style  scoped lang="less">
  .circle {
    cursor: pointer;
    position: absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
    margin: auto;
    overflow: hidden;
    width: 280px;
    height: 280px;
    border-radius: 200px;
    border: 15px solid #B22727;
    &-line{
      width: 310px;
      color: #B22727;
      font: bolder 50px arial;
      transform: matrix(0.642788,-0.766044,0.766044,0.642788,0,95);
      position: absolute;
      top: -10px;
      left: -15px;
    }
    &-block {
      width: 75px;
      display: inline-block;
      height: 15px;
      background-color: #B22727;
      margin: 12px 10px;
    }
  }
</style>