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
    <el-button v-if="props.showAdd" type="primary" class="pro-toolbar-btn" @click="emit('add')">
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
    <el-button v-if="props.showRefresh" type="primary" class="pro-toolbar-btn" @click="emit('refresh')">
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

    .pro-toolbar-btn {
      height: 34px;
      padding: 0 16px;
      border-radius: 4px;
      font-weight: 500;

      .el-icon {
        font-size: 15px;
        margin-right: 2px;
      }
    }

    .pro-toolbar-spacer {
      flex: 1;
    }
  }
</style>
