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
    <el-button v-if="props.showEdit" type="warning" class="pro-toolbar-btn" @click="emit('edit')">
      <template #icon><Edit /></template>
      修改
    </el-button>
    <el-button v-if="props.showDelete" type="danger" class="pro-toolbar-btn" @click="emit('delete')">
      <template #icon><Delete /></template>
      删除
    </el-button>
    <el-button v-if="props.showExport" type="info" class="pro-toolbar-btn" @click="emit('export')">
      <template #icon><Download /></template>
      导出
    </el-button>
    <el-button v-if="props.showRefresh" type="primary" class="pro-toolbar-btn pro-toolbar-btn--ghost" @click="emit('refresh')">
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
    height: 60px;
    padding: 0 16px;
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
    border-radius: 8px;
    font-weight: 500;
    border: none;
    transition: all .2s ease;
  }

  .pro-toolbar-container .pro-toolbar-btn .el-icon {
    font-size: 15px;
    margin-right: 2px;
  }

  /* 新增：主操作，主色渐变实心 + 柔和阴影，层次分明 */
  .pro-toolbar-container .pro-toolbar-btn.pro-toolbar-btn--add {
    background: linear-gradient(135deg, var(--el-color-primary), var(--el-color-primary-light-3));
    box-shadow: 0 2px 6px rgba(64, 158, 255, 0.25);
  }

  .pro-toolbar-container .pro-toolbar-btn.pro-toolbar-btn--add:hover,
  .pro-toolbar-container .pro-toolbar-btn.pro-toolbar-btn--add:focus {
    background: linear-gradient(135deg, var(--el-color-primary-light-1), var(--el-color-primary-light-3));
  }

  /* 修改：浅琥珀底 + 琥珀字 */
  .pro-toolbar-container .pro-toolbar-btn.el-button--warning {
    background: var(--el-color-warning-light-9);
    color: var(--el-color-warning);
  }

  .pro-toolbar-container .pro-toolbar-btn.el-button--warning:hover,
  .pro-toolbar-container .pro-toolbar-btn.el-button--warning:focus {
    background: var(--el-color-warning-light-8);
    color: var(--el-color-warning);
  }

  /* 删除：浅红底 + 红字 */
  .pro-toolbar-container .pro-toolbar-btn.el-button--danger {
    background: var(--el-color-danger-light-9);
    color: var(--el-color-danger);
  }

  .pro-toolbar-container .pro-toolbar-btn.el-button--danger:hover,
  .pro-toolbar-container .pro-toolbar-btn.el-button--danger:focus {
    background: var(--el-color-danger-light-8);
    color: var(--el-color-danger);
  }

  /* 导出：浅灰底 + 灰字 */
  .pro-toolbar-container .pro-toolbar-btn.el-button--info {
    background: var(--el-color-info-light-9);
    color: var(--el-color-info);
  }

  .pro-toolbar-container .pro-toolbar-btn.el-button--info:hover,
  .pro-toolbar-container .pro-toolbar-btn.el-button--info:focus {
    background: var(--el-color-info-light-8);
    color: var(--el-color-info);
  }

  /* 刷新：浅蓝底 + 蓝字（与新增区分开） */
  .pro-toolbar-container .pro-toolbar-btn.pro-toolbar-btn--ghost {
    background: var(--el-color-primary-light-9);
    color: var(--el-color-primary);
  }

  .pro-toolbar-container .pro-toolbar-btn.pro-toolbar-btn--ghost:hover,
  .pro-toolbar-container .pro-toolbar-btn.pro-toolbar-btn--ghost:focus {
    background: var(--el-color-primary-light-8);
    color: var(--el-color-primary);
  }

  .pro-toolbar-container .pro-toolbar-spacer {
    flex: 1;
  }
</style>
