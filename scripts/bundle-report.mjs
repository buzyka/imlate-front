#!/usr/bin/env node
// Reports gzip sizes of the built JS and CSS, optionally compared with a base build.
// Report only: always exits 0 unless it is called wrongly.
//
//   node scripts/bundle-report.mjs <dist-dir | measured.json> [--json out.json] [--base base.json]
//
// Passing a .json file written earlier with --json reports that measurement instead of
// measuring a build, so CI can compare two builds made in different jobs.
import { appendFileSync, existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { extname, join, relative } from 'node:path'
import { gzipSync } from 'node:zlib'

function parseArgs(argv) {
  const opts = { dist: null, json: null, base: null }
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--json') opts.json = argv[++i]
    else if (argv[i] === '--base') opts.base = argv[++i]
    else opts.dist = argv[i]
  }
  if (!opts.dist) {
    console.error('Usage: bundle-report.mjs <dist-dir> [--json out.json] [--base base.json]')
    process.exit(2)
  }
  return opts
}

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name)
    return entry.isDirectory() ? walk(path) : [path]
  })
}

// Vite names assets `name-<hash>.ext`; drop the hash so builds can be compared file by file
const stableName = (path) => path.replace(/-[A-Za-z0-9_-]{8}(?=\.(js|css)$)/, '')

function measure(dist) {
  const files = {}
  for (const path of walk(dist)) {
    const ext = extname(path)
    if (ext !== '.js' && ext !== '.css') continue
    const content = readFileSync(path)
    const name = stableName(relative(dist, path))
    files[name] = { type: ext.slice(1), raw: content.length, gzip: gzipSync(content, { level: 9 }).length }
  }
  const total = (type) =>
    Object.values(files)
      .filter((f) => f.type === type)
      .reduce((sum, f) => sum + f.gzip, 0)
  return { files, totals: { js: total('js'), css: total('css') } }
}

const kb = (bytes) => `${(bytes / 1024).toFixed(1)} KB`
function delta(head, base) {
  if (base === undefined) return 'new'
  const diff = head - base
  if (diff === 0) return '0'
  const percent = base ? ` (${diff > 0 ? '+' : ''}${((diff / base) * 100).toFixed(1)}%)` : ''
  return `${diff > 0 ? '+' : ''}${kb(diff)}${percent}`
}

const opts = parseArgs(process.argv.slice(2))
if (!existsSync(opts.dist)) {
  console.error(`Build output not found: ${opts.dist}`)
  process.exit(2)
}

const head = opts.dist.endsWith('.json') ? JSON.parse(readFileSync(opts.dist, 'utf8')) : measure(opts.dist)
if (opts.json) writeFileSync(opts.json, JSON.stringify(head, null, 2))

const base = opts.base && existsSync(opts.base) ? JSON.parse(readFileSync(opts.base, 'utf8')) : null
const lines = ['## Bundle size (gzip)', '']
if (opts.base && !base) lines.push('No base build to compare with.', '')

lines.push(base ? '| | Base | Head | Delta |' : '| | Head |', base ? '| --- | --- | --- | --- |' : '| --- | --- |')
for (const type of ['js', 'css']) {
  const h = head.totals[type]
  lines.push(
    base
      ? `| **${type.toUpperCase()}** | ${kb(base.totals[type])} | ${kb(h)} | ${delta(h, base.totals[type])} |`
      : `| **${type.toUpperCase()}** | ${kb(h)} |`,
  )
}

lines.push('', '<details><summary>Files</summary>', '')
lines.push(
  base ? '| File | Base | Head | Delta |' : '| File | Head |',
  base ? '| --- | --- | --- | --- |' : '| --- | --- |',
)
for (const [name, file] of Object.entries(head.files).sort((a, b) => b[1].gzip - a[1].gzip)) {
  const b = base?.files[name]?.gzip
  lines.push(
    base
      ? `| \`${name}\` | ${b === undefined ? '' : kb(b)} | ${kb(file.gzip)} | ${delta(file.gzip, b)} |`
      : `| \`${name}\` | ${kb(file.gzip)} |`,
  )
}
for (const name of Object.keys(base?.files ?? {})) {
  if (!head.files[name]) lines.push(`| \`${name}\` | ${kb(base.files[name].gzip)} | removed | |`)
}
lines.push('', '</details>')

const markdown = lines.join('\n')
console.log(markdown)
if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, `${markdown}\n`)
