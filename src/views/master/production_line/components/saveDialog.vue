<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import { ElMessage } from "element-plus";
import type { FormInstance, FormRules } from "element-plus";
import WorkshopRefer from "@/selector/WorkshopRefer.vue";
import type { ProductionLineCreateRequest, ProductionLineUpdateRequest, ProductionLineVO } from "@/types/master/productionLine.ts";
import BaseSaveDialog from "@/components/BaseSaveDialog.vue";

const props = defineProps<{
  visible: boolean
  title?: string
  mode?: 'add' | 'edit'
  row?: ProductionLineVO | null
}>()

const emit = defineEmits<{
  (e: 'cancel'): void
  (e: 'submit', form: ProductionLineCreateRequest | ProductionLineUpdateRequest): void
}>()

const formRef = ref<FormInstance>()

const form = reactive<ProductionLineCreateRequest>({
  name: '',
  workshopId: '',
  status: 1,
  capacityPerDay: undefined,
  remark: '',
})

const rules: FormRules = {
  name: [{ required: true, message: '请输入生产线名称', trigger: 'blur' }],
  workshopId: [{ required: true, message: '请选择所属车间', trigger: 'change' }],
}

watch(
  () => props.visible,
  (val) => {
    if (!val) return
    if (props.mode === 'edit' && props.row) {
      form.name = props.row.name
      form.workshopId = props.row.workshopId ?? ''
      form.capacityPerDay = props.row.capacityPerDay ?? undefined
      form.remark = props.row.remark ?? ''
    } else {
      form.name = ''
      form.workshopId = ''
      form.status = 1
      form.capacityPerDay = undefined
      form.remark = ''
    }
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
  <BaseSaveDialog :visible="props.visible" :title="title" width="480px" @cancel="handleCancel" @submit="handleSubmit">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="90px">
      <el-form-item label="生产线名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入生产线名称" clearable />
      </el-form-item>
      <el-form-item label="所属车间" prop="workshopId">
        <WorkshopRefer v-model="form.workshopId" />
      </el-form-item>
      <el-form-item label="日产能" prop="capacityPerDay">
        <el-input-number v-model="form.capacityPerDay" :min="0" :precision="0" placeholder="请输入日产能"
          style="width: 100%" />
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="form.remark" type="textarea" :rows="3" placeholder="请输入备注" />
      </el-form-item>
    </el-form>
  </BaseSaveDialog>
</template>

<style scoped></style>
