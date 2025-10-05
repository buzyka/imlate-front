<template>
  <div class="login-wrap">
    <el-card class="login-card">
      <h2>Sign in</h2>
      <el-form :model="form" :rules="rules" ref="formRef" label-position="top">
        <el-form-item label="Email" prop="email">
          <el-input v-model="form.email" placeholder="you@example.com" />
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input v-model="form.password" type="password" placeholder="••••••••" />
        </el-form-item>
        <el-button type="primary" :loading="loading" @click="submit">Login</el-button>
      </el-form>
      <p class="hint">
        Demo: any email & password will sign you in if backend is not ready.
      </p>
    </el-card>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../stores/auth.js'

const form = reactive({ email: '', password: '' })
const rules = {
  email: [{ required: true, message: 'Email required', trigger: 'blur' }],
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
    await auth.login(form.email, form.password)
    router.push(route.query.redirect || '/')
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
.hint { margin-top:8px; color:#666; font-size:12px; }
</style>