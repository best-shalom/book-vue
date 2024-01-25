<template>
  <div>
    <!--App通过main.js中的createApp(App)被渲染到 index.html 中的容器元素中，
    其中的mount('#app')就是指定了渲染的位置：id=app的元素中，通过这种方式将应用程序的 UI 显示给用户。-->
    <p>
      <router-link to="/">首页</router-link>
      <router-link to="/login">登录</router-link>
    </p>
    <!--路由匹配的组件（vue）将渲染在这里-->
    <router-view></router-view>
  </div>
</template>
<script setup>
</script>