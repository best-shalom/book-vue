<template>
  <!--  弹框组件，通过参数和方法控制组件的显示和关闭-->
  <generic-dialog :message="dialogMessage" :title="dialogTitle" :visible="visible">
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
        <input v-model="addType.newType" placeholder="新增类型" type="text">
        <button type="button" @click="addBookType">添加类型</button>
        <button type="submit">确定</button>
      </form>

    </template>

  </generic-dialog>
</template>

<script>
import GenericDialog from "@/components/common/GenericDialog.vue";

export default {
  components: {
    GenericDialog
  },
  props: {
    visible: Boolean,
    dialogType: String,
    bookId: Number
  },
  data() {
    return {
      dialogTitle: '',
      dialogMessage: '',
      bookType: ['好看', '精彩', '难看'],
      setType: {
        chooseType: '',
        bookId: ''
      },
      addType: {
        newType: ''
      }
    }
  },
  methods: {
    // 根据父组件中dialogType的值显示不同的弹框
    showDialog() {
      console.log(this.visible)
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
    setBookType() {
      const type = this.setType.chooseType
      const bookId = this.bookId
      console.log(type, bookId)
      this.$api.setBookType({type, bookId}).then(response => {
        if (response.data.code === 1) {
          console.log(response.data.data);
        }
      }).catch(error => console.error('Error fetching genres:', error));
    },
    addBookType() {
      this.bookType.push(this.addType.newType)
    }
  },
  watch: {
    dialogType: {
      immediate: true,
      handler() {
        this.showDialog();
      }
    }
  },
}
</script>

<style scoped>

</style>