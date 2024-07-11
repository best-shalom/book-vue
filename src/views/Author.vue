<template>
  <Navbar/>
  <h1>
    作者列表，可以给作者评分、给作者打分类（自行定义作者的分类，比如虐文作者什么的），点击作者可以看到作者的书籍列表，点击书籍可以查看书籍详情。
    提供搜索、过滤等，也就是方便根据作者找书
  </h1>
</template>

<script>
import Navbar from '@/components/home/Navbar.vue'

export default {
  components: {
    Navbar
  }
}
</script>

<style scoped>

</style>