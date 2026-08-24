<script setup lang="ts">
  import {usePermissionStore} from "@/stores/permission.ts"
  import {useRouter} from "vue-router"
  import {computed} from "vue";
  import type {MenuItem} from "@/types/system/menu.ts";

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
          <i v-if="menu.icon" :class="menu.icon"></i>
          <span>{{menu.title}}</span>
        </el-menu-item>
        <el-sub-menu v-else :index="menu.path">
          <template #title>
            <i v-if="menu.icon" :class="menu.icon"></i>
            <span>{{menu.title}}</span>
          </template>
          <Sidebar :menus="menu.children"/>
        </el-sub-menu>
      </template>
    </el-menu>
  </el-scrollbar>
</template>

<style scoped>

</style>
