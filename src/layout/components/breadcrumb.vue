<script setup lang="ts">
  import {computed} from "vue";
  import {useRoute} from "vue-router";

  const route = useRoute()

  const breadcrumbList = computed(() =>
    route.matched
      .filter(item => Boolean(item.meta.title))
  )
</script>

<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="index" :to="index < breadcrumbList.length - 1 ? item.path : undefined">
        {{item.meta.title}}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<style scoped>

</style>
