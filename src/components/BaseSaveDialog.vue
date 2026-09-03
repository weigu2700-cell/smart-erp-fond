<script setup lang="ts">
withDefaults(defineProps<{
  visible: boolean
  title?: string
  width?: string
  loading?: boolean
}>(), {
  title: '',
  width: '520px',
  loading: false,
})

const emit = defineEmits<{
  (e: 'cancel'): void
  (e: 'submit'): void
}>()

const handleClose = () => emit('cancel')
</script>

<template>
  <el-dialog
    :model-value="visible"
    :title="title"
    :width="width"
    :close-on-click-modal="false"
    align-center
    v-loading="loading"
    @close="handleClose"
  >
    <slot />
    <template #footer>
      <slot name="footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" :loading="loading" @click="emit('submit')">保存</el-button>
      </slot>
    </template>
  </el-dialog>
</template>
