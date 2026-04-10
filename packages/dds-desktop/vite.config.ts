import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import react from '@vitejs/plugin-react'
import { playwright } from '@vitest/browser-playwright'
import { globbySync } from 'globby'
import dts from 'vite-plugin-dts'
import { defineConfig } from 'vitest/config'

import pkg from './package.json' with { type: 'json' }

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const externalPackages = [...Object.keys(pkg.dependencies ?? {}), ...Object.keys(pkg.peerDependencies ?? {})]

export default defineConfig({
  plugins: [
    react(),
    vanillaExtractPlugin(),
    dts({
      include: ['src'],
      exclude: ['**/*.stories.tsx', '**/*.test.tsx', '**/*.test.ts']
    })
  ],

  build: {
    lib: {
      entry: globbySync('src/**/index.tsx', { cwd: __dirname, absolute: true }),
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      output: {
        preserveModules: true,
        preserveModulesRoot: 'src'
      },
      external: (id: string) => externalPackages.some((name) => id === name || id.startsWith(`${name}/`))
    },
    sourcemap: true
  },

  test: {
    projects: [
      {
        extends: true,
        plugins: [storybookTest({ configDir: path.join(__dirname, '.storybook') })],
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
