<script setup lang="ts">
import Selector from "@/views/inventory/transaction/component/selector.vue";
import ProToolbar from "@/components/ProToolbar.vue";
import ProTable, { type ProColumn } from "@/components/ProTable.vue"
import { onMounted, ref, reactive } from 'vue'
import { getTransactionList } from "@/api/inventory/transaction.ts";
import type { TransactionListRequest, TransactionListResponse } from "@/types/inventory/transaction.ts";
import { formatDate, formatDecimal } from "@/composables/useFormat.ts";

// 注意：库存流水分页参数是 pageNum
const queryData = reactive<TransactionListRequest>({
  pageNum: 1,
  pageSize: 10,
  materialId: null,
  warehouseId: null,
  businessType: null,
  businessNo: null,
})

const tableData = ref<TransactionListResponse>()

const loadData = async () => {
  tableData.value = await getTransactionList(queryData)
}

const columns = ref<ProColumn[]>([
  { label: '仓库', prop: 'warehouseName', minWidth: 130 },
  { label: '物料编码', prop: 'materialCode', width: 220 },
  { label: '物料名称', prop: 'materialName', minWidth: 140 },
  { label: '类型', prop: 'transactionTypeName', width: 100 },
  { label: '业务类型', prop: 'businessType', width: 100 },
  { label: '业务单号', prop: 'businessNo', minWidth: 180 },
  { label: '数量', prop: 'quantity', width: 90, slot: 'quantity' },
  { label: '结存在库', prop: 'afterOnHand', width: 100, slot: 'afterOnHand' },
  { label: '结存预留', prop: 'afterReserved', width: 100, slot: 'afterReserved' },
  { label: '时间', prop: 'createTime', width: 170, slot: 'createTime' },
])

const handleQuery = (params: TransactionListRequest) => {
  Object.assign(queryData, params, { pageNum: 1 })
  loadData()
}

const handleReset = () => {
  queryData.materialId = null
  queryData.warehouseId = null
  queryData.businessType = null
  queryData.businessNo = null
  queryData.pageNum = 1
  handleQuery(queryData)
}

onMounted(() => {
  loadData()
})

const handleRefresh = () => {
  loadData()
}
</script>

<template>
  <div class="transaction-container">
    <div class="selector">
      <Selector :queryData="queryData" @query="handleQuery" @reset="handleReset" />
    </div>
    <div class="toolbar">
      <ProToolbar :show-add="false" :show-edit="false" :show-delete="false" :show-export="false"
        @refresh="handleRefresh" />
    </div>
    <div class="table">
      <ProTable :data="tableData?.records ?? []" :columns="columns" :total="tableData?.total ?? 0"
        :page="queryData.pageNum" :page-size="queryData.pageSize"
        @update:page="(p: number) => { queryData.pageNum = p; loadData() }"
        @update:pageSize="(s: number) => { queryData.pageSize = s; queryData.pageNum = 1; loadData() }">
        <template #quantity="{ row }">
          <span :class="row.quantity && row.quantity > 0 ? 'qty-in' : 'qty-out'">
            {{ formatDecimal.default(row.quantity, 0) }}
          </span>
        </template>
        <template #afterOnHand="{ row }">
          {{ formatDecimal.default(row.afterOnHand, 0) }}
        </template>
        <template #afterReserved="{ row }">
          {{ formatDecimal.default(row.afterReserved, 0) }}
        </template>
        <template #createTime="{ row }">
          {{ formatDate.DateTime ? formatDate.DateTime(row.createTime) : '-' }}
        </template>
      </ProTable>
    </div>
  </div>
</template>

<style scoped>
.transaction-container {
  width: 100%;
  height: 100%;
  background-color: #f0f2f5;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.transaction-container .selector {
  width: 100%;
  background: #ffffff;
  border: 1px solid #e4e7ed;
}

.transaction-container .toolbar {
  width: 100%;
  background: #ffffff;
  border: 1px solid #e4e7ed;
}

.transaction-container .table {
  width: 100%;
  flex: 1;
  min-height: 0;
}

.transaction-container .qty-in {
  color: #67c23a;
}

.transaction-container .qty-out {
  color: #f56c6c;
}
</style>