/* eslint-disable no-undef */
import { existsSync, readFileSync, writeFileSync } from 'node:fs'

import { register } from '@tokens-studio/sd-transforms'
import StyleDictionary from 'style-dictionary'

const CACHE_PATH = '.tokens-cache.json'
const ANSI = { green: '\x1b[32m', red: '\x1b[31m', yellow: '\x1b[33m', dim: '\x1b[2m', reset: '\x1b[0m' }

register(StyleDictionary)

const HEADER = '/**\n * Do not edit directly, this file was auto-generated.\n */\n\n'
const IDENT = /^[A-Za-z_$][\w$]*$/
const NAMESPACES = ['primitive', 'semantic', 'component']

const camel = (s) =>
  s
    .split(/[-_\s]+/)
    .map((w, i) => (i === 0 ? w[0].toLowerCase() + w.slice(1) : w[0].toUpperCase() + w.slice(1)))
    .join('')

const kebab = (s) => s.replace(/[-_\s]+/g, '-').toLowerCase()
const capitalize = (s) => s[0].toUpperCase() + s.slice(1)
const jsKey = (s) => (/^\d+$/.test(s) ? s : camel(s))
const formatKey = (k) => (IDENT.test(k) ? k : JSON.stringify(k))
const accessor = (parts) => parts.map((p) => (IDENT.test(p) ? `.${p}` : `[${JSON.stringify(p)}]`)).join('')

const exportOf = (token) => (token.filePath.includes('color.json') ? 'color' : 'typography')
const rootVar = (exportName, ns) => exportName + capitalize(ns)
const tokenValue = (token) => token.$value ?? token.value
const originalValue = (token) => token.original?.$value ?? token.original?.value

function parseRef(token) {
  const v = originalValue(token)
  if (typeof v !== 'string') return null
  const m = v.trim().match(/^\{(.+)\}$/)
  return m ? m[1].split('.') : null
}

class Ref {
  constructor(rootVarName, jsPath, valueType) {
    this.rootVar = rootVarName
    this.jsPath = jsPath
    this.valueType = valueType
  }
}

function setNested(root, path, value) {
  let cur = root
  for (let i = 0; i < path.length - 1; i++) cur = cur[path[i]] ??= {}
  cur[path.at(-1)] = value
}

function serialize(obj, d = 0) {
  if (obj instanceof Ref) return obj.rootVar + accessor(obj.jsPath)
  if (obj === null || typeof obj !== 'object') {
    return typeof obj === 'string' ? JSON.stringify(obj) : String(obj)
  }
  const inner = '  '.repeat(d + 1)
  const entries = Object.entries(obj).map(([k, v]) => `${inner}${formatKey(k)}: ${serialize(v, d + 1)}`)
  return `{\n${entries.join(',\n')}\n${'  '.repeat(d)}}`
}

function declareType(obj, d = 0) {
  if (obj instanceof Ref) return obj.valueType
  if (obj === null || typeof obj !== 'object') return typeof obj === 'number' ? 'number' : 'string'
  const inner = '  '.repeat(d + 1)
  const entries = Object.entries(obj).map(([k, v]) => `${inner}readonly ${formatKey(k)}: ${declareType(v, d + 1)}`)
  return `{\n${entries.join('\n')}\n${'  '.repeat(d)}}`
}

function buildTrees(allTokens) {
  const groups = {
    color: Object.fromEntries(NAMESPACES.map((ns) => [ns, {}])),
    typography: Object.fromEntries(NAMESPACES.map((ns) => [ns, {}]))
  }

  for (const token of allTokens) {
    const exportName = exportOf(token)
    const [ns, ...rest] = token.path
    const jsPath = rest.map(jsKey)
    const ref = parseRef(token)

    let value
    if (ref && ns !== 'primitive') {
      const valueType = exportName === 'color' ? 'string' : 'number'
      value = new Ref(rootVar(exportName, ref[0]), ref.slice(1).map(jsKey), valueType)
    } else if (exportName === 'color') {
      value = `var(--color-${token.path.slice(1).map(kebab).join('-')})`
    } else {
      value = tokenValue(token)
    }

    setNested(groups[exportName][ns], jsPath, value)
  }

  return groups
}

function emitJs(groups, exportName) {
  const trees = groups[exportName]
  const decls = NAMESPACES.map((ns) => `const ${rootVar(exportName, ns)} = ${serialize(trees[ns])}`)
  const members = NAMESPACES.map((ns) => `  ${ns}: ${rootVar(exportName, ns)}`).join(',\n')
  return `${decls.join('\n\n')}\n\nexport const ${exportName} = {\n${members}\n}\n`
}

function emitDts(groups, exportName) {
  const members = NAMESPACES.map((ns) => `  readonly ${ns}: ${declareType(groups[exportName][ns], 1)}`).join('\n')
  return `export declare const ${exportName}: {\n${members}\n}\n`
}

StyleDictionary.registerFormat({
  name: 'css/namespaced',
  format: ({ dictionary }) => {
    const lines = []
    for (const token of dictionary.allTokens) {
      if (!token.filePath.includes('color.json')) continue
      const name = '--color-' + token.path.slice(1).map(kebab).join('-')
      const ref = parseRef(token)
      const value = ref ? `var(--color-${ref.slice(1).map(kebab).join('-')})` : tokenValue(token)
      lines.push(`  ${name}: ${value};`)
    }
    return `${HEADER}:root {\n${lines.join('\n')}\n}\n`
  }
})

let sourceSnapshot = null

function captureSnapshot(allTokens) {
  if (sourceSnapshot) return
  sourceSnapshot = {}
  for (const t of allTokens) sourceSnapshot[t.path.join('.')] = originalValue(t)
}

StyleDictionary.registerFormat({
  name: 'javascript/namespaced',
  format: ({ dictionary }) => {
    captureSnapshot(dictionary.allTokens)
    const groups = buildTrees(dictionary.allTokens)
    return `${HEADER}${emitJs(groups, 'color')}\n${emitJs(groups, 'typography')}`
  }
})

StyleDictionary.registerFormat({
  name: 'typescript/namespaced',
  format: ({ dictionary }) => {
    const groups = buildTrees(dictionary.allTokens)
    return `${HEADER}${emitDts(groups, 'color')}\n${emitDts(groups, 'typography')}`
  }
})

const sd = new StyleDictionary({
  source: ['tokens/**/*.json'],
  preprocessors: ['tokens-studio'],
  platforms: {
    css: {
      transformGroup: 'tokens-studio',
      buildPath: 'dist/',
      files: [{ destination: 'variables.css', format: 'css/namespaced' }]
    },
    js: {
      transformGroup: 'tokens-studio',
      buildPath: 'dist/',
      files: [{ destination: 'tokens.js', format: 'javascript/namespaced' }]
    },
    ts: {
      transformGroup: 'tokens-studio',
      buildPath: 'dist/',
      files: [{ destination: 'tokens.d.ts', format: 'typescript/namespaced' }]
    }
  }
})

await sd.cleanAllPlatforms()
await sd.buildAllPlatforms()

function logDiff(curr) {
  const { green, red, yellow, reset } = ANSI
  if (!existsSync(CACHE_PATH)) {
    console.log(`${green}●${reset} Initial snapshot saved (${Object.keys(curr).length} tokens).`)
    return
  }
  const prev = JSON.parse(readFileSync(CACHE_PATH, 'utf8'))
  const added = [],
    removed = [],
    changed = []
  for (const k of Object.keys(curr)) {
    if (!(k in prev)) added.push(k)
    else if (JSON.stringify(prev[k]) !== JSON.stringify(curr[k])) changed.push(k)
  }
  for (const k of Object.keys(prev)) if (!(k in curr)) removed.push(k)

  const total = added.length + removed.length + changed.length
  if (total === 0) {
    console.log(`${green}●${reset} No token changes.`)
    return
  }
  console.log(`${yellow}●${reset} ${total} token change${total === 1 ? '' : 's'}:`)
  for (const k of added) console.log(`  ${green}+${reset} ${k}: ${JSON.stringify(curr[k])}`)
  for (const k of removed) console.log(`  ${red}-${reset} ${k}: ${JSON.stringify(prev[k])}`)
  for (const k of changed) console.log(`  ${yellow}~${reset} ${k}: ${JSON.stringify(prev[k])} → ${JSON.stringify(curr[k])}`)
}

logDiff(sourceSnapshot ?? {})
writeFileSync(CACHE_PATH, JSON.stringify(sourceSnapshot ?? {}, null, 2))

console.log('✅ Token build complete!')
