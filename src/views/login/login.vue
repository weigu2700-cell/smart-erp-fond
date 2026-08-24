<script setup lang="ts">
  import {reactive, ref} from "vue"
  import {useRouter} from "vue-router"
  import {useUserStore} from "@/stores/user.ts"
  import {User, Lock} from "@element-plus/icons-vue"
  import {ElMessage, type FormInstance} from "element-plus"

  const router = useRouter()
  const useStore = useUserStore()
  const formRef = ref<FormInstance>()
  const loading = ref(false)

  const form = reactive({
    username: '',
    password:''
  })

  const rules = reactive({
    username: [
      { required: true, message: '请输入用户名', trigger: ['change'] },
    ],
    password: [
      { required: true, message: '请输入密码', trigger: ['change'] }
    ]
  })

  const handleLogin = () => {
    formRef.value?.validate((valid) => {
      if (!valid) {
        return
      }
      try {
        loading.value = true
        useStore.login(form)
        ElMessage.success({
          message: '登录成功',
          type: 'success'
        })
      } catch (e) {
        ElMessage.error(
          {
            message: '登录失败',
            type: 'error'
          }
        )
        console.log(e)
      }finally {
        loading.value = false
      }
      router.push({name: 'home'})
    })
  }

</script>

<template>
  <div class="login-container">
    <el-row class="login-content">
      <el-col :span="14" class="login-image">
        <div>
          <span>图片展示</span>
        </div>
      </el-col>
      <el-col :span="10" class="login-card">
        <div class="login-form">
          <div class="login-title">
            <span>登录</span>
          </div>
          <el-form
            ref="formRef"
            :model="form"
            class="login-form-content"
            :rules="rules"
          >
            <el-form-item prop="username">
              <el-input v-model="form.username" placeholder="请输入用户名">
                <template #prefix>
                  <el-icon><User /></el-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model="form.password" type="password" placeholder="请输入密码" show-password>
                <template #prefix>
                  <el-icon><Lock /></el-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item class="login-button">
              <el-button
                style="width: 100%;"
                type="primary"
                @click="handleLogin"
                :disabled="loading"
                :loading="loading"
              >登录
              </el-button>
            </el-form-item>
          </el-form>
          <div class="login-footer">
            <span>遇到问题？请联系管理员</span>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>

</template>

<style scoped>
  .login-container {
    height: 100vh;
  }
  .login-content {
    height: 100%;

    .login-image {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #f5f5f5;
    }

    .login-card {
      display: flex;
      align-items: center;
      justify-content: center;

      .login-form {
        width: 65%;
        height: 65%;
        padding: 20px;
        background-color: #ffffff;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 30px;
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);

        .login-title {
          font-size: 24px;
          font-weight: 600;
          color: #333;
        }

        .login-form-content {
          width: 100%;
          height: 100%;
          padding: 20px;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          gap: 10px;

          el-form-item {
            height: 50px;
            el-input {
              height: 100%;
            }
          }

          .login-button {
            width: 100%;
          }
        }

        .login-footer {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;

          span {
            color: #999;
            font-size: 12px;
          }
        }
      }

    }

  }
</style>
