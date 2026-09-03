<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import { ElMessage } from "element-plus";
import type { FormInstance, FormRules } from "element-plus";
import type { SupplierCreateRequest, SupplierUpdateRequest, SupplierVO } from "@/types/master/supplier.ts";
import BaseSaveDialog from "@/components/BaseSaveDialog.vue";

const props = defineProps<{
  visible: boolean
  title?: string
  mode?: 'add' | 'edit'
  row?: SupplierVO | null
}>()

const emit = defineEmits<{
  (e: 'cancel'): void
  (e: 'submit', form: SupplierCreateRequest | SupplierUpdateRequest): void
}>()

const formRef = ref<FormInstance>()

const form = reactive<SupplierCreateRequest>({
  name: '',
  shortName: '',
  contactName: '',
  address: '',
  phone: '',
  email: '',
  status: 1,
  remark: '',
})

const rules: FormRules = {
  name: [{ required: true, message: '请输入供应商名称', trigger: 'blur' }],
}

watch(
  () => props.visible,
  (val) => {
    if (!val) return
    if (props.mode === 'edit' && props.row) {
      form.name = props.row.name
      form.shortName = props.row.shortName ?? ''
      form.contactName = props.row.contactName ?? ''
      form.address = props.row.address ?? ''
      form.phone = props.row.phone ?? ''
      form.email = props.row.email ?? ''
      form.remark = props.row.remark ?? ''
    } else {
      form.name = ''
      form.shortName = ''
      form.contactName = ''
      form.address = ''
      form.phone = ''
      form.email = ''
      form.status = 1
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
  <BaseSaveDialog :visible="props.visible" :title="title" width="520px" @cancel="handleCancel" @submit="handleSubmit">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="90px">
      <el-form-item label="供应商名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入供应商名称" clearable />
      </el-form-item>
      <el-form-item label="简称" prop="shortName">
        <el-input v-model="form.shortName" placeholder="请输入简称" clearable />
      </el-form-item>
      <el-form-item label="联系人" prop="contactName">
        <el-input v-model="form.contactName" placeholder="请输入联系人" clearable />
      </el-form-item>
      <el-form-item label="联系电话" prop="phone">
        <el-input v-model="form.phone" placeholder="请输入联系电话" clearable />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" placeholder="请输入邮箱" clearable />
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input v-model="form.address" placeholder="请输入地址" clearable />
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="form.remark" type="textarea" :rows="3" placeholder="请输入备注" />
      </el-form-item>
    </el-form>
  </BaseSaveDialog>
</template>

<style scoped></style>
