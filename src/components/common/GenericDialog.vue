<template>
  <!--子组件样式被父组件影响：给子组件最外边再套一层div标签即可 https://blog.csdn.net/2301_81694606/article/details/138158125-->
  <!--v-if的值决定子组件是否显示，即为从父组件中监听的visible参数-->
  <div v-if="visible">
    <div class="dialog">
      <h2>{{ title }}</h2>
      <p>{{ message }}</p>
      <!-- 插槽用于插入不同的内容 -->
      <slot></slot>
      <button @click="closeDialog">X</button>
    </div>
  </div>
</template>

<script>
export default {
  // 监听父组件传递过来的visible属性
  props: {
    title: String,
    message: String,
    visible: Boolean
  },
  // 使用 emits 选项来显式地声明组件所支持的自定义事件
  emits: ['close'],
  methods: {
    // 这里直接用this.$emit('close')就不行了，因为它的父组件是上面说的中间件，也是就它的this.$emit('close')不是对应最开始的父组件监听的close事件，而是上面中间件监听的close事件。
    closeDialog() {
      console.log("点击关闭")
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
.dialog {
  position: fixed; /* 该元素将从正常文档流中删除，并且不会在页面布局中为该元素创建空间。*/
  background-color: #f4d684;
  width: 50%;
  height: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* 将弹框组件向左上方移动其自身宽度和高度的一半，以确保其完全居中。*/
}

/* 按钮相对弹框绝对定位，设置为左上角*/
button {
  position: absolute;
  top: 0;
  right: 0;
}
</style>