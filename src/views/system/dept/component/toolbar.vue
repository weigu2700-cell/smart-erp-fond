<script setup lang="ts">
  import {Delete, Download, Edit, Plus, Refresh} from "@element-plus/icons-vue";

  const emit = defineEmits(['handleAdd', 'handleEdit', 'handleDelete', 'handleRefresh'])
  const handleAdd = () => emit('handleAdd')
  const handleEdit = () => emit('handleEdit')
  const handleDelete = () => emit('handleDelete')
  const handleRefresh = () => emit('handleRefresh')

</script>

<template>
  <div class="toolbar-container">
    <el-button type="primary" class="toolbar-btn" @click="handleAdd">
      <template #icon>
        <Plus />
      </template>
      新增
    </el-button >
    <el-button type="warning" class="toolbar-btn" @click="handleEdit">
      <template #icon>
        <Edit />
      </template>
      修改
    </el-button >
    <el-button type="danger" class="toolbar-btn" @click="handleDelete">
      <template #icon>
        <Delete />
      </template>
      删除
    </el-button>
    <el-button type="info" class="toolbar-btn">
      <template #icon>
        <Download />
      </template>
      导出
    </el-button>
    <el-button type="primary" class="toolbar-btn" @click="handleRefresh">
      <template #icon>
        <Refresh />
      </template>
      刷新
    </el-button>
    <div class="toolbar-spacer"></div>
  </div>
</template>

<style scoped>
  .toolbar-container {
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

    .toolbar-btn {
      height: 34px;
      padding: 0 16px;
      border-radius: 4px;
      font-weight: 500;

      .el-icon {
        font-size: 15px;
        margin-right: 2px;
      }
    }

    .toolbar-spacer {
      flex: 1;
    }
  }
</style>
