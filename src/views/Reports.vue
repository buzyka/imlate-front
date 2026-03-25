<template>
  <div class="page">


    <el-card>
      <template #header><b>Quick Stats</b></template>


      <div class="filters">
        <!--================= STATS ================= -->
        <div class="flex flex-wrap items-center gap-12">
          <el-tag :type="statusFilter === null ? 'primary' : 'info'" effect="light" class="chip"
            @click="statusFilter = null">
            All Users ({{ sortedVisits.length }})
          </el-tag>
          <el-tag :type="statusFilter === true ? 'primary' : 'info'" effect="light" class="chip"
            @click="statusFilter = true">
            Signed in ({{ signedIn }})
          </el-tag>

        </div>
      </div>
    </el-card>

    <h2>Список посещений</h2>
 
     <!-- ================= TABLE ================= -->
    <el-table :data="filteredUsers" border highlight-current-row style="margin-top: 20px">
      <el-table-column prop="id" label="N" width="70" sortable />
      <el-table-column prop="name" label="Name" width="150" sortable />
      <el-table-column prop="surname" label="surname" sortable />
      <el-table-column prop="visit_date" label="Last Act Time" width="170" sortable />
      <el-table-column prop="is_student" label="is_student" width="120" sortable />
    
      <el-table-column label="Status" width="130" sortable :sort-method="sign_status">
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
import { ref, onMounted, computed } from 'vue'
import api from '../services/api.js'

// 👉 состояние
const visits = ref([])
const statusFilter = ref(null)

// 👉 даты
const from = '2025-03-10'
const to = '2026-03-28'

// 👉 загрузка данных
onMounted(async () => {
  try {
    const response = await api.get('/reports/visits', {
      params: { from, to }
    })

    // ❗ ВАЖНО: берём data внутри data
    visits.value = response.data.data

  } catch (error) {
    console.error('Ошибка при загрузке посещений:', error)
  }
})
// ================= FILTERED USERS =================
const filteredUsers = computed(() => {
  let result = sortedVisits.value

  // status
  if (statusFilter.value === true)
    result = result.filter(u => u.is_student === true)

 /* if (statusFilter.value === false)
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
  }*/
  return result
})

/**
 * 👉 берём последний визит каждого пользователя
 */
const latestVisits = computed(() => {
  const latestByUser = {}

  visits.value.forEach(visit => {
    const userId = visit.visitor_id

    if (
      !latestByUser[userId] ||
      new Date(visit.visit_date) > new Date(latestByUser[userId].visit_date)
    ) {
      latestByUser[userId] = visit
    }
  })

  return Object.values(latestByUser)
})

/**
 * 👉 сортировка:
 * signed-in сверху
 */
const sortedVisits = computed(() => {
  return [...latestVisits.value].sort((a, b) => {
    if (a.sign_status === b.sign_status) return 0
    if (a.sign_status === 'signed-in') return -1
    return 1
  })
})

// ================= COUNTERS =================
const signedIn = computed(() =>
  sortedVisits.value.filter(u => u.active === true).length
)

const signedOut = computed(() =>
  sortedVisits.value.filter(u => u.active === false).length
)

const notSigned = computed(() =>
  sortedVisits.value.filter(u => u.active === null).length
)

/**
 * 👉 формат даты
 */
const formatDate = (date) => {
  return new Date(date + 'T00:00:00').toLocaleDateString()
}
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
  margin-bottom: 1px;
}

/* ================= STATUS ================= */

.flex-row {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}
</style>