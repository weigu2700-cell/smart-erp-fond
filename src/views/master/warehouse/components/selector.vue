<script setup lang="ts">
import ProSearch from "@/components/ProSearch.vue";
import FactoryRefer from "@/refer/FactoryRefer.vue";
import type { WarehouseListRequest, WarehouseStatus, WarehouseType } from "@/types/master/warehouse.ts";

const props = defineProps<{
  queryData: WarehouseListRequest
}>()

const typeOptions: { label: string, value: WarehouseType }[] = [
  { label: '成品仓', value: 'FINISHED' },
  { label: '原料仓', value: 'MATERIAL' },
  { label: '半成品仓', value: 'SEMI_FINISHED' },
  { label: '废品仓', value: 'SCRAP' },
  { label: '其他', value: 'OTHER' },
]

const statusOptions: { label: string, value: WarehouseStatus }[] = [
  { label: '启用', value: 'ENABLE' },
  { label: '停用', value: 'DISABLE' },
]

const emit = defineEmits<{
  (e: 'query', params: WarehouseListRequest): void
  (e: 'reset'): void
}>()

const handleQuery = () => {
  emit('query', props.queryData)
}

const handleReset = () => {
  emit('reset')
}
</script>

<template>
  <ProSearch @search="handleQuery" @reset="handleReset">
    <div class="search-container">
      <el-input v-model="props.queryData.name" placeholder="请输入仓库名称"></el-input>
      <el-input v-model="props.queryData.code" placeholder="请输入仓库编码"></el-input>
      <el-select v-model="props.queryData.type" placeholder="请选择仓库类型" clearable>
        <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <FactoryRefer v-model="props.queryData.factoryId" />
      <el-select v-model="props.queryData.status" placeholder="请选择状态" clearable>
        <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </div>
  </ProSearch>
</template>

<style scoped>
.search-container {
  display: flex;
  gap: 10px;
}
</style>
