<template>
  <div>
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
  </div>
</template>

<script>
// 顶部栏
import NavBar from "components/common/navbar/NavBar.vue";

// mapGetters辅助函数
import { mapGetters } from 'vuex';

export default {
  name: "CartNavBar",
  components: {
    NavBar,
  },
  computed: {
    // 快速使用vuex中的getters，将 store 中的 getter 映射到局部计算属性
    ...mapGetters(['cartLength'])
  }
};
</script>
<style lang='less' scoped>
  .nav-bar{
    background-color: @color-tint;
    color: #fff;
  }
</style>