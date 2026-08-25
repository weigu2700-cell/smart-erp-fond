<script setup lang="ts">
  import {computed} from "vue";

  const props = withDefaults(defineProps<{
    total: number
    page: number
    pageSize: number
    pageSizes?: number[]
  }>(), {
    pageSizes: () => [10, 20, 50, 100],
  })

  const emit = defineEmits<{
    (e: 'update:page', page: number): void
    (e: 'update:pageSize', size: number): void
  }>()

  // 手写分页条（el-pagination 在本项目环境中渲染空白，改用原生实现，完全可控）
  const pageCount = computed(() => Math.max(1, Math.ceil(props.total / props.pageSize)))

  const pageList = computed<(number | '...')[]>(() => {
    const count = pageCount.value
    const current = props.page
    if (count <= 7) {
      return Array.from({length: count}, (_, i) => i + 1)
    }
    const pages: (number | '...')[] = [1]
    const start = Math.max(2, current - 1)
    const end = Math.min(count - 1, current + 1)
    if (start > 2) pages.push('...')
    for (let p = start; p <= end; p++) pages.push(p)
    if (end < count - 1) pages.push('...')
    pages.push(count)
    return pages
  })

  const onPageChange = (page: number) => {
    if (page < 1 || page > pageCount.value || page === props.page) return
    emit('update:page', page)
  }

  const onSizeChange = (e: Event) => {
    emit('update:pageSize', Number((e.target as HTMLSelectElement).value))
  }
</script>

<template>
  <div class="pro-pagination round">
    <span class="pg-total">共 {{ props.total }} 条</span>
    <select class="pg-size" :value="props.pageSize" @change="onSizeChange">
      <option v-for="size in props.pageSizes" :key="size" :value="size">{{ size }} 条/页</option>
    </select>
    <button
      class="pg-btn"
      :disabled="props.page <= 1"
      @click="onPageChange(props.page - 1)"
    >上一页</button>
    <template v-for="p in pageList" :key="p">
      <span v-if="p === '...'" class="pg-ellipsis">…</span>
      <button
        v-else
        class="pg-btn"
        :class="{ 'pg-active': p === props.page }"
        @click="onPageChange(p)"
      >{{ p }}</button>
    </template>
    <button
      class="pg-btn"
      :disabled="props.page >= pageCount"
      @click="onPageChange(props.page + 1)"
    >下一页</button>
  </div>
</template>

<style scoped>
  .pro-pagination {
    flex-shrink: 0;
    height: 50px;
    display: flex;
    align-items: center;
    padding: 10px;
    gap: 8px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
    background: #ffffff;
    font-size: 13px;
    color: #606266;
  }

  .pro-pagination .pg-total {
    margin-right: 4px;
  }

  .pro-pagination .pg-size {
    height: 28px;
    padding: 0 6px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    background: #fff;
    color: #606266;
    font-size: 13px;
    outline: none;
    cursor: pointer;
  }

  .pro-pagination .pg-btn {
    height: 28px;
    min-width: 28px;
    padding: 0 8px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    background: #fff;
    color: #606266;
    font-size: 13px;
    cursor: pointer;
    transition: all 0.2s;
  }

  .pro-pagination .pg-btn:hover:not(:disabled):not(.pg-active) {
    color: #1890ff;
    border-color: #1890ff;
  }

  .pro-pagination .pg-btn:disabled {
    color: #c0c4cc;
    cursor: not-allowed;
  }

  .pro-pagination .pg-btn.pg-active {
    background: #1890ff;
    border-color: #1890ff;
    color: #fff;
  }

  .pro-pagination .pg-ellipsis {
    padding: 0 2px;
    color: #909399;
  }
</style>
