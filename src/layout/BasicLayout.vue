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
    padding: 8px;
    display: grid;
    grid-template-columns: var(--aside-width) 1fr;
    grid-template-rows: var(--header-height) 1fr;
    grid-template-areas:
      "aside header"
      "aside main";
    gap: 8px;

    .header {
      grid-area: header;
      background-color: #ffffff;
      border-bottom: 1px solid #e4e7ed;
      width: 100%;
      height: 100%;
      padding: 0 16px;
      line-height: var(--header-height);
    }

    .aside {
      grid-area: aside;
      background: #304156;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }

    .main {
      grid-area: main;
      padding: 10px;
      background-color: #f0f2f5;
      width: 100%;
      height: 100%;
    }
  }
</style>
