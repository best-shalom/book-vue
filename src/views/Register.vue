<template>
  <!--页面整体容器-->
  <div class="register-container">
    <!--注册的主要模块-->
    <a-row class="register-main">
      <!--注册左侧的背景容器-->
      <a-col class="back-container">
        <img alt="注册框背景" src="@/assets/img.png">
      </a-col>
      <!--注册表单容器-->
      <a-col class="form-container">
        <!--标题-->
        <div>注册</div>
        <!--注册输入框部分-->
        <a-form :model="registerForm">
          <!--账号-->
          <a-form-item>
            <span>账号</span>
            <a-input v-model="registerForm.account"/>
          </a-form-item>
          <!--密码-->
          <a-form-item>
            <span>密码</span>
            <a-input-password v-model="registerForm.password"/>
          </a-form-item>
          <!--确认密码-->
          <a-form-item>
            <span>确认密码</span>
            <a-input-password/>
          </a-form-item>
          <!--注册按钮-->
          <a-form-item>
            <a-button type="primary">注册</a-button>
            <a-button type="link">已有账号？去登录</a-button>
          </a-form-item>
        </a-form>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 注册表单数据
      registerForm: {
        account: '',
        password: '',
      }
    }
  },
  methods() {
  }
}
</script>


<style scoped>

</style>
