<template>
  <div>
    <ul>
      <li v-for="classify in classifyList" :key="classify">
        <a href="#">{{ classify }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      classifyList: ['言情小说', '玄幻小说']
    }
  }
}
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