/* eslint-disable no-undef */
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const TOKENS_DIR = resolve(__dirname, '../tokens')
const FILES = ['color.json', 'typography.json']

function strip(node) {
  if (Array.isArray(node)) {
    for (const item of node) strip(item)
    return
  }
  if (node && typeof node === 'object') {
    delete node['$extensions']
    for (const value of Object.values(node)) strip(value)
  }
}

let touched = 0
for (const name of FILES) {
  const path = resolve(TOKENS_DIR, name)
  const raw = readFileSync(path, 'utf8')
  if (!raw.includes('"$extensions"')) continue

  const data = JSON.parse(raw)
  strip(data)
  writeFileSync(path, JSON.stringify(data, null, 2) + '\n')
  console.log(`✓ stripped $extensions from ${name}`)
  touched++
}

if (touched === 0) console.log('No $extensions metadata found.')
