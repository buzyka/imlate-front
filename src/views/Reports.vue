<template>
  <div class="page">


    <el-card>
      <template #header><b>Quick Stats</b></template>


      <div class="filters">
        <!--================= STATS ================= -->
        <div class="flex flex-wrap items-center gap-12">
          <el-tag :type="isStudentFilter  === null ? 'primary' : 'info'" effect="light" class="chip"
            @click="isStudentFilter  = null">
            All Users ({{ sortedVisits.length }})
          </el-tag>
          <el-tag :type="isStudentFilter  === true ? 'primary' : 'info'" effect="light" class="chip"
            @click="isStudentFilter  = true">
            Student ({{ signedIn }})
          </el-tag>

          <el-tag :type="isStudentFilter  === false ? 'primary' : 'info'" effect="light" class="chip"
            @click="isStudentFilter  = false">
            Staff ({{ signedIn }})
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
    
     <!-- <el-table-column label="Status" width="130" sortable :sort-method="sign_status">-->
      <el-table-column label="Status" width="130" sortable :sort-method="sortByStatus">
        <template #default="scope">
          <el-tag v-if="scope.row.sign_status === 'signed_in'" type="success">
            Signed in
          </el-tag>
          <el-tag v-else-if="scope.row.sign_status === 'signed_out'" type="warning">
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
//const statusFilter = ref(null)
const isStudentFilter = ref(null) // true | false | null

// 👉 даты
const from = '2026-03-03'
const to = '2026-03-04'

// 👉 загрузка данных
const loadVisits = async () => {
  try {
    const params = { from, to }
    
    if (isStudentFilter.value !== null) {
      params.is_student = isStudentFilter.value
    }
    const response = await api.get('/reports/visits', { params })
    // ❗ ВАЖНО: берём data внутри data
    visits.value = response.data.data

  } catch (error) {
    console.error('Ошибка при загрузке посещений:', error)
  }
}

onMounted(() => {
  loadVisits()
})

import { watch } from 'vue'

watch(isStudentFilter, () => {
  loadVisits()
})
// ================= FILTERED USERS =================
const filteredUsers = computed(() => {
  let result = sortedVisits.value

  // status

   if (isStudentFilter.value !== null) {
    result = result.filter(u => u.is_student === isStudentFilter.value)
  }

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

 */
const sortByStatus = (a, b) => {
  const order = {
    signed_in: 1,
    signed_out: 2,
    not_signed: 3
  }
  return order[a.sign_status] - order[b.sign_status]
}


/**
 * 👉 сортировка:
 * signed-in сверху
 */

const sortedVisits = computed(() => {
  return [...latestVisits.value].sort((a, b) => {
    if (a.sign_status === b.sign_status) return 0
    if (a.sign_status === 'signed_in') return -1
    return 1
  })
})

// ================= COUNTERS =================
const signedIn = computed(() =>
  sortedVisits.value.filter(u => u.sign_status === 'signed_in').length
)

const signedOut = computed(() =>
  sortedVisits.value.filter(u => u.sign_status === 'signed_out').length
)

const notSigned = computed(() =>
  sortedVisits.value.filter(u => u.sign_status === 'not_signed').length
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
