<template>
  <div class="book-list">
    <ul>
      <!-- 循环显示所有书籍 -->
      <li v-for="book in books" :key="book.id" class="book-entry">
        <a class="book-title" target="_blank" @click="showBookDetail(book.id)">{{ book.newName }}</a>
        <div class="book-details">
          <span class="book-tag"><i class="fas fa-tag"></i> {{ book.tag }}</span>
          <!--fas 是 FontAwesome 图标库中表示“实心”图标的样式，而 fa-star 则表示星星图标-->
          <span class="book-star"><i class="fas fa-star"></i> {{ book.star }}</span>
          <span class="book-finish-time">完结日期：{{ book.finishTime }}</span>
          <span class="book-size">书籍大小：{{ book.fileSize }}</span>
          <span class="book-information">{{ book.information }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    books: Array // 接受从父组件传递过来的书籍数据
  },
  methods: {
    // 在新页面打开书籍详情
    showBookDetail(bookId) {
      // 使用this.$router.push可以在不刷新页面的情况下加载新的组件，即在单页面应用中进行内部路由导航
      window.open('/bookDetails/' + bookId)
    }
  }
};
</script>

<style>
/*.book-list {
  margin-top: 80px;
  margin-left: 120px;
}*/

/* 设置书籍列表的样式 */
.book-list ul {
  list-style: none; /* 移除列表项的默认样式 */
  padding: 0; /* 移除列表的内边距 */
}

/* 设置每个书籍项的样式 */
.book-list li {
  margin: 10px 0; /* 设置每个书籍项之间的外边距 */
  border: 1px solid #ccc; /* 设置边框样式 */
  padding: 10px; /* 设置内边距 */
  background-color: #f9f9f9; /* 设置背景颜色 */
}

/* 当鼠标悬停在书籍项上时的样式，变成浅蓝色 */
.book-list li:hover {
  background-color: #e9ecef; /* 修改背景颜色 */
}

/* 设置书籍标题的样式 */
.book-title {
  font-size: 18px; /* 设置字体大小 */
  color: #007BFF; /* 设置字体颜色 */
  text-decoration: none; /* 移除文字下划线 */
}

/* 当鼠标悬停在书籍标题上时的样式 */
.book-title:hover {
  text-decoration: underline; /* 添加文字下划线 */
}

/* 设置书籍详情中的标签和评分的样式 */
.fa-star, .fa-tag {
  margin-right: 5px; /* 设置图标右边距 */
}

/* 设置书籍标签和评分的样式 */
.book-tag, .book-star {
  font-size: 14px; /* 设置字体大小 */
  display: block;
}

/* 设置书籍完成时间和大小的样式 */
.book-finish-time, .book-size {
  font-size: 12px; /* 设置字体大小 */
  color: #666; /* 设置字体颜色 */
  display: block; /* 将元素转换为块级元素 */
}

/* 设置书籍信息的样式 */
.book-information {
  overflow: hidden; /* 隐藏超出长度的部分*/
  text-overflow: ellipsis; /* 对溢出文本显示省略号*/
  height: 100px; /* 必须设置元素的宽或者高，才知道它超出什么范围才隐藏*/

  word-wrap: break-word; /* 允许自动换行 */
  line-height: 20px; /* 设置行高，以控制换行时的间距 */

  /* 添加额外的兼容性前缀 */
  -moz-box-orient: vertical;

  font-size: 14px; /* 设置字体大小 */
  color: #333; /* 设置字体颜色 */
  margin-top: 10px; /* 设置顶部外边距 */
  display: block;
}
</style>

