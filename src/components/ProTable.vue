<script setup lang="ts" generic="T extends object">
  import {computed, onBeforeUnmount, onMounted, ref} from "vue";

  export interface ProColumn {
    label: string
    prop: string
    width?: number
    minWidth?: number
    sortable?: boolean
    fixed?: string
    align?: 'left' | 'center' | 'right'
    slot?: string
  }

  const props = withDefaults(defineProps<{
    data: T[]
    columns: ProColumn[]
    total: number
    page: number
    pageSize: number
    pageSizes?: number[]
    showSelection?: boolean
  }>(), {
    pageSizes: () => [10, 20, 50, 100],
    showSelection: true,
  })

  const emit = defineEmits<{
    (e: 'update:page', page: number): void
    (e: 'update:pageSize', size: number): void
    (e: 'selectionChange', rows: T[]): void
  }>()

  const handlePageChange = (page: number) => emit('update:page', page)
  const handleSizeChange = (size: number) => emit('update:pageSize', size)
  const handleSelectionChange = (rows: T[]) => emit('selectionChange', rows)

  // 把最后一列转为弹性列（min-width），吃掉剩余空间使表格撑满
  const tableColumns = computed(() => {
    const cols = props.columns.map((c) => ({...c}))
    if (cols.length > 0 && cols.every((c) => c.width != null)) {
      const last = cols[cols.length - 1]!
      last.minWidth = last.minWidth ?? last.width
      last.width = undefined
    }
    return cols
  })

  // el-table 的 height 只接受明确的数字/px 值，字符串百分比会失效导致内容把分页器挤出
  // 用 ResizeObserver 动态测量容器高度，减去分页器(50px)与间距(10px)后传给表格
  const containerRef = ref<HTMLElement>()
  const tableHeight = ref(100)

  let resizeObserver: ResizeObserver | null = null

  const updateTableHeight = () => {
    const el = containerRef.value
    if (!el) return
    tableHeight.value = Math.max(el.clientHeight - 60, 100)
  }

  onMounted(() => {
    updateTableHeight()
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(updateTableHeight)
      if (containerRef.value) resizeObserver.observe(containerRef.value)
    }
  })

  onBeforeUnmount(() => resizeObserver?.disconnect())
</script>

<template>
  <div ref="containerRef" class="pro-table-container">
    <el-table
      :data="props.data"
      :max-height="tableHeight"
      style="width: 100%"
      class="pro-table round"
      @selection-change="handleSelectionChange"
    >
      <el-table-column v-if="props.showSelection" type="selection" width="55" />
      <el-table-column
        v-for="column in tableColumns"
        :key="column.prop"
        :prop="column.prop"
        :label="column.label"
        :width="column.width"
        :min-width="column.minWidth"
        :sortable="column.sortable"
        :fixed="column.fixed"
        :align="column.align"
      >
        <template v-if="column.slot && $slots[column.slot]" #default="{row}">
          <slot :name="column.slot" :row="row" />
        </template>
      </el-table-column>
    </el-table>
    <div class="pro-pagination round" style="border: 2px solid red; position: relative; z-index: 9999">
      <span style="color: red; white-space: nowrap">DEBUG total={{ props.total }} page={{ props.page }}</span>
      <el-pagination
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="props.total"
        :current-page="props.page"
        :page-size="props.pageSize"
        :page-sizes="props.pageSizes"
        @current-change="handlePageChange"
        @size-change="handleSizeChange"
      />
    </div>
  </div>
</template>

<style scoped>
  .pro-table-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;

    .pro-table {
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
    }
    .pro-pagination {
      flex-shrink: 0;
      height: 50px;
      display: flex;
      align-items: center;
      padding: 10px;
      gap: 10px;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
      background: #ffffff;
    }
  }
</style>
