<script setup lang="ts">
  import {reactive, ref, watch} from "vue";
  import type {FormInstance, FormRules} from "element-plus";
  import {CircleClose, Search} from "@element-plus/icons-vue";
  import type {MenuSaveRequest} from "@/types/system/menu.ts";
  import ParentMenuSelector from "@/views/system/menu/component/parentMenuSelector.vue";

  type EditRow = MenuSaveRequest & {parentName?: string}

  const props = defineProps<{
    visible: boolean
    title?: string
    mode?: 'add' | 'edit'
    row?: EditRow | null
  }>()
  const emit = defineEmits<{
    (e: 'cancel'): void
    (e: 'submit', form: MenuSaveRequest): void
  }>()

  const formRef = ref<FormInstance>()
  const parentSelectorVisible = ref(false)
  const parentName = ref('')

  const form = reactive<MenuSaveRequest>({
    id: undefined,
    name: '',
    title: '',
    path: '',
    component: '',
    icon: null,
    parentId: null,
    visible: 1,
    status: 'ENABLE',
  })

  const rules: FormRules = {
    name: [{required: true, message: '请输入菜单编码', trigger: 'blur'}],
    title: [{required: true, message: '请输入菜单名称', trigger: 'blur'}],
    path: [{required: true, message: '请输入路由路径', trigger: 'blur'}],
    status: [{required: true, message: '请选择状态', trigger: 'change'}]
  }

  const openParentSelector = () => {
    parentSelectorVisible.value = true
  }

  const handleParentSelect = (menu: {id: number, title: string}) => {
    form.parentId = menu.id
    parentName.value = menu.title
  }

  const clearParent = () => {
    form.parentId = null
    parentName.value = ''
  }

  const resetForm = () => {
    const isEdit = props.mode === 'edit' && !!props.row
    form.id = isEdit ? props.row?.id : undefined
    form.name = isEdit ? props.row?.name ?? '' : ''
    form.title = isEdit ? props.row?.title ?? '' : ''
    form.path = isEdit ? props.row?.path ?? '' : ''
    form.component = isEdit ? props.row?.component ?? '' : ''
    form.icon = isEdit ? props.row?.icon ?? null : null
    form.parentId = isEdit ? props.row?.parentId ?? null : null
    form.visible = isEdit ? props.row?.visible ?? 1 : 1
    form.status = isEdit ? props.row?.status ?? 'ENABLE' : 'ENABLE'
    parentName.value = isEdit ? props.row?.parentName ?? '' : ''
    formRef.value?.clearValidate()
  }

  watch(() => props.visible, (val) => {
    if (val) {
      resetForm()
    }
  })

  const handleSubmit = () => {
    formRef.value?.validate((valid) => {
      if (!valid) return
      emit('submit', {...form})
    })
  }

  const handleCancel = () => {
    emit('cancel')
  }
</script>

<template>
  <el-dialog
    :model-value="props.visible"
    :title="props.title ?? (props.mode === 'edit' ? '修改菜单' : '新增菜单')"
    width="500px"
    @close="handleCancel"
  >
    <el-form
      ref="formRef"
      :model="form"
      :rules="rules"
      label-width="90px"
    >
      <el-form-item label="菜单名称" prop="title">
        <el-input v-model="form.title" placeholder="请输入菜单名称" clearable />
      </el-form-item>
      <el-form-item label="菜单编码" prop="name">
        <el-input v-model="form.name" placeholder="请输入菜单编码" clearable />
      </el-form-item>
      <el-form-item label="路由路径" prop="path">
        <el-input v-model="form.path" placeholder="请输入路由路径" clearable />
      </el-form-item>
      <el-form-item label="组件路径" prop="component">
        <el-input v-model="form.component" placeholder="请输入组件路径" clearable />
      </el-form-item>
      <el-form-item label="图标" prop="icon">
        <el-input v-model="form.icon" placeholder="请输入图标名称" clearable />
      </el-form-item>
      <el-form-item label="父级菜单" prop="parentId">
        <el-input
          :model-value="parentName"
          readonly
          placeholder="点击选择父级菜单"
          @click="openParentSelector"
        >
          <template #suffix>
            <el-icon v-if="form.parentId" class="field-icon" @click.stop="clearParent">
              <CircleClose />
            </el-icon>
            <el-icon v-else class="field-icon" @click.stop="openParentSelector">
              <Search />
            </el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="可见性" prop="visible">
        <el-radio-group v-model="form.visible">
          <el-radio :label="1">显示</el-radio>
          <el-radio :label="0">隐藏</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="form.status" placeholder="请选择状态" style="width: 100%">
          <el-option label="启用" value="ENABLE" />
          <el-option label="禁用" value="DISABLE" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" @click="handleSubmit">保存</el-button>
      <el-button @click="handleCancel">取消</el-button>
    </template>

    <ParentMenuSelector
      v-model:visible="parentSelectorVisible"
      @select="handleParentSelect"
    />
  </el-dialog>
</template>

<style scoped>
  .field-icon {
    cursor: pointer;
  }
</style>
