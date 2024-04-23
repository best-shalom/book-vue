<!--全局设置-->
<template>
  <div>
    <!--App通过main.js中的createApp(App)被渲染到 index.html 中的容器元素中，
    其中的mount('#app')就是指定了渲染的位置：id=app的元素中，通过这种方式将应用程序的 UI 显示给用户。-->
    <!--页面路由按钮-->
    <!--<router-link to="/login">登录</router-link>-->
    <!--路由匹配的组件（vue）渲染-->
    <router-view></router-view>
  </div>
</template>
<script setup>
</script>


