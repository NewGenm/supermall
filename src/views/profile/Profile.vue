<template>
  <div class="profile">
    <div class="top-img">
      <img src="~assets/img/profile/userBG_750x229.png" alt="" />
    </div>
    <profile-top-bar></profile-top-bar>
    <my-order></my-order>
    <my-settings></my-settings>
    <div class="user-account" @click="login">
      <span>登陆</span>
    </div>
  </div>
</template>

<script>
// 用户栏
import ProfileTopBar from 'views/profile/childComps/ProfileTopBar.vue';
// 我的订单
import MyOrder from 'views/profile/childComps/MyOrder.vue';
// 我的设置
import MySettings from 'views/profile/childComps/MySettings.vue';
export default {
  name: "Profile",
  components: {
    ProfileTopBar,
    MyOrder,
    MySettings
  },
  methods: {
    login() {
      this.$router.push('/Login')
    }
  }
};
</script>
<style scoped>
  .profile{
    height: 100vh;
    background-color: rgba(190, 190, 190, 0.2);
  }
  .top-img img{
    width: 100%;
  }
  .user-account{
    width: 90%; 
    height: 6%;
    /* line-height: 5%; */
    position: absolute;
    bottom: 20%;
    left: 5%;
    background-color: #ff8189;
    border-radius: 20px;
  }
  .user-account span{
    color: white;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

</style>