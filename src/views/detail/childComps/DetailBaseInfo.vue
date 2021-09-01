<template>
  <!-- Object.keys(goods).length 检查该对象的内容是否为空 -->
  <div v-if="Object.keys(goods).length !==0" class="base-info">
    <div class="info-title">{{goods.title}}</div>
    <div class="info-price">
      <span class="n-price">{{goods.newPrice}}</span>
      <span class="o-price">{{goods.oldPrice}}</span>
      <span v-if="goods.discount" class="discount">{{goods.discount}}</span>
    </div>
    <div class="info-other">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[goods.services.length-1].name}}</span>
    </div>
    <div class="info-service">
      <span class="info-service-item" v-for="index in goods.services.length-1" :key="index">
        <img :src="goods.services[index-1].icon">
        <span>{{goods.services[index-1].name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBaseInfo",
  props: {
    goods: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}

</script>
<style lang='less' scoped>
  .base-info{
    margin-top: 15px;
    padding: 0 8px;
    color: #999;
    border-bottom: 5px solid #f2f5f8;
  }

  .info-title{
    color: #222;
  }

  .info-price {
    margin-top: 10px;
  }

  .info-price .n-price{
    font-size: 24px;
    color: @color-high-text;
  }

  .info-price .o-price {
    font-size: 13px;
    margin-left: 5px;
    text-decoration: line-through;
  }

  .discount{
    background-color: @color-high-text;
    font-size: 12px;
    color: #fff;
    padding: 2px;
    margin-left: 5px;
    vertical-align: text-top;
    border-radius: 5px;
  }

  .info-other{
    display: flex;
    flex: 1;
    justify-content: space-between;
    font-size: 14px;
  }

  .info-service{
    height: 48px;
    font-size: 14px;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .info-service-item img{
    height: 14px;
  }
</style>