<template>
  <div v-if="isAlertVisible" class="alert">
    <span class="alert-message">{{ alertMessage }}</span>
  </div>
</template>

<script>
import {onMounted, onUnmounted, ref} from "vue";
import {eventBus} from "@/main";

export default {
  setup() {
    // 创建响应式数据
    const isAlertVisible = ref(false); // 用于控制警报是否可见
    const alertMessage = ref(''); // 用于存储警报消息

    // 打印此时Alert是否被注册到DOM中，只有注册到DOM才会在事件总线中监听show-alert
    console.log("动作:alert注册", eventBus)

    // 定义显示警报的方法
    const showAlert = (message) => {
      isAlertVisible.value = true; // 显示警报
      alertMessage.value = message; // 设置警报消息
      setTimeout(() => {
        isAlertVisible.value = false; // 3秒后隐藏警报
        alertMessage.value = ''; // 清空警报消息
      }, 3000);
    };
    // 组件挂载时，注册事件监听器
    onMounted(() => {
      eventBus.on('show-alert', showAlert);
    });

    // 组件卸载时，移除事件监听器
    onUnmounted(() => {
      eventBus.off('show-alert', showAlert);
    });

    // 返回响应式数据，使其可以在模板中使用
    return {
      isAlertVisible,
      alertMessage
    };
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