<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import { ElMessage } from "element-plus";
import type { FormInstance, FormRules } from "element-plus";
import MaterialRefer from "@/selector/MaterialRefer.vue";
import SupplierRefer from "@/selector/SupplierRefer.vue";
import type { MaterialSupplierCreateRequest, MaterialSupplierUpdateRequest, MaterialSupplierVO } from "@/types/master/materialSupplier.ts";

const props = defineProps<{
  visible: boolean
  title?: string
  mode?: 'add' | 'edit'
  row?: MaterialSupplierVO | null
}>()

const emit = defineEmits<{
  (e: 'cancel'): void
  (e: 'submit', form: MaterialSupplierCreateRequest | MaterialSupplierUpdateRequest): void
}>()

const formRef = ref<FormInstance>()

const form = reactive<MaterialSupplierCreateRequest>({
  materialId: '',
  supplierId: '',
  materialSupplierCode: '',
  purchasePrice: undefined,
  leadTimeDays: undefined,
  preferred: 0,
  minOrderQty: undefined,
  status: 1,
  remark: '',
})

const rules: FormRules = {
  materialId: [{ required: true, message: '请选择物料', trigger: 'change' }],
  supplierId: [{ required: true, message: '请选择供应商', trigger: 'change' }],
  materialSupplierCode: [{ required: true, message: '请输入关联编码', trigger: 'blur' }],
}

watch(
  () => props.visible,
  (val) => {
    if (!val) return
    if (props.mode === 'edit' && props.row) {
      form.materialId = ''
      form.supplierId = ''
      form.materialSupplierCode = props.row.materialSupplierCode ?? ''
      form.purchasePrice = props.row.purchasePrice ?? undefined
      form.leadTimeDays = props.row.leadTimeDays ?? undefined
      form.preferred = props.row.preferred ?? 0
      form.minOrderQty = props.row.minOrderQty ?? undefined
      form.remark = props.row.remark ?? ''
    } else {
      form.materialId = ''
      form.supplierId = ''
      form.materialSupplierCode = ''
      form.purchasePrice = undefined
      form.leadTimeDays = undefined
      form.preferred = 0
      form.status = 1
      form.minOrderQty = undefined
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
    // 后端 UpdateDTO 不含 materialId/supplierId（通过路径 id 定位关联）
    const updateForm: MaterialSupplierUpdateRequest = {
      materialSupplierCode: form.materialSupplierCode,
      purchasePrice: form.purchasePrice,
      leadTimeDays: form.leadTimeDays,
      preferred: form.preferred,
      minOrderQty: form.minOrderQty,
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
  <el-dialog v-model="dialogVisible" :title="title" width="520px" align-center>
    <el-form ref="formRef" :model="form" :rules="rules" label-width="90px">
      <!-- 编辑模式下后端不支持修改物料/供应商，仅新增展示 -->
      <template v-if="mode === 'add'">
        <el-form-item label="物料" prop="materialId">
          <MaterialRefer v-model="form.materialId" />
        </el-form-item>
        <el-form-item label="供应商" prop="supplierId">
          <SupplierRefer v-model="form.supplierId" />
        </el-form-item>
      </template>
      <el-form-item label="关联编码" prop="materialSupplierCode">
        <el-input v-model="form.materialSupplierCode" placeholder="请输入关联编码" clearable />
      </el-form-item>
      <el-form-item label="采购价" prop="purchasePrice">
        <el-input-number v-model="form.purchasePrice" :min="0" :precision="2" placeholder="请输入采购价"
          style="width: 100%" />
      </el-form-item>
      <el-form-item label="交期(天)" prop="leadTimeDays">
        <el-input-number v-model="form.leadTimeDays" :min="0" :precision="0" placeholder="请输入采购交期"
          style="width: 100%" />
      </el-form-item>
      <el-form-item label="最小起订量" prop="minOrderQty">
        <el-input-number v-model="form.minOrderQty" :min="0" :precision="0" placeholder="请输入最小起订量"
          style="width: 100%" />
      </el-form-item>
      <el-form-item label="优选" prop="preferred">
        <el-switch v-model="form.preferred" :active-value="1" :inactive-value="0" />
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="form.remark" type="textarea" :rows="2" placeholder="请输入备注" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" @click="handleSubmit">保存</el-button>
    </template>
  </el-dialog>
</template>

<style scoped></style>