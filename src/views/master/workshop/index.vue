<script setup lang="ts">
import {onMounted, reactive, ref} from 'vue'
import Selector from "@/views/master/workshop/component/selector.vue";
import ProToolbar from "@/components/ProToolbar.vue";
import ProTable, {type ProColumn} from "@/components/ProTable.vue"
import {getWorkshopList, createWorkshop, updateWorkshop, changeWorkshopStatus} from "@/api/master/workshop.ts";
import type {
  WorkshopCreateRequest,
  WorkshopListRequest,
  WorkshopListResponse,
  WorkshopUpdateRequest,
  WorkshopVO
} from "@/types/master/workshop.ts";
import {ElMessage, ElMessageBox} from "element-plus";
import SaveDialog from "@/views/master/workshop/saveDialog.vue";

const queryData = reactive<WorkshopListRequest>({
    page: 1,
    pageSize: 10,
    name: '',
    code: '',
    factoryId: '',
  })

  const tableData = ref<WorkshopListResponse>()
  const visible = ref(false)
  const model = ref<'add' | 'edit'>('add')
  const selectedRowId = ref<string | number>('')
  const tableRef = ref<{clearSelection: () => void}>()

  const columns = ref<ProColumn[]>([
    {label: '车间名称', prop: 'name', minWidth: 140},
    {label: '简称', prop: 'shortName', width: 120},
    {label: '所属工厂', prop: 'factoryName', minWidth: 140},
    {label: '状态', prop: 'status', width: 90, slot: 'status'},
    {label: '备注', prop: 'remark', minWidth: 160},
  ])


  const loadData = async () => {
    try {
      tableData.value = await getWorkshopList(queryData)
      console.log('tableData', tableData.value)
    }catch {
      ElMessage.error('获取车间列表失败')
    }
  }

  const handleQuery = (params: WorkshopListRequest) => {
    Object.assign(queryData, params)
    queryData.page = 1
    loadData()
  }

  const handleReset = () => {
    queryData.name = ''
    queryData.code = ''
    queryData.factoryId = ''
    queryData.page = 1
    loadData()
  }

  const handleSelectionChange = (rows: WorkshopVO[]) => {
    selectedRowId.value = rows[0]?.id ?? ''
  }

  const handleAdd = () => {
    visible.value = true
    model.value = 'add'
  }

  const handleEdit = () => {
    if (!selectedRowId.value) {
      ElMessage.warning('请选择要编辑的车间')
      return
    }
    model.value = 'edit'
    visible.value = true
  }

  const handleDelete = async () => {
    const rowId = selectedRowId.value
    if (!rowId) {
      ElMessage.warning('请选择要删除的车间')
      return
    }
    try {
      await ElMessageBox.confirm('确定要删除选中的车间吗？', '提示', {
        type: 'warning',
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      })
    } catch {
      return // 用户取消
    }
    try {
      await changeWorkshopStatus(String(rowId), 'DISABLE')
      ElMessage.success('删除成功')
      tableRef.value?.clearSelection()
      selectedRowId.value = ''
      await loadData()
    } catch {
      ElMessage.error('删除失败')
    }
  }

  const handleRefresh = () => {
    loadData()
  }

  const handleSubmit = async (form: WorkshopCreateRequest | WorkshopUpdateRequest) => {
    try {
      if (model.value === 'edit' && selectedRowId.value) {
        await updateWorkshop(String(selectedRowId.value), form)
      } else {
        await createWorkshop(form as WorkshopCreateRequest)
      }
      ElMessage.success('保存成功')
      visible.value = false
      tableRef.value?.clearSelection()
      selectedRowId.value = ''
      await loadData()
    } catch {
      ElMessage.error('保存失败')
    }
  }

  const handleCancel = () => {
    visible.value = false
  }

  onMounted(() => {
    loadData()
  })

</script>

<template>
  <div class="workshop-index">
    <div class="selector">
      <Selector
        :queryData="queryData"
        @query="handleQuery"
        @reset="handleReset"
      ></Selector>
    </div>
    <div class="toolbar">
      <ProToolbar
        @add="handleAdd"
        @edit="handleEdit"
        @delete="handleDelete"
        @refresh="handleRefresh"
      />
    </div>
    <div class="table">
      <ProTable
        ref="tableRef"
        :data="tableData?.records ?? []"
        :columns="columns"
        :total="tableData?.total ?? 0"
        :page="queryData.page"
        :page-size="queryData.pageSize"
        @update:page="(p: number) => { queryData.page = p; loadData() }"
        @update:pageSize="(s: number) => { queryData.pageSize = s; queryData.page = 1; loadData() }"
        @selectionChange="handleSelectionChange"
      />
    </div>
  </div>

  <SaveDialog
    v-model="visible"
    :model="model"
    :selectedRowId="selectedRowId"
    :queryData="queryData"
    @submit="handleSubmit"
    @cancel="handleCancel"
  />
</template>

<style scoped>
  .workshop-index {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;

    .selector {
      width: 100%;
      display: flex;
      gap: 10px;
    }

    .toolbar {
      width: 100%;
      display: flex;
      gap: 10px;
    }

    .table {
      flex: 1;
    }
  }
</style>
