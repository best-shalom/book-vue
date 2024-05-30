<template>
  <Navbar/>
  <div class="app">
    <BookInfo :bookId="bookId"></BookInfo>
  </div>
</template>

<script>
import Navbar from '@/components/home/Navbar.vue'
import BookInfo from "@/components/common/BookInfo.vue";

export default {
  components: {
    Navbar,
    BookInfo
  },
  // 接收url中传递的bookId，传递给bookInfo子组件
  props: ['bookId']
}
</script>

<style scoped>

</style>