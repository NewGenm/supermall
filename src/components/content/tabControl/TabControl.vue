<template>
  <div class="tab-control">
    <div class="tab-control-item" 
    :class="{active: currentIndex === index}"
    v-for="(item, index) in titles" :key="index"
    @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
    

  </div>
</template>

<script>
export default {
  name: "TabControl",
  data() {
    return {
      currentIndex : 0
    }
  },
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    itemClick(index) {
        this.currentIndex = index;
        this.$emit('tabClick',index)
      }
  }
};
</script>
<style lang='less' scoped>
   .tab-control {
    display: flex;
    text-align: center;
    font-size: 14px;
    height: 40px;
    line-height: 40px;
    background-color: #fff;
    z-index: 99;

    .tab-control-item {
      flex: 1;

      span{
        padding: 5px;
      }
    }

    .active{
      color: @color-high-text;

      span{
        border-bottom: 3px solid @color-high-text;
      }
    }
  }
  
</style>