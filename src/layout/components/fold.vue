<template>
  <div class="fold">
    <el-button type="primary" @click="toggleCollapse">
      <el-icon>
        <Fold v-if="!appStore.isFold" />
        <Expand v-else />
      </el-icon>
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { Fold, Expand } from '@element-plus/icons-vue'
import useAppStore from "@/stores/app.ts";

const appStore = useAppStore()

const toggleCollapse = () => {
  appStore.toggleCollapse()
}
</script>

<style scoped>
.fold {
  width: 100%;
  height: 56px;
  flex: 0 0 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
}

.fold .el-button {
  width: 100%;
  height: 34px;
  border: 1px solid rgb(255 255 255 / 16%);
  background: rgb(255 255 255 / 7%);
  color: #d8e0ea;
}

.fold .el-button:hover {
  background: rgb(255 255 255 / 14%);
  color: #fff;
}
</style>
