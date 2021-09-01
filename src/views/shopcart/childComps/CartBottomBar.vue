<template>
  <div class="cart-bottom-bar">
    <div class="checkAll">
      <check-button @click.native="checkAll" :isChecked="selectAll"></check-button>
      <span>全选</span>
    </div>
    <div>
      <span>合计{{ totalPrice }}</span>
    </div>
    <div class="calculate" @click="calcClick">去结算：{{ checkedLength }}</div>
  </div>
</template>

<script>
// 选中按钮
import CheckButton from "components/content/checkButton/CheckButton.vue";

export default {
  name: "CartBottomBar",
  components: {
    CheckButton,
  },
  computed: {
    // 先用filter筛选出选中的商品，再用reduce累加所以商品的价格(单价*数量)
    totalPrice() {
      return (
        "￥" +
        this.$store.state.cartList
          .filter((product) => {
            return product.checked === true;
          })
          .reduce((preValue, product) => {
            return preValue + product.price * product.count;
          }, 0)
      );
    },
    checkedLength() {
      return this.$store.state.cartList.filter((product) => {
        return product.checked === true;
      }).length;
    },
    // 如果商品中有没有选中的，全选取消
    selectAll() {
      return this.$store.state.cartList.every(
        (product) => product.checked === true
      ) && this.$store.state.cartList.length >0;
    },
  },
  methods: {
    calcClick() {
      console.log("结算");
    },
    checkAll() {
      // for (const item of this.$store.state.cartList) {
      //   item.checked = true
      // }
      this.$store.dispatch('checkAll',this.selectAll)
    },
  },
};
</script>
<style scoped>
.cart-bottom-bar {
  width: 100%;
  height: 40px;
  background-color: #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.cart-bottom-bar span {
  display: inline-block;
}
.checkAll {
  display: flex;
  margin-left: 10px;
}
.checkAll span {
  margin-left: 5px;
}
.calculate {
  width: 90px;
  height: 40px;
  line-height: 40px;
  background: red;
  color: #fff;
  text-align: center;
}
</style>