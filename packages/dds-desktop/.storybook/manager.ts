import { addons } from 'storybook/manager-api'
import { create } from 'storybook/theming'

import { version } from '../package.json'

const theme = create({
  base: 'light',
  brandTitle: `DND Design System v${version}`,
  brandTarget: '_self'
})

addons.setConfig({
  theme
})
