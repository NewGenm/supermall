<template>
  <div v-if="Object.keys(detailInfo).length !== 0" class="good-info"> 
    <div class="info-desc clear-fix">
      <div class="start"></div>
      <div class="desc">{{detailInfo.desc}}</div>
      <div class="end"></div>
    </div>
    <div class="info-key">{{detailInfo.detailImage[0].key}}</div>
    <div class="info-list">
      <img v-for="(item, index) in detailInfo.detailImage[0].list" :key="index"
      :src="item" @load="imgLoad">
    </div>
  </div>
</template>
  
<script>
export default {
  name: "DetailGoodsInfo",
  props: {
    detailInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      LoadOver: false
    }
  },
  methods: {
    imgLoad() {
      //  this.$bus.$emit('imgLoad')
       this.$emit('imgLoad')
    },
  }
}

</script>
<style lang='less' scoped>
  .desc{
    margin: 10px 5px;
  }
  .info-key{
    margin-left: 20px;
  }
  .info-list{
    // height: 100vh;
    img{
      width: 100%;
    }
  }
</style>