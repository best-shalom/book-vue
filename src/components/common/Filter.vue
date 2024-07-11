<template>
  <div class="filter-container">
    <div class="filter-info">
      <div class="classify">
        <p>分类：</p>
        <div v-for="classify in classifies" :key="classify">
          <input v-model="localSelectInfo.classifies" :value="classify" type="checkbox">
          <label>{{ classify }}</label>
        </div>
      </div>
      <div class="tag">
        <p>标签：</p>
        <div v-for="tag in tags.slice(0,10)" :key="tag">
          <input v-model="localSelectInfo.tags" :value="tag" type="checkbox">
          <label>{{ tag }}</label>
        </div>
        <button @click="showTagDialog= true">显示更多</button>
      </div>
      <div class="type">
        <p>阅读类型：</p>
        <div v-for="type in types" :key="type">
          <input v-model="localSelectInfo.types" :value="type" type="checkbox">
          <label>{{ type }}</label>
        </div>
      </div>
      <div class="selected-items">
        <span v-for="(classify,index) in localSelectInfo.classifies" :key="classify">
          {{ classify }}
          <button class="button-x" @click="removeSelected(index,'classify')">x</button>
        </span>
        <span v-for="(tag,index) in localSelectInfo.tags" :key="tag">
          {{ tag }}
          <button class="button-x" @click="removeSelected(index,'tag')">x</button>
        </span>
        <span v-for="(type,index) in localSelectInfo.types" :key="type">
          {{ type }}
          <button class="button-x" @click="removeSelected(index,'type')">x</button>
        </span>
      </div>
      <button class="filter-button" @click="emitFetchBooks">查询</button>
    </div>
    <GenericDialog :height="'60%'" :title="'选择标签'" :visible="showTagDialog" @close="showTagDialog=false">
      <div class="tag-dialog">
        <input v-model="searchQuery" class="tag-search" placeholder="搜素标签" type="text">
        <div class="tag-list">
          <div v-for="tag in filteredTags" :key="tag" class="tag-item">
            <input v-model="localSelectInfo.tags" :value="tag" type="checkbox">
            <label>{{ tag }}</label>
          </div>
        </div>
      </div>
    </GenericDialog>
  </div>
</template>

<script>
import GenericDialog from "@/components/common/GenericDialog.vue";

export default {
  components: {GenericDialog},
  props: {
    selectInfo: {
      type: Object,
      default: () => ({
        classifies: [],
        tags: [],
        types: []
      })
    }
  },
  data() {
    return {
      classifies: [],
      tags: [],
      types: [],
      // 在 data 中定义一个本地的 localSelectInfo 对象，使用 selectInfo 初始化 localSelectInfo，确保两者的初始状态相同
      localSelectInfo: {
        classifies: [...this.selectInfo.classifies],
        tags: [...this.selectInfo.tags],
        types: [...this.selectInfo.types]
      },
      showTagDialog: false,
      searchQuery: ''
    }
  },
  computed: {
    // 使用计算属性filteredTags来过滤标签列表。这样，用户在输入搜索关键字时，可以动态地筛选标签，并在标签对话框中显示匹配的标签。
    filteredTags() {
      if (this.searchQuery.trim() === '') {
        return this.tags
      }
      const query = this.searchQuery.toLowerCase()
      return this.tags.filter(tag => tag.toLowerCase().includes(query))
    }
  },
  methods: {
    emitFetchBooks() {
      this.$emit('fetch-books')
    },
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
    // 移除选中的标签:使用 splice 方法移除指定索引的标签。
    removeSelected(index, info) {
      if (info === 'classify') {
        this.localSelectInfo.classifies.splice(index, 1)
      } else if (info === 'tag') {
        this.localSelectInfo.tags.splice(index, 1)
      } else if (info === 'type') {
        this.localSelectInfo.types.splice(index, 1)
      }
    }
  },
  // 监听本地过滤条件变化，触发列表刷新和参数传回父组件
  watch: {
    localSelectInfo: {
      deep: true,
      handler(newVal) {
        this.$emit('update:selectInfo', {
          classifies: [...newVal.classifies],
          tags: [...newVal.tags],
          types: [...newVal.types]
        });
      }
    }
  },
  created() {
    this.fetchFilter()
  }
}

</script>

<style scoped>
/* 将.filter的position设置为absolute，并设置top值，使其相对于父元素产生距离。*/
.filter-info {
  position: sticky;
  top: 0;
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

.filter-button {
  width: 20%;
}

.selected-items {
  display: flex;
  flex-direction: row;
}

.selected-items span {
  display: inline-flex; /* 将每个标签和按钮设置为 inline-flex 布局 */
  align-items: center; /* 垂直居中对齐 */
  padding: 2px 10px 3px 3px; /* 设置一些内边距，使标签和按钮与外框之间有间距 */
  background-color: #e9ecef; /* 可选：设置标签的背景颜色 */
  border-radius: 5px; /* 可选：设置标签的圆角 */
}

.button-x {
  width: 5px;
  border: none;
  background: none;
  cursor: pointer; /* 鼠标悬停时显示为指针 */
  font-size: 16px; /* 调整按钮的字体大小 */
  color: black; /* 可选：设置按钮的颜色 */
}

.tag button {
  width: 80px;
  height: 20px;
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}

.tag-dialog {
  display: flex;
  flex-direction: column;
}

.tag-search {
  width: 50%;
}

.tag-list {
  display: flex;
  flex-wrap: wrap; /* 使得flex项在必要时能够换行。*/
}

.tag-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100px;
  height: 40px;
}
</style>