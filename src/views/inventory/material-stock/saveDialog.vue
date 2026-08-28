<script setup lang="ts">
  import {reactive, ref, watch} from "vue";
  import {ElMessage} from "element-plus";
  import type {FormInstance, FormRules} from "element-plus";
  import MaterialRefer from "@/selector/MaterialRefer.vue";
  import WarehouseRefer from "@/selector/WarehouseRefer.vue";
  import type {MaterialStockCreateRequest} from "@/types/inventory/materialStock.ts";

  const props = defineProps<{
    visible: boolean
    title?: string
  }>()

  const emit = defineEmits<{
    (e: 'cancel'): void
    (e: 'submit', form: MaterialStockCreateRequest): void
  }>()

  const formRef = ref<FormInstance>()

  const form = reactive<MaterialStockCreateRequest>({
    materialId: '',
    warehouseId: '',
  })

  const rules: FormRules = {
    materialId: [{required: true, message: '请选择物料', trigger: 'change'}],
    warehouseId: [{required: true, message: '请选择仓库', trigger: 'change'}],
  }

  watch(
    () => props.visible,
    (val) => {
      if (!val) return
      form.materialId = ''
      form.warehouseId = ''
      formRef.value?.clearValidate()
    }
  )

  // el-dialog 需要 v-model，但 visible 是只读 prop，用内部 ref 桥接
  const dialogVisible = ref(props.visible)
  watch(() => props.visible, (v) => {
    dialogVisible.value = v
  })
  watch(dialogVisible, (v) => {
    if (!v) emit('cancel')
  })

  const handleSubmit = async () => {
    const valid = await formRef.value?.validate().catch(() => false)
    if (!valid) {
      ElMessage.warning('请完善必填项后再保存')
      return
    }
    emit('submit', {...form})
  }

  const handleCancel = () => {
    emit('cancel')
  }
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    :title="title"
    width="480px"
    align-center
  >
    <el-form ref="formRef" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="物料" prop="materialId">
        <MaterialRefer v-model="form.materialId" />
      </el-form-item>
      <el-form-item label="仓库" prop="warehouseId">
        <WarehouseRefer v-model="form.warehouseId" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" @click="handleSubmit">保存</el-button>
    </template>
  </el-dialog>
</template>

<style scoped>

</style>
