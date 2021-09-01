<template>
  <div class="goods-item" @click="itemClick">
    <img :src="showImg" alt="" @load="imageLoad" /> <!-- @load是监听加载的方法 -->
    <div class="goods-info">
      <p>{{ goodsList.title }}</p>
      <span class="price">{{ goodsList.price }}</span>
      <span class="collect">{{ goodsList.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsList: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  // created() {
  //   console.log(this.goodsList)
  // },
  methods: {
    imageLoad() {
      // 当图片加载完成，向事件总线发送一个名为itemImageLoad频道
      // 每当有图片加载完毕，都会发送一次
      // this.$bus.$emit('itemImageLoad')

      // GoodList组件复用，减少重复的发送，对使用中的组件进行判断并发送
      // 使用GoodList的有home和detail
      if(this.$route.path.indexOf('home') !==-1){
        this.$bus.$emit('homeItemImageLoad')
      }else if(this.$route.path.indexOf('/detail') !==-1){
        this.$bus.$emit('detailItemImageLoad')
      }
    },
    itemClick() {
      this.$router.push('/detail/'+this.goodsList.iid)
    }
  },
  computed: {
    showImg() {
      return this.goodsList.image || this.goodsList.show.img 
    }
  }
};
</script>
<style lang='less'>
.goods-item {
  padding-bottom: 40px;
  position: relative;

  width: 48%;

  img {
    width: 100%;
    border-radius: 5px;
  }
}

.goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;

  p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }
  .price {
    color: @color-high-text;
    margin-right: 20px;
  }
  .collect {
    position: relative;
  }

  .collect::before {
    content: "";
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
}

</style>