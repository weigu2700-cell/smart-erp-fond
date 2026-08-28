<script setup lang="ts">
  import Selector from "@/views/master/supplier/component/selector.vue";
  import ProToolbar from "@/components/ProToolbar.vue";
  import ProTable, {type ProColumn} from "@/components/ProTable.vue"
  import {onMounted, ref, reactive} from 'vue'
  import {changeSupplierStatus, createSupplier, getSupplierList, updateSupplier} from "@/api/master/supplier.ts";
  import type {
    SupplierCreateRequest,
    SupplierListRequest,
    SupplierListResponse,
    SupplierUpdateRequest,
    SupplierVO
  } from "@/types/master/supplier.ts";
  import SaveDialog from "@/views/master/supplier/saveDialog.vue";
  import {ElMessage, ElMessageBox} from "element-plus";

  const queryData = reactive<SupplierListRequest>({
    page: 1,
    pageSize: 10,
    name: null,
    code: null,
    shortName: null,
    contactName: null,
    phone: null,
  })

  const tableData = ref<SupplierListResponse>()
  const visible = ref(false)
  const model = ref<'add' | 'edit'>('add')
  const selectedRowId = ref<string>()
  const tableRef = ref<{ clearSelection: () => void }>()

  const handleSelectionChange = (rows: SupplierVO[]) => {
    selectedRowId.value = rows[0] ? String(rows[0].id) : undefined
  }

  const loadData = async () => {
    tableData.value = await getSupplierList(queryData)
  }

  const columns = ref<ProColumn[]>([
    {label: '供应商名称', prop: 'name', minWidth: 160},
    {label: '供应商编码', prop: 'code', width: 240},
    {label: '简称', prop: 'shortName', width: 110},
    {label: '联系人', prop: 'contactName', width: 100},
    {label: '联系电话', prop: 'phone', width: 130},
    {label: '状态', prop: 'status', width: 90, slot: 'status'},
    {label: '备注', prop: 'remark', minWidth: 140},
  ])

  const handleQuery = (params: SupplierListRequest) => {
    Object.assign(queryData, params, {page: 1})
    loadData()
  }

  const handleReset = () => {
    queryData.name = null
    queryData.code = null
    queryData.shortName = null
    queryData.contactName = null
    queryData.phone = null
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
      ElMessage.warning('请选择要编辑的供应商')
      return
    }
    model.value = 'edit'
    visible.value = true
  }

  const handleDelete = async () => {
    const row = tableData.value?.records?.find(item => String(item.id) === selectedRowId.value)
    if (!row) {
      ElMessage.warning('请选择要删除的供应商')
      return
    }
    try {
      await ElMessageBox.confirm(
        `确定要删除供应商 ${row.name} 吗？`,
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
      // 供应商状态变更为 INACTIVE 视为删除，body 是原始字符串
      await changeSupplierStatus(String(row.id), 'INACTIVE')
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

  const handleSubmit = async (form: SupplierCreateRequest | SupplierUpdateRequest) => {
    try {
      if (model.value === 'edit' && selectedRowId.value) {
        await updateSupplier(selectedRowId.value, form as SupplierUpdateRequest)
      } else {
        await createSupplier(form as SupplierCreateRequest)
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
  <div class="supplier-container">
    <div class="selector">
      <Selector
        :queryData="queryData"
        @query="handleQuery"
        @reset="handleReset"
      />
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
      >
        <template #status="{row}">
          <el-tag :type="row.status === 'ACTIVE' ? 'success' : 'info'" size="small">
            {{ row.status === 'ACTIVE' ? '合作中' : '停用' }}
          </el-tag>
        </template>
      </ProTable>
    </div>
  </div>

  <SaveDialog
    :visible="visible"
    :title="model=== 'add' ? '新增供应商' : '修改供应商'"
    :mode="model"
    :row="tableData?.records?.find(item => String(item.id) === String(selectedRowId))"
    @cancel="handleCancel"
    @submit="handleSubmit"
  />
</template>

<style scoped>
  .supplier-container {
    width: 100%;
    height: 100%;
    background-color: #f0f2f5;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .supplier-container .selector {
    width: 100%;
    background: #ffffff;
    border: 1px solid #e4e7ed;
  }

  .supplier-container .toolbar {
    width: 100%;
    background: #ffffff;
    border: 1px solid #e4e7ed;
  }

  .supplier-container .table {
    width: 100%;
    flex: 1;
    min-height: 0;
  }
</style>
