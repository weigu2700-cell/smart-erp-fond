<script setup lang="ts">
  import ProSearch from "@/components/ProSearch.vue";
  import type {MaterialListRequest} from "@/types/master/material.ts";

  const props = defineProps<{
    queryData: MaterialListRequest
  }>()

  const typeOptions: {label: string, value: string}[] = [
    {label: '原材料', value: 'RAW_MATERIAL'},
    {label: '半成品', value: 'SEMI_FINISHED'},
    {label: '包装材料', value: 'PACKAGING'},
    {label: '耗材', value: 'CONSUMABLE'},
    {label: '其他', value: 'OTHER'},
  ]

  const statusOptions: {label: string, value: string}[] = [
    {label: '启用', value: 'ENABLE'},
    {label: '停用', value: 'DISABLE'},
  ]

  const emit = defineEmits<{
    (e: 'query', params: MaterialListRequest): void
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
  <ProSearch
    @search="handleQuery"
    @reset="handleReset" >
      <div class="search-container">
        <el-input v-model="props.queryData.name" placeholder="请输入物料名称"></el-input>
        <el-input v-model="props.queryData.code" placeholder="请输入物料编码"></el-input>
        <el-input v-model="props.queryData.spec" placeholder="请输入规格"></el-input>
        <el-select v-model="props.queryData.type" placeholder="请选择物料类型" clearable>
          <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
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
