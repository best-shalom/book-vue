<template>
  <div class="book-details">
    <h2>{{ book.newName }}</h2>
    <p>标签: {{ book.tag }}</p>
    <p>星级: {{ book.star }}</p>
    <p>完结时间：{{ book.finishTime }}</p>
    <p>简介：{{ book.information }}</p>
    <p>大小：{{ book.fileSize }}</p>
    <p>下载：{{ book.downUrl }}</p>
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
      this.$api.bookDetail(requestData).then(response => {
        console.log(response.data);
        if (response.data.code === 1) {
          this.book = response.data.data;
          console.log(this.book)
        }
      }).catch(error => console.error('Error fetching book details:', error));
    }
  },
  mounted() {
    this.fetchBookDetails();
  }
};
</script>

<style scoped>
/* 可选的组件样式 */
</style>