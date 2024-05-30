<template>
  <Navbar/>
  <div class="app">
    <Sidebar :classifies="classifies" @update:changeClassify="changeFilter"/>
    <!-- 使用书籍列表组件，并传递书籍数据 -->
    <BookList :books="books"/>
    <!-- 路由视图 -->
    <!--分页组件
    :currentPage="bookFilter.page": 这是一个绑定（binding）语法，将 currentPage 属性绑定到 Vue 实例中的 bookFilter.page 变量上。这表示当前页的值会与 bookFilter.page 变量保持同步，任何时候 bookFilter.page 变化时，currentPage 也会随之更新。
    :totalPages="totalPages": 同样是一个绑定语法，将 totalPages 属性绑定到 Vue 实例中的 totalPages 变量上。这表示总页数会与 totalPages 变量保持同步，任何时候 totalPages 变化时，totalPages 也会随之更新。
    在分页器组件中，当页码发生变化时，通过 $emit 触发 update:currentPage 事件，并传递新的页码值给父组件。
    最后，在父组件中监听分页器组件发出的 update:currentPage 事件，将收到的新页码值更新到父组件的数据中，触发数据更新，从而重新加载对应页的数据。
    -->
  </div>
  <Pagination :currentPage="this.pages.pageNum" :totalPages="this.pages.total"
              @update:currentPage="updateCurrentPage"/>
</template>


<script>
import Navbar from './Navbar.vue'
import Sidebar from './Sidebar.vue'
import BookList from './BookList.vue';
import Pagination from "@/components/Pagination.vue";

export default {
  components: {
    Navbar,
    Sidebar,
    // 注册 BookList 组件
    BookList,
    Pagination
  },
  data() {
    return {
      // 后端获取的书籍分类
      classifies: [],
      // 筛选条件
      bookFilter: {
        classifyName: null,
        orderByFinish: 2,
        orderByUpload: 0,
        page: '0',
        size: '10',
      },
      // 根据分类等获取到的书籍数据
      books: [],
      pages: {
        totalBooks: 0, // 总书籍数
        total: 0, // 总页数
        pageNum: 1, // 当前页码
        pageSize: 20 // 每页显示条目个数不传默认20,
      },
    }
  },
  methods: {
    // 监听侧边栏分类的触发事件，更新其传递的分类参数
    changeFilter(classify) {
      console.log(classify)
      this.bookFilter.classifyName = classify;
      // 重置页码到第一页
      this.pages.pageNum = 1
      // 调用 fetchBooks 方法加载新分类的书籍
      this.fetchBooks();
    },
    // 从后端获取分类
    fetchGenres() {
      this.$api.classifyList().then(response => {
        if (response.data.code === 1) {
          console.log(response.data.data);
          this.classifies = response.data.data;
          if (this.classifies.length > 0) {
            // 默认加载第一个类别的书籍
            this.bookFilter.classifyName = this.classifies[0]
            this.fetchBooks();
          }
        }
      }).catch(error => console.error('Error fetching genres:', error));
    },
    // 根据筛选的条件从后端获取书籍
    fetchBooks() {
      this.bookFilter.page = this.pages.pageNum - 1
      this.$api.bookList(this.bookFilter).then(response => {
        if (response.data.code === 1) {
          console.log(response.data.data);
          let data = response.data.data
          this.books = data.bookList;
          // 更新总书籍数和总页数
          this.pages.totalBooks = data.pageInfo.totalCount;
          this.pages.total = data.pageInfo.totalPages;
        }
      }).catch(error => console.error('Error fetching books:', error));
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
    // 使用 watch 监听 pages.pageNum 的变化，当页码变化时调用 fetchBooks 方法获取新页码的数据。
    'pages.pageNum': function () {
      this.fetchBooks();
    }
  },
  // mounted 是一个生命周期钩子，用来在组件的实例被挂载到DOM上之后执行。这是初始化页面数据、发送网络请求或执行其他只有在页面完全加载之后才能进行的操作的理想时机。
  mounted() {
    this.fetchGenres();
  }
};
</script>
<style scoped>
.app {
  display: flex; /* app中的侧边栏和书籍列表水平排列*/
}

nav ul {
  list-style-type: none;
  padding: 0;
}

nav ul li {
  display: inline-block;
  margin-right: 10px;
}

nav ul li a {
  text-decoration: none;
  color: black;
  padding: 5px 10px;
  border: 1px solid black;
  border-radius: 5px;
}

nav ul li a:hover {
  background-color: #f0f0f0;
}
</style>