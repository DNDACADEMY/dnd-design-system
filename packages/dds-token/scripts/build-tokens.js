/* eslint-disable no-undef */
import { register } from '@tokens-studio/sd-transforms'
import StyleDictionary from 'style-dictionary'

register(StyleDictionary)

// JavaScript 포맷
StyleDictionary.registerFormat({
  name: 'javascript/nested-object',
  format: ({ dictionary }) => {
    const primitive = {}
    const semantic = {}

    dictionary.allTokens.forEach((token) => {
      const path = token.path
      const category = path[0].toLowerCase()

      // semantic 토큰인지 primitive 토큰인지 구분
      const isPrimitive = token.filePath?.includes('primitive.json')
      const result = isPrimitive ? primitive : semantic

      if (!result[category]) {
        result[category] = {}
      }

      const key = path
        .slice(1)
        .map((part, index) => {
          if (index === 0) {
            return part.toLowerCase()
          }
          return part
        })
        .join('')

      // semantic 토큰은 primitive를 참조하도록 변수로 변환
      // token.original.$value에 원본 참조 값이 있음
      const originalValue = token.original?.$value || token.original?.value
      if (!isPrimitive && typeof originalValue === 'string' && originalValue.startsWith('{') && originalValue.endsWith('}')) {
        // {Color.Gray.500} -> primitive.color.gray500
        const refPath = originalValue.slice(1, -1).split('.')
        const refKey = refPath
          .slice(1)
          .map((part, index) => {
            if (index === 0) {
              return part.toLowerCase()
            }
            return part
          })
          .join('')
        result[category][key] = `primitive.${refPath[0].toLowerCase()}.${refKey}`
      } else {
        result[category][key] = token.$value || token.value
      }
    })

    let exports = ''

    // primitive export
    if (Object.keys(primitive).length > 0) {
      exports += Object.entries(primitive)
        .map(([key, value]) => `  ${key}: ${JSON.stringify(value, null, 2).replace(/\n/g, '\n  ')}`)
        .join(',\n')
      exports = `export const primitive = {\n${exports}\n};\n\n`
    }

    // semantic export (변수 참조 사용)
    if (Object.keys(semantic).length > 0) {
      const semanticExports = Object.entries(semantic)
        .map(([key, value]) => {
          const objectContent = Object.entries(value)
            .map(([k, v]) => {
              // 문자열이고 primitive로 시작하면 변수로 처리 (따옴표 제거)
              if (typeof v === 'string' && v.startsWith('primitive.')) {
                return `  ${k}: ${v}`
              }
              return `  ${k}: ${JSON.stringify(v)}`
            })
            .join(',\n')
          return `  ${key}: {\n${objectContent}\n  }`
        })
        .join(',\n')
      exports += `export const semantic = {\n${semanticExports}\n};\n`
    }

    return `/**
 * Do not edit directly, this file was auto-generated.
 */

${exports}
`
  }
})

// TypeScript 타입 정의 포맷
StyleDictionary.registerFormat({
  name: 'typescript/nested-declarations',
  format: ({ dictionary }) => {
    const primitive = {}
    const semantic = {}

    dictionary.allTokens.forEach((token) => {
      const path = token.path
      const category = path[0].toLowerCase()

      // semantic 토큰인지 primitive 토큰인지 구분
      const isPrimitive = token.filePath?.includes('primitive.json')
      const result = isPrimitive ? primitive : semantic

      if (!result[category]) {
        result[category] = {}
      }

      const key = path
        .slice(1)
        .map((part, index) => {
          if (index === 0) {
            return part.toLowerCase()
          }
          return part
        })
        .join('')

      result[category][key] = token.$value || token.value
    })

    let declarations = ''

    // primitive 타입 선언
    if (Object.keys(primitive).length > 0) {
      const primitiveDeclarations = Object.entries(primitive)
        .map(([key, value]) => {
          const type = typeof Object.values(value)[0] === 'number' ? 'number' : 'string'
          const keys = Object.keys(value)
            .map((k) => `    ${k}: ${type};`)
            .join('\n')
          return `  ${key}: {\n${keys}\n  };`
        })
        .join('\n')
      declarations += `export declare const primitive: {\n${primitiveDeclarations}\n};\n\n`
    }

    // semantic 타입 선언
    if (Object.keys(semantic).length > 0) {
      const semanticDeclarations = Object.entries(semantic)
        .map(([key, value]) => {
          const type = typeof Object.values(value)[0] === 'number' ? 'number' : 'string'
          const keys = Object.keys(value)
            .map((k) => `    ${k}: ${type};`)
            .join('\n')
          return `  ${key}: {\n${keys}\n  };`
        })
        .join('\n')
      declarations += `export declare const semantic: {\n${semanticDeclarations}\n};`
    }

    return `/**
 * Do not edit directly, this file was auto-generated.
 */

${declarations}
`
  }
})

const sd = new StyleDictionary({
  source: ['tokens/**/*.json'],
  preprocessors: ['tokens-studio'],
  platforms: {
    css: {
      transformGroup: 'tokens-studio',
      transforms: ['name/kebab'],
      buildPath: 'dist/',
      files: [
        {
          destination: 'variables.css',
          format: 'css/variables'
        }
      ]
    },
    js: {
      transformGroup: 'tokens-studio',
      buildPath: 'dist/',
      files: [
        {
          destination: 'tokens.js',
          format: 'javascript/nested-object'
        }
      ]
    },
    ts: {
      transformGroup: 'tokens-studio',
      buildPath: 'dist/',
      files: [
        {
          destination: 'tokens.d.ts',
          format: 'typescript/nested-declarations'
        }
      ]
    }
  }
})

await sd.cleanAllPlatforms()
await sd.buildAllPlatforms()

console.log('✅ Token build complete!')
