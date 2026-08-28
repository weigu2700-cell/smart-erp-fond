<script setup lang="ts">
  import {computed, reactive, ref, watch} from "vue";
  import {ElMessage} from "element-plus";
  import type {FormInstance, FormRules} from "element-plus";
  import type {addOrUpdateFactoryRequest, FactoryVO} from "@/types/master/factory.ts";

  const props = defineProps<{
    visible: boolean
    title?: string
    mode?: 'add' | 'edit'
    row?: FactoryVO | null
  }>()

  const emit = defineEmits<{
    (e: 'cancel'): void
    (e: 'submit', form: addOrUpdateFactoryRequest): void
  }>()

  const formRef = ref<FormInstance>()

  const form = reactive<addOrUpdateFactoryRequest>({
    name: '',
    shortName: '',
    address: '',
    remark: '',
  })

  const rules: FormRules = {
    name: [{required: true, message: '请输入工厂名称', trigger: 'blur'}],
    shortName: [{required: true, message: '请输入工厂简称', trigger: 'blur'}],
  }

  // 打开时根据 mode 回填（编辑）或重置（新增）
  watch(
    () => props.visible,
    (val) => {
      if (!val) return
      if (props.mode === 'edit' && props.row) {
        form.name = props.row.name
        form.shortName = props.row.shortName
        form.address = props.row.address ?? ''
        form.remark = props.row.remark ?? ''
      } else {
        form.name = ''
        form.shortName = ''
        form.address = ''
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
      <el-form-item label="工厂名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入工厂名称" clearable />
      </el-form-item>
      <el-form-item label="工厂简称" prop="shortName">
        <el-input v-model="form.shortName" placeholder="请输入工厂简称" clearable />
      </el-form-item>
      <el-form-item label="工厂地址" prop="address">
        <el-input v-model="form.address" placeholder="请输入工厂地址" clearable />
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

<style scoped>

</style>
