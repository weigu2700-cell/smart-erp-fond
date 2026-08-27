<script setup lang="ts">
  import Selector from "@/views/inventory/material-stock/component/selector.vue";
  import ProToolbar from "@/components/ProToolbar.vue";
  import ProTable, {type ProColumn} from "@/components/ProTable.vue"
  import {onMounted, ref, reactive} from 'vue'
  import {getMaterialStockList} from "@/api/inventory/materialStock.ts";
  import type {MaterialStockCreateRequest, MaterialStockListRequest, MaterialStockListResponse} from "@/types/inventory/materialStock.ts";
  import SaveDialog from "@/views/inventory/material-stock/saveDialog.vue";
  import {ElMessage} from "element-plus";

  // 注意：库存接口分页参数是 pageNum
  const queryData = reactive<MaterialStockListRequest>({
    pageNum: 1,
    pageSize: 10,
    materialId: null,
    warehouseId: null,
  })

  const tableData = ref<MaterialStockListResponse>()
  const visible = ref(false)

  const loadData = async () => {
    tableData.value = await getMaterialStockList(queryData)
  }

  const columns = ref<ProColumn[]>([
    {label: '物料编码', prop: 'materialCode', width: 240},
    {label: '物料名称', prop: 'materialName', minWidth: 160},
    {label: '仓库', prop: 'warehouseName', minWidth: 140},
    {label: '在库量', prop: 'onHand', width: 100, slot: 'onHand'},
    {label: '预留量', prop: 'reserved', width: 100, slot: 'reserved'},
    {label: '可用量', prop: 'available', width: 100, slot: 'available'},
  ])

  const handleQuery = (params: MaterialStockListRequest) => {
    Object.assign(queryData, params, {pageNum: 1})
    loadData()
  }

  const handleReset = () => {
    queryData.materialId = null
    queryData.warehouseId = null
    queryData.pageNum = 1
    handleQuery(queryData)
  }

  onMounted(() => {
    loadData()
  })

  const handleAdd = () => {
    visible.value = true
  }

  const handleRefresh = () => {
    loadData()
  }

  const handleSubmit = async (form: MaterialStockCreateRequest) => {
    visible.value = false
    await loadData()
    ElMessage.success('创建库存成功')
  }

  const handleCancel = () => {
    visible.value = false
  }
</script>

<template>
  <div class="material-stock-container">
    <div class="selector">
      <Selector
        :queryData="queryData"
        @query="handleQuery"
        @reset="handleReset"
      />
    </div>
    <div class="toolbar">
      <ProToolbar
        :show-edit="false"
        :show-delete="false"
        :show-export="false"
        @add="handleAdd"
        @refresh="handleRefresh"
      />
    </div>
    <div class="table">
      <ProTable
        :data="tableData?.records ?? []"
        :columns="columns"
        :total="tableData?.total ?? 0"
        :page="queryData.pageNum"
        :page-size="queryData.pageSize"
        @update:page="(p: number) => { queryData.pageNum = p; loadData() }"
        @update:pageSize="(s: number) => { queryData.pageSize = s; queryData.pageNum = 1; loadData() }"
      >
        <template #onHand="{row}">
          <span>{{ row.onHand ?? 0 }}</span>
        </template>
        <template #reserved="{row}">
          <span>{{ row.reserved ?? 0 }}</span>
        </template>
        <template #available="{row}">
          <span>{{ row.available ?? 0 }}</span>
        </template>
      </ProTable>
    </div>
  </div>

  <SaveDialog
    :visible="visible"
    title="新增物料库存"
    @cancel="handleCancel"
    @submit="handleSubmit"
  />
</template>

<style scoped>
  .material-stock-container {
    width: 100%;
    height: 100%;
    background-color: #f0f2f5;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .material-stock-container .selector {
    width: 100%;
    background: #ffffff;
    border: 1px solid #e4e7ed;
  }

  .material-stock-container .toolbar {
    width: 100%;
    background: #ffffff;
    border: 1px solid #e4e7ed;
  }

  .material-stock-container .table {
    width: 100%;
    flex: 1;
    min-height: 0;
  }
</style>
