<template>
  <div>
    <swiper ref="swiper" class="detailSwiper">
      <swiper-item v-for="(item, index) in swiperImage" :key="index">
        <img :src="item" alt="">
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper/index.js";

export default {
  name: "DetailSwiper",
  data() {
    return {

    };
  },
  props:{
    swiperImage: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    Swiper,
    SwiperItem,
  },
};
</script>
<style>
  .detailSwiper{
    height: 266px;
  }
</style>