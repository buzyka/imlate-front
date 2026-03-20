<template>
  <div>
    <h2>Список посещений</h2>

    <ul>
      <li v-for="visit in sortedVisits" :key="visit.visitor_id">
        {{ visit.name }} {{ visit.surname }} —
        {{ visit.sign_status }}
        ({{ formatDate(visit.visit_date) }})
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import api from '../services/api.js'

// 👉 состояние
const visits = ref([])

// 👉 даты
const from = '2025-03-10'
const to = '2026-03-19'

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

/**
 * 👉 формат даты
 */
const formatDate = (date) => {
  return new Date(date + 'T00:00:00').toLocaleDateString()
}
</script>