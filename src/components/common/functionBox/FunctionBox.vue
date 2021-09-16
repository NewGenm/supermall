<template>
  <div class="function-box-bar">
    <div class="function-box-title">
      <slot name="titleSlot"></slot>
    </div>
    <div class="function-box-item">
      <div v-for="(item, index) in itemInfo" :key="index" class="item">
        <img :src="item.img" alt="">
        <span>{{item.text}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FunctionBox',
  props: {
    itemInfo: {
      type: Array,
      default() {
        return []
      }
    }
  }
}

</script>
<style scoped>
  .function-box-bar{
    display: flex;
    flex-direction: column;
  }
  .function-box-title{
    width: 90%;
    height: 40px;
    margin-left: 5%;
    line-height: 40px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  }
  /* .function-box-title span{
    display: inline-block;
  } */
  .left{
    float:left
  }
  .right{
    float: right;
  }
  .function-box-item{
    display: flex;
    justify-content: space-around;
    margin: 20px 0;
  }
  .function-box-item img{
    width: 25px;
  }
  .function-box-item span{
    display: block;
    font-size: 14px;
  }
  .item{
    width: 60px;
    text-align: center;
  }
</style>