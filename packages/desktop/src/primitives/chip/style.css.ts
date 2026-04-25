import { color } from '@dnd-lab/token'
import { recipe } from '@vanilla-extract/recipes'
import { CSSProperties } from 'react'

import { ChipStatus } from './type'

export const containerCss = recipe({
  base: {
    width: 'fit-content',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '22px',
    gap: '2px',
    padding: '4px 12px',
    borderRadius: '20px'
  },
  variants: {
    status: {
      default: {
        backgroundColor: color.primitive.slate['100']
      },
      selected: {
        backgroundColor: color.semantic.background.neutral.secondary
      }
    } satisfies Record<ChipStatus, CSSProperties>
  }
})
