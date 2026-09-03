<script setup lang="ts">
import EntityDetailDialog, { type DetailField } from '@/components/EntityDetailDialog.vue'
import type { FactoryVO } from '@/types/master/factory'
import { computed } from 'vue'
const props = defineProps<{ visible: boolean; row?: FactoryVO | null }>()
const emit = defineEmits<{ (e: 'cancel'): void }>()
const fields = computed<DetailField[]>(() => props.row ? [
  { label: '工厂名称', value: props.row.name }, { label: '工厂编码', value: props.row.code },
  { label: '简称', value: props.row.shortName }, { label: '状态', value: props.row.status === 1 ? '启用' : '停用' },
  { label: '地址', value: props.row.address }, { label: '备注', value: props.row.remark, span: 2 },
] : [])
</script>
<template><EntityDetailDialog :visible="props.visible" title="工厂详情" :row="props.row" :fields="fields" @cancel="emit('cancel')" /></template>
