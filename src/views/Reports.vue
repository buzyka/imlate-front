<!-- <template>
  <div>
    <h1>Reports Page</h1>
    <p>Здесь будут отчёты</p>
  </div>
</template>

<script>
export default {
  name: 'Reports'
}
</script>-->
<template>
  <div>
    <h2>Список посещений</h2>
    <ul>
      <li v-for="visit in sortedVisits" :key="visit.userId">
        {{ visit.userName }} — {{ visit.status }} ({{ visit.timestamp }})
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const sortedVisits = ref([]);

async function fetchVisits() {
  const response = await axios.get('/admin-api/reports/visits', {
  withCredentials: true
  });
  return response.data;
}

function getLatestStatus(visits) {
  const latestByUser = {};
  visits.forEach(visit => {
    const userId = visit.userId;
    const timestamp = new Date(visit.timestamp);

    if (!latestByUser[userId] || timestamp > new Date(latestByUser[userId].timestamp)) {
      latestByUser[userId] = visit;
    }
  });
  return Object.values(latestByUser);
}

function sortByStatus(latestVisits) {
  return latestVisits.sort((a, b) => {
    if (a.status === 'signed-in' && b.status !== 'signed-in') return -1;
    if (a.status !== 'signed-in' && b.status === 'signed-in') return 1;
    return 0;
  });
}

onMounted(async () => {
  
 try {
    const visits = await fetchVisits();
    const latestVisits = getLatestStatus(visits);
    sortedVisits.value = sortByStatus(latestVisits);
   } catch (error) {
    console.error('Ошибка при загрузке посещений:', error);
  }

 
});
</script>
