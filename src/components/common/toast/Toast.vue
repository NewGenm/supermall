<template>
  <div class="show" v-show="isShow">
    <div>{{ message }}</div>
  </div>
</template>

<script>
export default {
  name: "Toast",
  // props: {
  //   message: {
  //     type: String,
  //     default() {
  //       return '默认提示'
  //     }
  //   }
  // }
  data() {
    return {
      isShow: false,
      message: "默认提示",
    };
  },
  methods: {
    show(message, delay) {
      this.isShow = true;
      this.message = message;
      setTimeout(() => {
        this.isShow = false;
      }, delay);
    },
  },
};
</script>
<style>
.show {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 8px 10px;
  z-index: 999;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.75);
}
</style>