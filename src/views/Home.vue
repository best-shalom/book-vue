<template>
  <div id="app">
    <!-- 导航栏 position: fixed;将导航栏固定在视口中设置导航栏的堆叠顺序为 1000-->
    <nav
        style="background-color: #f8f9fa; position: fixed; width: 100%; top: 0; z-index: 1000; box-shadow: 0 2px 4px rgba(0,0,0,.1);">
      <!--
      去除列表项的默认样式，使用弹性布局（Flex布局），列表项将按照水平方向排列，在列表中均匀分布。
      -->
      <ul style="list-style: none; padding: 10px 20px; margin: 0; display: flex; justify-content: space-around;">
        <!--
        v-for="genre in genres"：这是 Vue.js 中的循环指令，它会遍历 genres 数组中的每个元素，并为每个元素创建一个列表项。
        :key="genre"：这是 Vue.js 中的 key 绑定，用于帮助 Vue.js 识别列表项的唯一性，以提高渲染性能。通常情况下，我们会将列表项的唯一标识作为 key。
        当用户点击列表项时，会调用 changeFilter 修改页面内容
        -->
        <li v-for="genre in genres" :key="genre" style="padding: 10px;" @click="changeFilter(genre)">
          <!--
          href="#"：这是链接的目标 URL，# 表示当前页面的位置。在这种情况下，点击链接不会导航到页面的其他位置，而是停留在当前页面。这种用法通常用于实现具有点击行为但不需要实际导航的元素。
          {{ genre }}：这是一个插值表达式，它会在页面渲染时被替换为 Vue.js 实例中的 genre 变量的值。这样做的目的是在链接文本中显示 genre 变量的值，使用户能够直观地了解链接所代表的内容。
          -->
          <a href="#" style="text-decoration: none; color: #333; font-weight: bold;">{{ genre }}</a>
        </li>
      </ul>
    </nav>
    <!-- 内容下移，避免被导航栏遮挡 -->
    <div style="margin-top: 60px;">
      <!-- 使用书籍列表组件，并传递书籍数据 -->
      <BookList :books="books"/>
      <!-- 路由视图 -->
      <!--分页组件
      :currentPage="bookFilter.page": 这是一个绑定（binding）语法，将 currentPage 属性绑定到 Vue 实例中的 bookFilter.page 变量上。这表示当前页的值会与 bookFilter.page 变量保持同步，任何时候 bookFilter.page 变化时，currentPage 也会随之更新。
      :totalPages="totalPages": 同样是一个绑定语法，将 totalPages 属性绑定到 Vue 实例中的 totalPages 变量上。这表示总页数会与 totalPages 变量保持同步，任何时候 totalPages 变化时，totalPages 也会随之更新。
      在分页器组件中，当页码发生变化时，通过 $emit 触发 update:currentPage 事件，并传递新的页码值给父组件。
      最后，在父组件中监听分页器组件发出的 update:currentPage 事件，将收到的新页码值更新到父组件的数据中，触发数据更新，从而重新加载对应页的数据。
      -->
      <Pagination :currentPage="this.pages.pageNum" :totalPages="this.pages.total"
                  @update:currentPage="updateCurrentPage"
      />
    </div>
  </div>
</template>


<script>
import BookList from './BookList.vue';
import Pagination from "@/components/Pagination.vue";

export default {
  components: {
    // 注册 BookList 组件
    BookList,
    Pagination
  },
  data() {
    return {
      // 后端获取的书籍分类
      genres: [],
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
    changeFilter(genre) {
      this.bookFilter.classifyName = genre;
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
          this.genres = response.data.data;
          if (this.genres.length > 0) {
            // 默认加载第一个类别的书籍
            this.bookFilter.classifyName = this.genres[0]
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