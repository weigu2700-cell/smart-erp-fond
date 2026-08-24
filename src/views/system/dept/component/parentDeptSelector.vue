<script setup lang="ts">
  import {reactive, ref, watch} from "vue"
  import type {deptRequest, deptResponse, deptTree} from "@/types/system/dept.ts"
  import {getDeptList, getDeptTree} from "@/api/system/dept.ts"

  const props = defineProps<{
    visible: boolean
  }>()
  const emit = defineEmits<{
    (e: 'update:visible', visible: boolean): void
    (e: 'select', dept: {id: string, name: string}): void
  }>()

  const treeData = ref<deptTree[]>([])
  const tableData = ref<deptResponse['records']>([])
  const total = ref(0)
  const selectedRow = ref<deptResponse['records'][number]>()
  const queryData = reactive<deptRequest>({
    page: 1,
    pageSize: 10,
    parentId: null
  })

  const loadTree = async () => {
    treeData.value = await getDeptTree()
  }

  const loadList = async () => {
    const res = await getDeptList(queryData)
    tableData.value = res.records
    total.value = res.total
  }

  const handlePageChange = (page: number) => {
    queryData.page = page
    loadList()
  }

  const handleTreeClick = (node: deptTree) => {
    queryData.parentId = node.id
    queryData.page = 1
    loadList()
  }

  const handleCurrentChange = (row: deptResponse['records'][number]) => {
    selectedRow.value = row
  }

  const handleConfirm = () => {
    if (!selectedRow.value) return
    emit('select', {id: selectedRow.value.id, name: selectedRow.value.name})
    emit('update:visible', false)
  }

  const handleCancel = () => {
    emit('update:visible', false)
  }

  watch(() => props.visible, (visible) => {
    if (visible) {
      selectedRow.value = undefined
      queryData.parentId = null
      queryData.page = 1
      loadTree()
      loadList()
    }
  })
</script>

<template>
  <el-dialog
    :model-value="props.visible"
    title="选择上级部门"
    width="800px"
    @close="handleCancel"
  >
    <div class="ref-body">
      <div class="ref-tree">
        <el-tree
          :data="treeData"
          :props="{label: 'name', children: 'children'}"
          node-key="id"
          highlight-current
          @node-click="handleTreeClick"
        />
      </div>
      <div class="ref-table">
        <el-table
          :data="tableData"
          highlight-current-row
          height="100%"
          @current-change="handleCurrentChange"
        >
          <el-table-column prop="name" label="部门名称" min-width="140" show-overflow-tooltip />
          <el-table-column prop="code" label="部门编码" min-width="100" />
        </el-table>
        <el-pagination
          background
          layout="total, prev, pager, next"
          :total="total"
          :current-page="queryData.page"
          :page-size="queryData.pageSize"
          @current-change="handlePageChange"
        />
      </div>
    </div>
    <template #footer>
      <el-button type="primary" :disabled="!selectedRow" @click="handleConfirm">确定</el-button>
      <el-button @click="handleCancel">取消</el-button>
    </template>
  </el-dialog>
</template>

<style scoped>
  .ref-body {
    display: flex;
    gap: 16px;
    height: 400px;

    .ref-tree {
      width: 240px;
      border-right: 1px solid #ebeef5;
      padding-right: 12px;
      overflow: auto;
    }

    .ref-table {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 10px;

      .el-table {
        flex: 1;
      }

      .el-pagination {
        justify-content: flex-end;
      }
    }
  }
</style>
