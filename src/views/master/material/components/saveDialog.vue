<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import { ElMessage } from "element-plus";
import type { FormInstance, FormRules } from "element-plus";
import type { MaterialCreateRequest, MaterialType, MaterialUpdateRequest, MaterialVO } from "@/types/master/material.ts";

const props = defineProps<{
  visible: boolean
  title?: string
  mode?: 'add' | 'edit'
  row?: MaterialVO | null
}>()

const emit = defineEmits<{
  (e: 'cancel'): void
  (e: 'submit', form: MaterialCreateRequest | MaterialUpdateRequest): void
}>()

const formRef = ref<FormInstance>()

const typeOptions: { label: string, value: MaterialType }[] = [
  { label: '原材料', value: 'RAW_MATERIAL' },
  { label: '半成品', value: 'SEMI_FINISHED' },
  { label: '包装材料', value: 'PACKAGING' },
  { label: '耗材', value: 'CONSUMABLE' },
  { label: '其他', value: 'OTHER' },
]

const form = reactive<MaterialCreateRequest>({
  name: '',
  unit: '',
  spec: '',
  type: 'RAW_MATERIAL',
  status: 1,
  safetyStock: 0,
  remark: '',
})

const rules: FormRules = {
  name: [{ required: true, message: '请输入物料名称', trigger: 'blur' }],
  type: [{ required: true, message: '请选择物料类型', trigger: 'change' }],
}

watch(
  () => props.visible,
  (val) => {
    if (!val) return
    if (props.mode === 'edit' && props.row) {
      form.name = props.row.name
      form.unit = props.row.unit ?? ''
      form.spec = props.row.spec ?? ''
      form.type = (props.row.type as MaterialType) ?? 'RAW_MATERIAL'
      form.safetyStock = props.row.safetyStock ?? 0
      form.remark = props.row.remark ?? ''
    } else {
      form.name = ''
      form.unit = ''
      form.spec = ''
      form.type = 'RAW_MATERIAL'
      form.status = 1
      form.safetyStock = 0
      form.remark = ''
    }
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
  if (props.mode === 'edit') {
    // 后端 MaterialUpdateDTO 不含 type，只提交可更新字段
    const updateForm: MaterialUpdateRequest = {
      name: form.name,
      spec: form.spec,
      unit: form.unit,
      safetyStock: form.safetyStock,
      remark: form.remark,
    }
    emit('submit', updateForm)
  } else {
    emit('submit', { ...form })
  }
}

const handleCancel = () => {
  emit('cancel')
}
</script>

<template>
  <el-dialog v-model="dialogVisible" :title="title" width="480px" align-center>
    <el-form ref="formRef" :model="form" :rules="rules" label-width="90px">
      <el-form-item label="物料名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入物料名称" clearable />
      </el-form-item>
      <!-- 编辑模式下后端不支持修改物料类型，仅新增展示 -->
      <template v-if="mode === 'add'">
        <el-form-item label="物料类型" prop="type">
          <el-select v-model="form.type" placeholder="请选择物料类型" style="width: 100%">
            <el-option v-for="item in typeOptions" :key="item.value" :label="item.label"
              :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </template>
      <el-form-item label="规格" prop="spec">
        <el-input v-model="form.spec" placeholder="请输入规格" clearable />
      </el-form-item>
      <el-form-item label="单位" prop="unit">
        <el-input v-model="form.unit" placeholder="请输入单位" clearable />
      </el-form-item>
      <el-form-item label="安全库存" prop="safetyStock">
        <el-input-number v-model="form.safetyStock" :min="0" :precision="0" placeholder="请输入安全库存" style="width: 100%" />
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="form.remark" type="textarea" :rows="3" placeholder="请输入备注" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" @click="handleSubmit">保存</el-button>
    </template>
  </el-dialog>
</template>

<style scoped></style>