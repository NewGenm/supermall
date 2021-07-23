<template>
  <div class="home-nav">
    <nav-bar>
      <div></div>
      <div slot="center">购物车</div>
      <div></div>
    </nav-bar>

    <home-swiper :banners="banners"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'
import { getHomeMultidata } from "network/home/home.js";
import HomeSwiper from './childComps/HomeSwiper.vue'
import RecommendView from './childComps/RecommendView.vue'
export default {
    name: 'Home',
    components: {
      NavBar,
      HomeSwiper,
      RecommendView
    },
    data() {
      return {
        banners: [],
        recommends: []
      }
    },
    created() {
      getHomeMultidata().then((res) => {
        this.banners = res.data.banner.list,
        this.recommends = res.data.recommend.list
      })
    }
}

</script>
<style lang='less'>
  .home-nav{
    background-color: @color-tint;
    color: #fff;
  }
</style>