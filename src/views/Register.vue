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
// 导出模块为一整个默认的对象，通过 import 语句可以将该对象导入为默认导出项
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
/*style注释不能用双杠，要用杠星*/
/*在调试容器、组件样式时，可以在浏览器的相应页面实时刷新查看不同设置的对应效果*/
.register-container {
  height: 100vh;
  background: url("@/assets/background.svg");
  background-size: cover;
}

.register-main {
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 20px;
  width: 800px;
  transform: translate(-50%, -50%); /* 使用通用的平移变换方法，在垂直和水平方向上均向左上方偏移50% */
  background: #FFFFFF;
}

.back-container {
  height: 500px;

  img {
    border-radius: 18px 0 0 18px;
    display: inline-block;
    background-size: cover;
    height: 100%;
    width: 100%;
  }
}

.form-container {
  margin-top: 30px;
  padding: 0 50px;
}

</style>
