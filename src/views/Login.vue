<template>
  <div class="login-wrap">
    <el-card class="login-card">
      <div class="login-brand">
        <img src="../assets/logo.png" alt="ImLate" class="login-logo" />
        <h2>ImLate Control Panel</h2>
      </div>
      <el-form :model="form" :rules="rules" ref="formRef" label-position="top">
        <el-form-item label="Username" prop="username">
          <el-input v-model="form.username" placeholder="admin" />
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input v-model="form.password" type="password" placeholder="••••••••" />
        </el-form-item>
        <el-button type="primary" :loading="loading" @click="submit">Login</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../stores/auth.js'
import { ElMessage } from 'element-plus'

const form = reactive({ username: '', password: '' })
const rules = {
  username: [{ required: true, message: 'Username required', trigger: 'blur' }],
  password: [{ required: true, message: 'Password required', trigger: 'blur' }]
}
const formRef = ref()
const loading = ref(false)
const router = useRouter()
const route = useRoute()
const auth = useAuthStore()

const submit = async () => {
  await formRef.value.validate()
  loading.value = true
  try {
    await auth.login(form.username, form.password)
    router.push(route.query.redirect || '/')
  } catch (error) {
    ElMessage.error(error.message || 'Login failed')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-wrap {
  min-height: 100vh; display:grid; place-items:center;
  background: #f7f7fb;
}
.login-card { width: 360px; }
.login-brand { display:flex; flex-direction:column; align-items:center; gap:8px; margin-bottom:20px; }
.login-logo { width:64px; height:64px; object-fit:contain; }
.login-brand h2 { margin:0; }
.hint { margin-top:8px; color:#666; font-size:12px; }
</style>
