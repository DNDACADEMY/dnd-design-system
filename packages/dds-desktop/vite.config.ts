import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import react from '@vitejs/plugin-react'
import { playwright } from '@vitest/browser-playwright'
import dts from 'vite-plugin-dts'
import { defineConfig } from 'vitest/config'

import pkg from './package.json' with { type: 'json' }

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const externalPackages = [
  ...Object.keys(pkg.dependencies ?? {}),
  ...Object.keys(pkg.peerDependencies ?? {})
]

const isExternal = (id: string) =>
  externalPackages.some((name) => id === name || id.startsWith(`${name}/`))

export default defineConfig({
  // 1. 공통 플러그인
  plugins: [
    react(),
    vanillaExtractPlugin(),
    dts({
      include: ['src'],
      exclude: ['**/*.stories.tsx', '**/*.test.tsx', '**/*.test.ts']
    })
  ],

  // 2. 라이브러리 빌드 설정
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/primitives/index.tsx'),
      formats: ['es'],
      fileName: () => 'index.js'
    },
    rollupOptions: {
      external: isExternal
    },
    sourcemap: true
  },

  // 3. 테스트 설정 (Vitest + Storybook)
  test: {
    projects: [
      {
        extends: true,
        plugins: [
          // Storybook 테스트를 위한 전용 플러그인
          storybookTest({ configDir: path.join(__dirname, '.storybook') })
        ],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [{ browser: 'chromium' }]
          },
          setupFiles: ['.storybook/vitest.setup.ts'],
          retry: 1,
          testTimeout: 30000
        }
      }
    ]
  }
})
