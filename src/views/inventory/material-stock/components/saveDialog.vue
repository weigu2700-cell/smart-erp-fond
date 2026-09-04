<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import { ElMessage } from "element-plus";
import type { FormInstance, FormRules } from "element-plus";
import MaterialRefer from "@/refer/MaterialRefer.vue";
import WarehouseRefer from "@/refer/WarehouseRefer.vue";
import type { MaterialStockCreateRequest } from "@/types/inventory/materialStock.ts";
import BaseSaveDialog from "@/components/BaseSaveDialog.vue";

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
  materialId: [{ required: true, message: '请选择物料', trigger: 'change' }],
  warehouseId: [{ required: true, message: '请选择仓库', trigger: 'change' }],
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

const handleSubmit = async () => {
  const valid = await formRef.value?.validate().catch(() => false)
  if (!valid) {
    ElMessage.warning('请完善必填项后再保存')
    return
  }
  emit('submit', { ...form })
}

const handleCancel = () => {
  emit('cancel')
}
</script>

<template>
  <BaseSaveDialog :visible="visible" :title="title" width="480px" @cancel="handleCancel" @submit="handleSubmit">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="物料" prop="materialId">
        <MaterialRefer v-model="form.materialId" />
      </el-form-item>
      <el-form-item label="仓库" prop="warehouseId">
        <WarehouseRefer v-model="form.warehouseId" />
      </el-form-item>
    </el-form>
  </BaseSaveDialog>
</template>

<style scoped></style>
