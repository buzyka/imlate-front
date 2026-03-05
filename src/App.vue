<template>
  <el-container class="app-shell">
    <el-aside width="180px" v-if="isAuthed" class="app-aside">
      <div class="menu-logo">
        <img src="./assets/big-logo.png" alt="ImLate" />
      </div>
      <el-menu router default-active="/">
        <el-menu-item index="/">Dashboard</el-menu-item>
        <el-menu-item index="/users">Visitors</el-menu-item>
        <el-menu-item index="/admin-users">Admin Users</el-menu-item>
      </el-menu>
    </el-aside>
    <el-container class="app-content">
      <el-header height="36px" class="app-header" v-if="isAuthed">
        <div class="spacer"></div>
        <el-button size="small" text @click="$router.push('/profile')">{{ auth.userName }}</el-button>
        <el-button size="small" @click="logout">Logout</el-button>
      </el-header>
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
.app-shell {
  min-height: 100vh;
  display: flex;
}
.app-content {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}
.app-header {
  display:flex; align-items:center; gap:12px;
  border-bottom: 1px solid #eee;
  background:#fff;
  position: sticky;
  top: 0;
  z-index: 10;
}
.spacer { flex:1 }
.app-aside {
  border-right: 1px solid #eee;
  display:flex;
  flex-direction:column;
  align-items:stretch;
  height: 100vh;
}
.menu-logo {
  padding: 16px 10px 10px;
  display:flex;
  justify-content:center;
}
.menu-logo img {
  width: 100%;
  height: auto;
  display:block;
}
</style>
