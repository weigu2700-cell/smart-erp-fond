<script setup lang="ts">
  import {nextTick, ref, watch} from "vue";
  import {ElMessage} from "element-plus";
  import type {ElTree} from "element-plus";
  import type {RoleInfo} from "@/types/system/role.ts";
  import type {PermissionNode} from "@/types/system/permission.ts";
  import type {MenuItem} from "@/types/system/menu.ts";
  import {getPermissionTree} from "@/api/system/permission.ts";
  import {getMenuTree} from "@/api/system/menu.ts";
  import {assignRolePermissions, assignRoleMenus, getRoleDetail} from "@/api/system/role.ts";

  const props = defineProps<{
    visible: boolean
    mode: 'permission' | 'menu'
    row: RoleInfo | null
  }>()
  const emit = defineEmits<{
    (e: 'cancel'): void
    (e: 'success'): void
  }>()

  const permissionTreeRef = ref<InstanceType<typeof ElTree>>()
  const menuTreeRef = ref<InstanceType<typeof ElTree>>()
  const permissionTree = ref<PermissionNode[]>([])
  const menuTree = ref<MenuItem[]>([])
  const saving = ref(false)
  const loading = ref(false)

  // 递归收集树节点 id
  const collectIds = (nodes: {id: string | number, children?: any[]}[]): number[] => {
    const ids: number[] = []
    const walk = (list: any[]) => {
      list.forEach(n => {
        ids.push(Number(n.id))
        if (n.children?.length) walk(n.children)
      })
    }
    walk(nodes)
    return ids
  }

  const loadPermissionTree = async () => {
    try {
      // 列表行不含 permissionIds，需从详情接口获取准确回显数据
      const detail = await getRoleDetail(props.row!.id)
      permissionTree.value = await getPermissionTree()
      await nextTick()
      permissionTreeRef.value?.setCheckedKeys(detail.permissionIds ?? [])
    } catch {
      // 错误信息已由请求拦截器统一提示
    }
  }

  const loadMenuTree = async () => {
    if (!props.row) return
    try {
      menuTree.value = await getMenuTree(props.row.id)
      await nextTick()
      // 后端按 roleId 返回该角色已分配的菜单树，全勾回显
      menuTreeRef.value?.setCheckedKeys(collectIds(menuTree.value))
    } catch {
      // 错误信息已由请求拦截器统一提示
    }
  }

  watch(() => props.visible, (visible) => {
    if (visible && props.row) {
      permissionTree.value = []
      menuTree.value = []
      loading.value = true
      const done = () => {
        loading.value = false
      }
      if (props.mode === 'permission') {
        loadPermissionTree().finally(done)
      } else {
        loadMenuTree().finally(done)
      }
    }
  })

  const handleSave = async () => {
    if (!props.row) {
      ElMessage.warning('缺少角色数据')
      return
    }
    const tree = props.mode === 'permission' ? permissionTreeRef.value : menuTreeRef.value
    if (!tree) {
      ElMessage.warning('权限树未加载完成，请稍后重试')
      return
    }
    const keys = [...tree.getCheckedKeys(false), ...tree.getHalfCheckedKeys()]
    saving.value = true
    try {
      if (props.mode === 'permission') {
        await assignRolePermissions({roleId: props.row.id, permissionIds: keys as number[]})
        ElMessage.success('权限分配成功')
      } else {
        await assignRoleMenus({roleId: props.row.id, menuIds: keys as number[]})
        ElMessage.success('菜单分配成功')
      }
      emit('success')
      // 保存成功后自动关闭对话框
      emit('cancel')
    } catch {
      // 错误信息已由请求拦截器统一提示
    } finally {
      saving.value = false
    }
  }

  const handleCancel = () => {
    emit('cancel')
  }
</script>

<template>
  <el-dialog
    :model-value="props.visible"
    :title="`${props.mode === 'permission' ? '分配权限' : '分配菜单'} - ${props.row?.name ?? ''}`"
    width="640px"
    @close="handleCancel"
  >
    <div v-loading="loading" class="tree-wrap">
      <el-tree
        v-if="props.mode === 'permission'"
        ref="permissionTreeRef"
        :data="permissionTree"
        :props="{label: 'name', children: 'children'}"
        node-key="id"
        show-checkbox
        default-expand-all
      />
      <el-tree
        v-else
        ref="menuTreeRef"
        :data="menuTree"
        :props="{label: 'title', children: 'children'}"
        node-key="id"
        show-checkbox
        default-expand-all
      />
    </div>
    <template #footer>
      <el-button type="primary" :loading="saving" @click="handleSave">保存</el-button>
      <el-button @click="handleCancel">取消</el-button>
    </template>
  </el-dialog>
</template>

<style scoped>
  .tree-wrap {
    max-height: 380px;
    overflow: auto;
    border: 1px solid #e4e7ed;
    border-radius: 4px;
    padding: 8px;
  }
</style>
