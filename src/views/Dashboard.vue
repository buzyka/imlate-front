<template>
  <div class="grid gap">
    <h2 style="margin-bottom: 20px;">Привет, Светлана! 👋</h2>

    <!-- Quick Stats -->
    <el-card>
      <template #header><b>Quick Stats</b></template>
      <div class="stats">

        <div class="stat clickable" @click="statusFilter = null">
          <div class="kpi">{{ users.length }}</div>
          <div>Users
            <span v-if="statusFilter === null" class="check">✓</span>
          </div>
        </div>

        <div class="stat clickable" @click="statusFilter  = 'true'">
          <div class="kpi">{{ activeCount }}</div>
          <div>Active 
          <span v-if="statusFilter === 'true'" class="check">✓</span></div>
        </div>

        <div class="stat">
          <div class="kpi">{{ createdThisWeek }}</div>
          <div>New (7d)</div>
        </div>
      </div>
    </el-card>

    <!-- Search -->
    <el-input
      v-model="q"
      placeholder="Search by name or surname"
      clearable
      class="grid"
    />

    <!-- Users Table -->
    <el-table
      :data="filteredUsers"
      border
      highlight-current-row
      :row-class-name="rowClassName"
    >
      <el-table-column prop="id" label="ID" width="70" sortable />
      <el-table-column prop="name" label="Name" width="150" sortable   />
      <el-table-column prop="SurName" label="SurName" sortable />
      <el-table-column prop="last_act_time" label="Last Act Time" width="150" sortable/>

      <el-table-column label="Status" width="120"  sortable :sort-method="sortByStatus" >
        <template #default="scope" >
          <el-tag
            v-if="scope.row.active === 'true'"
            type="success"
          >Signed in</el-tag>

          <el-tag
            v-else-if="scope.row.active === 'false'"
            type="warning"
          >Signed out</el-tag>

          <el-tag
            v-else
            type="info"
          >Not signed in</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const users = ref([])
const q = ref('')
const statusFilter = ref(null)

onMounted(async () => {
  try {
    const { data } = await api.get('/users')
    users.value = data
  } catch (e) {
    // fallback demo data
  users.value = [
    {id:1,name:"Alice",SurName:"Forest", last_act_time:"13/01/2026 12:53:37",active:"true"},
    {id:2,name:"Bob",SurName:"Smith", last_act_time:"12/01/2026 11:45:22",active:"Not signed in"},
    {id:3,name:"Alex",SurName:"Forest", last_act_time:"13/01/2026 11:53:37",active:"true"},
    {id:4,name:"Jon",SurName:"Gaarest", last_act_time:"13/01/2026 12:03:37",active:"true"},
    {id:5,name:"Sam",SurName:"Borest", last_act_time:"13/01/2026 12:00:37",active:"false"},
    {id:6,name:"Nik",SurName:"Garest", last_act_time:"13/01/2026 12:53:37",active:"Not signed in"},
    {id:7,name:"Victor",SurName:"Farest", last_act_time:"13/01/2026 10:53:37",active:"true"},
    {id:8,name:"Veronika",SurName:"Vetost", last_act_time:"13/01/2026 12:00:37",active:"false"},
    {id:9,name:"Jak",SurName:"Forkar", last_act_time:"13/01/2026 10:53:37",active:"true"},
  ]
  }
})

// подсчёт активных пользователей
const activeCount = computed(() =>
  users.value.filter(u => u.active === 'true').length
)

// поиск
const filtered = computed(() => {
  const query = q.value.trim().toLowerCase()
  if (!query) return users.value
  return users.value.filter(u =>
    ((u.name ?? '') + ' ' + (u.SurName ?? '')).toLowerCase().includes(query)
  )
})

// фильтр по статусу
const filteredUsers = computed(() => {
  let result = users.value

  // фильтр по статусу
  if (statusFilter.value) {
    result = result.filter(u => u.active === statusFilter.value)
  }

  // поиск
  const query = q.value.trim().toLowerCase()
  if (query) {
    result = result.filter(u =>
      ((u.name ?? '') + ' ' + (u.SurName ?? ''))
        .toLowerCase()
        .includes(query)
    )
  }

  return result
})

// row-class-name для подсветки
const rowClassName = ({ row }) => {
  switch(row.active) {
    case 'true': return 'signed-in-row'
    case 'false': return 'signed-out-row'
    default: return 'not-signed-in-row'
  }
}

// Пример для новых пользователей за 7 дней
const createdThisWeek = computed(() => {
  const weekAgo = Date.now() - 7*86400000
  return users.value.filter(u => {
    const createdAt = u.createdAt ? new Date(u.createdAt).getTime() : Date.now()
    return createdAt >= weekAgo
  }).length
})

//сортирует строки по статусу в логическом порядке
const sortByStatus = (a, b) => {
  const order = { 'true': 1, 'false': 2, 'Not signed in': 3 }

  const aValue = order[a.active] || 4
  const bValue = order[b.active] || 4
 
  return aValue - bValue
}

</script>
<style scoped>
.grid { display:grid; grid-template-columns: 1fr; gap:16px; margin-bottom:12px; }
.stats { display:flex; gap:24px; }
.stat { text-align:center; }
.kpi { font-size:22px; font-weight:800; line-height:1; }

/* Подсветка строк по статусу */
.signed-in-row {
  background-color: #e0f0ff !important; /* светло-синий */
}
.signed-out-row {
  background-color: #f0f0f0 !important; /* светло-серый */
}
.not-signed-in-row {
  background-color: #fff4e0 !important; /* светло-оранжевый */
}

/* Плавный переход */
.el-table .el-table__row {
  transition: background-color 0.3s;
}

</style> 