<template>
  <div id="hy-swiper">
    <div class="swiper" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
      <slot></slot>
    </div>

    <div class="indicator">
      <slot name="indicator" v-if="showIndicator && slideCount>1">
          <div v-for="(item, index) in slideCount" class="indi-item" :class="{active: index === currentIndex-1}" :key="index"></div>
        </slot>
    </div>
  </div>
</template>

<script>
import Slide from "./SwiperItem.vue";
export default {
  name: "Swiper",
  props: {
    interval: {
      type: Number,
      default: 3000,
    },
    animDuration: {
      type: Number,
      default: 300,
    },
    moveRatio: {
      type: Number,
      default: 0.25
    },
    showIndicator: {
      type: Boolean,
      default: true
    }
  },
  data: function () {
    return {
      slideCount: 0, // 元素个数
      totalWidth: 0, // swiper的宽度
      swiperStyle: {}, // swiper样式
      currentIndex: 1, // 当前的index
      scrolling: false, // 是否正在滚动
    };
  },
  mounted() {
    setTimeout(() => {
      // 添加图片
      this.handleDom()
      // this.stopTimer()
      // 开启计时器
      this.startTimer()    
    }, 3000);
  },
  methods: {
    // 开启计时器
    startTimer() {
      // console.log('开启')
      // 开启计时器
      this.playTimer = window.setInterval(() => {
        this.currentIndex++,
          this.scrollContent(-this.currentIndex * this.totalWidth);
      }, this.interval);
    },
    // 暂停计时器
    stopTimer() {
      window.clearInterval(this.playTimer);
      // console.log('关闭')
    },
    // 滚动到正确位置
    scrollContent(currentPosition) {
      // 开启滚动
      this.scrolling = true;

      // 设置滚动动画
      this.swiperStyle.transition = "transform " + this.animDuration + "ms";
      this.setTransform(currentPosition);

      // 检测是否滚动到位
      this.checkPosition();

      // 关闭滚动
      this.scrolling = false;
    },
    // 检测是否滚动到正确位置
    checkPosition() {
      window.setTimeout(() => {
        this.swiperStyle.transition = "0ms";
        if (this.currentIndex >= this.slideCount + 1) {
          this.currentIndex = 1;
          this.setTransform(-this.currentIndex * this.totalWidth);
        } else if (this.currentIndex <= 0) {
          this.currentIndex = this.slideCount;
          this.setTransform(-this.currentIndex * this.totalWidth);
        }

        // 2.结束移动后的回调
        this.$emit('transitionEnd', this.currentIndex-1);
      }, this.animDuration);
    },
    // 滚动动画
    setTransform: function (position) {
      // 通过transform进行变形
      // 解决兼容问题
      this.swiperStyle.transform = `translate3d(${position}px, 0, 0)`;
      this.swiperStyle['-webkit-transform'] = `translate3d(${position}px), 0, 0`;
      this.swiperStyle['-ms-transform'] = `translate3d(${position}px), 0, 0`;
    },
    // 前后添加图片
    handleDom() {
      let swiperEl = document.querySelector(".swiper");
      let slidesEls = swiperEl.getElementsByClassName("slide");

      // 保存个数
      this.slideCount = slidesEls.length;
      // 防止图片过多，轮播图太冗长
      // if(slidesEls.length > 5){
      //   this.slideCount = 5
      // }else{
      //   this.slideCount = slidesEls.length
      // }
      // 向前后增加图片
      if (this.slideCount > 1) {
        let cloneFirst = slidesEls[0].cloneNode(true);
        let cloneLast = slidesEls[this.slideCount - 1].cloneNode(true);
        swiperEl.insertBefore(cloneLast, slidesEls[0]);
        // 如果图片过多，则在中间插入
        // swiperEl.insertBefore(cloneFirst, slidesEls[this.slideCount+1]);
        swiperEl.appendChild(cloneFirst);
        this.totalWidth = swiperEl.offsetWidth;
        // 获得swiper的style，方便修改样式，实现滚动
        this.swiperStyle = swiperEl.style;
      }

      // 让swiper元素, 显示第一个(目前是显示前面添加的最后一个元素)
      this.setTransform(-this.totalWidth);
    },
    /**
       * 拖动事件的处理
       */
      touchStart: function (e) {
        // 1.如果正在滚动, 不可以拖动
        if (this.scrolling) return;

        // 2.停止定时器
        this.stopTimer();

        // 3.保存开始滚动的位置
        // 当前手指点击的位置
        this.startX = e.touches[0].pageX;
      },

      touchMove: function (e) {
        // 1.计算出用户拖动的距离
        // 获取拖动过程中手指的位置
        this.currentX = e.touches[0].pageX;
        // 计算拖动的距离
        this.distance = this.currentX - this.startX;
        let currentPosition = -this.currentIndex * this.totalWidth;
        // 将拖动的距离好当前页面的位置相加，传给滚动函数
        let moveDistance = this.distance + currentPosition;

        // 2.设置当前的位置
        this.setTransform(moveDistance);
      },

      touchEnd: function (e) {
        // 1.获取拖动的距离的绝对值
        let currentMove = Math.abs(this.distance);

        // 2.判断最终的距离
        if (this.distance === 0) {
          // 如果没有拖动，直接结束
          return
        } 
          // 如果拖动的值为正，判定向右拖动，并且判定有无超过翻页限制距离，如果超过则进行翻页
          else if (this.distance > 0 && currentMove > this.totalWidth * this.moveRatio) { // 右边移动超过0.5
          this.currentIndex--
        } 
          // 如果拖动的值为负，判定向左拖动，并且判定有无超过翻页限制距离，如果超过则进行翻页
          else if (this.distance < 0 && currentMove > this.totalWidth * this.moveRatio) { // 向左移动超过0.5
          this.currentIndex++
        }

        // 3.移动到正确的位置
        this.scrollContent(-this.currentIndex * this.totalWidth);

        // 4.移动完成后重新开启定时器
        this.startTimer();
      },

      /**
       * 控制上一个, 下一个
       */
      previous: function () {
        this.changeItem(-1);
      },

      next: function () {
        this.changeItem(1);
      },

      changeItem: function (num) {
        // 1.移除定时器
        this.stopTimer();

        // 2.修改index和位置
        this.currentIndex += num;
        this.scrollContent(-this.currentIndex * this.totalWidth);

        // 3.添加定时器
        this.startTimer();
      }
  },
};
</script>
<style scoped>
/* 外框架 */
#hy-swiper {
  overflow: hidden;
  position: relative;
  /* height: 166px; */
}
/* 滚动区 */
.swiper {
  display: flex;
}
/* 导航栏 */
.indicator {
  display: flex;
  justify-content: center;
  position: absolute;
  width: 100%;
  bottom: 8px;
}
/* 导航点 */
.indi-item {
  box-sizing: border-box;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: #fff;
  line-height: 8px;
  text-align: center;
  font-size: 12px;
  margin: 0 5px;
}
/* 导航点活跃状态 */
.indi-item.active {
  background-color: rgba(212, 62, 46, 1);
}
</style>