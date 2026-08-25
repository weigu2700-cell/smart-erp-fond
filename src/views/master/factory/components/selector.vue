<script setup lang="ts">
  import ProSearch from "@/components/ProSearch.vue";
  import type {FactoryListRequest, FactoryStatus} from "@/types/master/factory.ts";

  const props = defineProps<{
    queryData: FactoryListRequest
  }>()


  const statusOptions: {label: string, value: FactoryStatus}[] = [
    {label: '启用', value: 'ENABLE'},
    {label: '停用', value: 'DISABLE'},
  ]

  const emit = defineEmits<{
    (e: 'query', params: FactoryListRequest): void
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
        <el-input v-model="props.queryData.name" placeholder="请输入工厂名称"></el-input>
        <el-input v-model="props.queryData.code" placeholder="请输入工厂编码"></el-input>
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
