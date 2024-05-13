<template>
  <div class="book-list">
    <ul>
      <!-- 循环显示所有书籍 -->
      <li v-for="book in books" :key="book.id" class="book-entry">
        <router-link :to="'/bookDetails/'+book.id" class="book-title">{{ book.newName }}</router-link>
        <div class="book-details">
          <span class="book-tag"><i class="fas fa-tag"></i> {{ book.tag }}</span>
          <!--fas 是 FontAwesome 图标库中表示“实心”图标的样式，而 fa-star 则表示星星图标-->
          <span class="book-star"><i class="fas fa-star"></i> {{ book.star }}</span>
          <span class="book-finish-time">完结日期：{{ book.finishTime }}</span>
          <span class="book-size">书籍大小：{{ book.fileSize }}</span>
          <p class="book-information">{{ book.information }}</p>
        </div>
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

/* 当鼠标悬停在书籍项上时的样式 */
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
  font-size: 14px; /* 设置字体大小 */
  color: #333; /* 设置字体颜色 */
  margin-top: 10px; /* 设置顶部外边距 */
}
</style>

