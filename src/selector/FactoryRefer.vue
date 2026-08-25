<script setup lang="ts">
  import ReferPicker from "@/components/ReferPicker.vue";
  import {getFactoryList} from "@/api/master/factory.ts";
  import type {FactoryListRequest} from "@/types/master/factory.ts";

  // 双向绑定选中的工厂 id
  const modelValue = defineModel<string | number | null | undefined>()

  // 工厂参照专属配置：列、API、搜索字段，集中在这里，业务页面零配置
  const columns = [
    {prop: 'code', label: '工厂编码', width: 140},
    {prop: 'name', label: '工厂名称', minWidth: 160},
    {prop: 'shortName', label: '简称', width: 120},
    {prop: 'status', label: '状态', width: 80},
  ]

  const fetcher = (params: Record<string, any>) =>
    getFactoryList(params as FactoryListRequest)
</script>

<template>
  <ReferPicker
    v-model="modelValue"
    title="工厂参照"
    placeholder="请选择工厂"
    search-field="name"
    search-placeholder="请输入工厂名称关键字"
    :columns="columns"
    :fetcher="fetcher"
  />
</template>
