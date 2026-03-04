<template>
  <div class="grid gap">

    <!-- ADMIN USERS TABLE -->
    <el-card>
      <template #header><b>Admin Users</b></template>

      <el-input
        v-model="q"
        placeholder="Search by name, surname or username"
        clearable
        class="mb-2"
      />

      <el-table
        :data="filtered"
        border
        highlight-current-row
        @current-change="selectRow"
      >
        <el-table-column prop="username" label="Username" width="140" />
        <el-table-column prop="name" label="Name" width="140" />
        <el-table-column prop="surname" label="Surname" width="140" />
        <el-table-column prop="role" label="Role" width="100">
          <template #default="scope">
            <el-tag :type="scope.row.role === 'admin' ? '' : 'info'" size="small">
              {{ scope.row.role }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="Active" width="80">
          <template #default="scope">
            <el-tag v-if="scope.row.is_active" type="success" size="small">Yes</el-tag>
            <el-tag v-else type="info" size="small">No</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="Created" width="160">
          <template #default="scope">
            {{ formatDate(scope.row.created_at) }}
          </template>
        </el-table-column>
        <el-table-column label="Updated" width="160">
          <template #default="scope">
            {{ formatDate(scope.row.updated_at) }}
          </template>
        </el-table-column>
        <el-table-column label="Actions" width="100">
          <template #default="scope">
            <el-button
              size="small"
              type="danger"
              :icon="Delete"
              @click.stop="confirmDelete(scope.row)"
            />
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- CREATE / EDIT FORM -->
    <el-card>
      <template #header><b>{{ form.id ? 'Edit User' : 'Create User' }}</b></template>

      <el-form
        ref="formRef"
        :model="form"
        :rules="formRules"
        label-position="left"
        label-width="120px"
      >
        <el-form-item label="Username" prop="username">
          <el-input v-model="form.username" :disabled="!!form.id" />
        </el-form-item>

        <el-form-item v-if="!form.id" label="Password" prop="password">
          <el-input v-model="form.password" type="password" show-password />
        </el-form-item>

        <el-form-item label="Name" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>

        <el-form-item label="Surname" prop="surname">
          <el-input v-model="form.surname" />
        </el-form-item>

        <el-form-item label="Role" prop="role">
          <el-select v-model="form.role" style="width:100%">
            <el-option label="Admin" value="admin" />
            <el-option label="Terminal" value="terminal" />
          </el-select>
        </el-form-item>

        <el-form-item label="Active">
          <el-switch v-model="form.is_active" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" :loading="saving" @click="save">
            {{ form.id ? 'Update' : 'Create' }}
          </el-button>
          <el-button @click="reset">Reset</el-button>
        </el-form-item>
      </el-form>

      <!-- CHANGE PASSWORD (only in edit mode) -->
      <template v-if="form.id">
        <el-divider />

        <el-button
          v-if="!showPasswordForm"
          type="warning"
          @click="showPasswordForm = true"
        >
          Change Password
        </el-button>

        <template v-if="showPasswordForm">
          <h4 style="margin-bottom:12px">Change Password for {{ form.username }}</h4>
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
              <el-button type="primary" :loading="savingPassword" @click="savePassword">
                Save Password
              </el-button>
              <el-button @click="cancelPasswordChange">Cancel</el-button>
            </el-form-item>
          </el-form>
        </template>
      </template>
    </el-card>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { Delete } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import api from '../services/api.js'

/* STATE */
const users = ref([])
const q = ref('')
const saving = ref(false)
const formRef = ref(null)

/* FORM */
const emptyForm = () => ({
  id: null,
  username: '',
  password: '',
  name: '',
  surname: '',
  role: 'admin',
  is_active: true
})
const form = ref(emptyForm())

/* FORM RULES */
const formRules = {
  username: [{ required: true, message: 'Username is required', trigger: 'blur' }],
  password: [
    { required: true, message: 'Password is required', trigger: 'blur' },
    { min: 6, message: 'Password must be at least 6 characters', trigger: 'blur' }
  ],
  name: [{ required: true, message: 'Name is required', trigger: 'blur' }],
  surname: [{ required: true, message: 'Surname is required', trigger: 'blur' }],
  role: [{ required: true, message: 'Role is required', trigger: 'change' }]
}

/* SEARCH */
const filtered = computed(() => {
  if (!q.value) return users.value
  const search = q.value.toLowerCase()
  return users.value.filter(u =>
    (u.username + u.name + u.surname).toLowerCase().includes(search)
  )
})

/* LOAD */
onMounted(refresh)
async function refresh() {
  try {
    const { data } = await api.get('/users')
    users.value = data
  } catch {
    ElMessage.error('Failed to load users')
  }
}

/* FORMAT DATE */
function formatDate(str) {
  if (!str) return ''
  return new Date(str).toLocaleString()
}

/* ROW SELECT → EDIT */
function selectRow(row) {
  if (!row) return
  form.value = {
    id: row.id,
    username: row.username,
    password: '',
    name: row.name,
    surname: row.surname,
    role: row.role,
    is_active: row.is_active
  }
  showPasswordForm.value = false
  resetPasswordForm()
}

/* SAVE (CREATE / UPDATE) */
async function save() {
  if (!formRef.value) return
  try {
    await formRef.value.validate()
  } catch { return }

  saving.value = true
  try {
    if (form.value.id) {
      // UPDATE
      const { data } = await api.put(`/users/${form.value.id}`, {
        name: form.value.name,
        surname: form.value.surname,
        role: form.value.role,
        is_active: form.value.is_active
      })
      const idx = users.value.findIndex(u => u.id === form.value.id)
      if (idx >= 0) users.value.splice(idx, 1, data)
      ElMessage.success('User updated')
    } else {
      // CREATE
      const { data } = await api.post('/users', {
        username: form.value.username,
        password: form.value.password,
        name: form.value.name,
        surname: form.value.surname,
        role: form.value.role
      })
      users.value.push(data)
      ElMessage.success('User created')
    }
    reset()
  } catch (err) {
    ElMessage.error(err.response?.data?.message || 'Failed to save user')
  } finally {
    saving.value = false
  }
}

/* RESET */
function reset() {
  form.value = emptyForm()
  formRef.value?.resetFields()
  showPasswordForm.value = false
  resetPasswordForm()
}

/* DELETE */
async function confirmDelete(row) {
  try {
    await ElMessageBox.confirm(
      `Delete user "${row.username}"? This cannot be undone.`,
      'Confirm Delete',
      { confirmButtonText: 'Delete', cancelButtonText: 'Cancel', type: 'warning' }
    )
  } catch { return }

  try {
    await api.delete(`/users/${row.id}`)
    users.value = users.value.filter(u => u.id !== row.id)
    if (form.value.id === row.id) reset()
    ElMessage.success('User deleted')
  } catch (err) {
    ElMessage.error(err.response?.data?.message || 'Failed to delete user')
  }
}

/* ── CHANGE PASSWORD ── */
const showPasswordForm = ref(false)
const savingPassword = ref(false)
const passwordFormRef = ref(null)
const passwordForm = ref({ password: '', confirmPassword: '' })

const validateStrength = (_rule, value, callback) => {
  if (!value) return callback(new Error('Password is required'))
  if (value.length < 8) return callback(new Error('At least 8 characters'))
  if (!/[a-z]/.test(value)) return callback(new Error('Must contain a lowercase letter'))
  if (!/[A-Z]/.test(value)) return callback(new Error('Must contain an uppercase letter'))
  if (!/[0-9]/.test(value)) return callback(new Error('Must contain a digit'))
  callback()
}

const validateConfirm = (_rule, value, callback) => {
  if (!value) return callback(new Error('Please confirm your password'))
  if (value !== passwordForm.value.password) return callback(new Error('Passwords do not match'))
  callback()
}

const passwordRules = {
  password: [
    { required: true, message: 'Password is required', trigger: 'blur' },
    { validator: validateStrength, trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: 'Please confirm', trigger: 'blur' },
    { validator: validateConfirm, trigger: 'blur' }
  ]
}

async function savePassword() {
  if (!passwordFormRef.value) return
  try { await passwordFormRef.value.validate() } catch { return }

  savingPassword.value = true
  try {
    await api.put(`/users/${form.value.id}/password`, {
      password: passwordForm.value.password
    })
    ElMessage.success('Password updated successfully')
    cancelPasswordChange()
  } catch (err) {
    ElMessage.error(err.response?.data?.message || 'Failed to update password')
  } finally {
    savingPassword.value = false
  }
}

function cancelPasswordChange() {
  showPasswordForm.value = false
  resetPasswordForm()
}

function resetPasswordForm() {
  passwordForm.value = { password: '', confirmPassword: '' }
  passwordFormRef.value?.resetFields()
}
</script>

<style scoped>
.grid { display: grid; grid-template-columns: 1fr 400px; gap: 16px; }
.mb-2 { margin-bottom: 12px; }
@media (max-width: 900px) { .grid { grid-template-columns: 1fr; } }
</style>
