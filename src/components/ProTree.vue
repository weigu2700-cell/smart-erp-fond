<script setup lang="ts">
  import {computed, ref} from "vue";

  const props = withDefaults(defineProps<{
    data: any[]
    treeProps?: {label?: string, children?: string}
    nodeKey?: string
    defaultExpandAll?: boolean
    // 是否在顶部添加一个"全部"根节点，点击它可清除过滤
    showRoot?: boolean
    rootLabel?: string
  }>(), {
    treeProps: () => ({label: 'name', children: 'children'}),
    nodeKey: 'id',
    defaultExpandAll: true,
    showRoot: false,
    rootLabel: '全部',
  })

  const emit = defineEmits<{
    (e: 'nodeClick', node: any): void
  }>()

  const treeRef = ref()

  const treeData = computed<any[]>(() => {
    if (!props.showRoot) return props.data
    const root: Record<string, any> = {
      [props.nodeKey]: '__all__',
      [props.treeProps.label ?? 'name']: props.rootLabel,
      children: props.data,
    }
    return [root]
  })

  const handleNodeClick = (node: any) => {
    emit('nodeClick', node)
  }

  // 清除当前选中高亮
  const clearCurrent = () => {
    treeRef.value?.setCurrentKey(null)
  }

  defineExpose({clearCurrent})
</script>

<template>
  <div class="pro-tree">
    <el-tree
      ref="treeRef"
      :data="treeData"
      :props="props.treeProps"
      :node-key="props.nodeKey"
      :default-expand-all="props.defaultExpandAll"
      highlight-current
      @node-click="handleNodeClick"
    />
  </div>
</template>

<style scoped>
  .pro-tree {
    width: 100%;
    height: 100%;
    overflow: auto;
    padding: 8px 4px;

    :deep(.el-tree-node__content) {
      height: 32px;
    }

    :deep(.el-tree-node.is-current > .el-tree-node__content) {
      background-color: var(--el-color-primary-light-9);
      color: var(--el-color-primary);
    }
  }
</style>
