<script setup lang="ts">
import ProSearch from "@/components/ProSearch.vue";
import MaterialRefer from "@/refer/MaterialRefer.vue";
import WarehouseRefer from "@/refer/WarehouseRefer.vue";
import type { MaterialStockListRequest } from "@/types/inventory/materialStock.ts";

const props = defineProps<{
  queryData: MaterialStockListRequest
}>()

const emit = defineEmits<{
  (e: 'query', params: MaterialStockListRequest): void
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
      <MaterialRefer v-model="props.queryData.materialId" />
      <WarehouseRefer v-model="props.queryData.warehouseId" />
    </div>
  </ProSearch>
</template>

<style scoped>
.search-container {
  display: flex;
  gap: 10px;
}
</style>
