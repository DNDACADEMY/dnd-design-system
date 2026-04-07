import { primitive, semantic } from '@dds/token'
import { createVar, style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

export const fieldboxContainerCss = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px'
})

const fieldBoxContentVariants = {
  minHeight: createVar(),
  backgroundColor: createVar(),
  borderColor: createVar(),
  gap: createVar()
} as const

export const fieldboxContentCss = recipe({
  base: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: fieldBoxContentVariants.gap,
    minHeight: fieldBoxContentVariants.minHeight,
    borderRadius: 6,
    backgroundColor: fieldBoxContentVariants.backgroundColor,
    border: `1px solid ${fieldBoxContentVariants.borderColor}`,
    transition: 'border-color 0.2s ease-in-out',
    vars: {
      [fieldBoxContentVariants.backgroundColor]: primitive.color.mono000,
      [fieldBoxContentVariants.borderColor]: semantic.color.borderStrong
    },
    selectors: {
      '&:focus-within': {
        vars: {
          [fieldBoxContentVariants.borderColor]: primitive.color.cyan400
        }
      }
    }
  },
  variants: {
    size: {
      small: {
        padding: '0 16px',
        vars: {
          [fieldBoxContentVariants.minHeight]: '32px',
          [fieldBoxContentVariants.gap]: '4px'
        }
      },
      medium: {
        padding: '0 16px',
        vars: {
          [fieldBoxContentVariants.minHeight]: '42px',
          [fieldBoxContentVariants.gap]: '8px'
        }
      },
      large: {
        padding: '0 16px',
        vars: {
          [fieldBoxContentVariants.minHeight]: '48px',
          [fieldBoxContentVariants.gap]: '8px'
        }
      }
    },
    error: {
      true: {
        vars: {
          [fieldBoxContentVariants.borderColor]: semantic.color.badgeRed
        }
      }
    },
    disabled: {
      true: {
        pointerEvents: 'none',
        vars: {
          [fieldBoxContentVariants.backgroundColor]: primitive.color.gray100,
          [fieldBoxContentVariants.borderColor]: primitive.color.gray300
        }
      }
    },
    readonly: {
      true: {
        vars: {
          [fieldBoxContentVariants.backgroundColor]: semantic.color.backgroundPrimary,
          [fieldBoxContentVariants.borderColor]: primitive.color.gray100
        }
      }
    }
  }
})

export const bottomTxtCss = style({
  margin: 0
})

export const requiredStyleCss = style({
  marginLeft: '2px',
  color: semantic.color.badgeRed
})
