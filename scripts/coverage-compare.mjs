#!/usr/bin/env node
// Compares two Vitest `json-summary` coverage reports and fails when line coverage
// drops by more than the allowed threshold (percentage points).
//
//   node scripts/coverage-compare.mjs <base-summary.json> <head-summary.json> [--threshold 0.1]
//
// A missing base report (e.g. the base branch has no coverage yet) is not an error:
// the gate passes and says there is no baseline.
import { appendFileSync, existsSync, readFileSync } from 'node:fs'

const METRICS = ['lines', 'statements', 'functions', 'branches']

function parseArgs(argv) {
  const positional = []
  let threshold = 0.1
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--threshold') threshold = Number(argv[++i])
    else positional.push(argv[i])
  }
  if (positional.length !== 2 || !Number.isFinite(threshold)) {
    console.error('Usage: coverage-compare.mjs <base-summary.json> <head-summary.json> [--threshold 0.1]')
    process.exit(2)
  }
  return { basePath: positional[0], headPath: positional[1], threshold }
}

function readSummary(path) {
  if (!path || !existsSync(path)) return null
  return JSON.parse(readFileSync(path, 'utf8'))
}

// exact percentage from covered/total; the rounded `pct` field hides small drops
function pct(metric) {
  if (!metric || !metric.total) return 100
  return (metric.covered / metric.total) * 100
}

const fmt = (n) => `${n.toFixed(2)}%`
const fmtDelta = (n) => `${n > 0 ? '+' : ''}${n.toFixed(2)}`

// report keys are absolute paths, which differ between checkouts; key files by their path from src/
function byFile(summary) {
  const files = new Map()
  for (const [key, value] of Object.entries(summary)) {
    if (key === 'total') continue
    const at = key.lastIndexOf('/src/')
    files.set(at === -1 ? key : key.slice(at + 1), value)
  }
  return files
}

function changedFiles(base, head) {
  const baseFiles = byFile(base)
  const headFiles = byFile(head)
  const names = new Set([...baseFiles.keys(), ...headFiles.keys()])
  const rows = []
  for (const name of [...names].sort()) {
    const b = baseFiles.get(name)
    const h = headFiles.get(name)
    const bp = b ? pct(b.lines) : null
    const hp = h ? pct(h.lines) : null
    if (bp !== null && hp !== null && Math.abs(hp - bp) < 0.005) continue
    rows.push(
      `| \`${name}\` | ${bp === null ? 'new' : fmt(bp)} | ${hp === null ? 'removed' : fmt(hp)} | ${
        bp !== null && hp !== null ? fmtDelta(hp - bp) : ''
      } |`,
    )
  }
  return rows
}

function writeSummary(markdown) {
  console.log(markdown)
  if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, `${markdown}\n`)
}

const { basePath, headPath, threshold } = parseArgs(process.argv.slice(2))
const head = readSummary(headPath)
if (!head) {
  console.error(`Head coverage report not found: ${headPath}`)
  process.exit(2)
}
const base = readSummary(basePath)

if (!base) {
  const lines = ['## Coverage', '', 'No baseline coverage on the base branch, nothing to compare.', '']
  lines.push('| Metric | Head |', '| --- | --- |')
  for (const m of METRICS) lines.push(`| ${m} | ${fmt(pct(head.total[m]))} |`)
  writeSummary(lines.join('\n'))
  process.exit(0)
}

const lineDelta = pct(head.total.lines) - pct(base.total.lines)
const failed = lineDelta < -threshold

const lines = [
  '## Coverage',
  '',
  failed
    ? `❌ Line coverage dropped by ${Math.abs(lineDelta).toFixed(2)} points (allowed: ${threshold}).`
    : `✅ Line coverage change ${fmtDelta(lineDelta)} points (allowed drop: ${threshold}).`,
  '',
  '| Metric | Base | Head | Delta |',
  '| --- | --- | --- | --- |',
]
for (const m of METRICS) {
  const b = pct(base.total[m])
  const h = pct(head.total[m])
  lines.push(`| ${m} | ${fmt(b)} | ${fmt(h)} | ${fmtDelta(h - b)} |`)
}

const fileRows = changedFiles(base, head)
if (fileRows.length) {
  lines.push('', '<details><summary>Files with changed line coverage</summary>', '')
  lines.push('| File | Base | Head | Delta |', '| --- | --- | --- | --- |', ...fileRows, '', '</details>')
}

writeSummary(lines.join('\n'))
process.exit(failed ? 1 : 0)
