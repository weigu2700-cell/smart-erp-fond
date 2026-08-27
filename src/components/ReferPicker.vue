<script setup lang="ts">
  import {reactive, ref, watch} from "vue";
  import {ElMessage} from "element-plus";
  import {OfficeBuilding, CircleClose} from '@element-plus/icons-vue';

  export interface ReferColumn {
    prop: string
    label: string
    width?: number
    minWidth?: number
  }

  interface ReferRow {
    [key: string]: any
  }

  const props = withDefaults(defineProps<{
    modelValue: string | number | null | undefined
    title?: string
    placeholder?: string
    columns: ReferColumn[]
    fetcher: (params: Record<string, any>) => Promise<{records: ReferRow[]}>
    valueKey?: string
    labelKey?: string
    searchField?: string
    searchPlaceholder?: string
    extraParams?: Record<string, any>
  }>(), {
    title: '参照',
    placeholder: '请选择',
    valueKey: 'id',
    labelKey: 'name',
    searchField: 'name',
    searchPlaceholder: '请输入名称关键字',
    extraParams: () => ({}),
  })

  const emit = defineEmits<{
    (e: 'update:modelValue', value: string | number | null): void
    (e: 'change', row: ReferRow | null): void
  }>()

  const dialogVisible = ref(false)
  const loading = ref(false)
  const list = ref<ReferRow[]>([])
  // 输入框只读显示选中项的 label 文本
  const displayText = ref('')

  const query = reactive<Record<string, any>>({
    page: 1,
    pageSize: 10,
  })
  query[props.searchField] = ''

  // 从行对象中取值，valueKey 取不到时兜底常见 id 字段名
  // 注意：code 不作为兜底，避免工厂场景把业务编码（FT...）当成主键 id 传给后端导致 404
  const getRowValue = (row: ReferRow): string | number | null => {
    const v = row[props.valueKey]
    if (v != null) return v
    for (const key of ['id', 'factoryId', 'deptId', 'roleId', 'menuId', 'userId']) {
      if (row[key] != null) return row[key]
    }
    return null
  }

  const openDialog = () => {
    dialogVisible.value = true
    loadData()
  }

  const loadData = async () => {
    loading.value = true
    try {
      const res = await props.fetcher({...query, ...props.extraParams})
      list.value = res?.records ?? []
      console.log('[ReferPicker] loadData res =', res)
      console.log('[ReferPicker] record keys =', Object.keys(list.value[0] ?? {}), 'first =', JSON.stringify(list.value[0] ?? null))
      // 若已有选中值，回填显示文本
      if (props.modelValue != null && !displayText.value) {
        const hit = list.value.find(r => String(getRowValue(r)) === String(props.modelValue))
        if (hit) displayText.value = hit[props.labelKey]
      }
    } catch {
      ElMessage.error('加载数据失败')
    } finally {
      loading.value = false
    }
  }

  const search = () => {
    query.page = 1
    loadData()
  }

  const selectRow = (row: ReferRow) => {
    const value = getRowValue(row)
    console.log('[ReferPicker] selectRow keys =', Object.keys(row))
    console.log('[ReferPicker] selectRow row =', JSON.stringify(row), 'value =', value)
    displayText.value = row[props.labelKey] ?? ''
    emit('update:modelValue', value)
    emit('change', row)
    dialogVisible.value = false
  }

  const clearValue = () => {
    displayText.value = ''
    emit('update:modelValue', null)
    emit('change', null)
    dialogVisible.value = false
  }

  // 外部清空 modelValue 时同步显示
  watch(() => props.modelValue, (val) => {
    if (val == null) displayText.value = ''
  })
</script>

<template>
  <el-input
    :model-value="displayText"
    :placeholder="placeholder"
    readonly
    @click="openDialog"
  >
    <template #suffix>
      <!-- 自定义图标，click.stop 防止冒泡干扰；清除与打开分离，避免 clearable 图标冒泡冲突 -->
      <el-icon v-if="displayText" class="refer-suffix-icon" @click.stop="clearValue">
        <CircleClose />
      </el-icon>
      <el-icon class="refer-suffix-icon" @click.stop="openDialog">
        <OfficeBuilding />
      </el-icon>
    </template>
  </el-input>

  <el-dialog
    v-model="dialogVisible"
    :title="title"
    width="640px"
    append-to-body
  >
    <div class="refer-search">
      <el-input
        :model-value="query[searchField]"
        :placeholder="searchPlaceholder"
        clearable
        @update:model-value="(v: string) => { query[searchField] = v }"
        @keyup.enter="search"
        @clear="search"
      />
      <el-button type="primary" @click="search">查询</el-button>
    </div>
    <el-table
      :data="list"
      v-loading="loading"
      height="360"
      highlight-current-row
      @row-click="selectRow"
    >
      <el-table-column
        v-for="col in columns"
        :key="col.prop"
        :prop="col.prop"
        :label="col.label"
        :width="col.width"
        :min-width="col.minWidth"
      />
    </el-table>
    <template #footer>
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button type="primary" @click="clearValue">清空</el-button>
    </template>
  </el-dialog>
</template>

<style scoped>
  .refer-search {
    display: flex;
    gap: 8px;
    margin-bottom: 12px;
  }

  .refer-suffix-icon {
    cursor: pointer;
  }
</style>
