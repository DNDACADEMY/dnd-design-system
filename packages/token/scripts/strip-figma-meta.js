/* eslint-disable no-undef */
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const TOKENS_DIR = resolve(__dirname, '../tokens')
const FILES = ['color.json', 'typography.json']

function normalize(node) {
  let changed = false

  if (Array.isArray(node)) {
    for (const item of node) changed = normalize(item) || changed
    return changed
  }

  if (node && typeof node === 'object') {
    if ('$extensions' in node) {
      delete node.$extensions
      changed = true
    }

    if ('value' in node && !('$value' in node)) {
      node.$value = node.value
      changed = true
    }
    if ('type' in node && !('$type' in node)) {
      node.$type = node.type
      changed = true
    }
    if ('value' in node) {
      delete node.value
      changed = true
    }
    if ('type' in node) {
      delete node.type
      changed = true
    }

    for (const value of Object.values(node)) changed = normalize(value) || changed
  }

  return changed
}

let touched = 0
for (const name of FILES) {
  const path = resolve(TOKENS_DIR, name)
  const raw = readFileSync(path, 'utf8')
  const data = JSON.parse(raw)
  const changed = normalize(data)
  if (!changed) continue

  writeFileSync(path, JSON.stringify(data, null, 2) + '\n')
  console.log(`✓ normalized token schema in ${name}`)
  touched++
}

if (touched === 0) console.log('No token metadata/schema changes found.')
