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
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 12px;
}

.fold .el-button {
  width: 100%;
}
</style>