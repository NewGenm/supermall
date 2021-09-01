<template>
  <div id="app">
    <!-- exclude="xxx" xxx router不适用keep-alive，不会保存， include 只有这些适用 -->
    <keep-alive exclude='detail'>
      <router-view></router-view>
    </keep-alive>
    <!-- 显示footShow为true的route的下方选择栏 -->
    <main-tab-bar v-if="$route.meta.footShow"></main-tab-bar>
  </div>
</template>

<script>
import MainTabBar from 'components/content/MainTabBar/MainTabBar.vue'
export default {
  name: 'App',
  components: {
    MainTabBar
  }
}
</script>

<style>
</style>
