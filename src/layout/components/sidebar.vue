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
  flex: 1;
  min-height: 0;
  background-color: #ffffff;
}

:deep(.el-menu) {
  border-right: none;
  background-color: #ffffff;
}

:deep(.el-menu-item),
:deep(.el-sub-menu__title) {
  height: 50px;
  line-height: 50px;
  color: #5f6368;
  margin: 3px 12px;
  border-radius: 8px;
}

:deep(.el-menu-item:hover),
:deep(.el-sub-menu__title:hover) {
  background-color: #f1f3f4;
  color: #202124;
}

:deep(.el-menu-item.is-active),
:deep(.el-menu-item.is-active:hover) {
  background: #e8f0fe;
  color: #1967d2;
  box-shadow: none;
}

:deep(.el-sub-menu .el-menu) {
  background-color: #f8fafd;
}

:deep(.el-sub-menu .el-menu-item) {
  min-width: 0;
  padding-left: 54px !important;
  margin-left: 10px;
  margin-right: 10px;
}

:deep(.el-menu--collapse) {
  width: var(--aside-collapse-width);
}

:deep(.el-menu--collapse .el-menu-item),
:deep(.el-menu--collapse .el-sub-menu__title) {
  margin-left: 8px;
  margin-right: 8px;
  padding: 0 !important;
  justify-content: center;
}
</style>
