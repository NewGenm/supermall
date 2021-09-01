import Toast from './Toast.vue';
// 创建一个对象
const obj = {}
// 在main.js中用Vue.use()会调用该对象中的install函数
obj.install = function (Vue) {
  // 1.创建组件的构造器
  const toastContrustor = Vue.extend(Toast)

  // 2.new的方式，根据组件构造器，可以创建出来一个vue的组件对象
  const toast = new toastContrustor

  // 3.将组件组件对象，手动挂载到某一个元素上
  toast.$mount(document.createElement('div'))

  // 4.toast.$el对应的就是第三部创建的div
  document.body.appendChild(toast.$el)

  // 将toast写入vue原型中，方便调用里面的功能
  Vue.prototype.$toast = toast
}

export default obj