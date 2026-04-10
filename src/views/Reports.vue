<template>
  <div class="page">

    <!-- FILTER CARD -->
    <el-card class="card">

      <template #header>
        <div class="card-header">
          <div>
            <b>Quick Stats</b>
            <div class="subtitle">Filter and analyze visitor activity</div>
          </div>
        </div>
      </template>

      <div class="filters">

        <el-select v-model="isStudentFilter" placeholder="Visitor type" clearable class="filter-item">
          <el-option label="All visitors" :value="null" />
          <el-option label="Students" :value="true" />
          <el-option label="Teachers" :value="false" />
        </el-select>

        <el-select v-model="statusFilter" placeholder="Status" clearable class="filter-item">
          <el-option label="Signed in" value="signed_in" />
          <el-option label="Signed out" value="signed_out" />
          <el-option label="Not signed" value="not_signed" />
        </el-select>
      </div>
      
    </el-card>

    <!-- TITLE -->
    <div class="section-title">Fire report</div>

    <!-- TABLE CARD -->
    <el-card class="card table-card">

      <el-table
        :data="sortedVisits"
        border
        highlight-current-row
        class="modern-table"
      >

        <el-table-column prop="id" label="#" width="70" sortable />
        <el-table-column prop="name" label="Name" sortable />
        <el-table-column prop="surname" label="Surname" sortable />
        <el-table-column prop="visit_date" label="Last activity" width="180" sortable />
        <el-table-column prop="is_student" label="Student" width="120" sortable />

        <el-table-column label="Status" width="140">
          <template #default="scope">
            <el-tag
              :type="getStatusType(scope.row.sign_status)"
              class="status-tag"
            >
              {{ getStatusText(scope.row.sign_status) }}
            </el-tag>
          </template>
        </el-table-column>

      </el-table>

    </el-card>

  </div>
  <div class="pagination">
  <el-pagination
    background
    layout="prev, pager, next"
    :page-size="limit"
    :total="total"
    :current-page="page"
    @current-change="handlePageChange"
  />
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

// =====Server-side pagination
const page = ref(1)
const limit = ref(20)
const total = ref(0)
const loading = ref(false)

// ===== LOAD DATA FUNCTION =====
const loadVisits = async () => {
  try {
    loading.value = true
    const params = {
      from,
      to,
      page: page.value,
      limit: limit.value
    }
    if (isStudentFilter.value !== null) {
      params.is_student = isStudentFilter.value
    }

    if (statusFilter.value !== null) {
      params.sign_status = statusFilter.value
    }

    const response = await api.get('/reports/visits', { params })
    visits.value = response.data.data
    total.value = response.data.total  // backend MUST return this

  } finally {
    loading.value = false
  }
}
//===== Pagination handler

const handlePageChange = (newPage) => {
  page.value = newPage
  loadVisits()
}

// ===== WATCH FILTERS =====
let timeout

watch([isStudentFilter, statusFilter], () => {
  clearTimeout(timeout)
  timeout = setTimeout(() => {
    loadVisits()
  }, 300)
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

const getStatusType = (status) => {
  if (status === 'signed_in') return 'success'
  if (status === 'signed_out') return 'warning'
  return 'info'
}

const getStatusText = (status) => {
  if (status === 'signed_in') return 'Signed in'
  if (status === 'signed_out') return 'Signed out'
  return 'Not signed'
}

// ===== SORTED BY STATUS =====
const STATUS_ORDER = {
  signed_in: 1,
  signed_out: 2,
  not_signed: 3
}

const sortByStatus = (a, b) => {
  return STATUS_ORDER[a.sign_status] - STATUS_ORDER[b.sign_status]
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

</style>
