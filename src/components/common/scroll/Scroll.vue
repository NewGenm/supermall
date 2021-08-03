<template>
  <div class="warpper" ref="warpper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: "Scroll",
  data() {
    return {
      scroll: null
    }
  },
  props:{
    probeType:{
      type: Number,
      default() {
        return 0
      }
    }
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.warpper,{
      probeType: this.probeType, //显示滚动的位置
      pullUpLoad: true, //是否更新上拉
      click: true //是否开启点击
    })

    this.scroll.on('scroll',(position) => {
      // 当滑动时输出位置数据
      this.$emit('scroll',position)
    })

    this.scroll.on('pullingUp',() => {
      // 当上拉时输出一个回调函数
     this.$emit('pullingUp')
    })
  },
  methods: {
    // 返回顶部
    scrollTo(x, y, time = 300) {
      this.scroll.scrollTo(x, y, time) //使用scroll内部的方法
    },

    // 上拉加载
    finishPullUp() {
      this.scroll.finishPullUp()
    }
  },
}

</script>
<style>
</style>