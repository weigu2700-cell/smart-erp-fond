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

const menuList = computed<MenuItem[]>(() => {
  const menus = props.menus ?? permissionStore.menuList
  // 工作台是最常用的入口，固定在一级菜单第一位；其余菜单保留后端返回顺序。
  if (props.depth !== 0) return menus
  const isWorkbench = (menu: MenuItem) => {
    const normalizedPath = menu.path.replace(/^\//, '')
    return menu.name === 'home'
      || normalizedPath === 'home'
      || menu.title === '工作台'
      || menu.title === '首页'
  }
  const workbenchIndex = menus.findIndex(isWorkbench)
  if (workbenchIndex <= 0) return menus
  const workbench = menus[workbenchIndex]
  if (!workbench) return menus
  return [workbench, ...menus.slice(0, workbenchIndex), ...menus.slice(workbenchIndex + 1)]
})

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
          <span class="menu-title">{{ menu.title }}</span>
          <span v-if="shouldCollapse" class="collapse-label">{{ menu.title }}</span>
        </el-menu-item>
        <el-sub-menu v-else :index="menu.path">
          <template #title>
            <el-icon v-if="menu.icon && !isClassIcon(menu.icon)">
              <component :is="menu.icon" />
            </el-icon>
            <i v-else-if="menu.icon" :class="menu.icon"></i>
            <span class="menu-title">{{ menu.title }}</span>
            <span v-if="shouldCollapse" class="collapse-label">{{ menu.title }}</span>
          </template>
          <Sidebar :menus="menu.children" :depth="props.depth + 1" />
        </el-sub-menu>
      </template>
    </el-menu>
  </el-scrollbar>
</template>

<style scoped>
.el-scrollbar {
  flex: 1;
  min-height: 0;
  background-color: var(--menu-surface);
}

:deep(.el-menu) {
  border-right: none;
  background-color: var(--menu-surface);
}

:deep(.el-menu-item),
:deep(.el-sub-menu__title) {
  position: relative;
  height: 44px;
  line-height: 44px;
  color: var(--menu-text);
  margin: 2px 10px;
  padding: 0 12px !important;
  border-radius: 6px;
  font-size: 13px;
  transition: background-color .16s ease, color .16s ease;
}

:deep(.el-menu-item .el-icon),
:deep(.el-sub-menu__title .el-icon),
:deep(.el-menu-item > i),
:deep(.el-sub-menu__title > i) {
  width: 20px;
  margin-right: 8px;
  color: currentColor;
  font-size: 17px;
}

:deep(.el-menu-item:hover),
:deep(.el-sub-menu__title:hover) {
  background-color: var(--menu-hover-bg);
  color: var(--menu-brand-text);
}

:deep(.el-menu-item.is-active),
:deep(.el-menu-item.is-active:hover) {
  background: var(--menu-active-bg);
  color: var(--menu-brand-text);
}

:deep(.el-menu-item.is-active::before) {
  content: '';
  position: absolute;
  left: -1px;
  top: 50%;
  width: 3px;
  height: 18px;
  border-radius: 0 2px 2px 0;
  background: var(--color-primary);
  transform: translateY(-50%);
}

:deep(.el-sub-menu.is-active > .el-sub-menu__title) {
  color: var(--menu-brand-text);
}

:deep(.el-sub-menu .el-menu) {
  background-color: transparent;
  margin: 1px 0 4px;
  padding: 3px 0 2px;
  border-left: 1px solid rgb(255 255 255 / 10%);
  margin-left: 22px;
}

:deep(.el-sub-menu .el-menu-item) {
  min-width: 0;
  height: 38px;
  line-height: 38px;
  padding-left: 20px !important;
  margin: 1px 10px 1px 0;
  border-radius: 5px;
  font-size: 12px;
}

:deep(.el-menu--collapse) {
  width: var(--aside-collapse-width);
}

:deep(.el-menu--collapse > .el-menu-item),
:deep(.el-menu--collapse > .el-sub-menu > .el-sub-menu__title) {
  height: 58px;
  line-height: normal;
  margin: 2px 7px;
  padding-left: 0 !important;
  padding-right: 0 !important;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
}

:deep(.el-menu--collapse > .el-menu-item .el-icon),
:deep(.el-menu--collapse > .el-sub-menu > .el-sub-menu__title .el-icon) {
  margin: 0;
  font-size: 18px;
}

:deep(.el-menu--collapse > .el-menu-item > .menu-title),
:deep(.el-menu--collapse > .el-sub-menu > .el-sub-menu__title > .menu-title) {
  visibility: hidden;
  width: 0;
  height: 0;
  overflow: hidden;
}

:deep(.el-menu--collapse > .el-menu-item > .collapse-label),
:deep(.el-menu--collapse > .el-sub-menu > .el-sub-menu__title > .collapse-label) {
  visibility: visible;
  width: 52px;
  height: 14px;
  display: block;
  overflow: hidden;
  color: var(--menu-text);
  font-size: 10px;
  font-weight: 400;
  line-height: 14px;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
