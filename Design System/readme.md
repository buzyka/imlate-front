# ImLate Design System

ImLate is a student attendance and visitor registration system for schools. The product description in its own words: *"Student attendance and visitor registration system. Track who enters and leaves the building with RFID keys, manage visitors, and generate reports."*

There are two surfaces in the product family, and this design system covers the first in depth:

1. **ImLate Administration** — the authenticated admin panel (`/admin/`). Vue 3 + Element Plus 2.8.4 + Pinia + Vue Router, built with Vite. Seven views: Login, Dashboard, Visitors, Admin Users, Reports, Settings, Profile. This is the surface the tokens, components and UI kit are derived from.
2. **Tracking point** — the public, unauthenticated screen at the door, driven by an RFID reader. Its source is not in the repository provided; it is only visible indirectly, through the Settings → Theme slots the admin uses to configure it (favicon, logo background, welcome animation, goodbye animation, and the durations those animations stay on screen). **No screens were built for it** — there was no source to recreate.

There is also a documentation site at `https://imlate.buzyka.com/` (linked from the dashboard and the Help panel). It was not provided as a source and is not represented here.

## Sources

- GitHub: **https://github.com/buzyka/imlate-front** (branch `main`) — the Vue admin panel. Everything in this design system is derived from it. Read further into it to build better ImLate designs: `src/App.vue` for the shell, `src/views/*.vue` for each screen, `src/assets/styles/global.css` for the card/table/input overrides, `src/services/theme.js` for the theme-asset model.
- GitHub: **https://github.com/buzyka/imlate** — the RFID tracking backend named in the repo list. Not read for this build.
- Icon source: **https://github.com/element-plus/element-plus-icons** — the app imports `@element-plus/icons-vue`; the raw SVGs are copied into `assets/icons/`.
- Backend reference in the repo: `https://isb.buzyka.com` (the "ISB project"). Not accessed.

See `github.md` for the machine-readable sync record and the screen → source map.

## The design system in one paragraph

ImLate Administration is an **Element Plus application with a light custom skin**. Element Plus supplies the interaction language (blue `#409eff`, four-step grey text scale, 32px controls, 4px radii, success/warning/danger/info semantics). A thin layer on top softens it: a cool page wash `#f6f8fc`, 16px card radii with a slate-tinted shadow, 10px input radii with indigo focus rings, and a slate table header. The brand itself — navy `#1b2a4a` and orange `#f5a623`, taken straight from the logo — appears **only on the dashboard**, which is deliberately styled like a marketing page. Everywhere else the app is a quiet, dense, blue-and-grey admin tool.

---

## CONTENT FUNDAMENTALS

**Voice.** Plain, operational, unadorned. The product talks about what it does, not about itself. Copy is written by and for people who administer a building.

**Person.** Second person is used sparingly and only in guidance: *"Use this when the visitor has arrived and needs a manual check-in."* Instructions to the admin describe the effect, not the click: *"Add a short note so other administrators understand why this visit was recorded manually."* The only first-person voice in the whole product is the brand name and the *"My Profile"* card heading.

**Casing.**
- **Title Case** for navigation and buttons: `Visitors`, `Admin Users`, `Change Password`, `Save timings` (note: `timings` stays lower — the app is inconsistent here), `Sign In Visitor`, `Getting Started`.
- **Title Case** for card headers and table columns: `Quick Stats`, `Edit Visitor`, `RFID Count`, `Last activity`.
- **Sentence case** for descriptions, help text, placeholders and option labels: `Manage tracking page branding and animation timings.`, `All visitors`, `Signed in`, `Search by name or surname`.
- **UPPERCASE** only for the two tracked micro-labels: the dashboard eyebrow `IMLATE ADMINISTRATION` and dialog section labels `ACTION` / `REASON`.

**Message copy is formulaic** — match it exactly:
- Success: past tense, two or three words. `Visitor updated`, `Visitor created`, `Visitor deleted`, `RFID added`, `RFID removed`, `Image uploaded`, `Asset uploaded`, `Asset reset`, `Animation timings saved`, `Password updated successfully`.
- Failure: `Failed to ` + verb phrase. `Failed to load visitors`, `Failed to save visitor`, `Failed to upload asset`, `Failed to track visit`.
- Auth failure is the one long-form error: `Incorrect username or password. Please try again.`
- Validation: bare requirement, no please. `Name is required`, `Username required`, `At least 8 characters`, `Must contain an uppercase letter`, `Passwords do not match`.
- Confirmations quote the record and ask a question: `Delete visitor "Ada Lovelace"?`, `Delete user "j.doe"? This cannot be undone.`
- Empty state: `No data found`. Loading: `Loading...`. Unknown version: `unavailable`.

**Placeholders are examples, not instructions.** `admin`, `••••••••`, `Example: Visitor arrived at reception and forgot to scan.`

**Vocabulary is fixed.** A person tracked by the system is a **visitor** (never "user" — `Users` in the codebase means administrators, and the UI correctly labels them `Admin Users`). Visitors are either **students** (with a **grade**) or teachers. Their card is an **RFID** or **RFID key**. Entering is **signed in**, leaving is **signed out**, never seen today is **not signed**. The all-visitors status list is the **Fire report**. Admin accounts have the role **admin** or **terminal**.

**Punctuation.** Descriptions end with a period; labels, buttons and tags never do. No exclamation marks anywhere. No em dashes in product copy.

**Emoji.** Used in exactly one place — the three dashboard feature tiles (📖 ⚙️ 🖥️) — and nowhere else in the product. Treat that as legacy, not as a pattern: this system replaces them with Element Plus glyphs. Do not introduce emoji into new work.

**Length.** Card descriptions are one sentence. Feature-tile descriptions are one sentence, up to about 15 words. The dashboard hero paragraph is the longest string in the product, at two clauses.

---

## VISUAL FOUNDATIONS

### Colour

Three layers, kept strictly separate.

- **Brand** — navy `#1b2a4a` (with `#253a63` for hover) and orange `#f5a623` (with `#e8961e` for hover). Both lifted from the logo. Navy is the dashboard heading colour; orange is the dashboard's 2px section rule and its primary CTA fill. Neither colour appears in the CRUD screens at all.
- **Interaction** — Element Plus blue `#409eff` with its nine-step light/dark ramp. Primary buttons, links, active nav, active tabs, focused pagination, selected table row, multi-select check marks.
- **Semantic** — `#67c23a` success, `#e6a23c` warning, `#f56c6c` danger, `#909399` info, each with a `light-9` tint used as a background. The mapping is not decorative and must not be re-assigned: success = signed in / yes / active / custom asset, warning = signed out / password-change affordance, danger = delete / sign-out action, info = no / default / terminal role / not signed.

Neutrals come from Element Plus: text `#303133` → `#606266` → `#909399` → `#a8abb2` → `#c0c4cc`; borders `#cdd0d6` → `#dcdfe6` → `#ebeef5`. On top of these the app adds slate accents — `#0f172a` for card headers and section titles, `#94a3b8` for card subtitles, `#475569` for table headers.

**Backgrounds.** Flat colour only. Content pages sit on `#f6f8fc`; cards are pure white. The dashboard is the exception: white, full-bleed, no wash. There is one gradient in the entire product — `linear-gradient(135deg,#f7f9fc,#eef3f9)` behind theme-asset previews in Settings. No hero images, no textures, no patterns, no photography, no illustration beyond the logo. Report rows carry a whole-row wash instead of a status column decoration: mint `#ecfdf5`, amber `#fffbeb`, slate `#f8fafc`.

### Type

**No webfonts ship.** The app renders in the Element Plus system stack — `"Helvetica Neue", Helvetica, Arial, sans-serif`. That is the correct ImLate typography; do not add a webfont, and do not substitute Inter. (The upstream Element Plus stack also lists CJK families; they are dropped here because the product is English-only.) Monospace is only for RFID key values and token names in documentation.

Sizes are the Element Plus steps: 20 / 18 / 16 / 14 / 13 / 12. Body, labels and table cells are all 14px; help text 13px; meta and tags 12px. Weights used: 400, 500 (buttons, tabs, links), 600 (card headers, table headers, section titles), 700 (dialog names, eyebrows, active pager). Line heights: 1.05 hero, 1.2 tight headings, 1.4 help, 1.5 body, 1.7 the dashboard paragraph. Letter-spacing appears twice only: `.08em` on the dashboard eyebrow, `.04em` on dialog section labels. The dashboard hero is the only fluid type in the system: `clamp(2.2rem, 4vw, 3.5rem)`, capped at `10ch` so it breaks after two words.

### Spacing and layout

4px base; the values actually used are 4, 8, 12, 16, 18, 20, 24, 28, 32, 48. Page padding 20px (32px horizontal on the dashboard). Card gap 16px, feature-tile gap 18px, filter gap 12px, form-row gap 18px.

Fixed dimensions are load-bearing and should be reproduced exactly: sidebar 180px, topbar 36px, visitors edit panel 380px, admin-users edit panel 400px, filter control 220px, inline form label 120px (160px for password forms), dashboard content max 1180px, profile column 560px, dialog 560px, help popover 320px.

The frame never moves: full-height flex row, fixed sidebar, sticky 36px topbar, and one scrolling main region. Nothing else is fixed or sticky — no floating action buttons, no sticky table headers, no bottom bars.

**Density.** Deliberately dense. Two-column "table + edit panel" is the standard CRUD layout, and selecting a row is what loads the form — there is no separate edit page and no drawer. Tables are fully bordered with 14px text. Only the dashboard is spacious.

**Responsive.** Three breakpoints: 900px collapses two-column CRUD layouts and the dashboard hero grid to one column; 768px removes dashboard page padding and stacks the hero CTAs full-width; 700px stacks the dialog hero and drops the action tiles to one column. There is no mobile navigation pattern — the sidebar stays 180px. This is a desktop tool.

### Elevation, borders, radii

Shadows are slate-tinted, never black: cards `0 6px 18px rgba(15,23,42,.06)` rising to `0 10px 26px rgba(15,23,42,.1)` on hover; feature tiles `0 8px 24px rgba(27,42,74,.12)`; overlays use Element Plus `0 0 12px rgba(0,0,0,.12)`. No inner shadows anywhere.

Borders do most of the structural work: `#eee` hairlines on the sidebar and topbar, `#eef2f7` on cards, `#ebeef5` inside tables, `#dcdfe6` on controls, `rgba(27,42,74,.1)` on feature tiles.

Radii: 4px Element Plus base (buttons, tags, dialogs, pager), 8px status tags and help link tiles, 10px inputs, 12px cards and table clip, 14px dialog choice tiles, 16px the main card, 50% avatars, 999px dashboard pills.

**Focus and selection rings** are the one non-Element-Plus flourish: inputs hover to `0 0 0 1px #c7d2fe` and focus to `0 0 0 2px #a5b4fc` (an indigo that appears nowhere else); dialog choice tiles select with `0 0 0 3px rgba(103,194,58,.15)` or the red equivalent.

### Motion

Short, functional, no bounce, no spring, no stagger. Everything uses plain `ease` — the only cubic-bezier is the Element Plus internal default.

- `.18s` brand CTAs and dialog choice tiles
- `.2s` inputs, hovers, sidebar, help button
- `.25s` cards and feature tiles
- `.3s` Element Plus components (switch, tabs)
- `.35s` the page-enter `fadeUp` — 10px translate plus opacity, applied once when a view mounts

**Hover states** are colour or lift, never opacity. Buttons move to their `light-3` tint (default buttons go to a blue tint with a blue border). Table rows wash to `#f1f5f9`. Cards lift 2px, feature tiles 3px, dialog choice tiles 1px, always with a matching shadow increase. Links get `light-3`. **Press states are not styled** — the app has no `:active` treatment; do not invent one.

**Transparency and blur.** Almost absent. Dialog backdrops are `rgba(0,0,0,.5)`. Element Plus overlays sit on `rgba(255,255,255,.8)` with a light backdrop blur. Feature-tile borders and the navy hover fill use `rgba(27,42,74,.05–.12)`. Nothing else is translucent.

### Imagery

There is none, apart from the logo and the user-uploaded theme assets. Visitor photos are circular crops of whatever the school uploads; the fallback is a grey `#e0e0e0` circle with the words "No image". Do not add stock photography, illustration, or generated imagery to ImLate work.

---

## ICONOGRAPHY

**One system: Element Plus icons.** The app imports named components from `@element-plus/icons-vue` (`QuestionFilled`, `Document`, `Compass`, `Delete`, `Location`). There is no custom icon set, no icon font, no sprite sheet, no PNG icons.

Forty of those glyphs are copied into **`assets/icons/`** as raw SVGs from `element-plus/element-plus-icons`. They are 24×24 outline/filled shapes drawn on a 1024 grid, single-path, `currentColor`-friendly. The `Icon` component renders them as a CSS mask so they inherit colour.

Rules:
- 16px in UI chrome, 12–13px inside small circle buttons, 18px in the help panel, 28–32px on dashboard feature tiles.
- Colour by role, never decoratively: `currentColor` inside buttons, `--el-text-color-placeholder` for input affordances, the semantic colour for status icons, `--il-orange` for the dashboard tiles.
- Icons never appear in sidebar menu items in the shipped app. Keep it text-only unless asked.
- Action columns in tables use icon-only `circle size="small"` buttons — location pin for manual tracking, trash for delete.
- **No emoji** (see Content Fundamentals) and **no unicode characters as icons**, with two inherited exceptions: the `X` label on RFID-removal buttons and the `#` row-number column header. Sort indicators are the only glyphs drawn as text (`▲`/`▼`).
- Never hand-draw an SVG for ImLate. If a glyph is missing, copy it from the Element Plus icon repository above.

**Logo.** `assets/logo.png` is the full wordmark (a clock, a running figure, and "ImLate" in navy and orange) — used at full width in the 180px sidebar and at 260px on the dashboard. `assets/app-icon.png` is the rounded-square app tile, used at 64px on the login card. `assets/favicon.ico` is the browser icon. There is no SVG version and no monochrome lockup; do not create one.

---

## Index

Root manifest:

| File | What it is |
| --- | --- |
| `readme.md` | This document — context, content and visual foundations, iconography, index |
| `styles.css` | The single stylesheet consumers link; `@import`s only |
| `tokens/` | `colors.css`, `typography.css`, `spacing.css`, `elevation.css`, `motion.css` |
| `assets/` | `logo.png`, `app-icon.png`, `favicon.ico`, `icons/` (40 Element Plus SVGs) |
| `components/` | React primitives, grouped by concern |
| `guidelines/` | 20 foundation specimen cards (Colors, Type, Spacing, Brand) + `reports-workspace.md`, the Reports redesign proposal |
| `ui_kits/admin/` | Click-through recreation of ImLate Administration |
| `templates/admin-screen/` | Starting template: admin shell with a table + edit-panel CRUD view |
| `SKILL.md` | Agent Skills front matter for use outside this project |
| `github.md` | Source repo association and screen → source map |
| `thumbnail.html` | Homepage tile |

### Components

`components/core/` — **Button**, **Icon**, **Card** (+ `CardSubtitle`), **Tag**, **Avatar**, **Divider**
`components/forms/` — **Input**, **Textarea**, **InputNumber**, **Select**, **Switch**, **SegmentedControl**, **DateRangePicker** (+ `DATE_PRESETS`, `DateRangePicker.format`), **FormField** (+ `FormActions`), **FileUploadRow**
`components/data/` — **DataTable**, **PivotGrid**, **Legend**, **TableToolbar**, **StatusTag**, **MiniBar**, **Pagination**, **Skeleton** (+ `SkeletonItem`), **KpiStat**
`components/navigation/` — **SidebarMenu** (+ `SidebarFooterButton`), **Topbar**, **Tabs**, **PageHeader** (+ `SectionTitle`)
`components/feedback/` — **Dialog** (+ **ConfirmDialog**), **Message** (+ `MessageStack`), **Popover**
`components/patterns/` — **FeatureCard**, **PillButton**, **ActionChoiceCard**, **AssetSlotCard**, **HelpPanel**, **FilterBar** (+ `FilterItem`), **FilterChip**

Each directory holds `<Name>.jsx`, `<Name>.d.ts` (props contract), `<Name>.prompt.md` (what/when + usage), and one `@dsCard` HTML showing the group's states.

### Intentional additions

The Vue app composes Element Plus components directly rather than defining a component library, so the inventory above is drawn from what the views actually use. Four entries go slightly beyond that:

- **Icon** — a React equivalent of the app's `@element-plus/icons-vue` imports. Needed because the glyphs are otherwise unreachable.
- **KpiStat** — `Reports.vue` computes `signedIn` / `signedOut` / `notSigned` counters but never renders them. This gives those numbers a home, in the system's own visual language.
- **StatusTag** — extracts `getStatusType` / `getStatusText` from `Reports.vue` so the status→colour mapping can't drift.
- **FilterBar / FilterItem** — the `.filters` / `.filter-item` classes from `global.css`, expressed as components.

Five more were added for the Reports workspace redesign (see `guidelines/reports-workspace.md`). Each is built entirely from existing tokens, but none has a counterpart in `imlate-front` — treat them as proposals until they ship:

- **SegmentedControl** — date-range presets. Element Plus radio-button geometry.
- **DateRangePicker** — dual-calendar From/To. The Vue app hardcodes today→tomorrow and has no picker.
- **FilterChip** — removable "label: value" pill summarising an applied filter.
- **TableToolbar** — search-within-results, row count, CSV/PDF export above a grid.
- **MiniBar** — single-proportion bar for in-cell summaries. The system's only chart primitive.
- **PivotGrid** — matrix grid with sticky identity columns, generated period columns, a sticky row total and a totals footer. Drives the Attendance matrix.
- **Legend** — compact key for grids that encode meaning in cell colour. Mandatory alongside PivotGrid.

Notably absent, because the source has no counterpart: breadcrumbs, drawers, tooltips, radio and checkbox groups, batch/bulk actions, inline editing, and collapsible panels. **ImLate has no dark mode** — do not add one.

---

## AI IMPLEMENTATION RULES

Read this before building anything for ImLate.

1. **Compose, don't restyle.** Build screens from the components in `components/`. If a screen needs something that isn't there, compose it from existing primitives inside the UI kit rather than adding a new primitive.
2. **Never hard-code a value that has a token.** Colours, radii, shadows, durations, widths and font sizes all come from `var(--…)`. Exact literals in the source that have no token (e.g. `#475569` table header text, `#111827` dialog labels) are already captured in `tokens/colors.css`.
3. **Respect the three colour layers.** Brand navy/orange belongs to the dashboard. Blue is interaction. Semantic colours carry the fixed status mapping. Never use orange for a primary action inside a CRUD screen, and never re-map a semantic colour.
4. **One primary action per card.** Everything else is a default, plain or text button. Destructive actions are `danger`, and every one of them passes through `ConfirmDialog` first.
5. **CRUD screens use the two-column pattern.** Table left, edit panel right (380px / 400px), row click loads the form, a Reset button clears it. Do not introduce modal editing or a separate edit route.
6. **Filters live in their own card above the data**, in a `FilterBar` with 220px controls, resetting to page 1 on apply. Two behaviours are legitimate: the shipped app auto-applies on a 300ms debounce (fine up to ~3 controls), and the Reports workspace uses an explicit draft/applied model with `FilterChip` summaries and an `Apply filters` button (use this from ~4 controls up, or whenever a date range is involved). `Tag` mode hints ("Single grade mode" / "Multi grade mode") describe the draft; chips describe what is applied.
7. **Feedback is a top-centred `Message`.** Every mutation fires one, using the exact copy formulas above. Do not add inline success banners.
8. **Loading has two modes**: `Skeleton` shaped like the incoming content on first load, and a spinner/overlay with the table still mounted on refetch.
9. **Layout is fixed.** 180px sidebar, 36px topbar, one scrolling main, `--il-surface-page` behind content, white on the dashboard. Text-only nav items in the exact order Visitors, Admin Users, Reports, Settings.
10. **No motion beyond the listed durations**, no press states, no gradients (except the theme-preview wash), no emoji, no new fonts, no dark mode, no invented iconography.
11. **Copy must match the formulas** in Content Fundamentals verbatim where an equivalent string exists in the app.

### Naming conventions

- **Components**: PascalCase, one per file, named export — `export function DataTable(props)`. Sub-parts sit in the same file as additional named exports (`CardSubtitle`, `FormActions`, `SidebarFooterButton`, `FilterItem`, `MessageStack`, `ConfirmDialog`, `SkeletonItem`).
- **Props**: camelCase. The Element Plus vocabulary is preserved deliberately — `type` (not `variant`), `size` (`large` / `default` / `small`), `plain`, `text`, `circle`, `round`, `effect` (`light` / `dark`), `clearable`, `disabled`, `loading`, `placeholder`. Handlers are `onChange` / `onClick` and take the value, not the event.
- **CSS custom properties**: two prefixes, and the distinction matters. `--el-*` mirrors an Element Plus variable at its stock value; `--il-*` is ImLate's own. Pattern is `--il-<concern>-<name>`: `--il-surface-page`, `--il-shadow-card`, `--il-radius-input`, `--il-fs-body`, `--il-dur-fast`, `--il-ring-input-focus`.
- **Data fields** follow the backend's `snake_case`: `is_student`, `sign_status`, `visit_date`, `is_custom`, `updated_at`, `imported_from_isams`, `welcome_duration_ms`. Keep them as-is in mock data so screens stay recognisable to the developers.
- **Status values** are the literal strings `signed_in`, `signed_out`, `not_signed`; roles are `admin` and `terminal`; manual-track actions are `sign_in` and `sign_out`.
- **Class names** (in the Vue source, for reference when reading it): plain kebab-case, no BEM, no utility framework. `.page`, `.card`, `.card-header`, `.subtitle`, `.filters`, `.filter-item`, `.section-title`, `.table-card`, `.modern-table`, `.status-tag`, `.signed-in-row`. There is no Tailwind in this codebase.

## Caveats

- **No webfont files exist** — the product uses a system stack. If ImLate adopts a brand typeface, supply the files and this section changes.
- The **Tracking point** surface has no source in the provided repository, so it has no UI kit. The Settings theme slots are the only evidence of what it shows.
- Element Plus token values are reproduced at their 2.8.4 stock values. They were not read out of `element-plus/dist/index.css`, which is an npm dependency rather than repository content; if a future version shifts them, re-derive from the installed package.
