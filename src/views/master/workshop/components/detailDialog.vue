<script setup lang="ts">
import EntityDetailDialog, { type DetailField } from '@/components/EntityDetailDialog.vue'
import type { WorkshopVO } from '@/types/master/workshop'
import { computed } from 'vue'
const props = defineProps<{ visible: boolean; row?: WorkshopVO | null }>()
const emit = defineEmits<{ (e: 'cancel'): void }>()
const fields = computed<DetailField[]>(() => props.row ? [
  { label: '车间名称', value: props.row.name }, { label: '记录ID', value: props.row.id },
  { label: '简称', value: props.row.shortName }, { label: '所属工厂', value: props.row.factoryName },
  { label: '状态', value: props.row.status === 1 ? '启用' : '停用' }, { label: '备注', value: props.row.remark, span: 2 },
] : [])
</script>
<template><EntityDetailDialog :visible="props.visible" title="车间详情" :row="props.row" :fields="fields" @cancel="emit('cancel')" /></template>
