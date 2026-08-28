<script setup lang="ts">
import { usePermissionStore } from "@/stores/permission.ts"
import { useRouter } from "vue-router"
import { computed } from "vue";
import { isClassIcon } from "@/utils/icon.ts";
import type { MenuItem } from "@/types/system/menu.ts";
import useAppStore from "@/stores/app.ts";

defineOptions({ name: 'Sidebar' })

const props = withDefaults(defineProps<{
  menus?: MenuItem[]
  depth?: number
}>(), {
  depth: 0
})

const router = useRouter()
const appStore = useAppStore()
const permissionStore = usePermissionStore()

const menuList = computed<MenuItem[]>(() => props.menus ?? permissionStore.menuList)

// 只有第一级菜单才响应折叠状态
const shouldCollapse = computed(() => props.depth === 0 && appStore.isFold)
</script>

<template>
  <el-scrollbar>
    <el-menu :default-active="router.currentRoute.value.path" router :collapse="shouldCollapse">
      <template v-for="menu in menuList" :key="menu.path">
        <el-menu-item v-if="!menu.children || menu.children.length === 0" :index="menu.path">
          <el-icon v-if="menu.icon && !isClassIcon(menu.icon)">
            <component :is="menu.icon" />
          </el-icon>
          <i v-else-if="menu.icon" :class="menu.icon"></i>
          <template #title>{{ menu.title }}</template>
        </el-menu-item>
        <el-sub-menu v-else :index="menu.path">
          <template #title>
            <el-icon v-if="menu.icon && !isClassIcon(menu.icon)">
              <component :is="menu.icon" />
            </el-icon>
            <i v-else-if="menu.icon" :class="menu.icon"></i>
            <span>{{ menu.title }}</span>
          </template>
          <Sidebar :menus="menu.children" :depth="props.depth + 1" />
        </el-sub-menu>
      </template>
    </el-menu>
  </el-scrollbar>
</template>

<style scoped>
.el-scrollbar {
  height: calc(100% - 60px);
  background-color: #304156;
}

:deep(.el-menu) {
  border-right: none;
  background-color: #304156;
}

:deep(.el-menu-item),
:deep(.el-sub-menu__title) {
  height: 50px;
  line-height: 50px;
  color: #bfcbd9;
}

:deep(.el-menu-item:hover),
:deep(.el-sub-menu__title:hover) {
  background-color: #263445;
  color: #ffffff;
}

:deep(.el-menu-item.is-active),
:deep(.el-menu-item.is-active:hover) {
  background-color: var(--el-color-primary);
  color: #ffffff;
}

:deep(.el-sub-menu .el-menu) {
  background-color: #1f2d3d;
}
</style>