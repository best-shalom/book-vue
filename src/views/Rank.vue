<template>
  <Navbar/>
  <h1>
    排行榜，根据星级or后续增加的阅读前评分、阅读后评分、作者评分，再根据指定时间范围的书籍进行排序，方便后续回顾或找好看的书
    也就是根据评价找书
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