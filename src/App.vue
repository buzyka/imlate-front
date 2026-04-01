<template>
  <el-container class="app-shell">
    <el-aside width="180px" v-if="isAuthed" class="app-aside">
      <div class="menu-logo">
        <img src="./assets/big-logo.png" alt="ImLate" />
      </div>
      <el-menu router :default-active="route.path">
        <el-menu-item index="/">Dashboard</el-menu-item>
        <el-menu-item index="/users">Visitors</el-menu-item>
        <el-menu-item index="/admin-users">Admin Users</el-menu-item>
        <el-menu-item index="/settings">Settings</el-menu-item>
      </el-menu>
      <div class="aside-spacer"></div>
      <el-popover
        placement="right-end"
        :width="320"
        trigger="click"
        @show="fetchBackendVersion"
      >
        <template #reference>
          <button class="help-btn">
            <el-icon :size="16"><QuestionFilled /></el-icon>
            <span>Help</span>
          </button>
        </template>
        <div class="help-panel">
          <h3 style="margin:0 0 8px">About ImLate</h3>
          <p class="help-desc">
            Student attendance and visitor registration system.
            Track who enters and leaves the building with RFID keys, manage visitors, and generate reports.
          </p>
          <div class="help-versions">
            <span><b>UI version:</b> {{ uiVersion }}</span>
            <span v-if="backendVersionLoading"><b>Server:</b> loading...</span>
            <span v-else><b>Server:</b> {{ backendVersion }}</span>
          </div>
          <div class="help-links">
            <a href="https://imlate.buzyka.com/" target="_blank" rel="noopener" class="help-link-card">
              <el-icon :size="18"><Document /></el-icon>
              <span>Documentation</span>
            </a>
            <a href="https://imlate.buzyka.com/getting-started.html" target="_blank" rel="noopener" class="help-link-card">
              <el-icon :size="18"><Compass /></el-icon>
              <span>Getting Started</span>
            </a>
          </div>
        </div>
      </el-popover>
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
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { QuestionFilled, Document, Compass } from '@element-plus/icons-vue'
import { useAuthStore } from './stores/auth.js'
import api from './services/api.js'

const auth = useAuthStore()
const route = useRoute()
const isAuthed = computed(() => !!auth.token)
const logout = () => {
  auth.logout()
  window.location.href = '/admin/'
}

const uiVersion = import.meta.env.VITE_APP_VERSION
const backendVersion = ref('')
const backendVersionLoading = ref(false)

async function fetchBackendVersion() {
  backendVersionLoading.value = true
  try {
    const { data } = await api.get('/version')
    backendVersion.value = data.version
  } catch {
    backendVersion.value = 'unavailable'
  } finally {
    backendVersionLoading.value = false
  }
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
.aside-spacer { flex:1 }
.help-btn {
  display:flex;
  align-items:center;
  gap:8px;
  width:100%;
  padding:12px 20px;
  cursor:pointer;
  color:#606266;
  font-size:14px;
  font-family:inherit;
  background:none;
  border:none;
  border-top:1px solid #eee;
  transition:background .2s;
}
.help-btn:hover { background:#f5f7fa; }
.help-panel h3 { font-size:15px; color:#303133; }
.help-desc {
  font-size:13px;
  color:#606266;
  line-height:1.5;
  margin:0 0 12px;
}
.help-versions {
  display:flex;
  flex-direction:column;
  gap:2px;
  font-size:12px;
  color:#909399;
  margin-bottom:14px;
  padding-bottom:12px;
  border-bottom:1px solid #ebeef5;
}
.help-links {
  display:flex;
  gap:10px;
}
.help-link-card {
  flex:1;
  display:flex;
  flex-direction:column;
  align-items:center;
  gap:6px;
  padding:14px 8px;
  border-radius:8px;
  border:1px solid #e4e7ed;
  text-decoration:none;
  color:#409eff;
  font-size:13px;
  font-weight:500;
  transition:border-color .2s, box-shadow .2s;
}
.help-link-card:hover {
  border-color:#409eff;
  box-shadow:0 2px 8px rgba(64,158,255,.15);
}
</style>
