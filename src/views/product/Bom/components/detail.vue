<script setup lang="ts">
import EntityDetailDialog, { type DetailField } from '@/components/EntityDetailDialog.vue';
import type { BomVo } from '@/types/product/Bom';
import { computed } from 'vue';

const props = defineProps<{
  visible: boolean;
  row?: BomVo | null;
}>();

const emit = defineEmits<{
  (e: 'cancel'): void;
}>();

const fields = computed<DetailField[]>(() => props.row ? [
  { label: 'BOM编号', value: props.row.bomNo },
  { label: '物料编码', value: props.row.materialCode },
  { label: '物料名称', value: props.row.materialName },
  { label: '状态', value: props.row.status === 'ENABLE' ? '启用' : props.row.status === 'DISABLE' ? '停用' : props.row.status },
  { label: '版本', value: props.row.version },
  { label: '创建时间', value: props.row.createTime },
  { label: '更新时间', value: props.row.updateTime },
  { label: '备注', value: props.row.remark, span: 2 },
] : []);
</script>

<template>
  <EntityDetailDialog :visible="props.visible" title="BOM详情" :row="props.row" :fields="fields"
    @cancel="emit('cancel')" />
</template>

<style scoped></style>