<template>
  <Navbar/>
  <div class="app">
    <LeftSide :book-id="bookId"/>
    <BookInfo :bookId="bookId"/>
  </div>
</template>

<script>
import Navbar from '@/components/home/Navbar.vue'
import BookInfo from "@/components/common/BookInfo.vue";
import LeftSide from '@/components/book_detail/LeftSide.vue'

export default {
  components: {
    Navbar,
    BookInfo,
    LeftSide
  },
  // 接收url中传递的bookId，传递给bookInfo子组件和leftSide子组件
  props: ['bookId']
}
</script>

<style scoped>
.app {
  display: flex; /* flex默认就是横向排列*/
}
</style>