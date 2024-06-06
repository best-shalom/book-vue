<template>
  <!--ref 属性在 Vue.js 中用于引用组件实例或 DOM 元素。你可以使用 ref 属性给一个组件或元素赋予一个引用名称，然后通过 this.$refs 访问该引用。-->
  <Alert ref="alert"/>
  <!--  弹框组件，通过参数和方法控制组件的显示和关闭-->
  <generic-dialog :message="dialogMessage" :title="dialogTitle" :visible="visible" @close="closeDialog">
    <template v-if="dialogType === 'setType'">
      <!--@submit表示监听表单提交事件，prevent修饰符表示阻止默认的表单提交行为。当表单提交时会调用setBookType-->
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
      setType: {
        chooseType: '',
      },
      addType: {
        name: ''
      }
    }
  },
  methods: {
    // 根据父组件中dialogType的值显示不同的弹框
    showDialog() {
      if (this.dialogType === 'setType') {
        this.dialogTitle = '选择书籍类型'
        this.dialogMessage = '选择或创建你想添加的书籍类型'
      }
      if (this.dialogType === 'setCommit') {
        this.dialogTitle = '设置书籍评论'
        this.dialogMessage = '请输入书籍评论'
      }
      if (this.dialogType === 'setClassify') {
        this.dialogTitle = '设置书籍分类'
        this.dialogMessage = '请选择书籍分类'
      }
    },
    // 显示已有的阅读类型
    showBookType() {
      this.$api.typeList().then(response => {
        if (response.data.code === 1) {
          // 清空bookType列表
          this.bookType = []
          // 遍历后端数据将name整合到bookType列表
          response.data.data.forEach(item => {
            this.bookType.push(item.name);
          })
        } else {
          this.$refs.alert.showAlert(response.data.msg)
        }
      }).catch(error => console.error('Error get bookTypeList:', error));
    },
    // 新增阅读类型
    addBookType() {
      this.$api.addType(this.addType).then(response => {
        if (response.data.code === 1) {
          console.log(response.data.data);
          this.showBookType()
          this.addType.name = ''
        } else {
          console.log(response.data.msg);
          this.$refs.alert.showAlert(response.data.msg)
        }
      }).catch(error => console.error('Error addType:', error));
    },
    // 为书籍设置阅读类型
    setBookType() {
      const requestData = {
        'bookId': this.bookId,
        'typeName': this.setType.chooseType
      }
      this.$api.updateBookInfo(requestData).then(response => {
        if (response.data.code === 1) {
          console.log(response.data.data);
          // 设置阅读类型，点击确定后调用此方法，后端返回成功后触发关闭弹窗
          this.closeDialog()
        }
      }).catch(error => console.error('Error setBookType:', error));
    },
    closeDialog() {
      this.$emit('close')
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
    this.showBookType()
  },
}
</script>

<style scoped>

</style>