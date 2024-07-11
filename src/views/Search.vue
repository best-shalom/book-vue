<template>
  <Navbar/>
  <!--
  1.过滤条件：
  书籍分类、标签、阅读类型的过滤条件
  2.搜索条件：
  书名: 可以进行完全匹配或模糊搜索。
  作者: 通过作者姓名进行搜索。
  主角名: 根据书中主角的名字进行搜索。
  关键词: 通过关键字或者简介段落进行全文搜索。
  3.排序：
  完结时间: 根据书籍的完结时间进行排序或指定范围。
  评分: 按照书籍的评分进行排序或指定范围。
  -->
  <div class="search-book">
    <div class="search-container">
      <div class="filter-info">

      </div>
      <div class="search-info">

      </div>
      <div class="sort-info">

      </div>

    </div>
    <div class="book-list__search">
      <BookList :books="books"/>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/home/Navbar.vue'
import BookList from "@/components/common/BookList.vue";

export default {
  components: {
    BookList,
    Navbar
  },
  data() {
    return {
      searchInfo: {},
      books: []
    }
  }
}
</script>

<style scoped>

</style>