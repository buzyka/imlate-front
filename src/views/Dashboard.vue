<template>
  <div class="grid gap">
    <h2 style="margin-bottom: 20px;">Привет, Светлана! 👋</h2>

    <!-- Quick Stats -->
    <el-card>
      
      <template #header><b>Quick Stats</b></template>
      <div class="stats">

        <div
         class="stat clickable" 
         :class="{ active: statusFilter === null }"
         @click="statusFilter = null"
        >
          <div class="kpi">{{ users.length }}</div>
          <div>Users
            <span v-if="statusFilter === null" class="check">✓</span>
          </div>
        </div>

        <div
         class="stat clickable" 
         :class="{ active: statusFilter === 'signedIn' }"
         @click="statusFilter  = 'signedIn'"
        >
          <div class="kpi">{{ SignedIN }}</div>
          <div>Signed in 
          <span v-if="statusFilter === 'signedIn'" class="check">✓</span></div>
        </div>
        
        <div 
        class="stat clickable" 
        :class="{ active: statusFilter === 'signedOut' }"
        @click="statusFilter  = 'signedOut'"
          >
          <div class="kpi">{{ SignedOut}}</div>
          <div>Signed out 
          <span v-if="statusFilter === 'signedOut'" class="check">✓</span></div>
        </div>

        <div 
        class="stat clickable" 
        :class="{ active: statusFilter === 'notSigned' }"
        @click="statusFilter  = 'notSigned'"
      >
          <div class="kpi">{{ NotSigned}}</div>
          <div>Not Signed in 
          <span v-if="statusFilter === 'notSigned'" class="check">✓</span></div>
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
    {id:10,name:"Tom",SurName:"Forkar", last_act_time:"13/01/2026 10:53:37",active:"false"},
  ]
  }
})

// подсчёт пользователей
const SignedIN = computed(() =>
  users.value.filter(u => u.active === 'true').length
)

const SignedOut = computed(() =>
  users.value.filter(u => u.active === 'false').length
)

const NotSigned = computed(() =>
  users.value.filter(u => u.active === 'Not signed in').length
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

  // 1️⃣ фильтр по статусу
  if (statusFilter.value === 'signedIn') {
    result = result.filter(u => u.active === 'true')
  }

  if (statusFilter.value === 'signedOut') {
    result = result.filter(u => u.active === 'false')
  }

  if (statusFilter.value === 'notSigned') {
    result = result.filter(u => u.active === 'Not signed in')
  }

  // 2️⃣ поиск
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
.stat { text-align:center;

  padding:16px; border-radius:8px;
  cursor: pointer;
  background: #f5f7fa;
  box-shadow: 0 2px 8px #00000011;
  transition: background 0.3s, box-shadow 0.3s;
}
.stat:hover {
  background: #f0f2f5;  
}

.stat.active {
  background: #d0e6ff; 
  color: #0d3a66;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); 
}

.stat.active .kpi {
   color: #0d3a66;   
}

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