import { readFileSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import react from '@vitejs/plugin-react'
import { playwright } from '@vitest/browser-playwright'
import { globbySync } from 'globby'
import dts from 'vite-plugin-dts'
import { defineConfig, type Plugin } from 'vitest/config'

import pkg from './package.json' with { type: 'json' }

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const externalPackages = [...Object.keys(pkg.dependencies ?? {}), ...Object.keys(pkg.peerDependencies ?? {})]

function inlineTokenCss(): Plugin {
  return {
    name: 'inline-token-css',
    apply: 'build',
    enforce: 'post',
    writeBundle(options) {
      const outDir = options.dir ?? path.resolve(__dirname, 'dist')
      const require = createRequire(import.meta.url)
      const tokenCss = readFileSync(require.resolve('@dnd-lab/token/css'), 'utf8')
      const targets = globbySync('**/*.css', { cwd: outDir, absolute: true })
      for (const file of targets) {
        const existing = readFileSync(file, 'utf8')
        if (existing.startsWith(tokenCss)) continue
        writeFileSync(file, `${tokenCss}\n${existing}`)
      }
    }
  }
}

export default defineConfig({
  plugins: [
    react(),
    vanillaExtractPlugin(),
    inlineTokenCss(),
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
