<script setup lang="ts">
import EntityDetailDialog, { type DetailField } from '@/components/EntityDetailDialog.vue'
import type { MaterialVO } from '@/types/master/material'
import { computed } from 'vue'
const props = defineProps<{ visible: boolean; row?: MaterialVO | null }>()
const emit = defineEmits<{ (e: 'cancel'): void }>()
const fields = computed<DetailField[]>(() => props.row ? [
  { label: '物料编码', value: props.row.code }, { label: '物料名称', value: props.row.name },
  { label: '规格型号', value: props.row.spec }, { label: '物料类型', value: props.row.type },
  { label: '单位', value: props.row.unit }, { label: '安全库存', value: props.row.safetyStock },
  { label: '状态', value: props.row.status === 1 ? '启用' : '停用' }, { label: '备注', value: props.row.remark, span: 2 },
] : [])
</script>
<template><EntityDetailDialog :visible="props.visible" title="物料详情" :row="props.row" :fields="fields" @cancel="emit('cancel')" /></template>
