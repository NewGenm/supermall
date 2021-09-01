<template>
  <div class="check-button">
    <div class="selector" :class="{ check: isChecked }">
      <img src="~assets/img/cart/tick.svg" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: "CheckButton",
  props: {
    isChecked: {
      type: Boolean,
      default:false
    },
  },
};
</script>
<style scoped>
.selector {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 2px solid #ccc;
  margin-right: 5px;
}
.check {
  background-color: red;
}
</style>