<template>
  <div>
    <ul>
      <li v-for="classify in classifies" :key="classify">
        <a href="#" @click="changeClassify(classify)">{{ classify }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    classifies: Array
  },
  // 1.声明此组件触发的事件
  emits: ['update:changeClassify'],
  methods: {
    changeClassify(classify) {
      // 2.触发事件，此事件会通过<Sidebar @update:changeClassify="changeFilter"/>的形式被父组件监听，然后监听到后调用父组件的changeFilter方法，实现分类的切换
      this.$emit('update:changeClassify', classify)
    }
  }
};
</script>

<style scoped>
/* 同样预留出导航栏和书籍列表的距离*/
div {
  position: fixed;
  margin-top: 80px;
  width: 100px;
  height: 100%;
}

/* 同样侧边栏中的列表元素纵向均匀排列*/
ul {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  list-style: none;
  height: 100%;
  padding: 0;
}

/* 同样列表项填满空间，添加分割线*/
li {
  display: flex;
  flex-grow: 1;
  background-color: #cccccc;
  border-top: 1px solid #333333;
}

/* 同样文字居中*/
a {
  margin: auto;
  color: #333333;
  text-decoration: none;
}
</style>