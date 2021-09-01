<template>
  <swiper ref="swiper">
    <swiper-item v-for="(item, id) in banners" :key="id">
      <!-- item中的link和imge属性 -->
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imgLoad" />
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";

export default {
  name: "HomeSwiper",
  data() {
    return {
      isLoad: false,
      useringSwiper: true
    }
  },
  props: {
    banners: {
      type:Array,
      default() {
        return []
      }
    }
  },
  components: {
    Swiper,
    SwiperItem,
  },
  methods: {
    imgLoad() {
      if(!this.isLoad) {
        this.$emit('swiperImgLoad')
        this.isLoad = true
      }
    },
    stopTimer() {
      this.$refs.swiper.stopTimer()
      // console.log('刷新了')
    },
    startTimer() {
      this.$refs.swiper.startTimer()
    }
    
  }
};
</script>

<style scoped>
</style>