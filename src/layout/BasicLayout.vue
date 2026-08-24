<script setup lang="ts">
  import Header from "./components/header.vue"
  import Aside from "./components/sidebar.vue"
</script>

<template>
  <div class="basic-layout">
    <el-header class="header round">
      <Header/>
    </el-header>
    <el-aside class="aside round ">
      <Aside/>
    </el-aside>
    <el-main class="main round ">
      <router-view/>
    </el-main>
  </div>
</template>

<style scoped>
  .basic-layout {
    width: 100vw;
    height: 100vh;
    padding: 10px;
    display: grid;
    grid-template-columns: var(--aside-width) 1fr;
    grid-template-rows: var(--header-height) 1fr;
    grid-template-areas:
      "aside header"
      "aside main";
    gap: 15px;

    .header {
      grid-area: header;
      background-color: aqua;
      width: 100%;
      height: 100%;
    }

    .aside {
      grid-area: aside;
      background: #0070f3;
      width: 100%;
      height: 100%;
    }

    .main {
      grid-area: main;
      background-color: #f5f5f5;
      width: 100%;
      height: 100%;
    }
  }
</style>
