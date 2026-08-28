<script setup lang="ts">
import { usePermissionStore } from "@/stores/permission.ts"
import { useRouter } from "vue-router"
import { computed } from "vue";
import { isClassIcon } from "@/utils/icon.ts";
import type { MenuItem } from "@/types/system/menu.ts";

defineOptions({ name: 'Sidebar' })

const props = defineProps<{ menus?: MenuItem[] }>()
const router = useRouter()
const permissionStore = usePermissionStore()

const menuList = computed<MenuItem[]>(() => props.menus ?? permissionStore.menuList)
</script>

<template>
  <el-scrollbar>
    <el-menu :default-active="router.currentRoute.value.path" router>
      <template v-for="menu in menuList" :key="menu.path">
        <el-menu-item v-if="!menu.children || menu.children.length === 0" :index="menu.path">
          <el-icon v-if="menu.icon && !isClassIcon(menu.icon)">
            <component :is="menu.icon" />
          </el-icon>
          <i v-else-if="menu.icon" :class="menu.icon"></i>
          <span>{{ menu.title }}</span>
        </el-menu-item>
        <el-sub-menu v-else :index="menu.path">
          <template #title>
            <el-icon v-if="menu.icon && !isClassIcon(menu.icon)">
              <component :is="menu.icon" />
            </el-icon>
            <i v-else-if="menu.icon" :class="menu.icon"></i>
            <span>{{ menu.title }}</span>
          </template>
          <Sidebar :menus="menu.children" />
        </el-sub-menu>
      </template>
    </el-menu>
  </el-scrollbar>
  <div class="footer">
    <el-button type="primary">登录</el-button>
  </div>
</template>

<style scoped>
.el-scrollbar {
  height: 100%;
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
