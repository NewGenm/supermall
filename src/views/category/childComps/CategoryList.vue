<template>
  <div class="category-list">
    <div 
      v-for="(item, index) in categoryList" 
      :key="index" 
      class="title"
      @click="itemClick(item, index)"
      :class="{active : index === currentIndex}"
      >
      {{ item.title }}
    </div>
  </div>
</template>

<script>
export default {
  name: "CategoryList",
  props: {
    categoryList: {
      type: Array,
      default() {
        return [];
      },
    },
    currentIndex: {
      type: Number,
      default() {
        return 0
      }
    }
  },
  data() {
    return {
      
    }
  },
  methods: {
    // 发送点击函数
    itemClick(item, index) {
      this.$emit('itemClick', item, index)
    }
  },
};
</script>
<style scoped>
.category-list {
  background-color: 	#f1f1f1;
  width: 85px;
  line-height: 50px;
  text-align: center;
  font-size: 14px;
}
.title{
  height: 50px;
}
.active{
  background-color: #fff;
}
</style>