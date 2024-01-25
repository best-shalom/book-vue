import { createApp } from 'vue'
import App from './App.vue'
import router from  '@/router/index.js'

// 使用 createApp() 函数来创建一个应用程序实例，函数接受一个组件作为参数，并返回一个应用程序实例。
const app = createApp(App)
// 通过 app.use() 方法将其注册到 Vue 应用中。
app.use(router)
// 使用 app.mount('#app') 将App挂载到index.html中id为app的元素上，在其中查看发现对应为页面的body
app.mount('#app')
