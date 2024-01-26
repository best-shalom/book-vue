import {createApp} from 'vue'
import App from './App.vue'
import router from '@/router/index.js'
import api from '@/api/index'

// ant-design：全局完整注册,然后就可以把原生的html组件改成它的组件：https://www.antdv.com/components/button-cn
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'

// 使用 createApp() 函数来创建一个应用程序实例，函数接受一个组件作为参数，并返回一个应用程序实例。
const app = createApp(App)

// 通过 app.use() 方法将其需要的组件注册到 Vue 应用中。
app.use(router)
// 需要使用 app.use(Antd)，而不是将其作为 app.use() 的第二个参数传入
app.use(Antd)

// 使用 app.mount('#app') 将App挂载到index.html中id为app的元素上，在其中查看发现对应为页面的body
app.mount('#app')

// 在main.js中导入index.js，将api对象设置为app的全局属性
app.config.globalProperties.$api = api


