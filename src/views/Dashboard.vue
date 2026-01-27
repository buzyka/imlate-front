<template>
  <div class="grid gap">
    <h2 style="margin-bottom: 20px;">Hello, Svetlana! 👋</h2>

    <!-- Quick Stats -->
<el-card>
  <template #header><b>Quick Stats</b></template>

  <div class="stats">

    <!-- All users -->
    <div
      class="stat clickable"
      :class="{ active: statusFilter === null }"
      @click="statusFilter = null"
    >
      <div class="stat-line">
        <span class="kpi">{{ users.length }}</span>
        <span class="label">
          All Users
          <span v-if="statusFilter === null" class="check">✓</span>
        </span>
      </div>
    </div>

    <!-- Signed in -->
    <div
      class="stat clickable"
      :class="{ active: statusFilter === 'signedIn' }"
      @click="statusFilter = 'signedIn'"
    >
      <div class="stat-line">
        <span class="kpi">{{ SignedIN }}</span>
        <span class="label">
          Signed in
          <span v-if="statusFilter === 'signedIn'" class="check">✓</span>
        </span>
      </div>
    </div>

    <!-- Signed out -->
    <div
      class="stat clickable"
      :class="{ active: statusFilter === 'signedOut' }"
      @click="statusFilter = 'signedOut'"
    >
      <div class="stat-line">
        <span class="kpi">{{ SignedOut }}</span>
        <span class="label">
          Signed out
          <span v-if="statusFilter === 'signedOut'" class="check">✓</span>
        </span>
      </div>
    </div>

    <!-- Not signed -->
    <div
      class="stat clickable"
      :class="{ active: statusFilter === 'notSigned' }"
      @click="statusFilter = 'notSigned'"
    >
      <div class="stat-line">
        <span class="kpi">{{ NotSigned }}</span>
        <span class="label">
          Not signed in
          <span v-if="statusFilter === 'notSigned'" class="check">✓</span>
        </span>
      </div>
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

.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 12px;
}

.stat {
  color: #4a5568;          /* благородный тёмно-серый  текста. */
  font-weight: 500;

  padding: 14px;
  border-radius: 18px;                 /* мягкие углы */
  cursor: pointer;
  background: #f7f9fc;                 /* очень светлый фон */
  transition: all 0.25s ease;
  border: 1px solid transparent;

    transition:
    background 0.25s ease,
    box-shadow 0.25s ease,
    border-color 0.25s ease,
    transform 0.12s ease;   /* для клика */
}
.stat:hover {
background: #eef3f8;
}

.stat:active {
transform: scale(0.97);  /* лёгкое нажатие */
}



/* active (выбранный фильтр) */
.stat.active {
  background: linear-gradient(135deg, #eef5ff, #f8fbff);
  border-color: #dbe7f7;
  box-shadow: 0 6px 18px rgba(40, 80, 140, 0.12);
  color: #334e68;          /* холодный slate-blue */
}




.stat.active .kpi {
  color: #1f3a5f;          /* «дорогой» тёмно-синий */
}

.kpi {
  font-size: 18px;
  font-weight: 600;
  color: #2d3748;          /* глубокий графит */
}

.check {
  margin-left: 6px;
  color: #3b82c4;
  font-weight: 600;
}
.label {
  font-size: 14px;
  color: #6b7280;  /* мягкий серо-синий */
  margin-top: 4px;
}

.stat.active .label {
  color: #3b5b7a;
}


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

