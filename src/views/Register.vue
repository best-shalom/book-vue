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
        <div class="title">注册</div>
        <!--注册输入框部分-->
        <a-form :model="registerForm">
          <!--账号-->
          <a-form-item>
            <span class="gray">账号</span>
            <a-input v-model="registerForm.account"/>
          </a-form-item>
          <!--密码-->
          <a-form-item>
            <span class="gray">密码</span>
            <a-input-password v-model="registerForm.password"/>
          </a-form-item>
          <!--确认密码-->
          <a-form-item>
            <!--在没有为表单项配置width的情况下，输入框的长度会自动根据span的长度进行匹配
            即：相比于”密码“，”确认密码“四个字会使a-input-password自动变长，对于的form容器整个也会变宽-->
            <span class="gray">确认密码</span>
            <a-input-password/>
          </a-form-item>
          <!--注册按钮-->
          <a-form-item>
            <a-button type="primary">注册</a-button>
            <router-link to="/login">
              <a-button type="link">已有账号？去登录</a-button>
            </router-link>
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
  box-shadow: 0 8px 19px 2px rgba(0, 0, 0, 0.16);
  transform: translate(-50%, -50%); /* 使用通用的平移变换方法，在垂直和水平方向上均向左上方偏移50% */
  background: #FFFFFF;

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
    /*固定容器宽度，避免容器宽度受到form表单项长度影响*/
    width: 350px;

    .title {
      padding: 36px 0 20px 0;
      font-size: 30px;
      text-align: center;
      color: #333333;
    }

    .gray {
      color: gray;
    }
  }
}

</style>
