<template>
  <header class="header"> 
    <h1 class="header__logo"><nuxt-link :to="{path:'/'}" title="云寒的个人博客-前路漫漫">YUN · HAN</nuxt-link></h1> 
    <!-- <nav class="header__nav">  -->
      <!-- <ul class="header__ul"> 
        <li class="header__li"><a href="">首页</a></li>
      </ul>  -->
    <!-- </nav>  -->
  </header>
</template>
<style scoped lang="less">
  .header{
    padding: 15px 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fafafa;
    height: 80px;
    &__logo{
      cursor: pointer;
    }
    &__nav{
      width: 66%;
    }
    // &__ul{
    //   width: 100%;
    //   display: flex;
    //   align-items: center;
    //   justify-content: flex-end;
    //   list-style: none;
    // }
    // &__li>a{
    //   color: #666;
    //   transition: .3s color;
    //   &:hover{
    //     color: #999
    //   }
    // }
    // &__li{
    //   cursor: pointer;
    //   margin-right: 16px;
    //   font-size: 16px;
    //   color: #666;
    //   line-height: 32px;
    //   position: relative;
    //   &:before{
    //     width: 0;
    //     content: '';
    //     position: absolute;
    //     left: 0;
    //     right: 0;
    //     bottom: 0;
    //     border-bottom: 1px solid #7e7e7e;
    //     transition: width .4s;
    //   }
    //   &:last-child{
    //     margin-right:0;
    //   }
    //   &:hover:before{
    //     width:100%;
    //   }
    // }
  }
</style>
