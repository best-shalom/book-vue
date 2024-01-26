<script>
export default {
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
      showAlert: false
    }
  },
  methods: {
    // axios.post 是一个异步操作，代码会继续往下执行而不会等待异步操作完成。
    // 你可以使用 async/await 关键字来解决该问题。将 login 方法的定义改为 async 函数，然后在 axios.post 前加上 await 关键字，以便等待异步操作完成后再执行下一步操作。
    // async: 在函数声明时加上 async 关键字，表示该函数是一个异步函数，即该函数内部可能包含异步操作。
    // await: 在异步函数内部，可以使用 await 关键字来等待一个 Promise 对象完成，并返回其结果。在遇到 await 的地方，代码会暂停执行，直到 Promise 完成或拒绝。
    async login() {
      // 实际的请求 URL 将会是 http://localhost:8080/api/user/login，由代理转发到后端的 /user/login 接口
      try {
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
        this.$api.login(params).then(response => {
          if (response.data.code === 0) {
            // 如果验证失败，则显示错误信息
            console.log(response.data.msg)
            this.error = response.data.msg
            this.showAlert = true
          } else {
            console.log("登录成功")
          }
        })

      } catch (error) {
        this.error = "异常错误"
        this.showAlert = true
      } finally {
        // 结束加载
        this.loading = false
      }
    }
  }

};
</script>

<template>
  <!--使用ant-design组件库：https://www.antdv.com/docs/vue/getting-started-cn
  npm i --save ant-design-vue@next：安装 ant-design-vue 的最新预发布版本，并将其添加到 package.json 文件中-->
  <div>
    <a-page-header>登录页面</a-page-header>
    <a-form :model="loginForm">
      <a-form-item :rules="[{required:true,message:'输入账号'}]" label="账号" name="account">
        <!--antd使用model指令来实现表单项与数据的双向绑定。
        即model对应的loginForm指的是script中的data，通过绑定loginForm.account，使输入框中的值传入data中-->
        <a-input v-model="loginForm.account"/>
      </a-form-item>
      <!--当你使用 v-model 绑定表单值时，需要确保 <a-form-item> 组件中的 name 属性与表单对象中的字段名称相匹配。
      这样，当调用表单验证方法时，验证器就能根据 name 属性找到对应的字段，并对其进行验证。-->
      <a-form-item :rules="[{required:true,message:'输入密码'}]" label="密码" name="password">
        <a-input-password v-model="loginForm.password"/>

      </a-form-item>
      <!--登录按钮使用了 @click 指令来监听点击事件，并将其绑定到 login 方法上，当用户点击登录按钮时，就会触发点击事件，然后自动调用组件中定义的 login 方法。
      将 loading 属性绑定到登录按钮的 :loading 特性上，可以动态控制按钮的加载状态。-->
      <a-button :loading="loading" type="primary" @click="login">登录</a-button>
    </a-form>

    <!--根据 showAlert 的值来决定是否显示 a-alert 组件；
    closable使关闭按钮可以显示（默认不显示）
    使用:message动态的为警告框添加error的内容；
    点击关闭后时设置为false，即不显示-->
    <a-alert v-if="showAlert" :message="'登录失败：'+error" closable type="warning" @close="showAlert=false"/>
  </div>
</template>

<style scoped>

</style>
