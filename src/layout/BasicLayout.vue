<script setup lang="ts">
import Header from "./components/header.vue"
import Aside from "./components/sidebar.vue"
import Fold from "./components/fold.vue"
import useAppStore from "@/stores/app.ts";

const appStore = useAppStore()
</script>

<template>
  <div :class="appStore.isFold ? 'basic-layout-collapse' : 'basic-layout'">
    <el-header class="header round">
      <Header />
    </el-header>
    <el-aside class="aside round">
      <Aside />
      <Fold />
    </el-aside>
    <el-main class="main round ">
      <router-view />
    </el-main>
  </div>
</template>

<style scoped>
.basic-layout,
.basic-layout-collapse {
  width: 100vw;
  height: 100vh;
  padding: 8px;
  display: grid;
  grid-template-rows: var(--header-height) 1fr;
  grid-template-areas:
    "aside header"
    "aside main";
  gap: 8px;
  transition: all 0.2s;
}

.basic-layout {
  grid-template-columns: var(--aside-width) 1fr;
}

.basic-layout-collapse {
  grid-template-columns: 64px 1fr;
}

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
  transition: all 0.2s;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.main {
  grid-area: main;
  padding: 10px;
  background-color: #f0f2f5;
  width: 100%;
  height: 100%;
  transition: all 0.2s;
}
</style>