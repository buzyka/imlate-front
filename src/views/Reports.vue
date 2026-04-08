<template>
  <div class="page">
    <el-card>
      <template #header><b>Quick Stats</b></template>

      <div class="filters">
        <div class="flex flex-wrap items-center gap-12">
          <!-- ===== STUDENT FILTERS ===== -->
          <el-tag
            :type="isStudentFilter === null ? 'primary' : 'info'"
            effect="light"
            class="chip"
            @click="isStudentFilter = null"
          >
            All Users ({{ sortedVisits.length }})
          </el-tag>

          <el-tag
            :type="isStudentFilter === true ? 'primary' : 'info'"
            effect="light"
            class="chip"
            @click="isStudentFilter = true"
          >
            Student ({{ signedIn }})
          </el-tag>

          <el-tag
            :type="isStudentFilter === false ? 'primary' : 'info'"
            effect="light"
            class="chip"
            @click="isStudentFilter = false"
          >
            Staff ({{ signedIn }})
          </el-tag>

          <!-- ===== STATUS FILTERS ===== -->
          <el-tag
            :type="statusFilter === 'signed_in' ? 'primary' : 'info'"
            effect="light"
            class="chip"
            @click="statusFilter = 'signed_in'"
          >
            Signed in ({{ signedIn }})
          </el-tag>

          <el-tag
            :type="statusFilter === 'signed_out' ? 'primary' : 'info'"
            effect="light"
            class="chip"
            @click="statusFilter = 'signed_out'"
          >
            Signed out ({{ signedOut }})
          </el-tag>

          <el-tag
            :type="statusFilter === 'not_signed' ? 'primary' : 'info'"
            effect="light"
            class="chip"
            @click="statusFilter = 'not_signed'"
          >
            Not signed ({{ notSigned }})
          </el-tag>
        </div>
      </div>
    </el-card>

    <h2>Список посещений Список посещений</h2>

    <el-table :data="sortedVisits" border highlight-current-row style="margin-top: 20px">
      <el-table-column prop="id" label="N" width="70" sortable />
      <el-table-column prop="name" label="Name" width="150" sortable />
      <el-table-column prop="surname" label="Surname" sortable />
      <el-table-column prop="visit_date" label="Last Act Time" width="170" sortable />
      <el-table-column prop="is_student" label="Is Student" width="120" sortable />

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
import { ref, onMounted, computed, watch } from 'vue'
import api from '../services/api.js'

// ===== STATE =====
const visits = ref([])
const isStudentFilter = ref(null) // true | false | null
const statusFilter = ref(null) // 'signed_in' | 'signed_out' | 'not_signed' | null

// ===== DATES =====
const from = '2026-04-08'
const to = '2026-04-09'

// ===== LOAD DATA FUNCTION =====
const loadVisits = async () => {
  try {
    const params = { from, to }

    if (isStudentFilter.value !== null) {
      params.is_student = isStudentFilter.value
    }

    if (statusFilter.value !== null) {
      params.sign_status = statusFilter.value
    }

    const response = await api.get('/reports/visits', { params })
    visits.value = response.data.data
  } catch (error) {
    console.error('Ошибка при загрузке посещений:', error)
  }
}

// ===== WATCH FILTERS =====
watch([isStudentFilter, statusFilter], () => {
  loadVisits()
})

// ===== ON MOUNT =====
onMounted(() => loadVisits())

// ===== COMPUTED: LAST VISIT PER USER =====
const latestVisits = computed(() => {
  const latestByUser = {}
  visits.value.forEach(v => {
    const id = v.visitor_id
    if (!latestByUser[id] || new Date(v.visit_date) > new Date(latestByUser[id].visit_date)) {
      latestByUser[id] = v
    }
  })
  return Object.values(latestByUser)
})

// ===== SORTED BY STATUS =====
const sortByStatus = (a, b) => {
  const order = { signed_in: 1, signed_out: 2, not_signed: 3 }
  return order[a.sign_status] - order[b.sign_status]
}

const sortedVisits = computed(() => {
  return [...latestVisits.value].sort(sortByStatus)
})

// ===== COUNTERS =====
const signedIn = computed(() => sortedVisits.value.filter(u => u.sign_status === 'signed_in').length)
const signedOut = computed(() => sortedVisits.value.filter(u => u.sign_status === 'signed_out').length)
const notSigned = computed(() => sortedVisits.value.filter(u => u.sign_status === 'not_signed').length)
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

.flex-row {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}
</style>
