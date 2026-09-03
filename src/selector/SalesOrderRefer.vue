<script setup lang="ts">
import ReferPicker from "@/components/ReferPicker.vue";
import { getPageSalesOrder } from "@/api/sales/salesOrder";
import type { GetPageSalesOrderQuery } from "@/types/sales/salesOrder";
import { ref } from "vue";

const props = defineProps<{
  modelValue?: string | number | null
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', v: string | number | null): void
  (e: 'change', row: Record<string, any> | null): void
}>()

const handleChange = (v: string | number | null) => {
  emit('update:modelValue', v)
}

const handleRowChange = (row: Record<string, any> | null) => {
  emit('change', row)
}

const columns = ref([
  { prop: 'orderNo', label: '订单号', width: 160 },
  { prop: 'customerName', label: '客户名称', minWidth: 160 },
  { prop: 'orderDate', label: '订单日期', width: 130 },
  { prop: 'totalAmount', label: '总金额', width: 120 },
  { prop: 'status', label: '状态', width: 100 },
])

const fetcher = (params: Record<string, any>) =>
  getPageSalesOrder({
    ...params,
    pageNum: params.pageNum || 1,
    pageSize: params.pageSize || 10,
    status: params.status ?? null
  } as GetPageSalesOrderQuery)
</script>

<template>
  <ReferPicker :model-value="props.modelValue" title="销售订单参照" placeholder="请选择销售订单" search-field="orderNo"
    search-placeholder="请输入订单号关键字" value-key="id" :columns="columns" :fetcher="fetcher"
    @update:model-value="handleChange" @change="handleRowChange" />
</template>