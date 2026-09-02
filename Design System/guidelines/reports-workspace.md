# Reports workspace — layout & interaction proposal

Redesign of the ImLate Administration **Reports** page: from a single hardcoded "Fire report" view into a multi-report workspace. Built version: `ui_kits/admin/reports.html` (standalone) or `ui_kits/admin/index.html#/reports` (in the shell).

## What changed and why

The shipped `Reports.vue` does three things at once in one undifferentiated stack: it filters, it labels itself "Fire report" in a naked `SectionTitle`, and it renders one table. There is no room to add a second report, no way to see what is currently applied, and the date range is hardcoded to today→tomorrow in `getReportsDateRange()`.

The redesign separates those concerns into four horizontal bands. The band order never changes between reports — only the contents of bands 1 and 3 do. That is what makes switching feel like changing a channel rather than loading a different page.

## Layout

```
┌─ Card ─────────────────────────────────────────────────────────────────────┐
│ Reports                                                                    │  band 1
│ Switch report type, then filter and export visitor activity.               │  — identity
├────────────────────────────────────────────────────────────────────────────┤     + switcher
│ ┃Fire List┃  Attendance Report                                            │     + filters
│ ────────────────────────────────────────────────────────────────────────── │
│ [Visitor type ▾] [Status ▾] [Select grade(s) ▾] [🔍 Last name ⌫]  (Tag)    │
│ ── attendance only ─────────────────────────────────────────────────────── │
│ [ Day │ Week │ Month │ Custom ]  [📅 2026-08-31 — 2026-09-06 ⌫]           │
│ ────────────────────────────────────────────────────────────────────────── │
│ APPLIED  (Visitor type: Students ×) (Grades: 9, 11 ×)   Reset  [Apply]     │
└────────────────────────────────────────────────────────────────────────────┘

┌──────────────┐┌──────────────┐┌──────────────┐                               band 2
│ SIGNED IN    ││ SIGNED OUT   ││ NOT SIGNED   │                               — summary
│ 128          ││ 41           ││ 17           │
└──────────────┘└──────────────┘└──────────────┘

Fire list                                                                      band 3
┌────────────────────────────────────────────────────────────────────────────┐  — grid
│ [🔍 Search within results]  6 rows                        [⬇ CSV] [📄 PDF] │
├────────────────────────────────────────────────────────────────────────────┤
│ #  Name ▲   Surname   Last activity     Student   Status                   │
│ 1  Ada      Lovelace  02/09/2026 08:41  true      (Signed in)     ← mint   │
│ 2  Grace    Hopper    02/09/2026 07:58  false     (Signed out)    ← amber  │
└────────────────────────────────────────────────────────────────────────────┘
                                                        ‹ 1 2 3 4 5 ›          band 4
```

Everything sits in the existing page frame: 180px sidebar, 36px topbar, 20px page padding, `--il-surface-page` behind the cards, 16px between bands.

### Band 1 — identity, switcher, filters (one card)

`PageHeader` supplies the title and a one-line description in the card header, matching Settings. The report switcher is the existing **`Tabs`** component immediately below it, inside the same card body.

**Why tabs and not a segmented control or a dropdown.** All three were on the table:

| Pattern | Verdict |
| --- | --- |
| **Top-level tab bar** ✅ | Already exists in the system (`Settings.vue` uses `el-tabs` exactly this way). Both report names stay visible, so the second report is discoverable without interaction. Scales to 4–5 reports before it needs to scroll. Zero new components, zero stylistic drift. |
| Segmented control | Reads as a *filter* in this system, because that is the only other place it appears (Day/Week/Month, one band below). Two controls with the same shape at two different levels of the hierarchy is the ambiguity worth avoiding. |
| Primary dropdown selector | Hides the second report behind a click and looks identical to the four filter selects directly beneath it. Right choice at ~8+ reports; wrong at 2. |

The tab bar is the only element in the card that changes the *shape* of what follows, so it sits above the hairline rule the filter panel starts from — the switcher is structure, the filters are parameters.

**Filter panel.** Base filters are shared by both reports and keep their identity, order and 220px width: Visitor type, Status, Grade(s) (disabled until Visitor type is Students, exactly as today). Then per report:

- **Fire List** adds **Last name** — a 220px `Input` with a search prefix icon and the standard clear affordance, in the same row as the selects.
- **Attendance Report** adds a second row: a `SegmentedControl` of `Day / Week / Month / Custom` beside a 260px `DateRangePicker`. Choosing a preset fills the picker; touching the picker flips the segment to *Custom*. The two controls are one filter with two entry points, so they share a row and sit apart from the base filters.

Filter state that carries across a switch (visitor type, status, grades) is preserved; filter state that does not apply to the incoming report is retained in memory but neither shown nor applied. Switching back restores it.

### Band 1, footer — applied state and explicit actions

A hairline-separated row, always present:

`APPLIED` micro-label · one `FilterChip` per applied filter · *"Unapplied changes"* when the draft differs · `Reset` · `Apply filters`

This is the one place the redesign departs from the shipped app's behaviour, and deliberately. `Reports.vue` auto-applies on a 300ms debounce, which is fine for three controls but not for six plus a date range: every intermediate state fires a query, and there is no way to see what the server is actually filtering on. The workspace uses a **draft / applied** model:

- Controls edit a **draft**. Nothing refetches.
- **Apply filters** commits the draft and resets to page 1. It is a primary button, disabled while draft and applied match.
- **Reset** returns both to defaults and clears the results search.
- Chips describe the **applied** state, never the draft — that is their whole value.
- Removing a chip applies immediately. Deletion is unambiguous; there is nothing to preview.
- When nothing is applied: *"No filters — showing all visitors"* in placeholder grey.

### Band 2 — summary

Three `KpiStat` tiles. The counters are report-specific and are the answer to the question the report is asked for:

- **Fire List** — Signed in / Signed out / Not signed, in the fixed status colours. (`Reports.vue` already computes these three and never renders them; the redesign gives them a home.)
- **Attendance Report** — Avg hours per day (navy) / Late arrivals (warning) / Absences (info), all computed across the matrix rather than per visitor.

### Band 3 — the grid

`SectionTitle` labels the grid and carries the active range: *"Fire list"* or *"Attendance 2026-08-31 — 2026-09-06"*. Below it, one card with `bodyStyle={{padding:0}}` holding a `TableToolbar` on a hairline, then the `DataTable` in 4px padding.

**Toolbar** — search-within-results (240px, search prefix, clearable), row count, then `CSV` and `PDF` export buttons as small default buttons. The search narrows rows already returned; it is explicitly *not* a filter and never produces a chip.

**Fire List columns** are unchanged from the current page: `#`, Name, Surname, Last activity, Student, Status — with the same sortable columns, the same status→colour mapping, and the same whole-row washes (mint / amber / slate).

**Attendance is a matrix (pivot grid), not an aggregate list.** One row per visitor, one column per day in the applied range:

```
        ┌ sticky ──────────────────┐┌ scrolls horizontally ─────────────────────┐┌ sticky ┐
        │ #  Surname & First Name  ││ Mon  Tue  Wed  Thu  Fri  Sat  Sun  Mon …  ││ Total  │
        │                          ││ 31   01   02   03   04   05   06   07     ││ hrs    │
        ├──────────────────────────┤├───────────────────────────────────────────┤├────────┤
        │ 1  Lovelace Ada          ││ 7.4  6.2  ●In  7.8  7.1              6.9  ││  35.4  │
        │ 2  Hopper Grace          ││ 8.6  8.1  8.8   —   8.4              8.2  ││  42.1  │
        │ 3  Johnson Katherine     ││  —   5.9  5.4   —   6.6              7.0  ││  24.9  │
        ├──────────────────────────┤├───────────────────────────────────────────┤├────────┤
        │    Present / day         ││  2    3    3    1    3    —    —     3    ││ 102.4  │
        └──────────────────────────┘└───────────────────────────────────────────┘└────────┘
                            amber tint = late      grey tint = weekend
                            green tint = signed in     blank = absent
```

| Region | Behaviour |
| --- | --- |
| `#` | 52px, sticky, centred, sequential within the sorted set |
| Surname & First Name | 210px, sticky, sortable; surname semibold, first name regular — one column, not two |
| Day columns | 62px each, generated from the applied range; two-line header (weekday above day number, month appended on the 1st and on the first column); weekends recessed |
| Total hrs | 88px, sticky **right**, sum of the row's hours |
| Present / day | Totals footer — headcount present that day, `—` on weekends **and on dates that have not occurred yet**, grand total of hours at the right |

**Cell states.** There is deliberately **no Status column** — state lives in the cell:

| State | Cell content | Tint |
| --- | --- | --- |
| Completed | hours to one decimal (`7.4`) | `--el-fill-color-light` |
| Late arrival | hours, semibold in `warning-dark-2` | `--el-color-warning-light-9` |
| Signed in, not out | success dot + `In` | `--el-color-success-light-9` |
| Absent | `—` in `--el-text-color-disabled` | none — stays blank |
| Weekend / future | empty | `--el-fill-color-lighter` |

Every cell carries a native `title` with the precise values (`Lovelace — 08:41 to 16:07`, `Lovelace — signed in 09:12, still in the building`), so the grid stays scannable without hiding the detail.

Tints are `light-9` and `fill` tokens only. A saturated fill repeated across 31 columns is unreadable, and absence is never tinted — blank space is what makes a gap visible at a glance. A `Legend` sits on its own hairline row directly above the grid; a tinted grid without a key is not shippable.

**Sticky behaviour.** The grid owns its horizontal scroll inside a bordered container; the page keeps vertical scroll. The last sticky-left cell and the sticky-right total each carry a seam shadow (`--il-shadow-sticky-left` / `--il-shadow-sticky-right`) so the frozen edge reads as an edge rather than a border. Row hover washes the sticky cells too — otherwise the frozen columns visibly detach from the row.

**Range ceiling.** Generated columns are capped at 45; beyond that the toolbar row states *"Showing the first 45 days of the range"*. A quarter-or-longer range needs an aggregate table, not 90 columns.

No row washes on attendance: the cells already carry state, and the row-wash vocabulary belongs to the fire list, where scanning a whole row at a glance is the actual job.

**States.** First load and every apply show a `Skeleton` shaped to the incoming column widths. Empty shows a filter glyph, *"No data found"* (the app's existing string), and a second line that adapts: *"Try widening the filters or clearing the search."* when something is applied, *"No visitor activity in this period."* when nothing is.

### Band 4 — pagination

`Pagination` right-aligned, 20 per page, unchanged. Applying filters or switching reports resets to page 1.

## UX recommendations

1. **Switching reports must not feel like navigation.** The card, the filter panel geometry, the KPI row and the toolbar all stay put; only their contents change. Keep it that way when adding a third report.
2. **One thing changes shape, one thing changes values.** Tabs change the shape of the page. Everything below changes values. Do not put a report switcher in the filter row, and do not put a filter in the tab bar.
3. **Chips are the source of truth for "what am I looking at".** If a filter can affect results, it must produce a chip. A filter with no chip is a filter users will forget is on.
4. **Preserve shared filter state across switches.** Re-picking Students and three grades after every tab change is the fastest way to make a workspace feel worse than two separate pages.
5. **Export what is on screen.** CSV and PDF should honour applied filters, the results search and the current sort — not the unfiltered set. Label the confirmation toast so it is unambiguous: `Export started — CSV`.
6. **Keep the range and the presets adjacent.** They are one decision. Splitting them (presets above the fold, picker in a dropdown elsewhere) reliably produces users who never find the custom range.
7. **Don't add a third summary row per report.** Three KPIs is the ceiling; beyond that the band competes with the grid it is supposed to introduce.
8. **Responsive.** Below 900px the filter row wraps (it already does — `FilterBar` is `flex-wrap`), the KPI grid drops to one column, and the tab bar stays horizontal. The attendance matrix always scrolls horizontally and keeps its two sticky columns; do not stack cells into a card list. This is a desktop reporting tool.
9. **Read the matrix down a column, not just across a row.** The `Present / day` footer is what makes a bad day visible — keep it, and keep it aligned to the day columns rather than summarising in a separate card.
10. **Never report zero for a period that has not happened.** A future date, like a weekend, reports `—`. A column of `0`s across the back half of a Month view reads as mass absence, which is a false alarm. When the range runs past today, the toolbar states how many working days the totals actually cover.

## Components added to the design system

Five primitives, all new, all built from existing tokens. None of them existed in `imlate-front`, which is why each is listed in readme.md under *Intentional additions*.

| Component | Group | Why |
| --- | --- | --- |
| `SegmentedControl` | `forms/` | Date-range presets. Element Plus radio-button geometry (joined 32px buttons, primary fill when active). |
| `DateRangePicker` | `forms/` | Dual-calendar From/To with hover preview. Emits `YYYY-MM-DD` via `DateRangePicker.format`, matching `buildReportsQuery`. |
| `FilterChip` | `patterns/` | Applied-filter pill. Neutral info tint only — never semantic. |
| `TableToolbar` | `data/` | Search-within-results, row count, CSV/PDF export. |
| `MiniBar` | `data/` | Single proportion, for in-cell summaries elsewhere. The system's only chart primitive: flat, 6px. |
| `PivotGrid` | `data/` | The attendance matrix: sticky identity columns, generated period columns, sticky row total, totals footer. |
| `Legend` | `data/` | Key for the cell tints. Mandatory wherever a grid encodes meaning in colour. |

## Open questions

- **Attendance status thresholds.** "Late" is shown as after 09:00 and "Early leave" as a departure before the day ends; both are placeholders. The backend needs to define these, and they may need to be per-school settings.
- **Absent is `info` grey, not `danger` red.** That follows the system rule that `info` means "no event recorded" (as `not_signed` does today) and `danger` is reserved for destructive actions. If absence should read as an alert, that is a deliberate change to the semantic mapping and belongs in readme.md, not in one screen.
- **Attendance date range vs. the fire list.** The fire list is implicitly "today" and has no range control. If it should gain one, the date row moves out of the attendance-only band and becomes a base filter.
- **Server contract.** The matrix needs per-visitor **per-day** records for the range — `{ date, check_in, check_out, hours, state }` — not the per-range aggregate the earlier list version assumed. The existing `/reports/visits` returns visit events, which is closer to what the matrix wants; it needs grouping by visitor and day, plus an explicit "signed in, not yet out" state. Confirm whether the backend can return this shape for a 31-day range in one call, or whether the grid should page by visitor.
- **Row totals.** `Total hrs` is pinned to the right edge because in a month view a scrolling total is invisible. The brief specified fixed *left* columns only, so this is an addition — say the word and it moves left or comes out.
- **Multi-event days.** A visitor who signs in and out twice in a day currently collapses to one summed cell. If that matters, the cell needs a "2 visits" affordance and the tooltip needs both pairs.
