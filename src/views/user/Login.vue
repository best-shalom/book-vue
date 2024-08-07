<template>
  <!--使用ant-design组件库：https://www.antdv.com/docs/vue/getting-started-cn
  npm i --save ant-design-vue@next：安装 ant-design-vue 的最新预发布版本，并将其添加到 package.json 文件中-->
  <div class="login-container">
    <!--通过在 ConfigProvider 中传入 theme，可以配置主题:https://www.antdv.com/docs/vue/customize-theme-cn-->
    <a-config-provider
        :theme="{
      token: {
        colorPrimary: '#333333',
      },
    }"
    >
    </a-config-provider>

    <!--a-row:创建一个行容器,a-row组件可以包含多个a-col（列）组件，用于在网格系统中进行布局
    a-col:用于创建网格系统中的列-->
    <a-row class="login-main">
      <a-col class="back-container">
        <img alt="登录框背景" src="../../assets/img.png">
      </a-col>
      <a-col class="form-container">
        <div class="title">登录</div>
        <!--
    :model="loginForm"：将loginForm作为表单的数据模型，方便对表单数据进行管理和处理
    :label-col：设置表单项的标签宽度
    :wrapper-col：设置表单项的内容宽度-->
        <a-form :model="loginForm" :rules="rules">
          <a-form-item name="account">
            <span class="gray">账号</span>
            <!--antd使用model指令来实现表单项与数据的双向绑定。
            即model对应的loginForm指的是script中的data，通过绑定loginForm.account，使输入框中的值传入data中-->
            <a-input v-model:value="loginForm.account"/>
          </a-form-item>
          <!--当你使用 v-model 绑定表单值时，需要确保 <a-form-item> 组件中的 name 属性与表单对象中的字段名称相匹配。
          这样，当调用表单验证方法时，验证器就能根据 name 属性找到对应的字段，并对其进行验证。-->
          <a-form-item name="password">
            <span class="gray">密码</span>
            <a-input-password v-model:value="loginForm.password"/>
          </a-form-item>
          <!--登录按钮使用了 @click 指令来监听点击事件，并将其绑定到 login 方法上，当用户点击登录按钮时，就会触发点击事件，然后自动调用组件中定义的 login 方法。
          将 loading 属性绑定到登录按钮的 :loading 特性上，可以动态控制按钮的加载状态。-->
          <a-form-item>
            <a-button :loading="loading" type="primary" @click="login">登录</a-button>
            <router-link to="/register">
              <a-button class="register-button">注册</a-button>
            </router-link>
          </a-form-item>
        </a-form>
      </a-col>
    </a-row>


    <!--根据 showAlert 的值来决定是否显示 a-alert 组件；
    closable使关闭按钮可以显示（默认不显示）
    使用:message动态的为警告框添加error的内容；
    点击关闭后时设置为false，即不显示-->
    <!--
    :class 绑定
    :class 是 Vue.js 中用于动态绑定 class 的指令。它可以接受一个对象、数组或字符串作为参数，用于动态地添加或移除元素的类名。
    使用 :class 可以根据数据的变化动态地添加或移除类名，从而改变元素的样式。
    class 静态绑定
    class 是 HTML 中的属性，用于静态地为元素添加一个或多个类名。这些类名不会随着数据的变化而改变。
    使用 class 可以在不需要动态绑定的情况下为元素添加类名。-->
    <a-alert v-if="showAlert" :message="'登录失败：'+error" class="alert alert-warning" closable
             type="warning"
             @close="showAlert=false"/>
    <!--在 App.vue 或其他主组件的模板中，使用 <Alert /> 标签或者通过动态组件引入，确保警告框（alert）组件能够被正确添加到DOM中
    目前在request.js中无法让Alert被注册，那它就无法mount，eventBus就无法监听show-alert事件，
    全局事件总线中监听不到show-alert事件，那在使用eventBus.emit('show-alert', message)时，
    就缺少show-alert事件从而报错 Cannot read properties of undefined (reading 'msg')，无法触发报错弹框。
    而在Login.vue中，Alert组件被注册，所以此时的DOM中就挂载了Alert组件，可以监听show-alert事件，从而显示报错弹框。-->
    <Alert/>
  </div>
</template>

<script>
import {theme} from "ant-design-vue";
import router from "@/router";

export default {
  computed: {
    theme() {
      return theme
    }
  },
  data() {
    // data 函数返回了一个对象，该对象包含了组件中需要使用的数据，即 username 和 password。
    // 这两个数据属性用于绑定到页面的输入框上，以便用户输入用户名和密码。
    return {
      loginForm: {
        account: '',
        password: '',
      },
      error: '',
      loading: false,
      showAlert: false,
      // 填写内容的规则校验
      rules: {
        // trigger 的值选 blur ，即失去焦点时进行验证。
        account: {required: true, message: '请输入账号', trigger: 'blur'},
        password: {required: true, message: '请输入密码', trigger: 'blur'}
      }
    }
  },
  methods: {
    // axios.post 是一个异步操作，代码会继续往下执行而不会等待异步操作完成。
    // 你可以使用 async/await 关键字来解决该问题。将 login 方法的定义改为 async 函数，然后在 axios.post 前加上 await 关键字，以便等待异步操作完成后再执行下一步操作。
    // async: 在函数声明时加上 async 关键字，表示该函数是一个异步函数，即该函数内部可能包含异步操作。
    // await: 在异步函数内部，可以使用 await 关键字来等待一个 Promise 对象完成，并返回其结果。在遇到 await 的地方，代码会暂停执行，直到 Promise 完成或拒绝。
    async login() {
      try {
        // 实际的请求 URL 将会是 http://localhost:8080/api/user/login，由代理转发到后端的 /user/login 接口
        console.log('登录')
        // 当用户点击登录按钮时，在调用登录方法之前，将 loading 设置为 true，以使按钮进入加载状态。然后，在异步请求完成后，无论是成功还是失败，都将 loading 设置为 false，以结束加载状态。
        this.loading = true
        // 向后端发送 POST 请求，验证用户名和密码
        // this.$api访问main.js中配置的全局变量，用于访问api中的接口
        const params = {
          account: this.loginForm.account,
          password: this.loginForm.password
        }
        console.log(params)
        // 使用 then 方法处理返回的 Promise 对象。
        // 在 then 方法中，我们从 response 对象中读取了 status 和 data 属性，分别表示响应状态码和响应数据。
        // response => { } 是作为 then 方法的回调函数传递的。当 Promise 对象被成功解析后，即请求成功时，该回调函数会被调用，并将响应对象作为参数传递给它。你可以在这个回调函数中编写处理响应的逻辑。
        this.$api.user.login(params).then(() => {
          router.push('/home')
        })
      } finally {
        this.loading = false;
        // 清空输入框
        this.loginForm.account = '';
        this.loginForm.password = '';
      }
    }
  }

};
</script>

<style scoped>

.login-container {
  height: 100vh;
  background: url("@/assets/background.svg");
  background-size: cover;
}

.login-main {
  position: absolute; /* 设置为绝对定位 */
  top: 50%; /* 在垂直方向上居中显示，距离顶部50% */
  left: 50%; /* 在水平方向上居中显示，距离左侧50% */
  box-shadow: 0 8px 19px 2px rgba(0, 0, 0, 0.16); /* 添加阴影效果 */
  border-radius: 20px; /* 设置圆角边框半径为20px */
  background: #FFFFFF; /* 设置背景颜色为白色 */
  width: 800px; /* 设置宽度为800px */
  transform: translate(-50%, -50%); /* 使用通用的平移变换方法，在垂直和水平方向上均向左上方偏移50% */

  .back-container {
    height: 500px;

    img {
      border-radius: 18px 0 0 18px; /* 设置圆角边框，左侧为18px，右侧为0 */
      display: inline-block; /* 设置为行内块元素,使其与文本内容对齐。 */
      height: 100%; /* 设置高度为100% */
      width: 100%; /* 设置宽度为100% */
      background-size: cover; /* 设置背景大小为覆盖整个容器 */
    }
  }

  .form-container {
    margin-top: 30px; /* 设置上边距为30像素 */
    padding: 0 50px; /* 设置左右内边距为50像素，上下内边距为0 */
    width: 350px;

    .title {
      padding: 36px 0 20px 0;
      font-size: 30px;
      text-align: center; /* 文字居中 */
      color: #333333;
    }

    .gray {
      color: gray;
    }

    .register-button {
      left: 10%;
    }
  }
}
</style>
