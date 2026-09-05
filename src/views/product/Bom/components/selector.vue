<script setup lang="ts">
import ProSearch from '@/components/ProSearch.vue';
import type { GetPageBomRequest } from '@/types/product/Bom';
import { ref } from 'vue';

const options = ref([
  { label: '启用', value: 'ENABLE' },
  { label: '停用', value: 'DISABLE' }
])

const props = defineProps<{
  queryData: GetPageBomRequest
}>()

const emit = defineEmits<{
  (e: 'query', params: GetPageBomRequest): void
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
      <el-input v-model="props.queryData.bomNo" placeholder="请输入BOM编号"></el-input>
      <el-input v-model="props.queryData.materialId" placeholder="请输入物料编码"></el-input>
      <el-select v-model="props.queryData.status" placeholder="请选择状态" clearable>
        <el-option v-for="statusValue in options" :key="statusValue.value" :label="statusValue.label"
          :value="statusValue.value">
        </el-option>
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