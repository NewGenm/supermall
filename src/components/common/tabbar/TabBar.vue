<template>
  <div>
    <div id="tab-bar">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBar",
};
</script>
<style scoped>
#tab-bar {
  display: flex;
  justify-content: space-around;
  background: #f6f6f6;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  box-shadow: 0px -2px 5px rgba(100, 100, 100, 0.1);
}
</style>