<script setup lang="ts">
import Selector from "@/views/master/factory/components/selector.vue";
import ProToolbar from "@/components/ProToolbar.vue";
import ProTable, { type ProColumn } from "@/components/ProTable.vue"
import { onMounted, ref, reactive } from 'vue'
import { addFactory, changeFactoryStatus, getFactoryList, updateFactory } from "@/api/master/factory.ts";
import type {
  addOrUpdateFactoryRequest,
  FactoryListRequest,
  FactoryListResponse,
  FactoryVO
} from "@/types/master/factory.ts";
import SaveDialog from "@/views/master/factory/saveDialog.vue";
import { ElMessage, ElMessageBox } from "element-plus";

const queryData = reactive<FactoryListRequest>({
  page: 1,
  pageSize: 10,
  name: null,
  code: null,
  status: null,
})

const tableData = ref<FactoryListResponse>()
const visible = ref(false)
const model = ref<'add' | 'edit'>('add')
const selectedRowId = ref<string>()
const tableRef = ref<{ clearSelection: () => void }>()

const handleSelectionChange = (rows: FactoryVO[]) => {
  // TODO: 临时诊断，确认后删除
  console.log('[selection-change] rows =', rows, 'id =', rows[0]?.id)
  // 后端 id 可能是数字（Java Long），统一转字符串存储，避免 === 比较失败
  selectedRowId.value = rows[0] ? String(rows[0].id) : undefined
}

const loadData = async () => {
  tableData.value = await getFactoryList(queryData)
}

const columns = ref<ProColumn[]>([
  { label: '工厂名称', prop: 'name', minWidth: 140 },
  { label: '工厂编码', prop: 'code', width: 240 },
  { label: '简称', prop: 'shortName', width: 120 },
  { label: '状态', prop: 'status', width: 90, slot: 'status' },
  { label: '地址', prop: 'address', minWidth: 220 },
  { label: '备注', prop: 'remark', minWidth: 160 },
])

const handleQuery = (params: FactoryListRequest) => {
  Object.assign(queryData, params, { page: 1 })
  loadData()
}

const handleReset = () => {
  queryData.name = null
  queryData.code = null
  queryData.status = null

  queryData.page = 1
  handleQuery(queryData)
}

onMounted(() => {
  loadData()
})

const handleAdd = () => {
  model.value = 'add'
  visible.value = true
}

const handleEdit = () => {
  const row = tableData.value?.records?.find(item => String(item.id) === selectedRowId.value)
  if (!row) {
    ElMessage.warning('请选择要编辑的工厂')
    return
  }
  model.value = 'edit'
  visible.value = true
}

const handleDelete = async () => {
  const row = tableData.value?.records?.find(item => String(item.id) === selectedRowId.value)
  if (!row) {
    ElMessage.warning('请选择要删除的工厂')
    return
  }
  try {
    await ElMessageBox.confirm(
      `确定要删除工厂 ${row.name} 吗？`,
      '删除确认',
      {
        type: 'warning',
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }
    )
  } catch {
    return // 用户取消
  }
  try {
    await changeFactoryStatus({ id: row.id, status: 'DISABLE' })
    ElMessage.success('删除成功')
    tableRef.value?.clearSelection()
    selectedRowId.value = undefined
    await loadData()
  } catch {
    ElMessage.error('删除失败')
  }
}

const handleRefresh = () => {
  loadData()
}

const handleSubmit = async (form: addOrUpdateFactoryRequest) => {
  try {
    if (model.value === 'edit' && selectedRowId.value) {
      await updateFactory(selectedRowId.value, form)
    } else {
      await addFactory(form)
    }
    ElMessage.success('保存成功')
    visible.value = false
    tableRef.value?.clearSelection()
    selectedRowId.value = undefined
    await loadData()
  } catch {
    ElMessage.error('保存失败')
  }
}

const handleCancel = () => {
  visible.value = false
}
</script>

<template>
  <div class="factory-container round">
    <div class="selector round">
      <Selector :queryData="queryData" @query="handleQuery" @reset="handleReset" />
    </div>
    <div class="toolbar round">
      <ProToolbar @add="handleAdd" @edit="handleEdit" @delete="handleDelete" @refresh="handleRefresh" />
    </div>
    <div class="table round">
      <ProTable ref="tableRef" :data="tableData?.records ?? []" :columns="columns" :total="tableData?.total ?? 0"
        :page="queryData.page" :page-size="queryData.pageSize"
        @update:page="(p: number) => { queryData.page = p; loadData() }"
        @update:pageSize="(s: number) => { queryData.pageSize = s; queryData.page = 1; loadData() }"
        @selectionChange="handleSelectionChange">
        <template #status="{ row }">
          <el-tag :type="row.status === 1 ? 'success' : 'info'" size="small">
            {{ row.status === 1 ? '启用' : '停用' }}
          </el-tag>
        </template>
      </ProTable>
    </div>
  </div>

  <SaveDialog :visible="visible" :title="model === 'add' ? '新增工厂' : '修改工厂'" :mode="model"
    :row="tableData?.records?.find(item => String(item.id) === String(selectedRowId))" @cancel="handleCancel"
    @submit="handleSubmit" />
</template>

<style scoped>
.factory-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.factory-container .selector {
  width: 100%;
  background: #ffffff;
}

.factory-container .toolbar {
  width: 100%;
  background: #ffffff;
}

.factory-container .table {
  width: 100%;
  flex: 1;
  min-height: 0;
}
</style>
