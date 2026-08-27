<script setup lang="ts">
  import ProSearch from "@/components/ProSearch.vue";
  import MaterialRefer from "@/selector/MaterialRefer.vue";
  import WarehouseRefer from "@/selector/WarehouseRefer.vue";
  import type {TransactionListRequest} from "@/types/inventory/transaction.ts";

  const props = defineProps<{
    queryData: TransactionListRequest
  }>()

  const emit = defineEmits<{
    (e: 'query', params: TransactionListRequest): void
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
        <MaterialRefer v-model="props.queryData.materialId" />
        <WarehouseRefer v-model="props.queryData.warehouseId" />
        <el-input v-model="props.queryData.businessType" placeholder="请输入业务类型"></el-input>
        <el-input v-model="props.queryData.businessNo" placeholder="请输入业务单号"></el-input>
      </div>
  </ProSearch>
</template>

<style scoped>
  .search-container {
    display: flex;
    gap: 10px;
  }
</style>
