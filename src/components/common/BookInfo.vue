<template>
  <div class="book-info">
    <h2>{{ book.bookName }}</h2>
    <p>标签: {{ book.bookTag }}</p>
    <p>星级: {{ book.bookStar }}</p>
    <p>完结时间：{{ book.bookFinishTime }}</p>
    <p>作者：{{ book.bookAuthor }}</p>
    <!--在模板中动态绑定 href 属性，使用 v-bind 指令（简写为 :）-->
    <p>作者链接：<a :href="book.bookAuthorUrl" target="_blank">{{ book.bookAuthorUrl }}</a></p>
    <p>分类：{{ book.bookClassify }}</p>
    <p>分类链接：<a :href="book.bookClassifyUrl" target="_blank">{{ book.bookClassifyUrl }}</a></p>
    <p>阅读类型：{{ book.bookType }}</p>
    <p>我的评价：{{ book.evaluate }}</p>
    <p>阅前评分：{{ book.beforeScore }}</p>
    <p>阅后评分：{{ book.afterScore }}</p>
    <p>简介：{{ book.information }}</p>
    <p>大小：{{ book.bookFileSize }}</p>
    <p>下载：<a :href="book.bookDownUrl" target="_blank">{{ book.bookDownUrl }}</a></p>
    <!-- 其他书籍详情信息 -->
  </div>
</template>

<script>
export default {
  props: ['bookId'], // 接收传递过来的书籍 id
  data() {
    return {
      book: {} // 存储书籍详情信息
    };
  },
  methods: {
    fetchBookDetails() {
      const requestData = {
        id: this.bookId
      };
      this.$api.book.bookDetail(requestData).then(responseData => {
        this.book = responseData.data;
      })
    }
  },
  mounted() {
    this.fetchBookDetails();
  }
};
</script>

<style scoped>
.book-info {
  margin-top: 80px;
  margin-left: 120px;
  padding: 0;
}
</style>