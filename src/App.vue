<template>
  <el-container style="min-height:100vh">
    <el-header height="36px" class="app-header" v-if="isAuthed">
      <div class="brand">🔥 Vue Admin</div>
      <div class="spacer"></div>
      <el-button size="small" text @click="$router.push('/profile')">{{ auth.userName }}</el-button>
      <el-button size="small" @click="logout">Logout</el-button>
    </el-header>
    <el-container>
      <el-aside width="180px" v-if="isAuthed" class="app-aside">
        <el-menu router default-active="/">
          <el-menu-item index="/">Dashboard</el-menu-item>
          <el-menu-item index="/users">Visitors</el-menu-item>
          <el-menu-item index="/admin-users">Admin Users</el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from './stores/auth.js'

const auth = useAuthStore()
const isAuthed = computed(() => !!auth.token)
const logout = () => {
  auth.logout()
  window.location.href = '/admin/'
}
</script>

<style scoped>
.app-header {
  display:flex; align-items:center; gap:12px;
  border-bottom: 1px solid #eee;
  background:#fff;
}
.brand { font-weight:700; }
.spacer { flex:1 }
.app-aside { border-right: 1px solid #eee; }
</style>
