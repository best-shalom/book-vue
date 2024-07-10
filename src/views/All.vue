<template>
  <Navbar/>
  <div class="all-book">
    <div class="filter">
      <div class="classify">
        <p>分类：</p>
        <div v-for="classify in classifies" :key="classify">
          <input v-model="selectInfo.classifies" :value="classify" type="checkbox">
          <label>{{ classify }}</label>
        </div>
      </div>
      <div class="tag">
        <p>标签：</p>
        <!--<select v-model="selectInfo.tags" multiple>-->
        <!--  <option v-for="tag in tags" :key="tag" :value="tag">-->
        <!--    {{ tag }}-->
        <!--  </option>-->
        <!--</select>-->
        <div v-for="tag in tags" :key="tag">
          <input v-model="selectInfo.tags" :value="tag" type="checkbox">
          <label>{{ tag }}</label>
        </div>
      </div>
      <div class="type">
        <p>阅读类型：</p>
        <div v-for="type in types" :key="type">
          <input v-model="selectInfo.types" :value="type" type="checkbox">
          <label>{{ type }}</label>
        </div>
      </div>
      <button @click="fetchBooks">查询</button>
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

export default {
  components: {
    Pagination,
    BookList,
    Navbar
  },
  data() {
    return {
      classifies: [],
      tags: [],
      types: [],
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
    // 从后端获取分类、tag等用于过滤的信息
    fetchFilter() {
      this.$api.classify.classifyList().then(responseData => {
        this.classifies = responseData.data;
      })
      this.$api.tag.tagList().then(responseDate => {
        this.tags = [];
        responseDate.data.forEach(item => {
          this.tags.push(item.name)
        })
      })
      this.$api.type.typeList().then(responseData => {
        this.types = []
        responseData.data.forEach(item => {
          this.types.push(item.name);
        })
      })
    },
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
  // 监听过滤条件和页码的变化，触发列表刷新
  watch: {
    selectInfo: {
      deep: true,  //使用 deep: true，深度监听对象内部的所有属性的变化，而不仅仅是对象本身的变化。
      handler() {  //handler 是当 selectInfo 或其内部属性变化时要执行的函数。
        this.fetchBooks()
      }
    },
    'pages.pageNum': function () {
      this.fetchBooks()
    }
  },
  created() {
    this.fetchFilter();
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

/* 将.filter的position设置为sticky，并设置top值，使其相对于父元素产生距离。*/
.filter {
  position: sticky;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto; /* 如果 .filter 元素内部的内容超出了设定的高度，那么元素的实际高度将会因为内容的高度而增加，不再受 height 属性的限制。*/
  z-index: 10;
}

/* 确保每个过滤条件部分都正确使用 flex 布局，并且父容器 .filter 也设置为 flex 布局。*/
.classify, .tag, .type {
  display: flex;
  flex-direction: row;
}

.book-list__all {
  display: flex;
  overflow-y: auto; /*允许滚动*/
}
</style>