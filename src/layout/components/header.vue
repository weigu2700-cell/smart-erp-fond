<script setup lang="ts">
  import {ref, computed} from 'vue'
  import {ArrowDown, Bell, FullScreen, Refresh} from "@element-plus/icons-vue";
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
      <div>
        <el-input v-model="searchKey" placeholder="请输入关键字" >
          <template #suffix>
            <el-icon  @click="handleSearch">
              <search class="el-icon-search"/>
            </el-icon>
          </template>
        </el-input>
      </div>
      <div>
        <el-button type="text">
          <template #icon >
            <el-icon>
              <bell />
            </el-icon>
          </template>
        </el-button>
        <el-button type="text">
          <template #icon >
            <el-icon @click="handleRefresh">
              <refresh />
            </el-icon>
          </template>
        </el-button>
        <el-button type="text">
          <template #icon >
            <el-icon @click="handleFullScreen">
              <full-screen />
            </el-icon>
          </template>
        </el-button>
      </div>
      <el-dropdown>
        <span class="el-dropdown-link">
          <span class="name">{{userInfo.username}}</span>
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item>我的设置</el-dropdown-item>
            <el-dropdown-item>清除缓存</el-dropdown-item>
            <el-dropdown-item divided> 退出登录</el-dropdown-item>
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
      gap: 10px;

      .el-icon-search:hover {
        cursor: pointer;
      }
    }
  }
</style>
