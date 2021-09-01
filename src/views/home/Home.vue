<template>
  <div class="wrapper" id="home">
    <nav-bar class="home-nav">
      <div></div>
      <div slot="center">购物街</div>
      <div></div>
    </nav-bar>
    <!-- 这个tabcontrol用于制造吸顶的效果 -->
    <tab-control
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      class="tabControl"
      v-show="isTabFxied"
    >
    </tab-control>
    <!-- ref用于父组件获取该子组件数据的标签 -->
    <scroll
      class="warpper"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @scroll="contentScroll"
      @pullingUp="loadMore"
    >
      <home-swiper
        :banners="banners"
        @swiperImgLoad="swiperImgLoad"
        ref="homeSwiper"
      ></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>

      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"
      >
      </tab-control>

      <goods-list :goods="showGoods"></goods-list>
    </scroll>

    <!-- .native用于监听组件 -->
    <back-top @click.native="btnClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";
import TabControl from "components/content/tabControl/TabControl.vue";
import GoodsList from "components/content/goods/GoodsList.vue";
import Scroll from "components/common/scroll/Scroll.vue";
import BackTop from "components/content/backTop/BackTop.vue";

import HomeSwiper from "./childComps/HomeSwiper.vue";
import RecommendView from "./childComps/RecommendView.vue";
import FeatureView from "./childComps/FeatureView.vue";

import { getHomeMultidata, getHomeGoods } from "network/home/home.js";
import { debounce } from "common/utils.js";

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
      tabOffsetTop: 0,
      isTabFxied: false,
      position: null,
    };
  },
  created() {
    // 请求多个代码
    this.getHomeMultidataM();
    this.getHomeGoodsM("pop");
    this.getHomeGoodsM("new");
    this.getHomeGoodsM("sell");
  },
  mounted() {
    // 提前创建防抖函数，防止图片加载过快，页面某些内容没有完成加载
    // 等于在每一个图片加载完成后都刷新一下，防止下拉卡顿
    const refresh = debounce(this.$refs.scroll.refresh, 10)
    // 监听$emit发到总线的itemImageLoad频道，每当有图片加载完毕，都会接收一次
    this.$bus.$on("homeItemImageLoad", () => {
      refresh()
    });

    // 这样写在切换页面后会显示refresh undefined
    // 原因 在图片加载完成后，refresh等没有挂载出来
    /* this.$bus.$on("itemImageLoad", () => {
      debounce(this.$refs.scroll.refresh, 10)
    }); */
  },
  methods: {
    // 事件监听
    tabClick(index) {
      this.index = index;
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
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
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1; //更新page值

        // 刷新上拉
        this.$refs.scroll.finishPullUp();
      });
    },

    // 返回顶部
    btnClick() {
      this.$refs.scroll.scrollTo(0, 0, 500);
    },

    // 获得滚动距离
    contentScroll(position) {
      // 下拉超过1000px显示返回顶部图标
      this.isShowBackTop = -position.y > 1000;

      // 下拉一定距离tabControl是否吸顶
      this.isTabFxied = -position.y >= this.tabOffsetTop;

      // 记录当前位置
      this.position = position
    },

    // 加载更多，当上拉时会调用该函数
    loadMore() {
      // 加载更多商品
      this.getHomeGoodsM(this.list[this.index]);

      // 刷新，防止无法上拉
      this.$refs.scroll.refresh();
    },

    // 轮播图加载完成
    swiperImgLoad() {
      // 获得tab-control距离页面顶端高度
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },
  },
  computed: {
    // 显示商品，将对应类型的商品数据发送到GoodsList中
    showGoods() {
      return this.goods[this.list[this.index]].list;
    },
  },
  activated() {
    // 刷新
    this.$refs.scroll.refresh();
    // 跳转页面返回后回到跳转前的位置
    if(this.position !== null) {
      this.$refs.scroll.scrollTo(0, this.position.y, 0)
    }
    // 刷新轮播图
    if(this.$refs.homeSwiper.useringSwiper === false) {
      this.$refs.homeSwiper.startTimer()
      this.$refs.homeSwiper.useringSwiper = true
    }
  },
  deactivated() {
    // // console.log(this.position)
    // console.log('deactivated')
    this.$refs.homeSwiper.stopTimer()
    this.$refs.homeSwiper.useringSwiper = false
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

  // position: sticky;
  // top: 0;
  // z-index: 999;
}
.warpper {
  // height: calc(100% - 93px);
  // margin-top: 44px;
  position: absolute;
  top: 44px;
  bottom: 49px;
  right: 0px;
  left: 0px;
}
.tabControl {
  position: relative;
}
</style>