<template>
  <div class="login">
    <div class="back" @click="back">
      <img src="~assets/img/common/back.svg" alt="">
    </div>
    <div class="title">
      <span>登陆</span>
    </div>
    <div class="login-box">
      <div class="user-ID">
         <label for="ID">账号：</label>
        <input type="text" id="ID" placeholder="手机号/邮箱/账号" ref="ID"/>
      </div>
      <div class="password">
        <label for="password">密码：</label>
        <input :type="hide" id="password" ref="password"/>
        <!-- <a href="#" id="passwordeye" class="invisible"></a> -->
        <img src="~assets/img/profile/invisible.svg" alt="" 
            class="invisible" v-show="!show" @click="isShow">
        <img src="~assets/img/profile/visible.svg" alt="" 
            class="visible" v-show="show" @click="isShow">
      </div>
    </div>
    <div class="login-button">
      <input type="button" value="登陆" @click="login">
      <span  @click="register">如果没有账号，请去注册</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      show: false,
      loginAccount: {},
    }
  },
  methods: {
    back() {
      this.$router.back()
    },
    login() {
      // console.log('登陆')
      this.loginAccount.ID = this.$refs.ID.value
      this.loginAccount.password = this.$refs.password.value
      this.$store.dispatch('loginAccount',this.loginAccount).then((res) => {
        this.$toast.show(res, 1000)
        setTimeout(() => {
          this.$router.replace('/profile')
        }, 1500);
      }).catch((res) => {
        this.$toast.show(res, 1000)
      })
    },
    register() {
      this.$router.push('/Register')
    },
    isShow() {
      this.show = !this.show
    }
  },
  computed: {
    hide() {
      return this.show ? 'text' : 'password'
    }
  }
};
</script>
<style scoped>
.login {
  height: 100vh;
  background-color: rgb(17, 221, 221);
  position: relative;
}
.back{
  width: 45px;
  height: 45px;
  line-height: 55px;
  text-align: center;
  /* background-color: white; */
  /* position: absolute;
  top: 2%;
  left: 2%; */
}
.title{
  width: 100px;
  height: 50px;
  line-height: 50px;
  border: 1px rgba(0, 0, 0, 0.3) solid;
  border-radius: 20px;
  position: absolute;
  top: 5%;
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
  text-align: center;
}
.login-box{
  width: 80%;
  height: 15%;
  background-color: white;
  border: 1px rgba(0, 0, 0, 0.3) solid;
  border-radius: 20px;
  position: absolute;
  top: 18%;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
}
.login-box div{
  margin-top: 6%;
}

.password{
  position: relative;
}
.login-button{
  position: absolute;
  top: 38%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
}
.login-button input {
  margin-bottom: 10px;
}
.login-button span {
  font-size: 14px;
}
.invisible{
  width: 20px;
  height: 20px;
  /* background-color: violet; */
  position: absolute;
  top: 10%;
  left: 84%;
}
.visible{
  width: 20px;
  height: 20px;
  position: absolute;
  top: 10%;
  left: 84%;
}
</style>