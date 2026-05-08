import { color } from '@dnd-lab/token'
import { createVar, style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

import { FieldBoxSize } from './type'

export const fieldboxContainerCss = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px'
})

export const fieldBoxContentVariants = {
  minHeight: createVar(),
  backgroundColor: createVar(),
  borderColor: createVar(),
  gap: createVar()
} as const

const FIELDBOX_VARIANTS = {
  MIN_HEIGHT: {
    small: '32px',
    medium: '42px',
    large: '48px'
  } satisfies Record<FieldBoxSize, string>,
  ADDON_GAP: {
    small: '4px',
    medium: '8px',
    large: '8px'
  } satisfies Record<FieldBoxSize, string>,
  RADIUS: 6
} as const

export const fieldboxContentCss = recipe({
  base: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: fieldBoxContentVariants.gap,
    minHeight: fieldBoxContentVariants.minHeight,
    borderRadius: FIELDBOX_VARIANTS.RADIUS,
    backgroundColor: fieldBoxContentVariants.backgroundColor,
    border: `1px solid ${fieldBoxContentVariants.borderColor}`,
    transition: 'border-color 0.2s ease-in-out',
    vars: {
      [fieldBoxContentVariants.backgroundColor]: color.semantic.background.neutral.canvas,
      [fieldBoxContentVariants.borderColor]: color.semantic.border.neutral.medium
    },
    selectors: {
      '&:hover': {
        vars: {
          [fieldBoxContentVariants.borderColor]: color.semantic.border.neutral.hover
        }
      },
      '&:focus-within': {
        vars: {
          [fieldBoxContentVariants.borderColor]: color.semantic.border.neutral.focus
        }
      }
    }
  },
  variants: {
    size: {
      small: {
        padding: '0 16px',
        vars: {
          [fieldBoxContentVariants.minHeight]: FIELDBOX_VARIANTS.MIN_HEIGHT.small,
          [fieldBoxContentVariants.gap]: FIELDBOX_VARIANTS.ADDON_GAP.small
        }
      },
      medium: {
        padding: '0 16px',
        vars: {
          [fieldBoxContentVariants.minHeight]: FIELDBOX_VARIANTS.MIN_HEIGHT.medium,
          [fieldBoxContentVariants.gap]: FIELDBOX_VARIANTS.ADDON_GAP.medium
        }
      },
      large: {
        padding: '0 16px',
        vars: {
          [fieldBoxContentVariants.minHeight]: FIELDBOX_VARIANTS.MIN_HEIGHT.large,
          [fieldBoxContentVariants.gap]: FIELDBOX_VARIANTS.ADDON_GAP.large
        }
      }
    },
    disabled: {
      true: {
        pointerEvents: 'none',
        vars: {
          [fieldBoxContentVariants.backgroundColor]: color.semantic.background.neutral.disabled,
          [fieldBoxContentVariants.borderColor]: color.semantic.border.neutral.disabled
        }
      }
    },
    readonly: {
      true: {
        vars: {
          [fieldBoxContentVariants.backgroundColor]: color.semantic.background.neutral.tertiary,
          [fieldBoxContentVariants.borderColor]: color.semantic.border.neutral.medium
        }
      }
    },
    error: {
      true: {
        vars: {
          [fieldBoxContentVariants.backgroundColor]: color.semantic.background.neutral.canvas,
          [fieldBoxContentVariants.borderColor]: color.semantic.border.error.strong
        }
      }
    }
  }
})

const bottomTxtVariants = {
  color: createVar()
} as const

export const bottomTxtCss = recipe({
  base: {
    margin: 0,
    color: bottomTxtVariants.color,
    vars: {
      [bottomTxtVariants.color]: color.semantic.text.neutral.quaternary
    }
  },
  variants: {
    error: {
      true: {
        vars: {
          [bottomTxtVariants.color]: color.semantic.text.error.primary
        }
      }
    }
  }
})

export const requiredStyleCss = style({
  marginLeft: '2px',
  color: color.semantic.text.error.primary
})
