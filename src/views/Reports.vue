<template>
  <div class="reports-page">

    <!-- FILTER CARD  )-->
    <el-card class="card">

      <template #header>
        <div class="card-header">
          <div>
            <b v-if="!loading">Quick Stats</b>
            <!-- SKELETON HEADER -->
            <el-skeleton v-else animated>
              <template #template>
                <el-skeleton-item variant="h3" style="width: 120px;" />
                <el-skeleton-item variant="text" style="width: 200px; margin-top: 6px;" />
              </template>
            </el-skeleton>

            <div v-if="!loading" class="subtitle">Filter and analyze visitor activity</div>
          </div>
        </div>
      </template>
      <!-- FILTERS -->
      <div class="filters">

        <el-skeleton :loading="isFirstLoad" animated>
          <template #template>
            <div style="display:flex; gap:12px;">
              <el-skeleton-item variant="rect" style="width: 180px; height: 32px;" />
              <el-skeleton-item variant="rect" style="width: 180px; height: 32px;" />
            </div>
          </template>

          <template #default>
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

            <el-select v-model="gradeFilter" multiple :disabled="isStudentFilter !== true" placeholder="Select grade(s)"
              class="filter-item">
              <el-option v-for="g in grades" :key="g.value" :label="g.label" :value="g.value" />
            </el-select>

            <el-tag v-if="gradeFilter.length === 1" type="success">
              Single grade mode
            </el-tag>

            <el-tag v-else-if="gradeFilter.length > 1" type="warning">
              Multi grade mode
            </el-tag>
          </template>
        </el-skeleton>
      </div>

    </el-card>

    <!-- TITLE -->
    <div class="section-title">Fire report</div>

    <!-- TABLE CARD -->
    <el-card class="card table-card">
      <el-skeleton :loading="loading" animated>
        <template #template>
          <!-- TABLE SKELETON -->
          <div v-for="i in 8" :key="i" style="display:flex; gap:12px; padding:12px;">
            <el-skeleton-item variant="text" style="width: 50px;" />
            <el-skeleton-item variant="text" style="width: 120px;" />
            <el-skeleton-item variant="text" style="width: 120px;" />
            <el-skeleton-item variant="text" style="width: 160px;" />
            <el-skeleton-item variant="text" style="width: 100px;" />
            <el-skeleton-item variant="text" style="width: 120px;" />
          </div>
        </template>
        <template #default>

          <el-table :data="sortedVisits" border highlight-current-row class="modern-table"
            v-loading="loading && !isFirstLoad" element-loading-text="Loading...">

            <el-table-column label="#" width="70" align="center" fixed>
              <template #default="scope">
                {{ (page - 1) * limit + scope.$index + 1 }}
              </template>
            </el-table-column>
            <el-table-column prop="name" label="Name" sortable />
            <el-table-column prop="surname" label="Surname" sortable />
            <el-table-column prop="visit_date" label="Last activity" width="180" sortable />
            <el-table-column prop="is_student" label="Student" width="120" sortable />

            <el-table-column label="Status" width="140">
              <template #default="scope">
                <el-tag :type="getStatusType(scope.row.sign_status)">
                  {{ getStatusText(scope.row.sign_status) }}
                </el-tag>
              </template>
            </el-table-column>
            <!-- 🔥 EMPTY STATE -->
            <template #empty>
              <div style="padding: 40px; text-align: center;">
                <p>No data found</p>
              </div>
            </template>
          </el-table>
        </template>

      </el-skeleton>
    </el-card>

    <div class="reports-pagination">
      <el-pagination background layout="prev, pager, next" :page-size="limit" :total="total" :current-page="page"
        @current-change="handlePageChange" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { buildReportsQuery, getReportsDateRange } from '../features/reports-query.js'
import api from '../services/api.js'

// ===== STATE =====
const visits = ref([])
const isStudentFilter = ref(null) // true | false | null
const statusFilter = ref(null) // 'signed_in' | 'signed_out' | 'not_signed' | null

const gradeFilter = ref([]) // multiple select
const grades = Array.from({ length: 12 }, (_, i) =>  //list of Grades
({
  label: `Grade ${i + 1}`,
  value: i + 1
}))

// =====Server-side pagination
const page = ref(1)
const limit = ref(20)
const total = ref(0)
const loading = ref(false)
const isFirstLoad = ref(true)

// ===== LOAD DATA FUNCTION =====

const buildParams = () => {
  const { from, to } = getReportsDateRange()

  return buildReportsQuery({
    from,
    to,
    page: page.value,
    limit: limit.value,
    isStudentFilter: isStudentFilter.value,
    statusFilter: statusFilter.value,
    gradeFilter: gradeFilter.value,
  })
}

const buildQueryString = () => buildParams().toString()

const loadVisits = async () => {
  try {
    loading.value = true

    const response = await api.get(`/reports/visits?${buildQueryString()}`)

    visits.value = response.data.data
    total.value = response.data.total

  } finally {
    loading.value = false
    isFirstLoad.value = false
  }
}

//===== Pagination handler

const handlePageChange = (newPage) => {
  page.value = newPage
  loadVisits()
}
//====== Grade =======

watch(isStudentFilter, (val) => {
  if (val === undefined) {
    isStudentFilter.value = null
    return
  }

  if (val !== true) {
    gradeFilter.value = []
  }
})

watch(statusFilter, (val) => {
  if (val === undefined) {
    statusFilter.value = null
  }
})

// ===== WATCH FILTERS =====
let timeout


watch([isStudentFilter, statusFilter, () => gradeFilter.value.slice()], () => {
  clearTimeout(timeout)
  timeout = setTimeout(() => {
    page.value = 1
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
.reports-page {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px;
  background: #f6f8fc;
  min-height: 100%;
  animation: fadeUp 0.35s ease;
}

.reports-pagination {
  display: flex;
  justify-content: flex-end;
}
</style>
