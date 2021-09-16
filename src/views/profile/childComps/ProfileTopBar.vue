<template>
  <div class="top-bar">
    <div class="user-avatar">
      <img src="~assets/img/profile/vip.svg" alt="">
    </div>
    <div class="user-ID">
      <span>{{this.$store.state.userName}}</span>
    </div>
      <img src="~assets/img/profile/vip_1404x216.png" alt="" class="vip_sign">

  </div>
</template>

<script>
export default {
  name: 'ProfileTopBar'
}

</script>
<style scoped>
  .top-bar{
    width: 90%;
    height: 8rem;
    background-color: white;
    /* border: 1px black solid; */
    position: relative;
    top: -67px;
    left: 18px;
    border-radius: 20px;
    /* overflow: hidden; */
  }
  .user-avatar{
    height: 70px;
    width: 70px;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    border: 1px solid black;
  }
  .user-avatar img{
    width: 70px;
    /* height: 80px; */
  }
  .user-ID{
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .vip_sign{
    width: 100%;
    position: absolute;
    bottom: 0%;
    border-radius: 0 0 20px 20px;
  }
</style>