<template>
  <Navbar/>
  <div class="all-book">
    <div class="filter__all">
      <Filter v-model:selectInfo="selectInfo" @fetch-books="fetchBooks"/>
    </div>
    <div class="book-list__all">
      <BookList :books="books"></BookList>
    </div>
    <Pagination :current-page="this.pages.pageNum" :total-pages="this.pages.total"
                @update:currentPage="updateCurrentPage"/>
  </div>
</template>

<script>
import Navbar from '@/components/home/Navbar.vue'
import BookList from "@/components/common/BookList.vue";
import Pagination from "@/components/common/Pagination.vue";
import Filter from "@/components/common/Filter.vue";

export default {
  components: {
    Pagination,
    BookList,
    Navbar,
    Filter
  },
  data() {
    return {
      selectInfo: {
        classifies: [],
        tags: [],
        types: []
      },
      bookFilter: {
        filterInfo: {
          classifyName: null,
          tagName: null,
          typeName: null
        },
        sortInfo: {
          orderByFinish: 2,
          orderByUpload: 2,
          orderByScore: 2
        },
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
      this.bookFilter.filterInfo.classifyName = this.selectInfo.classifies.join(',')
      this.bookFilter.filterInfo.tagName = this.selectInfo.tags.join(',')
      this.bookFilter.filterInfo.typeName = this.selectInfo.types.join(',')
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
  // 监听过滤条件和页码的变化，触发列表刷新
  watch: {
    'pages.pageNum': function () {
      this.fetchBooks()
    },
    selectInfo: {
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
.all-book {
  position: fixed;
  width: 100%;
  height: calc(100% - 70px);
  top: 70px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.book-list__all {
  display: flex;
  flex: 1; /* 使其占据剩余空间，避免当书籍列表为空时，filter占据空间*/
  overflow-y: auto; /*允许滚动*/
}
</style>