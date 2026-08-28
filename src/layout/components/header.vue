<script setup lang="ts">
  import {ref, computed} from 'vue'
  import {ArrowDown, Bell, FullScreen, Refresh, Search} from "@element-plus/icons-vue";
  import {useUserStore} from "@/stores/user.ts";
  import Breadcrumb from "@/layout/components/breadcrumb.vue";

  const userStore = useUserStore()

  const userInfo = computed(() => userStore.userInfo)
  const searchKey = ref('')

  const handleSearch = () => {
    console.log(searchKey.value)
  }

  const handleRefresh = () => {
    window.location.reload()
  }

  const handleFullScreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen()
    } else {
      document.documentElement.requestFullscreen()
    }
  }
</script>

<template>
  <div class="header-container">
    <div class="left">
      <Breadcrumb/>
    </div>
    <div class="right">
      <div class="header-search">
        <el-input v-model="searchKey" placeholder="搜索菜单或功能" clearable @keyup.enter="handleSearch">
          <template #suffix>
            <el-icon class="el-icon-search" @click="handleSearch">
              <Search />
            </el-icon>
          </template>
        </el-input>
      </div>
      <div class="header-actions">
        <el-tooltip content="通知" placement="bottom">
          <el-button class="header-icon-button" text circle aria-label="通知">
            <el-icon><Bell /></el-icon>
          </el-button>
        </el-tooltip>
        <el-tooltip content="刷新页面" placement="bottom">
          <el-button class="header-icon-button" text circle aria-label="刷新页面" @click="handleRefresh">
            <el-icon><Refresh /></el-icon>
          </el-button>
        </el-tooltip>
        <el-tooltip content="全屏" placement="bottom">
          <el-button class="header-icon-button" text circle aria-label="全屏" @click="handleFullScreen">
            <el-icon><FullScreen /></el-icon>
          </el-button>
        </el-tooltip>
      </div>
      <el-dropdown>
        <span class="user-menu">
          <el-avatar :size="32" class="user-avatar">{{ (userInfo.username || 'U').slice(0, 1).toUpperCase() }}</el-avatar>
          <span class="name">{{userInfo.username || '用户'}}</span>
          <el-icon class="el-icon--right"><ArrowDown /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item>我的设置</el-dropdown-item>
            <el-dropdown-item>清除缓存</el-dropdown-item>
            <el-dropdown-item divided @click="userStore.logout"> 退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style scoped>
  .header-container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .right {
      display: flex;
      align-items: center;
      gap: 14px;

      .header-search {
        width: 220px;
      }

      .el-icon-search {
        cursor: pointer;
        color: #94a3b8;
      }

      .header-actions {
        display: flex;
        align-items: center;
        gap: 2px;
        padding-right: 4px;
        border-right: 1px solid var(--border-color);
      }

      .header-icon-button {
        width: 34px;
        height: 34px;
        color: #64748b;
        font-size: 17px;
      }

      .header-icon-button:hover {
        color: var(--el-color-primary);
        background: var(--color-primary-soft);
      }

      .user-menu {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        color: #334155;
        cursor: pointer;
        outline: none;
      }

      .user-avatar {
        background: #dbeafe;
        color: #1d4ed8;
        font-weight: 600;
      }

      .name {
        max-width: 110px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
</style>
