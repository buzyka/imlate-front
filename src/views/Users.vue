<template>
  <div class="grid gap">

    <!-- VISITORS TABLE -->
    <el-card>
      <template #header><b>Visitors</b></template>

      <el-row :gutter="16" class="mb-2">
        <el-col :span="8">
          <el-input
            v-model="q"
            placeholder="Search by name or surname"
            clearable
          />
        </el-col>
        <el-col :span="8">
          <el-input
            v-model="qName"
            placeholder="Search by name"
            clearable
          />
        </el-col>
        <el-col :span="8">
          <el-input
            v-model="qGrade"
            placeholder="Search by grade"
            clearable
          />
        </el-col>
      </el-row>

      <el-table
        v-loading="loading"
        :data="filtered"
        border
        highlight-current-row
        @current-change="selectRow"
      >
        <el-table-column label="" width="60">
          <template #default="scope">
            <el-image
              :src="scope.row.image ? imageUrl(scope.row.image) : noImageSrc"
              style="width:40px;height:40px;border-radius:50%"
              fit="cover"
            />
          </template>
        </el-table-column>

        <el-table-column prop="id" label="ID" width="70" />
        <el-table-column prop="name" label="Name" width="140" />
        <el-table-column prop="surname" label="Surname" width="140" />

        <el-table-column label="RFID Count" width="110">
          <template #default="scope">
            {{ (scope.row.keys || []).length }}
          </template>
        </el-table-column>

        <el-table-column label="Student" width="90">
          <template #default="scope">
            <el-tag v-if="scope.row.is_student" type="success" size="small">Yes</el-tag>
            <el-tag v-else type="info" size="small">No</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="Grade" width="80">
          <template #default="scope">
            {{ scope.row.is_student ? scope.row.grade : '' }}
          </template>
        </el-table-column>

        <el-table-column label="Updated" width="160">
          <template #default="scope">
            {{ formatDate(scope.row.updated_at) }}
          </template>
        </el-table-column>

        <el-table-column label="" width="60" align="center">
          <template #default="scope">
            <el-button
              size="small"
              type="danger"
              :icon="Delete"
              circle
              @click.stop="deleteVisitor(scope.row)"
            />
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- CREATE / EDIT FORM -->
    <el-card v-loading="formBusy">
      <template #header><b>{{ form.id ? 'Edit Visitor' : 'Create Visitor' }}</b></template>

      <el-image
        :src="imagePreview || (form.image ? imageUrl(form.image) : noImageSrc)"
        style="width:120px;height:120px;border-radius:50%;margin-bottom:8px"
        fit="cover"
      />

      <div v-if="form.id" style="margin-bottom:16px">
        <input
          ref="fileInputRef"
          type="file"
          accept="image/*"
          style="display:none"
          @change="onFileSelected"
        />
        <el-button size="small" @click="fileInputRef?.click()">
          Choose Image
        </el-button>
        <el-button
          v-if="selectedFile"
          size="small"
          type="primary"
          :loading="uploading"
          @click="uploadImage"
        >
          Upload
        </el-button>
        <span v-if="selectedFile" style="margin-left:8px;font-size:12px;color:#666">
          {{ selectedFile.name }}
        </span>
      </div>

      <el-form
        ref="formRef"
        :model="form"
        :rules="formRules"
        label-position="left"
        label-width="120px"
      >
        <el-form-item label="Name" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>

        <el-form-item label="Surname" prop="surname">
          <el-input v-model="form.surname" />
        </el-form-item>

        <el-form-item label="Is Student">
          <el-switch v-model="form.is_student" />
        </el-form-item>

        <el-form-item v-if="form.is_student" label="Grade">
          <el-input-number v-model="form.grade" :min="0" controls-position="right" style="width:100%" />
        </el-form-item>

        <template v-if="form.id">
          <el-form-item label="RFID Add">
            <el-row :gutter="8" style="width:100%">
              <el-col :span="16">
                <el-input v-model="newKey" :disabled="addingKey" @keyup.enter="addKey" />
              </el-col>
              <el-col :span="8">
                <el-button type="primary" style="width:100%" :loading="addingKey" @click="addKey">
                  Add
                </el-button>
              </el-col>
            </el-row>
          </el-form-item>

          <el-table
            v-if="form.keys.length"
            v-loading="keyLoading"
            :data="form.keys"
            border
            class="mb-2"
          >
            <el-table-column label="RFID">
              <template #default="scope">{{ scope.row }}</template>
            </el-table-column>
            <el-table-column width="70">
              <template #default="scope">
                <el-button
                  size="small"
                  type="danger"
                  @click="removeKey(scope.row)"
                >
                  X
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>

        <el-form-item>
          <el-button type="primary" :loading="saving" @click="save">
            {{ form.id ? 'Update' : 'Create' }}
          </el-button>
          <el-button @click="reset">Reset</el-button>
        </el-form-item>
      </el-form>
    </el-card>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Delete } from '@element-plus/icons-vue'
import api from '../services/api.js'

/* STATE */
const visitors = ref([])
const q = ref('')
const qName = ref('')
const qGrade = ref('')
const loading = ref(false)
const saving = ref(false)
const uploading = ref(false)
const addingKey = ref(false)
const keyLoading = ref(false)
const formBusy = computed(() => uploading.value || addingKey.value || keyLoading.value)
const formRef = ref(null)
const fileInputRef = ref(null)
const selectedFile = ref(null)
const imagePreview = ref(null)

/* FORM */
const emptyForm = () => ({
  id: null,
  name: '',
  surname: '',
  is_student: false,
  grade: 0,
  keys: [],
  image: ''
})
const form = ref(emptyForm())
const newKey = ref('')

/* FORM RULES */
const formRules = {
  name: [{ required: true, message: 'Name is required', trigger: 'blur' }],
  surname: [{ required: true, message: 'Surname is required', trigger: 'blur' }]
}

/* SEARCH */
const filtered = computed(() => {
  let list = visitors.value

  if (qName.value) {
    const s = qName.value.toLowerCase()
    list = list.filter(v => v.name.toLowerCase().includes(s) || v.surname.toLowerCase().includes(s))
  }

  if (qGrade.value) {
    const s = qGrade.value.toLowerCase()
    list = list.filter(v => String(v.grade).toLowerCase().includes(s))
  }

  if (q.value) {
    const searchWords = q.value
      .toLowerCase()
      .split(' ')
      .map(w => w.replace(/\s+/g, ''))
      .filter(Boolean)

    list = list.filter(v => {
      const searchString = (v.name + v.surname + v.grade).toLowerCase().replace(/\s+/g, '')
      return searchWords.every(word => searchString.includes(word))
    })
  }

  return list
})

/* IMAGE URL — resolve relative paths to backend */
const BACKEND_BASE = import.meta.env.VITE_BACKEND_URL || 'https://app.isb.orb.local'
function imageUrl(path) {
  if (!path) return ''
  if (path.startsWith('http')) return path
  return BACKEND_BASE + path
}

/* NO-IMAGE PLACEHOLDER (inline SVG data URI) */
const noImageSrc = 'data:image/svg+xml,' + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80">' +
  '<rect width="80" height="80" fill="#e0e0e0" rx="40"/>' +
  '<text x="40" y="46" text-anchor="middle" fill="#999" font-size="11" font-family="sans-serif">No image</text>' +
  '</svg>'
)

/* FORMAT DATE */
function formatDate(str) {
  if (!str || str.startsWith('0001')) return ''
  return new Date(str).toLocaleString()
}

/* LOAD VISITORS */
onMounted(refresh)
async function refresh() {
  loading.value = true
  try {
    const { data } = await api.get('/visitors')
    visitors.value = data
  } catch {
    ElMessage.error('Failed to load visitors')
  } finally {
    loading.value = false
  }
}

/* ROW SELECT → EDIT */
function selectRow(row) {
  if (!row) return
  clearFileSelection()
  form.value = {
    id: row.id,
    name: row.name,
    surname: row.surname,
    is_student: row.is_student,
    grade: row.grade || 0,
    keys: [...(row.keys || [])],
    image: row.image || ''
  }
}

/* KEY ADD / REMOVE (via API) */
async function addKey() {
  const key = newKey.value.trim()
  if (!key || !form.value.id) return

  addingKey.value = true
  try {
    await api.post(`/visitors/${form.value.id}/key`, { key })
    ElMessage.success('RFID added')
    newKey.value = ''
    form.value.keys.push(key)
    await refresh()
  } catch (err) {
    ElMessage.error(err.response?.data?.error || err.response?.data?.message || 'Failed to add RFID')
  } finally {
    addingKey.value = false
  }
}

async function removeKey(key) {
  if (!form.value.id) return

  keyLoading.value = true
  try {
    await api.delete(`/visitors/${form.value.id}/key/${encodeURIComponent(key)}`)
    ElMessage.success('RFID removed')
    form.value.keys = form.value.keys.filter(k => k !== key)
    await refresh()
  } catch (err) {
    ElMessage.error(err.response?.data?.error || err.response?.data?.message || 'Failed to remove RFID')
  } finally {
    keyLoading.value = false
  }
}

/* SAVE (CREATE / UPDATE) */
async function save() {
  if (!formRef.value) return
  try { await formRef.value.validate() } catch { return }

  const payload = {
    name: form.value.name,
    surname: form.value.surname,
    is_student: form.value.is_student,
    grade: form.value.is_student ? form.value.grade : null
  }

  saving.value = true
  try {
    if (form.value.id) {
      await api.put(`/visitors/${form.value.id}`, payload)
      ElMessage.success('Visitor updated')
    } else {
      await api.post('/visitors', payload)
      ElMessage.success('Visitor created')
    }
    reset()
    await refresh()
  } catch (err) {
    ElMessage.error(err.response?.data?.error || err.response?.data?.message || 'Failed to save visitor')
  } finally {
    saving.value = false
  }
}

/* IMAGE UPLOAD */
function onFileSelected(e) {
  const file = e.target.files?.[0]
  if (!file) return
  selectedFile.value = file
  imagePreview.value = URL.createObjectURL(file)
}

async function uploadImage() {
  if (!selectedFile.value || !form.value.id) return

  const fd = new FormData()
  fd.append('image', selectedFile.value)

  uploading.value = true
  try {
    const { data } = await api.post(`/visitors/${form.value.id}/image`, fd, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    form.value.image = data.image
    ElMessage.success('Image uploaded')
    clearFileSelection()
    await refresh()
  } catch (err) {
    ElMessage.error(err.response?.data?.error || err.response?.data?.message || 'Failed to upload image')
  } finally {
    uploading.value = false
  }
}

function clearFileSelection() {
  selectedFile.value = null
  if (imagePreview.value) {
    URL.revokeObjectURL(imagePreview.value)
    imagePreview.value = null
  }
  if (fileInputRef.value) fileInputRef.value.value = ''
}

/* DELETE VISITOR */
async function deleteVisitor(row) {
  try {
    await ElMessageBox.confirm(
      `Delete visitor "${row.name} ${row.surname}"?`,
      'Confirm',
      { type: 'warning', confirmButtonText: 'Delete', cancelButtonText: 'Cancel' }
    )
  } catch { return }

  loading.value = true
  try {
    await api.delete(`/visitors/${row.id}`)
    ElMessage.success('Visitor deleted')
    if (form.value.id === row.id) reset()
    await refresh()
  } catch (err) {
    ElMessage.error(err.response?.data?.error || err.response?.data?.message || 'Failed to delete visitor')
    loading.value = false
  }
}

/* RESET */
function reset() {
  form.value = emptyForm()
  newKey.value = ''
  clearFileSelection()
  formRef.value?.resetFields()
}
</script>

<style scoped>
.grid { display: grid; grid-template-columns: 1fr 380px; gap: 16px; }
.mb-2 { margin-bottom: 12px; }
.qr-wrap { display: flex; flex-wrap: wrap; gap: 4px; }
@media (max-width: 900px) { .grid { grid-template-columns: 1fr; } }
</style>
