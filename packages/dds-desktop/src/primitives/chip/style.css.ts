import { primitive, semantic } from '@dds/token'
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
        backgroundColor: primitive.color.gray100
      },
      selected: {
        backgroundColor: semantic.color.buttonSecondary
      }
    } satisfies Record<ChipStatus, CSSProperties>
  }
})
