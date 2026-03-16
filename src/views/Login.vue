<template>
  <div class="login-page">
    <el-card class="login-card">
      <div class="login-brand">
        <img src="../assets/logo.png" alt="ImLate" class="login-logo" />
        <h2>ImLate Control Panel</h2>
      </div>
      <el-form :model="form" :rules="rules" ref="formRef" label-position="top" @keyup.enter="submit">
        <el-form-item label="Username" prop="username">
          <el-input ref="usernameInput" v-model="form.username" placeholder="admin" clearable />
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input v-model="form.password" type="password" placeholder="••••••••" show-password
            autocomplete="current-password" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="loading" :disabled="isDisabled" style="width: 100%;"
            @click="submit">Login</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { reactive, ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../stores/auth.js'
import { ElMessage } from 'element-plus'

const usernameInput = ref()

onMounted(() => {
  usernameInput.value?.focus()
})

const form = reactive({ username: '', password: '' })
const rules = {
  username: [{ required: true, message: 'Username required', trigger: ['blur', 'change'] }],
  password: [{ required: true, message: 'Password required', trigger: ['blur', 'change'] }]
}
const formRef = ref()
const loading = ref(false)
// Router and store
const router = useRouter()
const route = useRoute()
const auth = useAuthStore()

//The Login button is automatically disabled.
const isDisabled = computed(() => {
  return !form.username || !form.password
})
// Submit function
const submit = async () => {

  if (!formRef.value) return

  // Prevent submission (including Enter key) when form is disabled or already loading
  if (isDisabled.value || loading.value) {
    return
  }
  try {
    const valid = await formRef.value.validate()
    // If validation fails, do not proceed or show a login error
    if (!valid) {
      return
    }
    loading.value = true
    await auth.login(form.username, form.password)
    const redirect = typeof route.query.redirect === 'string' ? route.query.redirect : '/'
    router.push(redirect)
  } catch (error) {
    // Element Plus may reject with `false` on validation failure; don't treat that as a login error
    if (error === false) {
      return
    }
    console.error(error)
    const status = error?.response?.status
    const backendMessage =
      typeof error?.response?.data?.message === 'string'
        ? error.response.data.message
        : null
    let message = 'Login failed. Please try again.'
    // Provide a clear message for invalid credentials
    if (status === 401 || status === 403) {
      message = 'Incorrect username or password. Please try again.'
    } else if (backendMessage) {
      message = backendMessage
    } else if (typeof error?.message === 'string') {
      message = error.message
    }
    ElMessage.error(message)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-page {
  min-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-card {
  padding: 30px;
  width: 100%;
  max-width: 400px;
}

.login-brand {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
}

.login-logo {
  width: 64px;
  height: 64px;
  object-fit: contain;
}

.login-brand h2 {
  margin: 0;
  text-align: center;
}
</style>
