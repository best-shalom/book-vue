<template>
  <!--书籍详情页面：左侧边栏，包括添加评论，修改分类等-->
  <div class="left-side">
    <div class="set-type">
      <span @click="showSetTypeDialog">设置阅读类型</span>
    </div>
    <div class="set-evaluate">
      <span @click="showSetEvaluateDialog">设置评分评价</span>
    </div>
    <div class="set-tag">
      <span @click="showSetTagDialog">修改书籍标签</span>
    </div>
    <div class="set-classify">
      <span @click="showSetClassifyDialog">修改书籍分类</span>
    </div>
  </div>
  <Dialog :book-id="bookId" :dialogType="dialogType" :visible="isDialogVisible" @close="closeDialog"></Dialog>
</template>

<script>
import Dialog from "@/components/book_detail/Dialog.vue";

export default {
  components: {
    Dialog
  },
  props: {
    bookId: String
  },
  data() {
    // isDialogVisible会完全顺着Dialog组件和GenericDialog组件的visible属性同步，并且只有在父组件此处才可以修改，
    // 其他地方只能用，如果想触发修改，只能通过事件触发close，即调用closeDialog方法来实现
    return {
      isDialogVisible: false,
      dialogType: ''
    }
  },
  methods: {
    // 显示设置书籍类型的弹框
    showSetTypeDialog() {
      this.isDialogVisible = true
      this.dialogType = 'setType'
      console.log('书籍id数据类型', typeof this.bookId)
    },
    showSetEvaluateDialog() {
      this.isDialogVisible = true
      this.dialogType = 'setEvaluate'
    },
    showSetTagDialog() {
      this.isDialogVisible = true
      this.dialogType = 'setTag'
    },
    showSetClassifyDialog() {
      this.isDialogVisible = true
      this.dialogType = 'setClassify'
    },
    closeDialog() {
      console.log("触发关闭")
      this.isDialogVisible = false
    }
  }
}

</script>

<style scoped>
.left-side {
  position: fixed;
  margin-top: 80px;
  padding: 0;
  width: 100px;
  height: 80%;
  /* 设置总体为flex布局，使其中元素垂直排列*/
  display: flex;
  flex-direction: column;
}

.left-side div {
  /*在父组件为flex布局的情况下，设置均匀排列且平分空间*/
  justify-content: space-around;
  flex-grow: 1;
  padding: 0;
  margin: 0;
  background-color: #cccccc;
}

.left-side span {
  /* 由于 span 元素是内联元素，它们可能会受到一些默认的外边距和内边距的影响(对于内联元素，padding 和 margin 属性通常是不会生效的)。要解决这个问题，可以将 span 元素转换为块级元素，或者重置它们的默认样式。*/
  display: block;
  /* 使用绝对定位和负边距，使块元素居中*/
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
  padding: 0;
  width: 100%;
}

/* 左侧边栏文字悬停样式*/
.left-side span:hover {
  text-decoration: underline;
}
</style>