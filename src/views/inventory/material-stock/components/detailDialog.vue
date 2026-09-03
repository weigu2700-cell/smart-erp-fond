<script setup lang="ts">
import EntityDetailDialog, { type DetailField } from '@/components/EntityDetailDialog.vue'
import type { MaterialStockVO } from '@/types/inventory/materialStock'
import { computed } from 'vue'
const props = defineProps<{ visible: boolean; row?: MaterialStockVO | null }>()
const emit = defineEmits<{ (e: 'cancel'): void }>()
const fields = computed<DetailField[]>(() => props.row ? [
  { label: '物料编码', value: props.row.materialCode }, { label: '物料名称', value: props.row.materialName },
  { label: '仓库', value: props.row.warehouseName }, { label: '在库量', value: props.row.onHand },
  { label: '预留量', value: props.row.reserved }, { label: '可用量', value: props.row.available },
] : [])
</script>
<template><EntityDetailDialog :visible="props.visible" title="库存详情" :row="props.row" :fields="fields" @cancel="emit('cancel')" /></template>
