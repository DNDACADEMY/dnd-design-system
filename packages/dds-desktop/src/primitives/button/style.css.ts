import { color } from '@dnd-lab/token'
import { createVar } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

const buttonVariants = {
  backgroundColor: createVar(),
  hoverBackgroundColor: createVar(),
  disabledBackgroundColor: createVar(),
  boxShadow: createVar(),
  color: createVar(),
  padding: createVar()
} as const

export const buttonCss = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    color: buttonVariants.color,
    padding: buttonVariants.padding,
    backgroundColor: buttonVariants.backgroundColor,
    borderRadius: '4px',

    transition: 'background-color 0.3s ease',
    boxShadow: buttonVariants.boxShadow,
    border: 'none',

    selectors: {
      '&:hover': {
        backgroundColor: buttonVariants.hoverBackgroundColor
      },
      '&:disabled': {
        backgroundColor: buttonVariants.disabledBackgroundColor,
        color: color.semantic.text.neutral.disabled
      }
    }
  },
  variants: {
    size: {
      small: {
        vars: {
          [buttonVariants.padding]: '7.5px 12px'
        }
      },
      medium: {
        vars: {
          [buttonVariants.padding]: '7px 12px'
        }
      },
      large: {
        vars: {
          [buttonVariants.padding]: '9px 24px'
        }
      },
      xlarge: {
        vars: {
          [buttonVariants.padding]: '13px 24px'
        }
      }
    },
    variant: {
      primary: {
        vars: {
          [buttonVariants.backgroundColor]: color.semantic.background.brand.primary,
          [buttonVariants.hoverBackgroundColor]: color.semantic.background.brand.hover,
          [buttonVariants.disabledBackgroundColor]: color.semantic.background.brand.disabled,
          [buttonVariants.color]: color.semantic.text.brand.onBrand
        }
      },
      secondary: {
        vars: {
          [buttonVariants.backgroundColor]: color.semantic.background.neutral.secondary,
          [buttonVariants.hoverBackgroundColor]: color.semantic.background.neutral.hover,
          [buttonVariants.disabledBackgroundColor]: color.semantic.background.neutral.disabled,
          [buttonVariants.color]: color.semantic.text.neutral.primary
        }
      },
      assistive: {
        vars: {
          [buttonVariants.backgroundColor]: color.semantic.background.neutral.primary,
          [buttonVariants.hoverBackgroundColor]: color.primitive.slate['100'],
          [buttonVariants.disabledBackgroundColor]: color.semantic.background.neutral.secondary,
          [buttonVariants.color]: color.semantic.text.neutral.primary
        }
      },
      outline: {
        vars: {
          [buttonVariants.backgroundColor]: color.primitive.mono.white,
          [buttonVariants.hoverBackgroundColor]: color.semantic.background.neutral.primary,
          [buttonVariants.disabledBackgroundColor]: color.semantic.background.neutral.secondary,
          [buttonVariants.color]: color.semantic.text.neutral.primary,
          [buttonVariants.boxShadow]: `0 0 0 1px ${color.semantic.border.neutral.medium}`
        }
      }
    }
  }
})

const containerVariants = {
  minHeight: createVar()
} as const

export const containerCss = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    color: 'inherit',
    minHeight: containerVariants.minHeight
  },
  variants: {
    size: {
      small: {
        vars: {
          [containerVariants.minHeight]: '17px'
        }
      },
      medium: {
        vars: {
          [containerVariants.minHeight]: '22px'
        }
      },
      large: {
        vars: {
          [containerVariants.minHeight]: '22px'
        }
      },
      xlarge: {
        vars: {
          [containerVariants.minHeight]: '22px'
        }
      }
    }
  }
})
