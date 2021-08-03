<template>
  <div class="wrapper" id="home">
    <nav-bar class="home-nav">
      <div></div>
      <div slot="center">购物车</div>
      <div></div>
    </nav-bar>
    <!-- ref用于父组件获取该子组件数据的标签 -->
    <scroll 
      class="warpper" 
      ref='scroll' 
      :probe-type='3' 
      @scroll="contentScroll"
      @pullingUp='loadMore'>
      <home-swiper :banners="banners"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>

      <tab-control
        class="tab-control"
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
      >
      </tab-control>

      <goods-list :goods="showGoods"></goods-list>
    </scroll>
 
    <!-- .native用于监听组件 -->
    <back-top 
      @click.native="btnClick" 
      v-show="isShowBackTop"
    ></back-top>

  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";
import TabControl from "components/content/tabControl/TabControl.vue";
import GoodsList from "components/content/goods/GoodsList.vue";
import Scroll from "components/common/scroll/Scroll.vue";
import BackTop from 'components/content/backTop/BackTop.vue'

import HomeSwiper from "./childComps/HomeSwiper.vue";
import RecommendView from "./childComps/RecommendView.vue";
import FeatureView from "./childComps/FeatureView.vue";

import { getHomeMultidata, getHomeGoods } from "network/home/home.js";

export default {
  name: "Home",
  components: {
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,

    HomeSwiper,
    RecommendView,
    FeatureView,
  },
  data() {
    return {
      banners: [], //轮播图数据
      recommends: [], //推荐数据
      goods: {
        //商品数据
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      list: ["pop", "new", "sell"],
      index: 0,
      isShowBackTop: false,
    };
  },
  created() {
    // 请求多个代码
    this.getHomeMultidataM();
    this.getHomeGoodsM("pop");
    this.getHomeGoodsM("new");
    this.getHomeGoodsM("sell");
  },
  methods: {
    // 事件监听
    tabClick(index) {
      this.index = index;
    },
    // 网络请求
    getHomeMultidataM() {
      getHomeMultidata().then((res) => {
        (this.banners = res.data.banner.list),
          (this.recommends = res.data.recommend.list);
      });
    },

    getHomeGoodsM(type) {
      let page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1 //更新page值

        // 刷新上拉
        this.$refs.scroll.finishPullUp()
      });
    },

    // 返回顶部
    btnClick() {
      this.$refs.scroll.scrollTo(0, 0, 500)
    },

    // 显示返回顶部图标
    contentScroll(position) {
       this.isShowBackTop = (-position.y)>1000
    },

    // 加载更多，当上拉时会调用该函数
    loadMore() {
      // 加载更多商品
      this.getHomeGoodsM(this.list[this.index])
      
      // 刷新，防止无法上拉
      this.$refs.scroll.scroll.refresh()
    }
  },
  computed: {
    // 显示商品
    showGoods() {
      return this.goods[this.list[this.index]].list;
    },
  },
};
</script>
<style lang='less' scoped>
#home {
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: @color-tint;
  color: #fff;

  position: sticky;
  top: 0;
  z-index: 999;
}
.tab-control {
  position: sticky;
  top: 44px;
}
.warpper{
  // height: calc(100% - 93px);
  // margin-top: 44px;
  position: absolute;
  top: 44px;
  bottom: 49px;
  right: 0px;
  left: 0px;
}
</style>