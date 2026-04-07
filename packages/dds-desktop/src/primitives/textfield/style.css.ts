import { semantic } from '@dds/token'
import { recipe } from '@vanilla-extract/recipes'
import { CSSProperties } from 'react'

import { TextfieldSize } from './type'

export const TextfieldCss = recipe({
  base: {
    flex: 1,
    padding: 0,
    backgroundColor: 'transparent',
    border: 'none',
    outline: 'none',

    selectors: {
      '&::placeholder': {
        color: semantic.color.labelSubtitle
      }
    }
  },
  variants: {
    size: {
      small: {
        minHeight: '17px'
      },
      medium: {
        minHeight: '22px'
      },
      large: {
        minHeight: '22px'
      }
    } satisfies Record<TextfieldSize, CSSProperties>
  }
})
