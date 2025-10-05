<template>
  <div class="grid gap">
    <el-card>
      <template #header><b>Quick Stats</b></template>
      <div class="stats">
        <div class="stat"><div class="kpi">{{ users.length }}</div><div>Users</div></div>
        <div class="stat"><div class="kpi">{{ active }}</div><div>Active</div></div>
        <div class="stat"><div class="kpi">{{ createdThisWeek }}</div><div>New (7d)</div></div>
      </div>
    </el-card>
    <el-card>
      <template #header><b>Getting Started</b></template>
      <ol>
        <li>Edit <code>vite.config.js</code> proxy to point to your backend.</li>
        <li>Implement <code>POST /api/login</code> to return <code>{ token }</code>.</li>
        <li>Use <code>Authorization: Bearer &lt;token&gt;</code> on protected endpoints.</li>
      </ol>
    </el-card>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import api from '../services/api.js'

const users = ref([])

onMounted(async () => {
  try {
    const { data } = await api.get('/users')
    users.value = data
  } catch (e) {
    // fallback demo data
    users.value = [
      { id: 1, name: 'Alice', email: 'alice@example.com', active: true, createdAt: new Date().toISOString() },
      { id: 2, name: 'Bob', email: 'bob@example.com', active: false, createdAt: new Date(Date.now()-86400000*3).toISOString() }
    ]
  }
})

const active = computed(() => users.value.filter(u => u.active).length)
const createdThisWeek = computed(() => {
  const weekAgo = Date.now() - 7*86400000
  return users.value.filter(u => new Date(u.createdAt).getTime() >= weekAgo).length
})
</script>

<style scoped>
.grid { display:grid; grid-template-columns: 1fr; gap: 16px; }
.stats { display:flex; gap:24px; }
.stat { text-align:center; }
.kpi { font-size:32px; font-weight:800; line-height:1; }
</style>