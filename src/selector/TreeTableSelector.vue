<script setup lang="ts">
  import {reactive, ref, watch} from "vue"
  import ProPagination from "@/components/ProPagination.vue"

  export interface SelectorColumn<L = any> {
    label: string
    prop?: string
    minWidth?: number | string
    showOverflowTooltip?: boolean
    formatter?: (row: L) => string
  }

  export interface SelectorListParams {
    page: number
    pageSize: number
    parentId: string | number | null
  }

  export interface SelectorListResult<L = any> {
    records: L[]
    total: number
  }

  const props = defineProps<{
    visible: boolean
    title: string
    loadTree: () => Promise<any[]>
    loadList: (params: SelectorListParams) => Promise<SelectorListResult>
    columns: SelectorColumn[]
    width?: string
    treeWidth?: number | string
    treeProps?: {label?: string, children?: string}
  }>()

  const emit = defineEmits<{
    (e: 'update:visible', visible: boolean): void
    (e: 'select', row: any): void
  }>()

  const treeData = ref<any[]>([])
  const tableData = ref<any[]>([])
  const total = ref(0)
  const selectedRow = ref<any>()
  const queryData = reactive<SelectorListParams>({
    page: 1,
    pageSize: 10,
    parentId: null,
  })

  const loadTree = async () => {
    treeData.value = await props.loadTree()
  }

  const loadList = async () => {
    const res = await props.loadList(queryData)
    tableData.value = res.records
    total.value = res.total
  }

  const handlePageChange = (page: number) => {
    queryData.page = page
    loadList()
  }

  const handlePageSizeChange = (size: number) => {
    queryData.pageSize = size
    queryData.page = 1
    loadList()
  }

  const handleTreeClick = (node: any) => {
    queryData.parentId = node?.id ?? null
    queryData.page = 1
    loadList()
  }

  const handleCurrentChange = (row: any) => {
    selectedRow.value = row
  }

  const handleConfirm = () => {
    if (!selectedRow.value) return
    emit('select', selectedRow.value)
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
    :title="props.title"
    :width="props.width ?? '800px'"
    @close="handleCancel"
  >
    <div class="ref-body">
      <div
        class="ref-tree"
        :style="props.treeWidth ? {width: typeof props.treeWidth === 'number' ? `${props.treeWidth}px` : props.treeWidth} : undefined"
      >
        <el-tree
          :data="treeData"
          :props="props.treeProps ?? {label: 'name', children: 'children'}"
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
          <el-table-column
            v-for="col in props.columns"
            :key="col.label"
            :prop="col.prop"
            :label="col.label"
            :min-width="col.minWidth"
            :show-overflow-tooltip="col.showOverflowTooltip ?? true"
          >
            <template v-if="col.formatter" #default="{row}">
              {{ col.formatter(row) }}
            </template>
          </el-table-column>
        </el-table>
        <ProPagination
          :total="total"
          :page="queryData.page"
          :page-size="queryData.pageSize"
          @update:page="handlePageChange"
          @update:pageSize="handlePageSizeChange"
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
    }
  }
</style>
