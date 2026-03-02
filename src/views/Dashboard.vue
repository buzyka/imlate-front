<template>
  <div class="page">

    <h2 class="title">Hello, Svetlana! 👋</h2>

    <el-card>
      <template #header><b>Quick Stats</b></template>


      <div class="filters">
        <!--================= STATS ================= -->
        <div class="status-group">
          <el-tag :type="statusFilter === null ? 'primary' : 'info'" effect="light" class="status-chip"
            @click="statusFilter = null">
            All Users ({{ users.length }})
          </el-tag>

          <el-tag :type="statusFilter === true ? 'primary' : 'info'" effect="light" class="status-chip"
            @click="statusFilter = true">
            Signed in ({{ signedIn }})
          </el-tag>

          <el-tag :type="statusFilter === false ? 'primary' : 'info'" effect="light" class="status-chip"
            @click="statusFilter = false">
            Signed out ({{ signedOut }})
          </el-tag>

          <el-tag :type="statusFilter === 'notSigned' ? 'primary' : 'info'" effect="light" class="status-chip"
            @click="statusFilter = 'notSigned'">
            Not signed ({{ notSigned }})
          </el-tag>
        </div>

        <!-- ================= SEARCH ================= -->
        <div class="search-group">
          <el-input v-model="q" placeholder="Search by name or surname" clearable class="search-input" />
        </div>

        <!-- ================= DATE + QUICK ================= -->
        <div class="date-group">

          <el-date-picker v-model="dateRange" type="daterange" start-placeholder="Начало" end-placeholder="Конец"
            format="DD.MM.YYYY" value-format="YYYY-MM-DD" size="small" class="date-picker" />

          <div class="quick-dates">
            <el-tag v-for="period in periods" :key="period.key" :type="activePeriod === period.key ? 'primary' : 'info'"
              class="date-chip" effect="light" @click="selectPeriod(period.key)">
              {{ period.label }}
            </el-tag>
          </div>

        </div>
      </div>
    </el-card>

    <!-- ================= TABLE ================= -->
    <el-table :data="filteredUsers" border highlight-current-row :row-class-name="rowClassName"
      style="margin-top: 20px">
      <el-table-column prop="id" label="ID" width="70" sortable />
      <el-table-column prop="name" label="Name" width="150" sortable />
      <el-table-column prop="SurName" label="SurName" sortable />
      <el-table-column prop="last_act_time" label="Last Act Time" width="170" sortable />

      <el-table-column label="Status" width="130" :sort-method="sortByStatus">
        <template #default="scope">
          <el-tag v-if="scope.row.active === true" type="success">
            Signed in
          </el-tag>
          <el-tag v-else-if="scope.row.active === false" type="warning">
            Signed out
          </el-tag>
          <el-tag v-else type="info">
            Not signed in
          </el-tag>
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
const dateRange = ref([])
const activePeriod = ref(null)

const periods = [
  { key: 'today', label: 'Сегодня' },
  { key: 'last7', label: 'Последние 7 дней' },
  { key: 'month', label: 'Этот месяц' },
  { key: 'reset', label: 'Сбросить' }
]

// ================= FORMAT DATE =================
const formatDate = (date) => {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

// ================= LOAD DATA =================
onMounted(async () => {

  const now = new Date()
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1)
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0)

  dateRange.value = [
    formatDate(firstDay),
    formatDate(lastDay)
  ]

  // demo data
  users.value = [
    { id: 1, name: "Alice", SurName: "Forest", last_act_time: "13/01/2026 12:53:37", active: true },
    { id: 2, name: "Bob", SurName: "Smith", last_act_time: "12/01/2026 11:45:22", active: null },
    { id: 3, name: "Alex", SurName: "Forest", last_act_time: "13/01/2026 11:53:37", active: true },
    { id: 4, name: "Jon", SurName: "Gaarest", last_act_time: "13/01/2026 12:03:37", active: true },
    { id: 5, name: "Sam", SurName: "Borest", last_act_time: "13/01/2026 12:00:37", active: false },
    { id: 6, name: "Nik", SurName: "Garest", last_act_time: "13/01/2026 12:53:37", active: null },
  ]
})

// ================= COUNTERS =================
const signedIn = computed(() =>
  users.value.filter(u => u.active === true).length
)

const signedOut = computed(() =>
  users.value.filter(u => u.active === false).length
)

const notSigned = computed(() =>
  users.value.filter(u => u.active === null).length
)

// ================= FILTERED USERS =================
const filteredUsers = computed(() => {
  let result = users.value

  // status
  if (statusFilter.value === true)
    result = result.filter(u => u.active === true)

  if (statusFilter.value === false)
    result = result.filter(u => u.active === false)

  if (statusFilter.value === 'notSigned')
    result = result.filter(u => u.active === null)

  // search
  const query = q.value.trim().toLowerCase()
  if (query) {
    result = result.filter(u =>
      ((u.name ?? '') + ' ' + (u.SurName ?? ''))
        .toLowerCase()
        .includes(query)
    )
  }

  // date range
  if (dateRange.value?.length === 2) {
    const [start, end] = dateRange.value

    result = result.filter(u => {
      const [datePart] = u.last_act_time.split(' ')
      const [day, month, year] = datePart.split('/')
      const userDate = new Date(`${year}-${month}-${day}`)

      return userDate >= new Date(start) &&
        userDate <= new Date(end)
    })
  }

  return result
})

// ================= ROW COLORS =================
const rowClassName = ({ row }) => {
  if (row.active === true) return 'signed-in-row'
  if (row.active === false) return 'signed-out-row'
  return 'not-signed-row'
}

// ================= SORT =================
const sortByStatus = (a, b) => {
  const order = { true: 1, false: 2, null: 3 }
  return order[a.active] - order[b.active]
}

// ================= QUICK DATES =================
const selectPeriod = (key) => {
  activePeriod.value = key
  const today = new Date()

  if (key === 'today') {
    const d = formatDate(today)
    dateRange.value = [d, d]
  }

  if (key === 'last7') {
    const start = new Date()
    start.setDate(today.getDate() - 6)
    dateRange.value = [formatDate(start), formatDate(today)]
  }

  if (key === 'month') {
    const first = new Date(today.getFullYear(), today.getMonth(), 1)
    const last = new Date(today.getFullYear(), today.getMonth() + 1, 0)
    dateRange.value = [formatDate(first), formatDate(last)]
  }

  if (key === 'reset') {
    dateRange.value = []
  }
}
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.title {
  margin-bottom: 10px;
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
  margin-bottom: 20px;
}

.search-input {
  width: 260px;
}

.date-picker {
  width: 360px;
}

.quick-dates {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.date-chip {
  cursor: pointer;
  border-radius: 20px;
  padding: 6px 14px;
  transition: all 0.2s ease;
}

.date-chip:hover {
  transform: translateY(-2px);
}

.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 14px;
}

.signed-in-row {
  background-color: #e0f0ff !important;
}

.signed-out-row {
  background-color: #f0f0f0 !important;
}

.not-signed-row {
  background-color: #fff4e0 !important;
}




/* ================= STATUS ================= */

.status-group {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.status-chip {
  cursor: pointer;
  border-radius: 20px;
  padding: 6px 14px;
  transition: all 0.2s ease;
}
.status-chip:hover {
  transform: translateY(-2px);
}

.stat:hover {
  transform: translateY(-2px);
}

.stat {
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 13px;
  background: #f1f5f9;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}



.stat.active {
  background: #409eff;
  color: white;
  box-shadow: 0 4px 10px rgba(64, 158, 255, 0.3);
}

.kpi {
  font-weight: 600;
}

.label {
  font-size: 12px;
}

/* ================= SEARCH ================= */

.search-group {
  display: flex;
  align-items: center;
}

.search-input {
  width: 250px;
}

/* ================= DATE ================= */

.date-group {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.date-picker {
  width: 320px;
}

.quick-dates {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.date-chip {
  cursor: pointer;
  border-radius: 20px;
  padding: 6px 14px;
  transition: all 0.2s ease;
}

.date-chip:hover {
  transform: translateY(-2px);
}
</style>