import { config as reactInternalConfig } from '@dnd-lab/eslint-config/react-internal'
import storybook from 'eslint-plugin-storybook'

/** @type {import("eslint").Linter.Config} */
export default [...reactInternalConfig, ...storybook.configs['flat/recommended']]
