<template>
  <div class="goods-information">
    <div v-for="(item, index) in showGoods.list" :key="index" class="commodity">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <span>{{item.title}}</span>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CategoryItem',
  props: {
    showGoods: {
      type: Object,
      default() {
        return {}
      }
    }
  },
}

</script>
<style scoped>
  .goods-information{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: flex-start;
  }
  .goods-information img{
    width: 90px;
  }
  .commodity{
    width: 95px;
    height: 110px;
    text-align: center;
  }
  span{
    display: block;
    font-size: 14px;
  }
</style>