<template>
  <div class="cart-list">
    <scroll class="wrapper" ref="scroll">
      <cart-list-item v-for="(item, index) in cartList" :key="index" :product='item'>    
      </cart-list-item>
    </scroll>
  </div>
</template>

<script>
// 单个商品
import CartListItem from './CartListItem.vue';

// 滚动组件
import Scroll from "components/common/scroll/Scroll.vue";

// mapGetters辅助函数
import { mapGetters } from 'vuex';

export default {
  name: 'CartList',
  components: {
    CartListItem,
    Scroll,
  },
  computed: {
    ...mapGetters(['cartList'])
  },
  activated() {
    this.$refs.scroll.refresh()
  }
}

</script>
<style scoped>
  .cart-list{
    height: calc(100% - 44px - 49px - 40px);
  }
  .wrapper{
    height: 100%;
    overflow: hidden;
  }
</style>