<script setup lang="ts">
import ProSearch from "@/components/ProSearch.vue";
import FactoryRefer from "@/refer/FactoryRefer.vue";
import type { WorkshopListRequest } from "@/types/master/workshop.ts";

const props = defineProps<{
  queryData: WorkshopListRequest
}>()

const emit = defineEmits<{
  (e: 'query', params: WorkshopListRequest): void
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
      <el-input v-model="props.queryData.name" placeholder="请输入车间名称"></el-input>
      <el-input v-model="props.queryData.code" placeholder="请输入车间编码"></el-input>
      <FactoryRefer v-model="props.queryData.factoryId" />
    </div>
  </ProSearch>
</template>

<style scoped>
.search-container {
  display: flex;
  gap: 10px;
}
</style>
