import { config as reactInternalConfig } from '@dds/eslint-config/react-internal'
import storybook from 'eslint-plugin-storybook'

/** @type {import("eslint").Linter.Config} */
export default [...reactInternalConfig, ...storybook.configs['flat/recommended']]
