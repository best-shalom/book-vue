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
        <p>
          过滤条件：
        </p>
        <!--折叠展开： 由于过滤条件可能较多，可以考虑默认折叠展示，用户点击展开按钮后展开所有过滤条件。-->
        <Filter v-show="filterVisible" v-model:selectInfo="selectInfo" @fetch-books="fetchBooks"/>
        <button @click="toggleFilterVisibility">
          {{ filterVisible ? '折叠' : '展开' }}
        </button>
      </div>
      <div class="search-info">
        <!--搜索表单设计： 使用文本输入框、下拉框等形式，让用户输入书名、作者、主角名等搜索关键字。
        全文搜索： 如果需要全文搜索，可以提供一个专门的输入框或者切换按钮，让用户选择是否进行全文搜索。-->
        <p>
          搜索条件：
        </p>
        <form class="search-info-form">
          <div class="search-input-group">
            <label for="bookName">书名：</label>
            <input id="bookName" v-model="searchInfo.bookName" placeholder="请输入书名" type="text">
            <input id="bookNameFuzzy" v-model="searchInfo.bookNameFuzzy" type="checkbox">
            <label for="bookNameFuzzy">模糊查询</label>
          </div>
          <div class="search-input-group">
            <label for="authorName">作者：</label>
            <input id="authorName" v-model="searchInfo.authorName" placeholder="请输入作者名" type="text">
          </div>
          <div class="search-input-group">
            <label for="mainCharacterName">主角：</label>
            <input id="mainCharacterName" v-model="searchInfo.mainCharacterName" placeholder="请输入主角名" type="text">
          </div>
          <div class="search-input-group">
            <label for="content">内容：</label>
            <input id="content" v-model="searchInfo.content" placeholder="请输入内容关键词" type="text">
            <input id="contentFuzzy" v-model="searchInfo.contentFuzzy" type="checkbox">
            <label for="contentFuzzy">模糊查询</label>
          </div>
        </form>
      </div>
      <div class="range-info">
        <p>
          范围条件：
        </p>
        <label>完结时间范围：</label>
        <label>评分范围：</label>
      </div>
      <div class="sort-info">
        <p>
          排序条件：
        </p>
        <label>完结时间排序：</label>
        <label>评分排序：</label>
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
        bookName: null,
        bookNameFuzzy: false, //默认为精准查询
        authorName: null,
        mainCharacterName: null,
        content: null,
        contentFuzzy: false
      },
      selectInfo: {
        classifies: [],
        tags: [],
        types: []
      },
      rangeInfo: {
        finishTime: null,
        score: null
      },
      sortInfo: {
        orderByFinish: 2,
        orderByUpload: 0
      },
      bookFilter: {
        classifyName: null,
        tagName: null,
        typeName: null,
        searchInfo: null,
        orderByFinish: 2,
        orderByUpload: 0,
        page: '0',
        size: '10',
      },
      filterVisible: false, // 控制过滤条件展开折叠的状态
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
    toggleFilterVisibility() {
      this.filterVisible = !this.filterVisible; // 切换展开折叠状态
    },
    // 根据筛选的条件从后端获取书籍
    fetchBooks() {
      this.bookFilter.page = this.pages.pageNum - 1
      this.bookFilter.classifyName = this.selectInfo.classifies.join(',')
      this.bookFilter.tagName = this.selectInfo.tags.join(',')
      this.bookFilter.typeName = this.selectInfo.types.join(',')
      this.bookFilter.searchInfo = this.buildSearchQuery()
      this.$api.book.bookList(this.bookFilter).then(responseData => {
        let data = responseData.data
        this.books = data.bookList;
        // 更新总书籍数和总页数
        this.pages.totalBooks = data.pageInfo.totalCount;
        this.pages.total = data.pageInfo.totalPages;
      })
    },
    buildSearchQuery() {
      let query = {};
      if (this.searchInfo.bookName) {
        query.bookName = this.searchInfo.bookName;
        if (this.searchInfo.bookNameFuzzy) {
          query.bookNameFuzzy = true;
        }
      }
      if (this.searchInfo.content) {
        query.content = this.searchInfo.content;
        if (this.searchInfo.contentFuzzy) {
          query.contentFuzzy = true;
        }
      }
      if (this.searchInfo.authorName) {
        query.authorName = this.searchInfo.authorName;
      }
      if (this.searchInfo.mainCharacterName) {
        query.mainCharacterName = this.searchInfo.mainCharacterName;
      }
      return query;
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
* {
  margin: 0;
  padding: 0;
}

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

/* 整个搜索部分纵向排列*/
.search-container {
  display: flex;
  flex-direction: column;
}

.filter-info,
.search-info,
.range-info,
.sort-info {
  border-bottom: 1px solid #ddd; /* 添加底部边框 */
  /* 设置内边距 */
  margin: 0; /* 调整部分之间的间距 */
  padding: 5px 0 5px;
}

.filter-info {
  display: flex;
  flex-direction: column;

}

.filter-info button {
  background: none;
  border: none;
  width: 50px;
  height: 20px;
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}

.search-info {
  display: flex;
  flex-direction: column;
}

.search-info-form {
  display: flex;
  flex-wrap: wrap;
}

.search-info-form .search-input-group {
  margin-bottom: 10px;
  flex: 1 0 45%; /* 让输入框在一行内占据一定的宽度，可以根据实际情况调整 */
}

</style>