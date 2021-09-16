<template>
  <div class="my-order-bar">
    <function-box :itemInfo='itemInfo'>
      <div slot="titleSlot">
        <span class="left">我的订单</span>
        <span class="right">全部</span>
      </div>
    </function-box>
  </div>
</template>

<script>
import FunctionBox from 'components/common/functionBox/FunctionBox.vue';
export default {
  name: 'MyOrder',
  components: {
    FunctionBox
  },
  data() {
    return {
      itemInfo: [
        {
          img: require("assets/img/profile/order/payment.svg"),
          text: "待付款"
        },
        {
          img: require("assets/img/profile/order/delivery.svg"),
          text: "待发货"
        },
        {
          img: require("assets/img/profile/order/takeDelivery.svg"),
          text: "待收货"
        },
        {
          img: require("assets/img/profile/order/evaluate.svg"),
          text: "评价"
        },
        {
          img: require("assets/img/profile/order/postSale.svg"),
          text: "售后"
        }
      ]
    }
  },
}

</script>
<style scoped>
  .my-order-bar{
    width: 90%;
    background-color: white;
    position: absolute;
    top: 30%;
    left: 5%;
    border-radius: 20px;
  }
</style>