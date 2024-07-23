<template>
  <div>
    <!--每个按钮绑定不同的点击方法-->
    <button :disabled="currentPage === 1" @click="prevPage">上一页</button>
    <!--:class 是 Vue.js 的一个指令，用于动态绑定 CSS 类。这里有一个对象语法，根据条件将不同的类绑定到 <span> 元素上：
    active: currentPage === page：当 currentPage 与 page 相等时，active 类会被添加到 <span> 元素，即加粗
    ellipsis: page === '...'：当 page 的值为 '...' 时，ellipsis 类会被添加到 <span> 元素，即无法选中-->
    <!--只有在 page 不为 '...' 时才会调用 changePage 方法，通常 '...' 用作省略号，点击它不会触发页面更改-->
    <span v-for="page in pages" :key="page" :class="{ active: currentPage === page, ellipsis: page === '...'}"
          @click="page !== '...' && changePage(page)">
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
      const total = this.totalPages;
      const current = this.currentPage;

      if (total <= 7) {
        // 总页数小于等于7时，显示全部页码
        for (let i = 1; i <= total; i++) {
          range.push(i);
        }
      } else {
        // 总页数大于7时，使用省略号
        range.push(1);
        if (current > 4) {
          range.push('...');
        }
        for (let i = Math.max(2, current - 2); i <= Math.min(total - 1, current + 2); i++) {
          range.push(i);
        }
        if (current < total - 3) {
          range.push('...');
        }
        range.push(total);
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
div {
  display: flex;
  justify-content: center;
}

span {
  margin: 0 5px;
  cursor: pointer;
}

span.active {
  font-weight: bold;
}

span.ellipsis {
  cursor: default; /* 表示当用户的鼠标悬停在省略号上时，光标将不会变成手形或其他指示可以点击的形状，而是保持默认的箭头形状。这表明省略号不是可点击的元素。*/
}

button {
  margin: 0 5px;
}
</style>