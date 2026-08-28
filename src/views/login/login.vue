<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user.ts'
import { User, Lock } from '@element-plus/icons-vue'
import { ElMessage, type FormInstance } from 'element-plus'

const router = useRouter()
const userStore = useUserStore()
const formRef = ref<FormInstance>()
const loading = ref(false)
const form = reactive({ username: '', password: '' })
const rules = reactive({
  username: [{ required: true, message: '请输入用户名', trigger: ['change'] }],
  password: [{ required: true, message: '请输入密码', trigger: ['change'] }],
})

const handleLogin = () => {
  formRef.value?.validate(async (valid) => {
    if (!valid) return
    try {
      loading.value = true
      await userStore.login(form)
      await userStore.getUserInfo()
      ElMessage.success('登录成功')
      router.push({ name: 'home' })
    } catch (e) {
      ElMessage.error('登录失败')
      console.log(e)
    } finally {
      loading.value = false
    }
  })
}
</script>

<template>
  <div class="login-container">
    <div class="login-content">
      <section class="login-intro">
        <div class="intro-brand"><img class="brand-mark" src="/origin-logo.svg" alt="原点 ERP" /><span>原点 ERP · ORIGIN</span></div>
        <div class="intro-copy"><p class="intro-eyebrow">企业资源管理平台</p><h1>让业务协同<br><span>更简单、高效</span></h1><p>统一管理主数据、库存与业务流程，实时掌握企业运营状态。</p></div>
        <div class="intro-features"><span>数据统一</span><span>流程清晰</span><span>决策及时</span></div>
      </section>
      <section class="login-card">
        <div class="login-form">
          <div class="login-title"><span>欢迎登录</span><small>使用您的账号进入管理后台</small></div>
          <el-form ref="formRef" :model="form" class="login-form-content" :rules="rules" @submit.prevent="handleLogin">
            <el-form-item prop="username"><el-input v-model="form.username" placeholder="请输入用户名" autocomplete="username"><template #prefix><el-icon><User /></el-icon></template></el-input></el-form-item>
            <el-form-item prop="password"><el-input v-model="form.password" type="password" placeholder="请输入密码" show-password autocomplete="current-password" @keyup.enter="handleLogin"><template #prefix><el-icon><Lock /></el-icon></template></el-input></el-form-item>
            <el-form-item class="login-button"><el-button style="width: 100%" type="primary" native-type="submit" :disabled="loading" :loading="loading">登 录</el-button></el-form-item>
          </el-form>
          <div class="login-footer"><span>遇到问题？请联系管理员</span></div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.login-container { min-height: 100vh; background: #f8fafd; }
.login-content { min-height: 100vh; display: grid; grid-template-columns: minmax(420px, 1.1fr) minmax(420px, .9fr); }
.login-intro { position: relative; overflow: hidden; padding: 48px 10%; display: flex; flex-direction: column; justify-content: space-between; color: #202124; background: #fff; border-right: 1px solid var(--border-color); }
.login-intro::after { content: ''; position: absolute; width: 420px; height: 420px; right: -140px; bottom: -170px; border: 1px solid #d2e3fc; border-radius: 50%; box-shadow: 0 0 0 42px #fce8e6, 0 0 0 84px #e6f4ea; opacity: .65; }
.intro-brand { display: flex; align-items: center; gap: 11px; font-size: 18px; font-weight: 650; letter-spacing: .2px; }.brand-mark { width: 34px; height: 34px; display: grid; place-items: center; border-radius: 9px; background: #e8f0fe; color: #1a73e8; font-size: 19px; font-weight: 800; }
.intro-copy { position: relative; z-index: 1; max-width: 460px; }.intro-eyebrow { margin: 0 0 18px; color: #5f6368; font-size: 13px; letter-spacing: 2px; }.intro-copy h1 { margin: 0; font-size: clamp(34px, 4vw, 52px); line-height: 1.25; letter-spacing: -1.5px; }.intro-copy h1 span { color: #1a73e8; }.intro-copy > p:last-child { max-width: 360px; margin: 20px 0 0; color: #5f6368; font-size: 14px; line-height: 1.8; }
.intro-features { position: relative; z-index: 1; display: flex; gap: 10px; }.intro-features span { padding: 7px 13px; border: 1px solid #dadce0; border-radius: 20px; color: #5f6368; font-size: 12px; background: #fff; }
.login-card { display: flex; align-items: center; justify-content: center; padding: 40px; background: #f8fafd; }.login-form { width: min(390px, 100%); padding: 42px 40px 34px; background: #fff; border: 1px solid var(--border-color); border-radius: 12px; box-shadow: var(--shadow-panel); }.login-title { display: flex; flex-direction: column; gap: 8px; margin-bottom: 32px; color: #202124; font-size: 25px; font-weight: 650; }.login-title small { color: #80868b; font-size: 13px; font-weight: 400; }.login-form-content { width: 100%; }.login-form-content :deep(.el-input__wrapper) { min-height: 42px; }.login-form-content :deep(.el-form-item) { margin-bottom: 20px; }.login-button { margin-top: 10px; }.login-button :deep(.el-button) { height: 42px; font-size: 14px; border-radius: 6px; }.login-footer { margin-top: 34px; text-align: center; }.login-footer span { color: #80868b; font-size: 12px; }
@media (max-width: 800px) { .login-content { grid-template-columns: 1fr; }.login-intro { min-height: 280px; padding: 30px; gap: 48px; }.intro-copy h1 { font-size: 34px; }.login-card { min-height: calc(100vh - 280px); padding: 28px 20px; } }
</style>
