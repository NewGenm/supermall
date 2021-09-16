import Vue from 'vue'
import Vuex from 'vuex'

// 1.安装插件
Vue.use(Vuex)

// 2.创建store对象
import mutations from './mutations.js'
import actions from './actions.js'
import getters from './getters';
const store = new Vuex.Store({
  state:{
    cartList: [],
    userInfo: [
      {
        ID: 'abc',
        name: 'genm',
        password: '123456'
      }
    ],
    userName: '未登录',
    
  },
  // mutations的唯一目的是修改state中的状态，并且尽可能的每一个方法修改一个状态
  mutations,
  // 负责处理和判断条件，并将结果发送到mutations中
  actions,
  getters,
})

// 3.挂载vue实例上
export default store