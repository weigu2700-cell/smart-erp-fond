<script setup lang="ts">
import {onMounted, reactive, ref} from "vue"
import {ElMessage} from "element-plus";
import type {deptResponse, deptRequest, deptColumns, saveDeptRequest} from "@/types/system/dept.ts";
import {getDeptList, saveDept, updateDept} from "@/api/system/dept.ts";
import SaveDialog from "@/views/system/dept/saveDialog.vue";
import Selector from "@/views/system/dept/component/selector.vue";
import ProTable from "@/components/ProTable.vue";
import ProToolbar from "@/components/ProToolbar.vue";


  const tableData = ref<deptResponse>()
  const selectedData = ref<deptResponse['records']>([])
  const dialogVisible = ref(false)
  const dialogMode = ref<'add' | 'edit'>('add')
  const editRow = ref<saveDeptRequest & {parentName?: string} | null>(null)
  const queryData = reactive<deptRequest>({
    page: 1,
    pageSize: 10,
    name: null,
    code: null,
    parentId: null,
    status: null,
    sort: null
  })

const columns:deptColumns[] = [
  { label: '部门名称', prop: 'name', width: 240, sortable: true, fixed: 'left' },
  { label: '部门编码', prop: 'code', width: 240, sortable: true, fixed: 'left' },
  { label: '上级部门', prop: 'parentName', width: 240, sortable: true, fixed: 'left' },
  { label: '创建时间', prop: 'createTime', width: 200, sortable: true, fixed: 'left' },
]

  const handleQuery = async (queryData: deptRequest) => {
    tableData.value = await getDeptList(queryData)
  }

  const handleSelectorQuery = (params: Omit<deptRequest, 'page' | 'pageSize'>) => {
    Object.assign(queryData, params, {page: 1})
    handleQuery(queryData)
  }

  const handleSelectorReset = () => {
    queryData.name = null
    queryData.code = null
    queryData.parentId = null
    queryData.status = null
    queryData.page = 1
    handleQuery(queryData)
  }

  const handleAdd = () => {
    dialogMode.value = 'add'
    editRow.value = null
    dialogVisible.value = true
  }

  const handleEdit = () => {
    const row = selectedData.value[0]
    if (!row) {
      ElMessage.warning('请先选择要修改的数据')
      return
    }
    dialogMode.value = 'edit'
    editRow.value = {
      id: row.id,
      name: row.name,
      code: row.code,
      parentId: null,
      sort: 0,
      parentName: row.parentName
    }
    dialogVisible.value = true
  }

  const handleDelete = () => {
    if (selectedData.value.length === 0) {
      ElMessage.warning('请先选择要删除的数据')
      return
    }
    ElMessage.warning('删除功能待接入')
  }

  const handleSubmit = async (form: saveDeptRequest) => {
    try {
      if (dialogMode.value === 'edit') {
        await updateDept(form)
        ElMessage.success('修改成功')
      } else {
        await saveDept(form)
        ElMessage.success('新增成功')
      }
      dialogVisible.value = false
      await handleQuery(queryData)
    } catch {
      // 错误信息已由请求拦截器统一提示
    }
  }

  const handleCancel = () => {
    dialogVisible.value = false
  }

  onMounted(() => {
    handleQuery(queryData)
  })


</script>

<template>
  <div class="dept-container">
    <div class="selector round">
      <Selector @query="handleSelectorQuery" @reset="handleSelectorReset" />
    </div>
    <div class="toolbar round">
      <ProToolbar
        @add="handleAdd"
        @edit="handleEdit"
        @delete="handleDelete"
        @refresh="handleQuery(queryData)"
      />
    </div>
    <div class="table round">
      <ProTable
        :data="tableData?.records ?? []"
        :columns="columns"
        :total="tableData?.total ?? 0"
        :page="queryData.page"
        :page-size="queryData.pageSize"
        @update:page="(p) => { queryData.page = p; handleQuery(queryData) }"
        @update:pageSize="(s) => { queryData.pageSize = s; queryData.page = 1; handleQuery(queryData) }"
        @selectionChange="(rows) => selectedData = rows as deptResponse['records']"
      />
    </div>
    <SaveDialog
      :visible="dialogVisible"
      :mode="dialogMode"
      :row="editRow"
      @submit="handleSubmit"
      @cancel="handleCancel"
    />
  </div>
</template>

<style scoped>
  .dept-container {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 10px;

    .selector {
      width: 100%;
      background: #ffffff;
      border: 1px solid #e4e7ed;
    }

    .table {
      width: 100%;
      height: calc(100% - 100px);
    }
  }
</style>
