<template>
  <div class="book-list">
    <ul>
      <!-- 循环显示所有书籍 -->
      <li v-for="book in books" :key="book.id">
        {{ book.newName }} - {{ book.tag }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    books: Array // 接受从父组件传递过来的书籍数据
  }
};
</script>

<style>
.book-list ul {
  list-style: none; /* 去掉默认的列表标记 */
  padding: 0; /* 去掉默认的内边距 */
}

.book-list li {
  margin: 10px 0; /* 设置列表项之间的间距 */
}
</style>
