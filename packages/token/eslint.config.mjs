import { config as baseConfig } from '@dnd-lab/eslint-config/base'

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...baseConfig,
  {
    ignores: ['tokens/**', '.tokens-cache.json']
  }
]
