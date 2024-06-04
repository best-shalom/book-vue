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
  methods: {
    // 额这里不清楚，在调用CenericDialog时没有@close事件，不知道这里在干什么，但是删除了就关不掉
    // 貌似是在一路监听从LeftSide组件中传递的visible，然后监听它close事件，然后调用它的close方法，关闭弹框。
    // 因为中间如果没有连着props visible的话会失效（例如在setBookType中自定义isVisible作为新的参数传递给这里的话，就会无法关闭）
    closeDialog() {
      console.log(this.visible)
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