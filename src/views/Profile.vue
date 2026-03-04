<template>
  <div class="profile-container">
    <!-- PROFILE DETAILS -->
    <el-card>
      <template #header><b>My Profile</b></template>

      <el-form
        label-position="left"
        label-width="120px"
      >
        <el-form-item label="Username">
          <el-input :model-value="auth.user?.username" disabled />
        </el-form-item>

        <el-form-item label="Name">
          <el-input :model-value="auth.user?.name" disabled />
        </el-form-item>

        <el-form-item label="Surname">
          <el-input :model-value="auth.user?.surname" disabled />
        </el-form-item>

        <el-form-item label="Role">
          <el-input :model-value="auth.user?.role" disabled />
        </el-form-item>
      </el-form>
    </el-card>

    <!-- CHANGE PASSWORD -->
    <el-card>
      <template #header><b>Security</b></template>

      <el-button
        v-if="!showPasswordForm"
        type="primary"
        @click="showPasswordForm = true"
      >
        Change Password
      </el-button>

      <template v-if="showPasswordForm">
        <el-form
          ref="passwordFormRef"
          :model="passwordForm"
          :rules="passwordRules"
          label-position="left"
          label-width="160px"
        >
          <el-form-item label="New Password" prop="password">
            <el-input
              v-model="passwordForm.password"
              type="password"
              show-password
              placeholder="Enter new password"
            />
          </el-form-item>

          <el-form-item label="Confirm Password" prop="confirmPassword">
            <el-input
              v-model="passwordForm.confirmPassword"
              type="password"
              show-password
              placeholder="Confirm new password"
            />
          </el-form-item>

          <el-form-item>
            <el-button
              type="primary"
              :loading="saving"
              @click="savePassword"
            >
              Save
            </el-button>
            <el-button @click="cancelPasswordChange">Cancel</el-button>
          </el-form-item>
        </el-form>
      </template>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { useAuthStore } from '../stores/auth.js'
import api from '../services/api.js'

const auth = useAuthStore()

/* PASSWORD FORM */
const showPasswordForm = ref(false)
const saving = ref(false)
const passwordFormRef = ref(null)

const passwordForm = reactive({
  password: '',
  confirmPassword: ''
})

/* VALIDATION RULES */
const validatePasswordStrength = (_rule, value, callback) => {
  if (!value) {
    return callback(new Error('Password is required'))
  }
  if (value.length < 8) {
    return callback(new Error('Password must be at least 8 characters'))
  }
  if (!/[a-z]/.test(value)) {
    return callback(new Error('Password must contain at least one lowercase letter'))
  }
  if (!/[A-Z]/.test(value)) {
    return callback(new Error('Password must contain at least one uppercase letter'))
  }
  if (!/[0-9]/.test(value)) {
    return callback(new Error('Password must contain at least one digit'))
  }
  callback()
}

const validateConfirmPassword = (_rule, value, callback) => {
  if (!value) {
    return callback(new Error('Please confirm your password'))
  }
  if (value !== passwordForm.password) {
    return callback(new Error('Passwords do not match'))
  }
  callback()
}

const passwordRules = {
  password: [
    { required: true, message: 'Password is required', trigger: 'blur' },
    { validator: validatePasswordStrength, trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: 'Please confirm your password', trigger: 'blur' },
    { validator: validateConfirmPassword, trigger: 'blur' }
  ]
}

/* SAVE PASSWORD */
async function savePassword() {
  if (!passwordFormRef.value) return

  try {
    await passwordFormRef.value.validate()
  } catch {
    return
  }

  saving.value = true
  try {
    await api.put(`/users/${auth.user.id}/password`, {
      password: passwordForm.password
    })
    ElMessage.success('Password updated successfully')
    resetPasswordForm()
  } catch (err) {
    const msg = err.response?.data?.message || 'Failed to update password'
    ElMessage.error(msg)
  } finally {
    saving.value = false
  }
}

/* CANCEL / RESET */
function cancelPasswordChange() {
  resetPasswordForm()
}

function resetPasswordForm() {
  showPasswordForm.value = false
  passwordForm.password = ''
  passwordForm.confirmPassword = ''
  passwordFormRef.value?.resetFields()
}
</script>

<style scoped>
.profile-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  max-width: 560px;
}
</style>
