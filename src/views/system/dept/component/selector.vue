<script setup lang="ts">
  import {reactive, ref} from "vue";
  import ParentDeptSelector from "@/views/system/dept/component/parentDeptSelector.vue";
  import {CircleClose, Search} from "@element-plus/icons-vue";
  import type {deptRequest} from "@/types/system/dept.ts";

  let parentSelectorVisible = ref(false)

  type DeptQuery = Required<Pick<deptRequest, 'name' | 'code' | 'parentId' | 'status'>> & {
    parentName: string | null
  }

  const queryData = reactive<DeptQuery>({
    name: '',
    code: '',
    parentId: null,
    parentName: '',
    status: null,
  })
  const emit = defineEmits<{
    (e: 'query', params: Omit<deptRequest, 'page' | 'pageSize'>): void
    (e: 'reset'): void
  }>()
  const statusOptions = [
    {label: '启用', value: 1},
    {label: '禁用', value: 0}
  ]

  const openParentSelector = () => {
    parentSelectorVisible.value = true
  }

  const clearParent = () => {
    queryData.parentId = null
    queryData.parentName = null
  }

  const handleParentSelect = (dept: {id: string, name: string}) => {
    queryData.parentId = dept.id
    queryData.parentName = dept.name
    parentSelectorVisible.value = false
  }

  const handleQuery = () => {
    // 后端只接收 id，parentName 仅用于展示，不发出去
    emit('query', {
      name: queryData.name || null,
      code: queryData.code || null,
      parentId: queryData.parentId,
      status: queryData.status,
    })
  }

  const handleReset = () => {
    queryData.name = ''
    queryData.code = ''
    queryData.parentId = null
    queryData.parentName = null
    queryData.status = null
    emit('reset')
  }
</script>

<template>
  <div class="selector-container">
    <div class="selector-search">
      <el-input v-model="queryData.name" placeholder="请输入部门名称" />
      <el-input v-model="queryData.code" placeholder="请输入部门编码" />
      <el-input
        :model-value="queryData.parentName"
        readonly
        placeholder="点击选择上级部门"
        @click="openParentSelector"
      >
        <template #suffix>
          <el-icon v-if="queryData.parentName" class="field-icon" @click.stop="clearParent">
            <CircleClose />
          </el-icon>
          <el-icon v-else class="field-icon" @click.stop="openParentSelector">
            <Search />
          </el-icon>
        </template>
      </el-input>
      <el-select v-model="queryData.status" placeholder="请选择状态">
        <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </div>
    <div class="submit-button">
      <el-button type="primary" @click="handleQuery">查询</el-button>
      <el-button type="info" @click="handleReset">重置</el-button>
    </div>
  </div>
  <ParentDeptSelector :visible="parentSelectorVisible" @select="handleParentSelect"/>
</template>

<style scoped>
  .selector-container {
    width: 100%;
    height: 100%;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .selector-search {
      display: flex;
      gap: 20px;

      :deep(.el-input) {
        width: 80px;
      }

      :deep(.el-select) {
        width: 80px;
      }
    }

  }
</style>
