/* eslint-disable no-undef */
import { existsSync, readFileSync, writeFileSync } from 'node:fs'

import { register } from '@tokens-studio/sd-transforms'
import StyleDictionary from 'style-dictionary'

const TOKEN_SOURCE_GLOB = 'tokens/**/*.json'
const DIST_PATH = 'dist/'
const CACHE_PATH = '.tokens-cache.json'
const HEADER = '/**\n * Do not edit directly, this file was auto-generated.\n */\n\n'
const IDENTIFIER_REGEX = /^[A-Za-z_$][\w$]*$/
const REFERENCE_REGEX = /^\{(.+)\}$/
const NUMBER_REGEX = /^\d+$/

const ANSI = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  reset: '\x1b[0m'
}

const TOKEN_EXPORTS = {
  color: {
    sourceFile: 'color.json',
    valueType: 'string',
    cssVariablePrefix: '--color-'
  },
  typography: {
    sourceFile: 'typography.json',
    valueType: 'number'
  }
}

const EXPORT_NAMES = Object.keys(TOKEN_EXPORTS)
const NAMESPACES = ['primitive', 'semantic', 'component']

const FORMAT_NAMES = {
  css: 'css/namespaced',
  javascript: 'javascript/namespaced',
  typescript: 'typescript/namespaced'
}

const OUTPUT_FILES = {
  css: 'variables.css',
  javascript: 'tokens.js',
  typescript: 'tokens.d.ts'
}

register(StyleDictionary)

const camel = (s) =>
  s
    .split(/[-_\s]+/)
    .map((w, i) => (i === 0 ? w[0].toLowerCase() + w.slice(1) : w[0].toUpperCase() + w.slice(1)))
    .join('')

const kebab = (s) => s.replace(/[-_\s]+/g, '-').toLowerCase()
const capitalize = (s) => s[0].toUpperCase() + s.slice(1)
const jsKey = (s) => (NUMBER_REGEX.test(s) ? s : camel(s))
const formatKey = (k) => (IDENTIFIER_REGEX.test(k) ? k : JSON.stringify(k))
const accessor = (parts) =>
  parts.map((part) => (IDENTIFIER_REGEX.test(part) ? `.${part}` : `[${JSON.stringify(part)}]`)).join('')

function getExportName(token) {
  const match = EXPORT_NAMES.find((exportName) => token.filePath.includes(TOKEN_EXPORTS[exportName].sourceFile))
  return match ?? 'typography'
}

const rootVar = (exportName, namespace) => exportName + capitalize(namespace)
const tokenValue = (token) => token.$value ?? token.value
const originalValue = (token) => token.original?.$value ?? token.original?.value

function parseRef(token) {
  const value = originalValue(token)
  if (typeof value !== 'string') return null

  const match = value.trim().match(REFERENCE_REGEX)
  return match ? match[1].split('.') : null
}

class Ref {
  constructor(rootVarName, jsPath, valueType) {
    this.rootVar = rootVarName
    this.jsPath = jsPath
    this.valueType = valueType
  }
}

function setNested(root, path, value) {
  let current = root
  for (let i = 0; i < path.length - 1; i++) current = current[path[i]] ??= {}
  current[path.at(-1)] = value
}

function createEmptyNamespaceTree() {
  return Object.fromEntries(NAMESPACES.map((namespace) => [namespace, {}]))
}

function createInitialGroups() {
  return Object.fromEntries(EXPORT_NAMES.map((exportName) => [exportName, createEmptyNamespaceTree()]))
}

function getColorCssVar(pathParts) {
  return `${TOKEN_EXPORTS.color.cssVariablePrefix}${pathParts.map(kebab).join('-')}`
}

function createReferenceValue(exportName, refPath) {
  const [refNamespace, ...refRestPath] = refPath
  return new Ref(rootVar(exportName, refNamespace), refRestPath.map(jsKey), TOKEN_EXPORTS[exportName].valueType)
}

function resolveTokenValue(token, exportName, namespace, refPath) {
  if (refPath && namespace !== 'primitive') {
    return createReferenceValue(exportName, refPath)
  }

  if (exportName === 'color') {
    return `var(${getColorCssVar(token.path.slice(1))})`
  }

  return tokenValue(token)
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
  const groups = createInitialGroups()

  for (const token of allTokens) {
    const exportName = getExportName(token)
    const [namespace, ...restPath] = token.path
    const jsPath = restPath.map(jsKey)
    const refPath = parseRef(token)
    const value = resolveTokenValue(token, exportName, namespace, refPath)

    setNested(groups[exportName][namespace], jsPath, value)
  }

  return groups
}

function emitJs(groups, exportName) {
  const trees = groups[exportName]
  const declarations = NAMESPACES.map((namespace) => `const ${rootVar(exportName, namespace)} = ${serialize(trees[namespace])}`)
  const members = NAMESPACES.map((namespace) => `  ${namespace}: ${rootVar(exportName, namespace)}`).join(',\n')
  return `${declarations.join('\n\n')}\n\nexport const ${exportName} = {\n${members}\n}\n`
}

function emitDts(groups, exportName) {
  const members = NAMESPACES.map((namespace) => `  readonly ${namespace}: ${declareType(groups[exportName][namespace], 1)}`).join('\n')
  return `export declare const ${exportName}: {\n${members}\n}\n`
}

StyleDictionary.registerFormat({
  name: FORMAT_NAMES.css,
  format: ({ dictionary }) => {
    const lines = []
    for (const token of dictionary.allTokens) {
      if (!token.filePath.includes(TOKEN_EXPORTS.color.sourceFile)) continue

      const name = getColorCssVar(token.path.slice(1))
      const ref = parseRef(token)
      const value = ref ? `var(${getColorCssVar(ref.slice(1))})` : tokenValue(token)
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
  name: FORMAT_NAMES.javascript,
  format: ({ dictionary }) => {
    captureSnapshot(dictionary.allTokens)
    const groups = buildTrees(dictionary.allTokens)
    return `${HEADER}${emitJs(groups, 'color')}\n${emitJs(groups, 'typography')}`
  }
})

StyleDictionary.registerFormat({
  name: FORMAT_NAMES.typescript,
  format: ({ dictionary }) => {
    const groups = buildTrees(dictionary.allTokens)
    return `${HEADER}${emitDts(groups, 'color')}\n${emitDts(groups, 'typography')}`
  }
})

const sd = new StyleDictionary({
  source: [TOKEN_SOURCE_GLOB],
  preprocessors: ['tokens-studio'],
  platforms: {
    css: {
      transformGroup: 'tokens-studio',
      buildPath: DIST_PATH,
      files: [{ destination: OUTPUT_FILES.css, format: FORMAT_NAMES.css }]
    },
    js: {
      transformGroup: 'tokens-studio',
      buildPath: DIST_PATH,
      files: [{ destination: OUTPUT_FILES.javascript, format: FORMAT_NAMES.javascript }]
    },
    ts: {
      transformGroup: 'tokens-studio',
      buildPath: DIST_PATH,
      files: [{ destination: OUTPUT_FILES.typescript, format: FORMAT_NAMES.typescript }]
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
  const added = []
  const removed = []
  const changed = []
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
