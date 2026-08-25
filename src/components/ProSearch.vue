<script setup lang="ts">
  import {Search} from "@element-plus/icons-vue";

  const emit = defineEmits<{
    (e: 'search'): void
    (e: 'reset'): void
  }>()
</script>

<template>
  <div class="pro-search round">
    <div class="pro-search__form">
      <slot />
    </div>
    <div class="pro-search__actions">
      <el-button type="primary" @click="emit('search')">
        <template #icon><Search /></template>
        查询
      </el-button>
      <el-button @click="emit('reset')">重置</el-button>
    </div>
  </div>
</template>

<style scoped>
  .pro-search {
    height: 100%;
    width: 100%;
    padding: 12px 16px;
    display: flex;
    align-items: center;
    gap: 16px;
    background: #ffffff;
    border-radius: 6px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
    box-sizing: border-box;

    .pro-search__form {
      flex: 1;
      display: flex;
      flex-direction: row;
      align-items: center;
      flex-wrap: wrap;
      gap: 8px;
    }

    .pro-search__actions {
      flex-shrink: 0;
      display: flex;
      gap: 8px;
    }
  }
</style>
