<template>
  <div id="app">
    <!-- 导航栏 -->
    <nav>
      <ul>
        <!-- 循环显示所有类别 -->
        <li v-for="genre in genres" :key="genre" @click="fetchBooks(genre)">
          <a href="#">{{ genre }}</a>
        </li>
      </ul>
    </nav>
    <!-- 使用书籍列表组件，并传递书籍数据 -->
    <BookList :books="books"/>

    <!-- 路由视图 -->
    <router-view/>
  </div>
</template>


<script>
import BookList from './BookList.vue';

export default {
  components: {
    // 注册 BookList 组件
    BookList
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
        page: '1',
        size: '10',
      },
      // 根据分类等获取到的书籍数据
      books: []
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
          this.books = response.data.data;
        }
      }).catch(error => console.error('Error fetching books:', error));
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