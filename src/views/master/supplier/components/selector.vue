<script setup lang="ts">
  import ProSearch from "@/components/ProSearch.vue";
  import type {SupplierListRequest} from "@/types/master/supplier.ts";

  const props = defineProps<{
    queryData: SupplierListRequest
  }>()

  const emit = defineEmits<{
    (e: 'query', params: SupplierListRequest): void
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
        <el-input v-model="props.queryData.name" placeholder="请输入供应商名称"></el-input>
        <el-input v-model="props.queryData.code" placeholder="请输入供应商编码"></el-input>
        <el-input v-model="props.queryData.contactName" placeholder="请输入联系人"></el-input>
        <el-input v-model="props.queryData.phone" placeholder="请输入联系电话"></el-input>
      </div>
  </ProSearch>
</template>

<style scoped>
  .search-container {
    display: flex;
    gap: 10px;
  }
</style>
