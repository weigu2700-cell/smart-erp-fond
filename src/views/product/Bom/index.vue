<script setup lang="ts">
import type { ProColumn } from '@/components/ProTable.vue';
import ProTable from '@/components/ProTable.vue';
import type { GetPageBomRequest, GetPageBomResponse } from '@/types/product/Bom';
import { onMounted, ref } from 'vue'
import { getPageBom } from '../../../api/product/Bom';
import Selector from './components/selector.vue';
import ProToolbar from '@/components/ProToolbar.vue';
import detailDialog from './components/detail.vue';
import type { BomVo } from '@/types/product/Bom';

const SelectionId = ref<string>()
const tableRef = ref()
const detailVisible = ref<boolean>(false)
const detailRow = ref<BomVo | null>(null)
const queryData = ref<GetPageBomRequest>({
  pageNum: 1,
  pageSize: 10,
  bomNo: null,
  materialId: null,
  status: null
})

const tableData = ref<GetPageBomResponse>({
  records: [],
  total: 0,
  size: 0,
  current: 0,
  optimizeCountSql: 'string',
  searchCount: ''
})

const columns = ref<ProColumn[]>([
  { label: 'BOM编号', prop: 'bomNo', width: 150 },
  { label: '物料编码', prop: 'materialCode', width: 150 },
  { label: '物料名称', prop: 'materialName', minWidth: 200 },
  { label: '状态', prop: 'status', width: 100 },
  { label: '版本', prop: 'version', width: 80 },
  { label: '备注', prop: 'remark', minWidth: 150 },
  { label: '创建时间', prop: 'createTime', width: 180 },
  { label: '更新时间', prop: 'updateTime', width: 180 },
])

const loadData = async (): Promise<void> => {
  try {
    const res = await getPageBom(queryData.value)
    tableData.value = res
  } catch (error) {
    console.error('加载BOM列表失败', error)
  }
}

const handleSelectionChange = (selection: any[]) => {
  SelectionId.value = selection[0]?.id
}

const handleRowDblclick = (row: BomVo) => {
  detailRow.value = row
  detailVisible.value = true
}

const handleCancel = () => {
  detailVisible.value = false
  detailRow.value = null
}

const handleQuery = () => {
  loadData()
}

const handleReset = () => {
  queryData.value = {
    pageNum: 1,
    pageSize: 10,
    bomNo: null,
    materialId: null,
    status: null
  }
  loadData()
}

const handleAdd = () => {
  // TODO: 实现新增功能
}

const handleEdit = () => {

}

const handleDelete = () => {

}

const handleExport = () => {

}

const handleRefresh = () => {
  loadData()
}

onMounted(() => {
  loadData()
})
</script>

<template>
  <div class="container">
    <section class="query">
      <Selector :queryData="queryData" @query="handleQuery" @reset="handleReset" />
    </section>
    <section class="toolbar">
      <ProToolbar @add="handleAdd" @edit="handleEdit" @delete="handleDelete" @export="handleExport"
        @refresh="handleRefresh" />
    </section>
    <section class="table">
      <ProTable ref="tableRef" :data="tableData?.records ?? []" :columns="columns" :total="tableData?.total ?? 0"
        :page="queryData.pageNum" :page-size="queryData.pageSize"
        @update:page="(p: number) => { queryData.pageNum = p; loadData() }"
        @update:pageSize="(s: number) => { queryData.pageSize = s; queryData.pageNum = 1; loadData() }"
        @selectionChange="handleSelectionChange" @rowDblclick="handleRowDblclick">
      </ProTable>
    </section>
  </div>
  <detailDialog :visible="detailVisible" :row="detailRow" @cancel="handleCancel" />
</template>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;

  .query {
    width: 100%;
  }

  .toolbar {
    width: 100%;
  }

  .table {
    width: 100%;
    flex: 1;
  }
}
</style>