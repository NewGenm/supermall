<template>
  <div class="my-settings-bar">
    <function-box :itemInfo='itemInfo'>
      <div slot="titleSlot">
        <span class="left">我的设置</span>
      </div>
    </function-box>
  </div>
</template>

<script>
import FunctionBox from 'components/common/functionBox/FunctionBox.vue';
export default {
  name: 'MySettings',
  components: {
    FunctionBox
  },
  data() {
    return {
      itemInfo: [
        {
          img: require("assets/img/profile/option/signIn.svg"),
          text: "签到"
        },
        {
          img: require("assets/img/profile/option/customer.svg"),
          text: "客服"
        },
        {
          img: require("assets/img/profile/option/manage.svg"),
          text: "设置"
        },
        {
          img: require("assets/img/profile/option/orientation.svg"),
          text: "定位"
        },
        {
          img: require("assets/img/profile/option/recharge.svg"),
          text: "充值"
        },
      ]
    }
  },
}

</script>
<style scoped>
  .my-settings-bar{
    width: 90%;
    background-color: white;
    position: absolute;
    top: 52%;
    left: 5%;
    border-radius: 20px;
  }
</style>