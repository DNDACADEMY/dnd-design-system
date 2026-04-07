import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'

import type { StorybookConfig } from '@storybook/react-vite'

const require = createRequire(import.meta.url)

const getAbsolutePath = (value: string): string => {
  return dirname(require.resolve(join(value, 'package.json')))
}

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    getAbsolutePath('@chromatic-com/storybook'),
    getAbsolutePath('@storybook/addon-vitest'),
    getAbsolutePath('@storybook/addon-a11y'),
    getAbsolutePath('@storybook/addon-docs')
  ],
  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
    options: {
      builder: {
        viteConfigPath: join(process.cwd(), 'vite.config.ts')
      }
    }
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript'
  }
}

export default config
