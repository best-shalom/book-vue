<template>
  <div>
    <h2>{{ book.title }}</h2>
    <p>{{ book.description }}</p>
    <!-- 可以展示更多细节，比如作者、出版日期等 -->
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ['id'],
  data() {
    return {
      book: {}
    };
  },
  created() {
    axios.get(`/api/book/${this.id}`).then(response => {
      this.book = response.data;
    });
  }
};
</script>
