<template>
  <Navbar/>
  <div class="all-book">
    <div class="filter">
      <div class="classify">
        <p>分类：</p>
      </div>
      <div class="tag">
        <p>标签：</p>
      </div>
      <div class="type">
        <p>阅读类型：</p>
      </div>
    </div>
    <BookList :books="books"></BookList>
    <Pagination :current-page="this.pages.pageNum" :total-pages="this.pages.total"
                @update:currentPage="updateCurrentPage"/>
  </div>
</template>

<script>
import Navbar from '@/components/home/Navbar.vue'
import BookList from "@/components/common/BookList.vue";
import Pagination from "@/components/common/Pagination.vue";

export default {
  components: {
    Pagination,
    BookList,
    Navbar
  },
  data() {
    return {
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
    'bookFilter': function () {
      this.fetchBooks()
    }
  },
  created() {
    this.fetchBooks();
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

.filter {
  margin-top: 0;
  width: 100%;
  height: 15px;
}

.book-list {
  /*这个直接用.book-list会影响到所有class为book-list的组件样式*/
  margin-top: 80px;
  margin-left: 0;
  overflow-y: auto; /*允许滚动*/
}
</style>