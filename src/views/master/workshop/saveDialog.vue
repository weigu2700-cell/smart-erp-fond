<script setup lang="ts">
  import {reactive, ref, watch} from "vue";
  import {ElMessage} from "element-plus";
  import type {FormInstance, FormRules} from "element-plus";
  import FactoryRefer from "@/selector/FactoryRefer.vue";
  import {getWorkshopDetail} from "@/api/master/workshop.ts";
  import type {
    WorkshopCreateRequest,
    WorkshopUpdateRequest,
    WorkshopVO
  } from "@/types/master/workshop.ts";

  const props = defineProps<{
    modelValue: boolean
    model: 'add' | 'edit'
    selectedRowId: string
  }>()

  const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void
    (e: 'cancel'): void
    (e: 'submit', form: WorkshopCreateRequest | WorkshopUpdateRequest): void
  }>()

  const formRef = ref<FormInstance>()
  const loading = ref(false)

  const form = reactive<{
    name: string
    shortName: string
    // factoryId 是工厂主键 id（雪花 ID 字符串），原样传递，不能 Number() 强转
    factoryId?: string
    remark: string
  }>({
    name: '',
    shortName: '',
    factoryId: undefined,
    remark: '',
  })

  const rules: FormRules = {
    name: [{required: true, message: '请输入车间名称', trigger: 'blur'}],
    factoryId: [{required: true, message: '请选择所属工厂', trigger: 'change'}],
  }

  // el-dialog 需要 v-model，但 modelValue 是只读 prop，用内部 ref 桥接
  const dialogVisible = ref(props.modelValue)
  watch(() => props.modelValue, (v) => {
    dialogVisible.value = v
  })
  watch(dialogVisible, (v) => {
    // 同步回父组件，保证 v-model 语义完整（点 X / 遮罩关闭也能同步）
    emit('update:modelValue', v)
    if (!v) emit('cancel')
  })

  watch(() => props.modelValue, async (val) => {
    if (!val) return
    formRef.value?.clearValidate()
    if (props.model === 'edit' && props.selectedRowId) {
      try {
        loading.value = true
        const row: WorkshopVO = await getWorkshopDetail(String(props.selectedRowId))
        form.name = row.name
        form.shortName = row.shortName ?? ''
        form.factoryId = row.factoryId
        form.remark = row.remark ?? ''
      } catch {
        ElMessage.error('获取车间详情失败')
      } finally {
        loading.value = false
      }
    } else {
      form.name = ''
      form.shortName = ''
      form.factoryId = undefined
      form.remark = ''
    }
  })

  const handleFactoryChange = (v: string | number | null | undefined) => {
    console.log('[saveDialog] handleFactoryChange ->', v)
    form.factoryId = v == null ? undefined : String(v)
    formRef.value?.validateField('factoryId').catch(() => {})
  }

  const handleSubmit = async () => {
    if (!formRef.value) {
      ElMessage.error('表单未初始化，请重新打开对话框')
      return
    }
    const valid = await formRef.value.validate().catch(() => false)
    console.log('[saveDialog] handleSubmit valid =', valid, 'form =', {...form})
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
    :title="model === 'add' ? '新增车间' : '修改车间'"
    width="520px"
    align-center
    v-loading="loading"
  >
    <el-form ref="formRef" :model="form" :rules="rules" label-width="90px">
      <el-form-item label="车间名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入车间名称" clearable />
      </el-form-item>
      <el-form-item label="车间简称" prop="shortName">
        <el-input v-model="form.shortName" placeholder="请输入车间简称" clearable />
      </el-form-item>
      <el-form-item label="所属工厂" prop="factoryId">
        <FactoryRefer
          :model-value="form.factoryId"
          @update:model-value="handleFactoryChange"
        />
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
