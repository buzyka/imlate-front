# UI kit — ImLate Administration

Click-through recreation of the Vue admin panel at `buzyka/imlate-front`. Open `index.html`.

## Flow

Login (`admin` / any password) → Dashboard. The sidebar moves between the four real routes; the topbar username opens Profile.

| Screen | Source view | Notes |
| --- | --- | --- |
| `LoginScreen.jsx` | `src/views/Login.vue` | 400px card, app icon, top-labelled fields, full-width primary button disabled until both fields are filled |
| `DashboardScreen.jsx` | `src/views/Dashboard.vue` | The one marketing-styled screen: navy hero on white, orange rule, pill CTAs, three link tiles |
| `VisitorsScreen.jsx` | `src/views/Users.vue` | Table + 380px edit panel; row click loads the form; manual-track dialog; RFID sub-table; delete confirmation |
| `AdminUsersScreen.jsx` | `src/views/AdminUsers.vue` | Table + 400px edit panel; username locked in edit mode; inline change-password block |
| `ReportsScreen.jsx` | `src/views/Reports.vue` | Filter card, KPI counters, "Fire report" table with status row washes, right-aligned pager, first-load skeleton |
| `SettingsScreen.jsx` | `src/views/Settings.vue` | Theme tab: four asset slots plus animation timings |
| `ProfileScreen.jsx` | `src/views/Profile.vue` | Read-only identity card + security card, 560px column |
| `AppShell.jsx` | `src/App.vue` | 180px sidebar with logo and Help popover, 36px topbar, scrolling main |

## Fidelity notes

- All data is local (`data.js`); no network calls.
- The KPI tiles are an addition: `Reports.vue` computes the three counters but never renders them.
- The dashboard's feature-tile glyphs are Element Plus icons; the shipped Vue app uses emoji there.
