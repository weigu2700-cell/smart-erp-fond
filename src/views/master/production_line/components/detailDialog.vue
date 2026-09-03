<script setup lang="ts">
import EntityDetailDialog, { type DetailField } from '@/components/EntityDetailDialog.vue'
import type { ProductionLineVO } from '@/types/master/productionLine'
import { computed } from 'vue'
const props = defineProps<{ visible: boolean; row?: ProductionLineVO | null }>()
const emit = defineEmits<{ (e: 'cancel'): void }>()
const fields = computed<DetailField[]>(() => props.row ? [
  { label: '产线名称', value: props.row.name }, { label: '记录ID', value: props.row.id },
  { label: '所属车间', value: props.row.workshopName }, { label: '日产能', value: props.row.capacityPerDay },
  { label: '状态', value: props.row.status === 1 ? '启用' : '停用' }, { label: '备注', value: props.row.remark, span: 2 },
] : [])
</script>
<template><EntityDetailDialog :visible="props.visible" title="生产线详情" :row="props.row" :fields="fields" @cancel="emit('cancel')" /></template>
