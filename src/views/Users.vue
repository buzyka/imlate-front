<template>
  <div class="grid gap">
    <el-card>
      <template #header><b>Users</b></template>
      <el-input
        v-model="q"
        placeholder="Search by name or email"
        clearable
        class="mb-2"
      />
      <el-table :data="filtered" border style="width: 100%">
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="name" label="Name" />
        <el-table-column prop="email" label="Email" />
        <el-table-column prop="active" label="Active" width="100">
          <template #default="scope">
            <el-tag v-if="scope.row.active">Yes</el-tag>
            <el-tag type="info" v-else>No</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="Actions" width="160">
          <template #default="scope">
            <el-button size="small" @click="edit(scope.row)">Edit</el-button>
            <el-button size="small" type="danger" @click="remove(scope.row.id)">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-card>
      <template #header><b>Create / Edit User</b></template>
      <el-form :model="form" label-position="top">
        <el-form-item label="Name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="Email">
          <el-input v-model="form.email" />
        </el-form-item>
        <el-form-item label="Active">
          <el-switch v-model="form.active" />
        </el-form-item>
        <div class="flex gap">
          <el-button type="primary" @click="save">{{ form.id ? 'Update' : 'Create' }}</el-button>
          <el-button @click="reset">Reset</el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import api from '../services/api.js'

const q = ref('')
const users = ref([])
const form = ref({ id: null, name: '', email: '', active: true })

const filtered = computed(() => {
  if (!q.value) return users.value
  const s = q.value.toLowerCase()
  return users.value.filter(u => (u.name+u.email).toLowerCase().includes(s))
})

onMounted(async () => {
  await refresh()
})

async function refresh() {
  try {
    const { data } = await api.get('/users')
    users.value = data
  } catch {
    // demo data if backend missing
    users.value = users.value.length ? users.value : [
      { id: 1, name: 'Alice', email: 'alice@example.com', active: true },
      { id: 2, name: 'Bob', email: 'bob@example.com', active: false }
    ]
  }
}

function edit(row) {
  form.value = { ...row }
}

async function save() {
  if (form.value.id) {
    // update
    try {
      const { data } = await api.put(`/users/${form.value.id}`, form.value)
      const idx = users.value.findIndex(u => u.id === data.id)
      if (idx >= 0) users.value[idx] = data
    } catch {
      // demo update
      const idx = users.value.findIndex(u => u.id === form.value.id)
      if (idx >= 0) users.value[idx] = { ...form.value }
    }
  } else {
    // create
    try {
      const { data } = await api.post('/users', form.value)
      users.value.push(data)
    } catch {
      // demo create
      const newId = users.value.length ? Math.max(...users.value.map(u => u.id)) + 1 : 1
      users.value.push({ ...form.value, id: newId })
    }
  }
  reset()
}

async function remove(id) {
  try {
    await api.delete(`/users/${id}`)
    users.value = users.value.filter(u => u.id !== id)
  } catch {
    users.value = users.value.filter(u => u.id !== id)
  }
}

function reset() {
  form.value = { id: null, name: '', email: '', active: true }
}
</script>

<style scoped>
.grid { display:grid; grid-template-columns: 1fr 360px; gap: 16px; }
.flex { display:flex; align-items:center; gap: 8px; }
.mb-2 { margin-bottom: 12px; }
@media (max-width: 900px) {
  .grid { grid-template-columns: 1fr; }
}
</style>