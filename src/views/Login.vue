<script>
  export default {
    data(){
      // data 函数返回了一个对象，该对象包含了组件中需要使用的数据，即 username 和 password。
      // 这两个数据属性用于绑定到页面的输入框上，以便用户输入用户名和密码。
      return {
        account: '',
        password: '',
        error:''
      }
    },
    methods:{
      // axios.post 是一个异步操作，代码会继续往下执行而不会等待异步操作完成。
      // 你可以使用 async/await 关键字来解决该问题。将 login 方法的定义改为 async 函数，然后在 axios.post 前加上 await 关键字，以便等待异步操作完成后再执行下一步操作。
      // async: 在函数声明时加上 async 关键字，表示该函数是一个异步函数，即该函数内部可能包含异步操作。
      // await: 在异步函数内部，可以使用 await 关键字来等待一个 Promise 对象完成，并返回其结果。在遇到 await 的地方，代码会暂停执行，直到 Promise 完成或拒绝。
      async login(){
        // 实际的请求 URL 将会是 http://localhost:8080/api/user/login，由代理转发到后端的 /user/login 接口
        try{
          console.log('登录')
          // 向后端发送 POST 请求，验证用户名和密码
          // this.$api访问main.js中配置的全局变量，用于访问api中的接口
          const params={
            account: this.account,
            password:this.password
          }
          console.log(params)
          // 使用 then 方法处理返回的 Promise 对象。
          // 在 then 方法中，我们从 response 对象中读取了 status 和 data 属性，分别表示响应状态码和响应数据。
          // response => { } 是作为 then 方法的回调函数传递的。当 Promise 对象被成功解析后，即请求成功时，该回调函数会被调用，并将响应对象作为参数传递给它。你可以在这个回调函数中编写处理响应的逻辑。
          this.$api.login(params).then(response=>{
            if(response.data.code===0){
              // 如果验证失败，则显示错误信息
              console.log(response.data.msg)
              this.error=response.data.msg
            }
            else {
              console.log("登录成功")
            }
          })

        }catch (error){
          this.error="异常错误"
        }
      }
    }

  };
</script>

<template>
  <div>
    <h1>登录页面</h1>
    <!--https://blog.csdn.net/weixin_44628177/article/details/123629467
    解决：console.log 一闪而过,添加actions-->
    <form id="form" action="#">
      <div>
        <!--通过使用 for 属性将 label 与输入框关联起来，当用户点击标签时，输入框会自动获得焦点或选中。需要指定表单字段id值。-->
        <label for="account">账号：</label>
        <!--数据属性 username 和 password 是通过 Vue.js 的指令 v-model 绑定到页面的输入框上的。
        在 HTML 结构中，v-model 指令用于双向绑定数据。它将输入框的值与组件中的数据属性进行绑定，使得当用户在输入框中输入内容时，数据属性的值也会自动更新；
        反之亦然，当数据属性的值发生变化时，输入框中的内容也会相应地更新。-->
        <!--id 属性用于唯一标识输入框，v-model 用于将输入框的值与 Vue 实例中的数据进行双向绑定，而 name 属性用于在提交表单时将输入框的值与后端数据进行关联-->
        <input type="text" id="account" name="account" v-model="account"/>
      </div>
      <div>
        <label for="password">密码：</label>
        <input type="password" id="password" name="password" v-model="password"/>
      </div>
      <!--登录按钮使用了 @click 指令来监听点击事件，并将其绑定到 login 方法上
      当用户点击登录按钮时，就会触发点击事件，然后自动调用组件中定义的 login 方法。-->
      <button @click="login">登录</button>
    </form>
    <input v-model="error">
  </div>

</template>

<style scoped>

</style>