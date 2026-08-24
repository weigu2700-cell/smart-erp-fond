<script setup lang="ts">
import type {deptColumns, deptResponse} from "@/types/system/dept.ts";

  const props = defineProps<{
    table?: deptResponse
    columns: deptColumns[]
    page: number
    pageSize: number
  }>()

  const emit = defineEmits<{
    (e: 'update:page', page: number): void
    (e: 'update:pageSize', size: number): void
    (e: 'selectionChange', rows: deptResponse['records']): void
  }>()

  const handlePageChange = (page: number) => emit('update:page', page)
  const handleSizeChange = (size: number) => emit('update:pageSize', size)
  const handleSelectionChange = (rows: deptResponse['records']) => emit('selectionChange', rows)
</script>

<template>
  <div class="table-container">
    <el-table :data="props.table?.records ?? []" style="width: 100%" class="table round" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column
        v-for="column in props.columns"
        :key="column.prop"
        :prop="column.prop"
        :label="column.label"
      />
    </el-table>
    <div class="pagination round">
      <el-pagination
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="props.table?.total ?? 0"
        :current-page="props.page"
        :page-size="props.pageSize"
        :page-sizes="[10, 20, 50, 100]"
        @current-change="handlePageChange"
        @size-change="handleSizeChange"
      />
    </div>
  </div>
</template>

<style scoped>
  .table-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 10px;

    .table {
      height: calc(100% - 50px);
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
    }
    .pagination {
      height: 50px;
      display: flex;
      align-items: center;
      padding: 10px;
      gap: 10px;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
      background: #ffffff;
    }
  }
</style>
