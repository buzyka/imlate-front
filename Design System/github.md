repo: buzyka/imlate-front
branch: main
path: src

## Last sync

date: 2026-09-02T13:25:05Z

### Updated in this project

- Redesigned Reports as a multi-report workspace (Fire List / Attendance Report) — proposal in `guidelines/reports-workspace.md`.
- Added five primitives the redesign needs: SegmentedControl, DateRangePicker, FilterChip, TableToolbar, MiniBar.
- Extracted the full token set (Element Plus base + the app's own navy/orange, page wash, card shadow and 10px input radius) into `tokens/`.
- Rebuilt all seven admin views as a click-through UI kit in `ui_kits/admin/`.

## Screen map

| Project screen | Repo files |
| --- | --- |
| `ui_kits/admin/AppShell.jsx` | `src/App.vue`, `src/router/index.js` |
| `ui_kits/admin/LoginScreen.jsx` | `src/views/Login.vue` |
| `ui_kits/admin/DashboardScreen.jsx` | `src/views/Dashboard.vue` |
| `ui_kits/admin/VisitorsScreen.jsx` | `src/views/Users.vue`, `src/features/manual-tracking.js` |
| `ui_kits/admin/AdminUsersScreen.jsx` | `src/views/AdminUsers.vue` |
| `ui_kits/admin/ReportsScreen.jsx`, `ui_kits/admin/reports.html` | `src/views/Reports.vue`, `src/features/reports-query.js` — **redesigned**, not a 1:1 recreation |
| `ui_kits/admin/SettingsScreen.jsx` | `src/views/Settings.vue`, `src/services/theme.js` |
| `ui_kits/admin/ProfileScreen.jsx` | `src/views/Profile.vue` |
| `tokens/*.css` | `src/assets/styles/global.css`, `src/views/Dashboard.vue` (scoped brand vars), Element Plus 2.8.4 defaults |
| `assets/logo.png`, `assets/app-icon.png`, `assets/favicon.ico` | `src/assets/big-logo.png`, `src/assets/logo.png`, `src/assets/favicon.ico` |
