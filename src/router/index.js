// 配置路由表，即定义每个 URL 路径与对应组件的映射关系。
//一、index.js：通常位于 src 目录下，是一个路由配置文件。在 Vue Router 中，index.js 文件用于定义应用的路由表，即指定每个 URL 路径与对应组件的映射关系。
// 这个文件主要负责配置路由，并创建 Vue Router 实例，最后将实例导出供其他组件使用。
// 一般情况下，你需要在这里引入 Vue Router、定义路由规则，并创建一个新的 Vue Router 实例。

//二、main.js：也位于 src 目录下，是应用的入口文件。在 Vue.js 应用中，main.js 负责初始化 Vue 实例，并将根组件渲染到指定的 DOM 元素中。
// 在 main.js 文件中，你需要引入 Vue、创建根组件，并在 Vue 实例中指定根组件以及挂载的 DOM 元素。
// 此外，main.js 也用于引入其他插件或库，配置全局设置，以及注册全局组件、指令等。
//综上所述，index.js 主要用于配置 Vue Router 的路由表，而 main.js 则是应用的入口文件，用于初始化 Vue 实例和进行一些全局的配置。
import {createRouter,createWebHistory} from 'vue-router'

import Login from "@/views/Login.vue";
import Home from "@/views/Home.vue";

// Vue2中使用Vue.use(VueRouter)使用路由：
// Vue.use(VueRouter) 是 Vue.js 官方推荐的一种使用 Vue 插件的方式。在这里，VueRouter 是 Vue.js 的一个插件，用于提供路由功能。
// 通过调用 Vue.use(VueRouter)，我们可以将 VueRouter 插件注册到 Vue.js 中，并使其在全局范围内可用。

// 定义路由表,指定每个 URL 路径与对应的组件。
const routes=[
    {
        path: '/',
        name: '首页',
        component: Home
    },
    {
        path:'/login',
        name: '登录',
        component:Login
    }
]

//创建一个新的 Vue Router 实例
const router=createRouter({
    // createWebHistory() 是 Vue Router 提供的一个函数，用于创建基于浏览器历史记录的路由模式。
    // 在 Vue Router 中，有两种常见的路由模式：哈希模式（Hash Mode）和历史模式（History Mode）。
    // 哈希模式使用 URL 中的 hash（#）来管理路由，例如 https://example.com/#/home。而历史模式则使用浏览器的历史记录 API 来管理路由，例如 https://example.com/home。
    history: createWebHistory(),
    routes
})

// 通过使用export default关键字，可以将router对象作为默认导出，并将其它文件中引入的名称与其绑定。这样，在引入该模块时，就可以直接使用绑定的名称来访问该路由实例。
export default router

// 问题：
// vue在地址栏输入localhost:8080/login，页面还是会停留在localhost的页面
// 实现地址栏访问
// 1.参考博客：https://www.jianshu.com/p/06b004c6772f
// vue 在页面上显示哪个组件是根据 vue-router 进行控制的，在地址栏上直接输入路由名称，并不能触发 vue-router 的规则，可以通过监听地址的改变，利用回调函数在组件内部进行动态修改路由。

// 2.参考博客：https://geek-docs.com/vuejs/vue-js-questions/582_vuejs_vue_direct_url_is_not_working_only_routerlink_click.html
// 在使用Vue.js开发单页面应用时，我们通常使用Vue Router来管理路由。Vue Router提供了路由器和路由器链接组件，使我们可以在应用中使用路由。
// 通常情况下，我们可以使用Vue Router的路由器链接组件router-link来链接到不同的页面。这样，当我们点击链接时，Vue Router会处理路由并渲染对应的组件。
// 然而，有时我们可能希望直接在浏览器的地址栏中输入URL以访问特定的页面。但是，在某些情况下，直接在URL中输入页面的路径并不起作用。相反，我们必须通过点击router-link来访问该页面。
// ***造成这个问题的原因是Vue.js应用通常是一个单页面应用，所有的页面都是在同一个HTML文件中渲染的。当我们直接在地址栏中输入URL时，浏览器会发送一个HTTP请求到服务器并获取HTML文件。然而，因为Vue.js应用是一个单页面应用，服务器只会返回同一个HTML文件，而不是请求的页面。