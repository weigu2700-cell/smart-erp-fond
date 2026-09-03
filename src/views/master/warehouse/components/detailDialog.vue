<script setup lang="ts">
import EntityDetailDialog, { type DetailField } from '@/components/EntityDetailDialog.vue'
import type { WarehouseVO } from '@/types/master/warehouse'
import { computed } from 'vue'
const props = defineProps<{ visible: boolean; row?: WarehouseVO | null }>()
const emit = defineEmits<{ (e: 'cancel'): void }>()
const fields = computed<DetailField[]>(() => props.row ? [
  { label: '仓库名称', value: props.row.name }, { label: '仓库编码', value: props.row.code },
  { label: '仓库类型', value: props.row.type }, { label: '所属工厂', value: props.row.factoryName },
  { label: '状态', value: props.row.status === 1 ? '启用' : '停用' }, { label: '地址', value: props.row.address, span: 2 },
  { label: '备注', value: props.row.remark, span: 2 },
] : [])
</script>
<template>
  <EntityDetailDialog :visible="props.visible" title="仓库详情" :row="props.row" :fields="fields"
    @cancel="emit('cancel')" />
</template>
