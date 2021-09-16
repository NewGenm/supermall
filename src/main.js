import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/css.less'
import toast from 'components/common/toast'
import FastClick from 'fastclick';
import VueLazyload from "vue-lazyload";

Vue.config.productionTip = false

// 事件总线方法，用来处理兄弟组件之间的数据通讯
//  在vue原型中添加名为.$bus的vue实例
// 这种方式初始化的 bus 是一个全局的事件总线
// 之后兄弟组件之间用$emit传输，用$on监听
Vue.prototype.$bus = new Vue

// 解决移动端的300毫秒延迟
// 1.终端中安装fastclick  npm install fastclick
// 2.import引入fastclick
// 3.调用attch方法
// FastClick.attach(document.body)

// 图片懒加载
// 1.安装 npm install vue-lazyload --save
// 2.import 引入VueLazyload
// 3.vue.use使用
// 4.在img标签中 将;src改为 v-lazy
Vue.use(VueLazyload, {
  // 配置，未加载时的占用图片，更多配置看官方文档
  loading: require('./assets/img/common/placeholder.png')
})

// 安装自定义的toast插件
Vue.use(toast)

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
