<template>
  <div>
    <div class="tab-bar-item" @click="btnClick">
      <div v-show="!isActive">
        <slot name="item-icon"></slot>
      </div>
      <div v-show="isActive">
        <slot name="item-icon2"></slot>
      </div>
      <div :style='isShowColor'>
        <slot name="item-text"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
    path: String,
    activeColor: {
      type: String,
      default: 'red'
    }
  },
  methods: {
    btnClick() {
      this.$router.replace(this.path).catch(err => {err})
    }
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.path) !== -1
    },
    isShowColor() {
      return this.isActive ? {color: this.activeColor} : {}
    }
  }
};
</script>
<style>
.tab-bar-item {
  justify-content: space-around;
  text-align: center;
  height: 49px;
  font-size: 14px;
}
.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  vertical-align: middle;
}
</style>