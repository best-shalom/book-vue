<template>
  <div>
    <nav>
      <ul>
        <li><a href="#">首页</a></li>
        <li><a href="/">全部</a></li>
        <li><a href="/rank">排行</a></li>
        <li><a href="/tag">标签</a></li>
        <li><a href="/search">搜索</a></li>
      </ul>
    </nav>
  </div>

</template>

<script>

</script>

<style scoped>
/* 导航栏本身固定视口，使<nav>元素内部的子元素纵向居中排列*/
nav {
  position: fixed;
  width: 100%;
  height: 60px;
  top: 0;
  padding: 0;
  box-shadow: 0 5px 7px #666666;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 如果想知道一个元素的所在布局，以及调整时的作用范围，就可以将元素添加背景色，方便观察元素布局*/
ul {
  margin: 0;
  padding: 0; /* <ul> 元素会有一些默认的内外边距*/
  display: flex;
  justify-content: space-around; /* 将列表项水平排列 */
  list-style: none;
  flex-grow: 1; /* 横向占满nav的剩余空间*/
  height: 100%; /* 由于 <ul> 元素没有设置具体的高度，且父元素 <nav> 设置了固定的高度为 60px，所以可能导致 <ul> 元素无法完全占满 <nav> 元素的高度。*/
}

li {
  display: flex;
  justify-content: space-around;
  flex-grow: 1;
  background-color: #cccccc;
  border-right: 1px solid #666666; /* solid表示边框实线*/
}

a {
  margin: auto;
  text-decoration: none;
  color: #333333;
}

</style>