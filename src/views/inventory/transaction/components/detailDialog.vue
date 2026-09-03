<script setup lang="ts">
import EntityDetailDialog, { type DetailField } from '@/components/EntityDetailDialog.vue'
import type { TransactionVO } from '@/types/inventory/transaction'
import { computed } from 'vue'
const props = defineProps<{ visible: boolean; row?: TransactionVO | null }>()
const emit = defineEmits<{ (e: 'cancel'): void }>()
const fields = computed<DetailField[]>(() => props.row ? [
  { label: '仓库', value: props.row.warehouseName }, { label: '物料编码', value: props.row.materialCode },
  { label: '物料名称', value: props.row.materialName }, { label: '流水类型', value: props.row.transactionTypeName },
  { label: '业务类型', value: props.row.businessType }, { label: '业务单号', value: props.row.businessNo },
  { label: '数量', value: props.row.quantity }, { label: '变动后库存', value: props.row.afterOnHand },
  { label: '变动后预留', value: props.row.afterReserved }, { label: '时间', value: props.row.createTime },
] : [])
</script>
<template><EntityDetailDialog :visible="props.visible" title="库存流水详情" :row="props.row" :fields="fields" @cancel="emit('cancel')" /></template>
