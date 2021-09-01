<template>
  <div class="cart">
    <cart-nav-bar></cart-nav-bar>
    <cart-list></cart-list>
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
// 顶部栏
import CartNavBar from 'views/shopcart/childComps/CartNavBar.vue'
// 购物车商品列表
import CartList from 'views/shopcart/childComps/CartList.vue'
// 底部价格栏
import CartBottomBar from 'views/shopcart/childComps/CartBottomBar.vue'

export default {
  name: 'Shopcart',
  components: {
    CartNavBar,
    CartList,
    CartBottomBar
  }
}

</script>
<style scoped>
  .cart{
    height: 100vh;
  }
</style>