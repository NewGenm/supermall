<template>
  <div>
    <nav-bar class="detail-nav">
      <div slot="left" id="left" @click="back">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center">
        <span 
        v-for="(item, index) in titles" :key="index" 
        @click="itemClick(index)"
        :class="{active: currentIndex === index}">
          {{item}}
        </span>
      </div>
    </nav-bar>
  </div>
</template>

<script>
// 顶部栏
import NavBar from 'components/common/navbar/NavBar.vue'

export default {
  name: "DetailNavBar",
  data() {
    return {
      currentIndex : 0,
    }
  },
  props:{
    // 导航栏文字
    titles:{
      type: Array,
      default() {
        return []
      }
    },
  },
  components: {
    NavBar
  },
  methods: {
    // 点击左箭头返回
    back() {
      this.$router.back()
    },
    itemClick(index) {
      this.currentIndex = index
      this.$emit('itemClick',index)
    },
  },
}

</script>
<style lang='less' scoped>
  
  img{
    text-align:center;
    vertical-align:middle;
  }
    
  span{
    margin-left: 18px;
    font-size: 14px;
    
    
  }

  .active{
      color: @color-high-text;
  }
  
</style>