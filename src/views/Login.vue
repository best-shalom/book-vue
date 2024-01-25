<script>
  export default {
    data(){
      // data 函数返回了一个对象，该对象包含了组件中需要使用的数据，即 username 和 password。
      // 这两个数据属性用于绑定到页面的输入框上，以便用户输入用户名和密码。
      return {
        account: '',
        password: ''
      }
    },
    methods:{
      // methods 对象包含了组件中需要使用的方法，即 login 方法。
      // 在这个方法中，可以编写登录逻辑，比如向后端发送请求验证用户名和密码是否正确，并且根据验证结果进行相应的处理。
      // 例如，如果验证成功，可以跳转到其他页面，或者在前端记录登录状态等。
      login(){

      }
    }

  };
</script>

<template>
  <div>
    <h1>登录页面</h1>
    <!--账号和密码表单-->
    <form>
      <div>
        <label>账号：</label>
        <!--数据属性 username 和 password 是通过 Vue.js 的指令 v-model 绑定到页面的输入框上的。
        在 HTML 结构中，v-model 指令用于双向绑定数据。它将输入框的值与组件中的数据属性进行绑定，使得当用户在输入框中输入内容时，数据属性的值也会自动更新；
        反之亦然，当数据属性的值发生变化时，输入框中的内容也会相应地更新。-->
        <input type="text" id="account" v-model="account"/>
      </div>
      <div>
        <label>密码：</label>
        <input type="password" id="password" v-model="password"/>
      </div>
      <!--登录按钮使用了 @click 指令来监听点击事件，并将其绑定到 login 方法上
      当用户点击登录按钮时，就会触发点击事件，然后自动调用组件中定义的 login 方法。-->
      <button @click="login">登录</button>
    </form>
  </div>

</template>

<style scoped>

</style>