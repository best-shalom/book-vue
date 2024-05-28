<template>
  <div>
    <!--每个按钮绑定不同的点击方法-->
    <button :disabled="currentPage === 1" @click="prevPage">上一页</button>
    <span v-for="page in pages" :key="page" :class="{ active: currentPage === page }" @click="changePage(page)">
      {{ page }}
    </span>
    <button :disabled="currentPage === totalPages" @click="nextPage">下一页</button>
  </div>
</template>

<script>
export default {
  // currentPage 是一个 prop，这意味着它是由父组件传递给子组件的，子组件不能直接修改它。
  // 所以，当你在分页器中点击下一页时，虽然 currentPage 的值会更新，但这个更新不会反映到父组件中，因为你试图修改了一个 prop，这是不被允许的。
  // 于是会通过emits来触发对父组件的更新
  props: {
    currentPage: {
      type: Number,
      required: true
    },
    totalPages: {
      type: Number,
      required: true
    }
  },
  // emits 选项用来声明该组件将会触发名为 update:currentPage 的事件，以便向父组件传递新的页数值。
  emits: ['update:currentPage'],
  computed: {
    // 定义一个计算属性 pages，用来生成页数范围的数组。
    pages() {
      const range = [];
      for (let i = 1; i <= this.totalPages; i++) {
        range.push(i);
      }
      return range;
    }
  },
  methods: {
    // 定义三个方法：prevPage、nextPage 和 changePage，分别用来处理上一页、下一页以及具体页数的切换逻辑。
    // 这些方法在点击按钮或页数时会触发 update:currentPage 事件，并传递相应的页数值到父组件，使父组件能接收到数据的更新。
    prevPage() {
      if (this.currentPage > 1) {
        this.$emit('update:currentPage', this.currentPage - 1);
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.$emit('update:currentPage', this.currentPage + 1);
      }
    },
    changePage(page) {
      this.$emit('update:currentPage', page);
    }
  }
};
</script>

<style scoped>
span {
  margin: 0 5px;
  cursor: pointer;
}

span.active {
  font-weight: bold;
}

button {
  margin: 0 5px;
}
</style>