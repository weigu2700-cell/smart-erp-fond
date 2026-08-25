<script setup lang="ts">
  import TreeTableSelector, {type SelectorColumn} from "@/selector/TreeTableSelector.vue"
  import type {PermissionNode} from "@/types/system/permission.ts"
  import {getPermissionTree, getPermissionList} from "@/api/system/permission.ts"

  const props = defineProps<{
    visible: boolean
  }>()
  const emit = defineEmits<{
    (e: 'update:visible', visible: boolean): void
    (e: 'select', permission: {id: number, name: string}): void
  }>()

  const columns: SelectorColumn<PermissionNode>[] = [
    {label: '权限名称', prop: 'name', minWidth: 140},
    {label: '权限编码', prop: 'code', minWidth: 100},
    {
      label: '类型',
      prop: 'type',
      minWidth: 80,
      formatter: (row) => row.type === 'MENU' ? '菜单' : '按钮',
    },
  ]

  const loadTree = () => getPermissionTree()

  const loadList = (params: {page: number, pageSize: number, parentId: string | number | null}) => {
    return getPermissionList({
      page: params.page,
      pageSize: params.pageSize,
      parentId: params.parentId == null ? null : Number(params.parentId),
    })
  }

  const handleSelect = (row: PermissionNode) => {
    emit('select', {id: row.id, name: row.name})
  }
</script>

<template>
  <TreeTableSelector
    :visible="props.visible"
    title="选择父级权限"
    :load-tree="loadTree"
    :load-list="loadList"
    :columns="columns"
    @update:visible="(v) => emit('update:visible', v)"
    @select="handleSelect"
  />
</template>
