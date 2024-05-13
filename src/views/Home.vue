<template>
  <div id="app">
    <!-- 增强的导航栏 -->
    <!--
    background-color: #f8f9fa;: 设置导航栏的背景颜色为 #f8f9fa，一种浅灰色。
    position: fixed;: 将导航栏固定在视口中，意味着即使页面滚动，导航栏也会保持在同一位置。
    width: 100%;: 将导航栏的宽度设置为视口的 100%，使其占据整个屏幕的宽度。
    top: 0;: 将导航栏与视口顶部对齐。
    z-index: 1000;: 设置导航栏的堆叠顺序为 1000，这意味着它会显示在其他具有默认堆叠顺序的元素之上。
    box-shadow: 0 2px 4px rgba(0,0,0,.1);: 给导航栏添加一个 2px 的模糊黑色阴影，使其看起来稍微凸起。
    -->
    <nav
        style="background-color: #f8f9fa; position: fixed; width: 100%; top: 0; z-index: 1000; box-shadow: 0 2px 4px rgba(0,0,0,.1);">
      <!--
      list-style: none;: 这个样式规则用于去除列表项的默认样式，即去除了列表项前面的默认标志，比如圆点或数字。
      padding: 10px 20px;: 这个样式规则设置了列表的内边距，上下为10像素，左右为20像素。这会在列表项内容和列表边界之间创建一些空白空间。
      margin: 0;: 这个样式规则将列表的外边距设置为0，这意味着列表不会有任何外边距，它将紧贴着其父元素。
      display: flex;: 这个样式规则将列表的布局方式设置为弹性布局（Flex布局），这意味着列表项将按照水平方向排列。
      justify-content: space-around;: 这个样式规则用于设置弹性容器（即列表）内部元素（即列表项）的水平对齐方式。space-around值会在每个列表项周围创建一些空白空间，使得它们在列表中均匀分布，并且两端与列表边界之间的空间是其他空间的两倍。
      -->
      <ul style="list-style: none; padding: 10px 20px; margin: 0; display: flex; justify-content: space-around;">
        <!--
        v-for="genre in genres"：这是 Vue.js 中的循环指令，它会遍历 genres 数组中的每个元素，并为每个元素创建一个列表项。
        :key="genre"：这是 Vue.js 中的 key 绑定，用于帮助 Vue.js 识别列表项的唯一性，以提高渲染性能。通常情况下，我们会将列表项的唯一标识作为 key。
        style="padding: 10px;"：这是一个行内样式，它为每个列表项设置了内边距为10像素。这样做的目的是为了在列表项的内容和边界之间创建一些空白空间，使得列表项看起来更加美观。
        @click="fetchBooks(genre)"：这是一个点击事件监听器，当用户点击列表项时，会调用 fetchBooks 方法并传递当前列表项的 genre 参数。这个功能通常用于实现用户与页面的交互，比如点击某个列表项后加载相关数据等操作。
        -->
        <li v-for="genre in genres" :key="genre" style="padding: 10px;" @click="fetchBooks(genre)">
          <!--
          href="#"：这是链接的目标 URL，# 表示当前页面的位置。在这种情况下，点击链接不会导航到页面的其他位置，而是停留在当前页面。这种用法通常用于实现具有点击行为但不需要实际导航的元素。
          style="text-decoration: none; color: #333; font-weight: bold;"：这是链接的样式设置。它将链接的文本装饰（比如下划线）去掉 (text-decoration: none;)，将链接文本的颜色设置为黑色 (color: #333;)，并将链接文本的字体加粗 (font-weight: bold;)。这样做的目的是为了使链接看起来更加美观和易于识别。
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
      <router-view/>
      <!-- 使用分页组件，点击触发handlePageChange-->
      <!--
      <Pagination>: 这是一个自定义的 Vue.js 组件，用于处理分页功能。
      :currentPage="bookFilter.page": 这是一个绑定（binding）语法，将 currentPage 属性绑定到 Vue 实例中的 bookFilter.page 变量上。这表示当前页的值会与 bookFilter.page 变量保持同步，任何时候 bookFilter.page 变化时，currentPage 也会随之更新。
      :totalPages="totalPages": 同样是一个绑定语法，将 totalPages 属性绑定到 Vue 实例中的 totalPages 变量上。这表示总页数会与 totalPages 变量保持同步，任何时候 totalPages 变化时，totalPages 也会随之更新。
      @page-changed="handlePageChange": 这是一个事件监听器，用于监听 page-changed 事件，并在触发时调用 Vue 实例中的 handlePageChange 方法。通常，这个方法会处理页码变化时的逻辑，例如更新页面内容或从服务器请求新的数据。
      -->
      <Pagination :currentPage="bookFilter.page" :totalPages="totalPages" @page-changed="handlePageChange"/>
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
      // 总书籍数，用于计算总页数
      totalBooks: 0,
      // 总页数
      totalPages: 0
    }
  },
  methods: {
    // 从后端获取分类
    fetchGenres() {
      this.$api.classifyList().then(response => {
        if (response.data.code === 1) {
          console.log(response.data.data);
          this.genres = response.data.data;
        }
      }).catch(error => console.error('Error fetching genres:', error));
    },
    // 定义一个方法，用于根据选择的类别从服务器获取书籍
    fetchBooks(genre) {
      this.bookFilter.classifyName = genre;
      this.$api.bookList(this.bookFilter).then(response => {
        if (response.data.code === 1) {
          console.log(response.data.data);
          let data = response.data.data
          this.books = data.bookList;
          // 更新总书籍数和总页数
          this.totalBooks = data.pageInfo.totalCount;
          this.totalPages = data.pageInfo.totalPages;
          // 通知分页器进行更新
          Pagination.changePage(this.totalPages);
        }
      }).catch(error => console.error('Error fetching books:', error));
    },
    handlePageChange(newPage) {
      // 将页码设置为新页码
      this.bookFilter.page = newPage.toString();
      // 重新加载数据
      this.fetchBooks();
    }
  },
  // mounted 是一个生命周期钩子，用来在组件的实例被挂载到DOM上之后执行。这是初始化页面数据、发送网络请求或执行其他只有在页面完全加载之后才能进行的操作的理想时机。
  mounted() {
    this.fetchGenres();
    this.fetchBooks(); // 可以带一个默认分类
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