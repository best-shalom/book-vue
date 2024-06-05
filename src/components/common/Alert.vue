<template>
  <div v-if="isAlertVisible" class="alert">
    <span class="alert-message">{{ alertMessage }}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isAlertVisible: false,
      alertMessage: ''
    }
  },
  methods: {
    // 其他组件调用此方法显示弹框和消息
    showAlert(message) {
      this.isAlertVisible = true;
      this.alertMessage = message;
      // 3秒后隐藏弹框
      setTimeout(() => {
        this.isAlertVisible = false;
        this.alertMessage = '';
      }, 3000);
    }
  }
}
</script>

<style scoped>
.alert {
  position: fixed;
  background-color: white;
  width: 15%;
  height: auto;
  top: 10%;
  left: 100%;
  transform: translate(-100%, 100%); /*水平方向向左移自身尺寸的100%，垂直方向向上移自身尺寸的100%*/
  box-shadow: 2px 2px 4px #333333;
}

.alert-message {
  color: #e73630;
  width: 100%;
  font-size: 12px;
  text-align: center;
  font-weight: 600;
}
</style>