<script setup lang="ts">
  import {Delete, Download, Edit, Plus, Refresh} from "@element-plus/icons-vue";

  const props = withDefaults(defineProps<{
    showAdd?: boolean
    showEdit?: boolean
    showDelete?: boolean
    showExport?: boolean
    showRefresh?: boolean
  }>(), {
    showAdd: true,
    showEdit: true,
    showDelete: true,
    showExport: true,
    showRefresh: true,
  })

  const emit = defineEmits<{
    (e: 'add'): void
    (e: 'edit'): void
    (e: 'delete'): void
    (e: 'export'): void
    (e: 'refresh'): void
  }>()
</script>

<template>
  <div class="pro-toolbar-container">
    <el-button v-if="props.showAdd" type="primary" class="pro-toolbar-btn pro-toolbar-btn--add" @click="emit('add')">
      <template #icon><Plus /></template>
      新增
    </el-button>
    <el-button v-if="props.showEdit" type="default" class="pro-toolbar-btn" @click="emit('edit')">
      <template #icon><Edit /></template>
      修改
    </el-button>
    <el-button v-if="props.showDelete" type="default" class="pro-toolbar-btn pro-toolbar-btn--delete" @click="emit('delete')">
      <template #icon><Delete /></template>
      删除
    </el-button>
    <el-button v-if="props.showExport" type="default" class="pro-toolbar-btn" @click="emit('export')">
      <template #icon><Download /></template>
      导出
    </el-button>
    <el-button v-if="props.showRefresh" type="default" class="pro-toolbar-btn" @click="emit('refresh')">
      <template #icon><Refresh /></template>
      刷新
    </el-button>
    <slot />
    <div class="pro-toolbar-spacer"></div>
  </div>
</template>

<style scoped>
  .pro-toolbar-container {
    width: 100%;
    min-height: 56px;
    height: auto;
    padding: 10px 16px;
    display: flex;
    align-items: center;
    gap: 8px;
    background: #ffffff;
    border-radius: 6px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
    box-sizing: border-box;
  }

  .pro-toolbar-container .pro-toolbar-btn {
    height: 34px;
    padding: 0 16px;
    border-radius: 6px;
    font-weight: 500;
    border: 1px solid #dadce0;
    background: #fff;
    color: #3c4043;
    transition: all .2s ease;
  }

  .pro-toolbar-container .pro-toolbar-btn:hover,
  .pro-toolbar-container .pro-toolbar-btn:focus-visible {
    border-color: #9aa0a6;
    background: #f8fafd;
    color: #202124;
  }

  .pro-toolbar-container .pro-toolbar-btn .el-icon {
    font-size: 15px;
    margin-right: 2px;
  }

  /* 只保留一个主操作，避免工具栏出现多色竞争 */
  .pro-toolbar-container .pro-toolbar-btn.pro-toolbar-btn--add {
    background: var(--el-color-primary);
    box-shadow: none;
  }

  .pro-toolbar-container .pro-toolbar-btn.pro-toolbar-btn--add:hover,
  .pro-toolbar-container .pro-toolbar-btn.pro-toolbar-btn--add:focus {
    background: var(--el-color-primary-dark-2);
  }

  .pro-toolbar-container .pro-toolbar-btn.pro-toolbar-btn--delete {
    color: #b42318;
  }

  .pro-toolbar-container .pro-toolbar-btn.pro-toolbar-btn--delete:hover,
  .pro-toolbar-container .pro-toolbar-btn.pro-toolbar-btn--delete:focus-visible {
    border-color: #e5c2be;
    background: #fef3f2;
    color: #a11b12;
  }

  .pro-toolbar-container .pro-toolbar-spacer {
    flex: 1;
  }
</style>
