<template>
  <div >
    <el-card class="login-card" style="width: 400px; margin: 100px auto;">
      <div class="login-brand">
        <img src="../assets/logo.png" alt="ImLate" class="login-logo" />
        <h2 style="text-align: center; margin-bottom: 20px;" >ImLate Control Panel</h2>
      </div>
      <el-form :model="form" :rules="rules" ref="formRef" label-position="top">
        <el-form-item label="Username" prop="username">
          <el-input v-model="form.username" placeholder="admin" />
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input v-model="form.password" type="password" placeholder="••••••••" @keyup.enter="submit"/>
        </el-form-item>
        <el-form-item> 
          <el-button type="primary" :loading="loading" style="width: 100%;" @click="submit">Login</el-button>
        </el-form-item>
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
// Router и store
const router = useRouter()
const route = useRoute()
const auth = useAuthStore()

// Submit function
const submit = async () => {
  await formRef.value.validate()
  loading.value = true
  try {
    await auth.login(form.username, form.password)
    router.push(route.query.redirect || '/')
  } catch (error) {
    console.error(error)
    ElMessage.error(error.message || 'Login failed')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>

.login-card { padding: 30px; }
.login-brand { display:flex; flex-direction:column; align-items:center; gap:8px; margin-bottom:20px; }
.login-logo { width:64px; height:64px; object-fit:contain; }
.login-brand h2 { margin:0; }
.hint { margin-top:8px; color:#666; font-size:12px; }
</style>
