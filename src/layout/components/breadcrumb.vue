<script setup lang="ts">
  import {computed} from "vue";
  import {useRoute} from "vue-router";

  const route = useRoute()

  const breadcrumbList = computed(() =>
    route.matched
      .map(item => item)
      .filter((title) => Boolean(title))
  )
</script>

<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="index" :to="item.path">
        {{item.meta.title}}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<style scoped>

</style>
