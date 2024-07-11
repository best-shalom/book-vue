<template>
  <Navbar/>
  <!--
  1.过滤条件：
  书籍分类、标签、阅读类型的过滤条件
  2.搜索条件：
  书名: 可以进行完全匹配或模糊搜索。
  作者: 通过作者姓名进行搜索。
  主角名: 根据书中主角的名字进行搜索。
  内容: 通过关键字或者简介段落进行全文搜索。
  3.排序：
  完结时间: 根据书籍的完结时间进行排序或指定范围。
  评分: 按照书籍的评分进行排序或指定范围。
  -->
  <div class="search-book">
    <div class="search-container">
      <div class="filter-info">
        <Filter v-model:selectInfo="selectInfo" @fetch-books="fetchBooks"/>
      </div>
      <div class="search-info">

      </div>
      <div class="sort-info">

      </div>

    </div>
    <div class="book-list__search">
      <BookList :books="books"/>
    </div>
    <Pagination :current-page="this.pages.pageNum" :total-pages="this.pages.total"
                @update:currentPage="updateCurrentPage"/>
  </div>
</template>

<script>
import Navbar from '@/components/home/Navbar.vue'
import BookList from "@/components/common/BookList.vue";
import Filter from "@/components/common/Filter.vue";
import Pagination from "@/components/common/Pagination.vue";

export default {
  components: {
    Pagination,
    Filter,
    BookList,
    Navbar
  },
  data() {
    return {
      searchInfo: {
        bookNameMust: null,
        bookNameShould: null,
        authorName: null,
        mainCharacterName: null,
        content: null
      },
      selectInfo: {
        classifies: [],
        tags: [],
        types: []
      },
      bookFilter: {
        classifyName: null,
        tagName: null,
        typeName: null,
        orderByFinish: 2,
        orderByUpload: 0,
        page: '0',
        size: '10',
      },
      books: [],
      pages: {
        totalBooks: 0,
        total: 0,
        pageNum: 1,
        pageSize: 20
      }
    }
  },
  methods: {
    // 根据筛选的条件从后端获取书籍
    fetchBooks() {
      this.bookFilter.page = this.pages.pageNum - 1
      this.bookFilter.classifyName = this.selectInfo.classifies.join(',')
      this.bookFilter.tagName = this.selectInfo.tags.join(',')
      this.bookFilter.typeName = this.selectInfo.types.join(',')
      this.$api.book.bookList(this.bookFilter).then(responseData => {
        let data = responseData.data
        this.books = data.bookList;
        // 更新总书籍数和总页数
        this.pages.totalBooks = data.pageInfo.totalCount;
        this.pages.total = data.pageInfo.totalPages;
      })
    },
    // 更新当前页码，当分页器页码变化时触发
    updateCurrentPage(newPage) {
      // 通过 @update:currentPage="updateCurrentPage" 监听分页组件触发的事件。当事件触发时，调用 updateCurrentPage 方法，更新当前页码。
      // 即从子组件进行监听，根据子组件的变化修改父组件上显示的值。
      console.log("当前页面：", newPage)
      this.pages.pageNum = newPage
    }
  },
  watch: {
    'pages.pageNum': function () {
      this.fetchBooks()
    },
    selectInfo: {
      deep: true,
      handler() {
        this.fetchBooks()
      }
    },
    searchInfo: {
      deep: true,
      handler() {
        this.fetchBooks()
      }
    }
  },
  created() {
    this.fetchBooks()
  }
}
</script>

<style scoped>
.search-book {
  position: fixed;
  width: 100%;
  height: calc(100% - 70px);
  top: 70px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.book-list__search {
  display: flex;
  flex: 1; /* 使其占据剩余空间，避免当书籍列表为空时，filter占据空间*/
  overflow-y: auto; /*允许滚动*/
}
</style>