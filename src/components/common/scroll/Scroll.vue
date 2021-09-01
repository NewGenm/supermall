<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  data() {
    return {
      scroll: null,
    };
  },
  props: {
    probeType: {
      type: Number,
      default() {
        return 0;
      },
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    // 1.创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      // 需要配置的属性
      // click 是否启动在bs中的点击 t/f
      // probeType 是否派发 scroll 事件 0-3 (不开就0，开就3)
      // pullUpLoad 是否开启上拉触发 t/f
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
    });

    this.scroll.on("scroll", (position) => {
      // 当滑动时输出位置数据
      this.$emit("scroll", position);
    });

    if (this.pullUpLoad === true) {
      this.scroll.on("pullingUp", () => {
        // 当上拉时输出一个回调函数
        this.$emit("pullingUp");
      });
    }
  },
  methods: {
    // 返回顶部
    scrollTo(x, y, time = 300) {
      this.scroll.scrollTo(x, y, time); //使用scroll内部的方法
    },

    // 上拉加载
    finishPullUp() {
      this.scroll.finishPullUp();
    },

    // 刷新
    refresh() {
      this.scroll.refresh();
    },
  },
};
</script>
<style>
.wrapper {
  overflow: hidden;
}
</style>