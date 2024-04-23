<template>
  <nav>
    <ul class="pagination">
      <li v-for="page in totalPages" :key="page" :class="{ active: page === currentPage }" @click="changePage(page)">
        <a href="#">{{ page }}</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: ['totalPages', 'currentPage'],
  methods: {
    changePage(page) {
      this.$emit('page-changed', page);
    }
  }
}
</script>
