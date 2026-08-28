<script setup lang="ts">
import Header from "./components/header.vue"
import Aside from "./components/sidebar.vue"
import Fold from "./components/fold.vue"
import useAppStore from "@/stores/app.ts";

const appStore = useAppStore()
</script>

<template>
  <div :class="appStore.isFold ? 'basic-layout-collapse' : 'basic-layout'">
    <el-header class="header">
      <Header />
    </el-header>
    <el-aside class="aside">
      <div class="brand" :class="{ 'brand--collapsed': appStore.isFold }">
        <img class="brand-mark" src="/origin-logo.svg" alt="原点 ERP" />
        <div v-if="!appStore.isFold" class="brand-copy">
          <strong>原点 ERP</strong>
          <span>ORIGIN · 企业资源管理平台</span>
        </div>
      </div>
      <Aside />
      <Fold />
    </el-aside>
    <el-main class="main">
      <router-view />
    </el-main>
  </div>
</template>

<style scoped>
.basic-layout,
.basic-layout-collapse {
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-rows: var(--header-height) 1fr;
  grid-template-areas:
    "aside header"
    "aside main";
  transition: all 0.2s;
}

.basic-layout {
  grid-template-columns: var(--aside-width) 1fr;
}

.basic-layout-collapse {
  grid-template-columns: var(--aside-collapse-width) 1fr;
}

.header {
  grid-area: header;
  background-color: #ffffff;
  border-bottom: 1px solid var(--border-color);
  width: 100%;
  height: 100%;
  padding: 0 28px;
  line-height: var(--header-height);
  box-shadow: 0 1px 0 rgb(15 23 42 / 2%);
}

.aside {
  grid-area: aside;
  background: #ffffff;
  width: 100%;
  height: 100%;
  overflow: hidden;
  transition: all 0.2s;
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--border-color);
}

.brand {
  height: var(--header-height);
  flex: 0 0 var(--header-height);
  display: flex;
  align-items: center;
  gap: 11px;
  padding: 0 20px;
  color: #3c4043;
  overflow: hidden;
}

.brand--collapsed {
  justify-content: center;
  padding: 0;
}

.brand-mark {
  width: 31px;
  height: 31px;
  flex: 0 0 31px;
  display: grid;
  place-items: center;
  border-radius: 8px;
  background: #e8f0fe;
  color: #1a73e8;
  font-size: 18px;
  font-weight: 800;
  box-shadow: none;
}

.brand-copy {
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 1px;
  white-space: nowrap;
}

.brand-copy strong {
  font-size: 15px;
  letter-spacing: .2px;
}

.brand-copy span {
  color: #80868b;
  font-size: 10px;
}

.main {
  grid-area: main;
  padding: 24px 28px 28px;
  background-color: var(--page-background);
  width: 100%;
  height: 100%;
  transition: all 0.2s;
}
</style>
