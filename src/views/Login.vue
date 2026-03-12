<template>
  <div class="login-page">
    <el-card class="login-card">
      <div class="login-brand">
        <img src="../assets/logo.png" alt="ImLate" class="login-logo" />
        <h2>ImLate Control Panel</h2>
      </div>
      <el-form :model="form" :rules="rules" ref="formRef" label-position="top" @keyup.enter="submit">
        <el-form-item label="Username" prop="username">
          <el-input ref="usernameInput" v-model="form.username" placeholder="admin" clearable/>
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input v-model="form.password" type="password" placeholder="••••••••" show-password autocomplete="current-password"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="loading" :disabled="isDisabled" style="width: 100%;" @click="submit">Login</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../stores/auth.js'
import { ElMessage } from 'element-plus'
import { onMounted } from 'vue'


const usernameInput = ref()

onMounted(() => {
  usernameInput.value?.focus()
})

const form = reactive({ username: '', password: '' })
const rules = {
  username: [{ required: true, message: 'Username required', trigger: 'blur' }],
  password: [{ required: true, message: 'Password required', trigger: 'blur' }]
}
const formRef = ref()
const loading = ref(false)
// Router  and store
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
  
  try { 
    await formRef.value.validate() //???
    loading.value = true
    await auth.login(form.username, form.password)
    router.push(route.query.redirect || '/')
  } catch (error) {
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
