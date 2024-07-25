<template>
  <!--ref 属性在 Vue.js 中用于引用组件实例或 DOM 元素。你可以使用 ref 属性给一个组件或元素赋予一个引用名称，然后通过 this.$refs 访问该引用。-->
  <Alert ref="alert"/>
  <!--  弹框组件，通过参数和方法控制组件的显示和关闭-->
  <generic-dialog :message="dialogMessage" :title="dialogTitle" :visible="visible" @close="closeDialog">
    <template v-if="dialogType === 'setType'">
      <!--@submit表示监听表单提交事件，prevent修饰符表示阻止默认的表单提交行为，而是设置当表单提交时会调用setBookType-->
      <form @submit.prevent="setBookType">
        <div v-for="type in bookType" :key="type">
          <!--将分类列表中的选择的值绑定到setType.chooseType上-->
          <label>
            <input v-model="setType.chooseType" :value="type" type="radio">{{ type }}
          </label>
        </div>
        <!--新增类型暂时用输入框表示-->
        <input v-model="addType.name" placeholder="新增类型" type="text">
        <button type="button" @click="addBookType">添加类型</button>
        <button type="submit">确定</button>
      </form>

    </template>
    <template v-if="dialogType==='setEvaluate'">
      <form class="set-evaluate-form" @submit.prevent="setBookEvaluate">
        <input v-model="setEvaluate.beforeScore" placeholder="阅前评分" type="text">
        <input v-model="setEvaluate.afterScore" placeholder="阅后评分" type="text">
        <textarea v-model="setEvaluate.evaluate" placeholder="我的评价"/>
        <button type="submit">确定</button>
      </form>
    </template>
    <template v-if="dialogType==='setClassify'">
      <form @submit.prevent="setBookClassify">
        <div v-for="classify in bookClassify" :key="classify">
          <label>
            <input v-model="setClassify.chooseClassify" :value="classify" type="radio">{{ classify }}
          </label>
        </div>
        <input v-model="addClassify.name" placeholder="新增分类" type="text">
        <button type="button" @click="addBookClassify">添加分类</button>
        <button type="submit">确定</button>
      </form>
    </template>

  </generic-dialog>
</template>

<script>
import GenericDialog from "@/components/common/GenericDialog.vue";
import Alert from "@/components/common/Alert.vue"

export default {
  components: {
    GenericDialog,
    Alert
  },
  props: {
    visible: Boolean,
    dialogType: String,
    bookId: String
  },
  emits: ['close'],
  data() {
    return {
      dialogTitle: '',
      dialogMessage: '',
      bookType: [],
      bookClassify: [],
      setType: {
        chooseType: '',
      },
      addType: {
        name: ''
      },
      setClassify: {
        chooseClassify: ''
      },
      addClassify: {
        name: ''
      },
      setTag: {
        chooseTag: ''
      },
      setEvaluate: {
        beforeScore: null,
        afterScore: null,
        evaluate: ''
      }
    }
  },
  methods: {
    // 根据父组件中dialogType的值显示不同的弹框
    showDialog() {
      if (this.dialogType === 'setType') {
        this.dialogTitle = '选择阅读类型'
        this.dialogMessage = '选择或创建你想添加的阅读类型'
      }
      if (this.dialogType === 'setEvaluate') {
        this.dialogTitle = '设置评分评价'
        this.dialogMessage = '输入评分评价'
      }
      if (this.dialogType === 'setClassify') {
        this.dialogTitle = '设置书籍分类'
        this.dialogMessage = '请选择书籍分类'
      }
    },
    // 获取旧的书籍详情
    fetchBookOldInfo() {
      const requestData = {
        id: this.bookId
      };
      this.$api.book.bookDetail(requestData).then(responseData => {
        const book = responseData.data;
        this.setClassify.chooseClassify = book.bookClassify;
        this.setType.chooseType = book.bookType;
        this.setTag.chooseTag = book.bookTag;
        this.setEvaluate.beforeScore = book.beforeScore;
        this.setEvaluate.afterScore = book.afterScore;
        this.setEvaluate.evaluate = book.evaluate;
      })
    },
    closeDialog() {
      this.$emit('close')
    },
    // 显示已有的阅读类型
    showBookType() {
      this.$api.type.typeList().then(responseData => {
        // 清空bookType列表
        this.bookType = []
        // 遍历后端数据将name整合到bookType列表
        responseData.data.forEach(item => {
          this.bookType.push(item.name);
        })
      })
    },
    // 新增阅读类型
    addBookType() {
      this.$api.type.addType(this.addType).then(() => {
        this.showBookType()
        this.addType.name = ''
      })
    },
    // 为书籍设置阅读类型
    setBookType() {
      const requestData = {
        'bookId': this.bookId,
        'typeName': this.setType.chooseType
      }
      this.$api.book.updateBookInfo(requestData).then(() => {
        // 设置阅读类型，点击确定后调用此方法，后端返回成功后触发关闭弹窗
        this.closeDialog()
        window.location.reload()
      })
    },
    // 为书籍设置我的评价
    setBookEvaluate() {
      const requestData = {
        'bookId': this.bookId,
        'beforeScore': this.setEvaluate.beforeScore,
        'afterScore': this.setEvaluate.afterScore,
        'evaluate': this.setEvaluate.evaluate
      }
      this.$api.book.updateBookInfo(requestData).then(() => {
        this.closeDialog()
        window.location.reload()
      })
    },
    // 显示已有的书籍分类
    showBookClassify() {
      this.$api.classify.classifyList().then(responseData => {
        // 清空列表
        this.bookClassify = []
        // 遍历后端数据将name整合到bookClassify列表
        console.log(responseData.data)
        responseData.data.forEach(item => {
          this.bookClassify.push(item);
        })
      })
    },
    // 新增书籍分类
    addBookClassify() {
      this.$api.classify.addClassify(this.addClassify).then(() => {
        this.showBookClassify()
        this.addClassify.name = ''
      })
    },
    // 为书籍设置书籍分类
    setBookClassify() {
      const requestData = {
        'bookId': this.bookId,
        'classifyName': this.setClassify.chooseClassify
      }
      this.$api.book.updateBookInfo(requestData).then(() => {
        this.closeDialog()
        window.location.reload()
      })
    }
  },
  watch: {
    // 使用 watch 监听 dialogType 的变化，当 dialogType 变化时调用 showDialog 方法，更新弹框的显示。
    dialogType: {
      immediate: true,
      handler() {
        this.showDialog();
      }
    }
  },
  mounted() {
    // 组件挂载完成后调用 showBookType和showBookClassify方法，显示已有的数据。
    this.showBookType()
    this.showBookClassify()
    this.fetchBookOldInfo()
  }
}
</script>

<style scoped>
.set-evaluate-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.set-evaluate-form input,
.set-evaluate-form textarea,
.set-evaluate-form button {
  margin: 10px 0 0 0;
  width: 50%;
  position: relative;
  right: 20%;
}
</style>