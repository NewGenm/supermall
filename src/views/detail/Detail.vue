<template>
  <div class="detail">
    <detail-nav-bar
      :titles="titles"
      @itemClick="itemClick"
      ref="navbar"
    ></detail-nav-bar>
    <scroll
      class="wrapper"
      @pullingUp="loadMore"
      @scroll="contentscroll"
      :probeType="3"
      ref="scroll"
    >
      <detail-swiper :swiperImage="swiperImage"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info
        :detailInfo="detailInfo"
        @imgLoad="imgLoad"
      ></detail-goods-info>
      <detail-param-info :paramInfo="paramInfo" ref="param"></detail-param-info>
      <detail-comment-info
        :commentInfo="commentInfo"
        ref="comment"
      ></detail-comment-info>
      <goods-list :goods="recommends" ref="recommends"></goods-list>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="btnClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
// 顶部栏
import DetailNavBar from "views/detail/childComps/DetailNavBar.vue";
// 轮播图
import DetailSwiper from "views/detail/childComps/DetailSwiper.vue";
// 物品信息
import DetailBaseInfo from "views/detail/childComps/DetailBaseInfo.vue";
// 店铺信息
import DetailShopInfo from "views/detail/childComps/DetailShopInfo.vue";
// BScroll组件
import Scroll from "components/common/scroll/Scroll.vue";
// 商品图片
import DetailGoodsInfo from "views/detail/childComps/DetailGoodsInfo.vue";
// 详情信息
import DetailParamInfo from "views/detail/childComps/DetailParamInfo.vue";
// 详情评论
import DetailCommentInfo from "views/detail/childComps/DetailCommentInfo.vue";
// 更多商品
import GoodsList from "components/content/goods/GoodsList.vue";
// 底部栏
import DetailBottomBar from "views/detail/childComps/DetailBottomBar.vue";
// 返回顶部按钮
// import BackTop from "components/content/backTop/BackTop.vue";
import { backTopMixin } from "common/mixin.js";

// 请求数据
import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "network/detail.js";
// 防抖函数
import { debounce } from "common/utils.js";

export default {
  name: "detail",
  // 利用混入封装返回顶部组件
  mixins: [backTopMixin],
  data() {
    return {
      iid: null,
      // 导航栏的文字
      titles: ["商品", "参数", "评论", "推荐"],
      swiperImage: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      refresh: null,
      offsetTop: [],
      getOffsetTopY: null,
      activeIndex: 0,
      // isShowBackTop: false,
    };
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    Scroll,
    DetailBottomBar,
    // BackTop,
  },
  // 需要将detail 从keep-alive中移除，不销毁router会有很多问题，如iid不更换，图片数量
  created() {
    this.iid = this.$route.params.iid;
    getDetail(this.iid).then((res) => {
      // console.log(res)
      // 获取轮播图信息
      this.swiperImage = res.result.itemInfo.topImages;
      // 获取商品信息
      const data = res.result;
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // 获取店铺信息
      this.shop = new Shop(data.shopInfo);
      // 获取详情图片
      this.detailInfo = data.detailInfo;
      // 获取商品参数
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      // 获取评论信息
      if (data.rate.cRate != 0) {
        //如果没有评论就不显示
        this.commentInfo = data.rate.list[0];
      }
    });

    getRecommend().then((res) => {
      this.recommends = res.data.list;
    });

    // 给getOffsetTopY赋值，记录各个板块距离顶端距离，并进行防抖操作
    this.getOffsetTopY = debounce(() => {
      this.offsetTop.push(0);
      this.offsetTop.push(this.$refs.param.$el.offsetTop);
      this.offsetTop.push(this.$refs.comment.$el.offsetTop);
      this.offsetTop.push(this.$refs.recommends.$el.offsetTop);
    }, 500);
  },
  mounted() {
    // 在data中保留防抖函数，以便在methods中使用
    // const refresh = debounce(this.$refs.scroll.refresh,500)
    this.refresh = debounce(this.$refs.scroll.refresh, 500);
    // this.$bus.$on("imgLoad", () => {
    //   refresh()
    // });

    this.$bus.$on("detailItemImageLoad", () => {
      this.refresh();
    });
  },
  methods: {
    loadMore() {
      this.$refs.scroll.refresh();
    },
    imgLoad() {
      this.refresh();
      this.getOffsetTopY();
    },
    // 顶部四个选项
    itemClick(index) {
      // console.log(this.offsetTop);
      // 跳转到相应位置
      this.$refs.scroll.scrollTo(0, -this.offsetTop[index], 200);
    },
    // 获取位置
    contentscroll(position) {
      // if判断中不能连续判断a<b<c，需要a<b && b<c
      // if(0 <-position.y && -position.y< this.offsetTop[1]){
      //   this.$refs.navbar.currentIndex = 0
      // }else if(this.offsetTop[1] <-position.y && -position.y< this.offsetTop[2]){
      //   this.$refs.navbar.currentIndex = 1
      // }else if(this.offsetTop[2] <-position.y && -position.y< this.offsetTop[3]){
      //   this.$refs.navbar.currentIndex = 2
      // }else if(this.offsetTop[3] <-position.y){
      //   this.$refs.navbar.currentIndex = 3
      // }

      // for循环的目的，如果数组内数量多的话，简化代码
      // 代码解析：
      // this.activeIndex !== i 如果当前的i值和记录的i值相等，就不进行判断，减少判断次数
      // 不等的情况下
      // 先判断前面夹心的情况 i< length - 1 && this.offsetTop[i] <= -position.y && -position.y< this.offsetTop[i+1]
      // 再判断最后大于的情况 i === length - 1 && this.offsetTop[i] <= -position.y
      let length = this.offsetTop.length;
      for (let i = 0; i < length; i++) {
        if (
          this.activeIndex !== i &&
          ((i < length - 1 &&
            this.offsetTop[i] <= -position.y &&
            -position.y < this.offsetTop[i + 1]) ||
            (i === length - 1 && this.offsetTop[i] <= -position.y))
        ) {
          this.activeIndex = i; //记录当前i值，用于减少重复判断
          this.$refs.navbar.currentIndex = i; //更改颜色
        }
      }

      // 当下拉距离查过1000，返回按钮显示
      this.isShowBackTop = -position.y > 1000;
    },
    // btnClick() {
    //   this.$refs.scroll.scrollTo(0, 0, 200)
    // }

    // 加入购物车
    addToCart() {
      //获取购物车需要展示的信息添加进去
      const product = {};
      product.image = this.swiperImage[0]; //图片
      product.title = this.goods.title; //标题
      product.desc = this.goods.desc; //描述
      product.price = this.goods.realPrice; //价格
      product.iid = this.iid; //id
      product.checked = true;

      // 调用actions的函数，并使用promise返回一个回调函数，监控是否完成addCart
      this.$store.dispatch("addCart", product).then((res) => {
        this.$toast.show("添加购物车成功", 2000);
        // console.log(this.$toast)
      });
      // this.$store.commit('addCart',product)
    },
  },
};
</script>
<style scoped>
.detail {
  height: 100vh;
}
.wrapper {
  height: calc(100% - 44px);
}
</style>