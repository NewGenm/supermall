<template>
  <div class="register">
    <div class="back" @click="back">
      <img src="~assets/img/common/back.svg" alt="" />
    </div>
    <div class="title">
      <span>注册</span>
    </div>
    <div class="register-box">
      <div class="user-namne">
        <label for="name">输入昵称：</label>
        <input type="text" id="name" ref="name" />
      </div>
      <div class="user-ID">
        <label for="ID">输入账号：</label>
        <input type="text" id="ID" placeholder="手机号/邮箱/账号" ref="ID" />
      </div>
      <div class="password">
        <label for="password">输入密码：</label>
        <input :type="hide" id="password" ref="password" />
        <img
          src="~assets/img/profile/invisible.svg"
          alt=""
          class="invisible"
          v-show="!show"
          @click="isShow"
        />
        <img
          src="~assets/img/profile/visible.svg"
          alt=""
          class="visible"
          v-show="show"
          @click="isShow"
        />
      </div>
      <div class="password-again">
        <label for="password-again">确认密码：</label>
        <input :type="hide2" id="password-again" ref="passwordAgain" />
        <img
          src="~assets/img/profile/invisible.svg"
          alt=""
          class="invisible"
          v-show="!show2"
          @click="isShow2"
        />
        <img
          src="~assets/img/profile/visible.svg"
          alt=""
          class="visible"
          v-show="show2"
          @click="isShow2"
        />
        <span class="checkPassword" v-show="!samePassword"
          >两次输入的密码不同，请重新输入</span
        >
      </div>
    </div>
    <div class="register-button">
      <input type="button" value="注册" @click="register" />
      <span @click="login">如果完成注册，请去登陆</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      show: false,
      show2: false,
      userInfo: {},
      samePassword: true,
    };
  },
  methods: {
    back() {
      this.$router.back();
    },
    register() {
      // console.log('注册')
      this.userInfo.name = this.$refs.name.value;
      this.userInfo.ID = this.$refs.ID.value;
      this.userInfo.password = this.$refs.password.value;

      if (this.$refs.password.value === this.$refs.passwordAgain.value) {
        this.$store.dispatch("createdAccount", this.userInfo).then((res) => {
          this.samePassword = true
          this.$toast.show(res, 1000);
          setTimeout(() => {
            this.$router.replace("/Login");
          }, 1500);
        });
      }else{
        this.samePassword = false
      }
    },
    login() {
      this.$router.replace("/Login");
    },
    isShow() {
      this.show = !this.show;
    },
    isShow2() {
      this.show2 = !this.show2;
    }
  },
  computed: {
    hide() {
      return this.show ? "text" : "password";
    },
    hide2() {
      return this.show2 ? "text" : "password";
    },
  },
};
</script>
<style scoped>
.register {
  height: 100vh;
  background-color: rgb(17, 221, 221);
  position: relative;
}
.back {
  width: 45px;
  height: 45px;
  line-height: 55px;
  text-align: center;
  /* background-color: white; */
  /* position: absolute;
  top: 2%;
  left: 2%; */
}
.title {
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
.register-box {
  width: 80%;
  height: 28%;
  background-color: white;
  border: 1px rgba(0, 0, 0, 0.3) solid;
  border-radius: 20px;
  position: absolute;
  top: 18%;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
}
.register-box div {
  margin-top: 6%;
}
.password {
  position: relative;
}
.password-again {
  position: relative;
}
.checkPassword {
  color: red;
  font-size: 12px;
  position: absolute;
  left: 9%;
  bottom: -70%;
}
.register-box input {
  width: 160px;
}
.register-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  /* justify-content: space-around; */
  align-items: center;
}
.register-button input {
  width: 50px;
  margin-bottom: 10px;
}
.register-button span {
  font-size: 14px;
}
.invisible {
  width: 20px;
  height: 20px;
  position: absolute;
  top: 10%;
  left: 83%;
}
.visible {
  width: 20px;
  height: 20px;
  position: absolute;
  top: 10%;
  left: 83%;
}
</style>