import { color } from '@dnd-lab/token'
import { createVar, style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

const TEXTFIELD_VARIANTS = {
  height: createVar(),
  color: createVar()
} as const

export const textfieldContentCss = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  variants: {
    size: {
      small: {
        vars: {
          [TEXTFIELD_VARIANTS.height]: '32px'
        }
      },
      medium: {
        vars: {
          [TEXTFIELD_VARIANTS.height]: '40px'
        }
      },
      large: {
        vars: {
          [TEXTFIELD_VARIANTS.height]: '48px'
        }
      }
    }
  }
})

export const textfieldCss = style({
  flex: 1,
  padding: 0,
  backgroundColor: 'transparent',
  border: 'none',
  outline: 'none',
  height: TEXTFIELD_VARIANTS.height,
  vars: {
    [TEXTFIELD_VARIANTS.color]: color.semantic.text.neutral.primary
  },
  selectors: {
    '&::placeholder': {
      color: color.semantic.text.neutral.secondary
    }
  }
})
