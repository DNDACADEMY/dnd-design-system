import { primitive, semantic } from '@dds/token'
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
        color: semantic.color.labelDisable
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
          [buttonVariants.backgroundColor]: semantic.color.buttonPrimary,
          [buttonVariants.hoverBackgroundColor]: semantic.color.buttonPrimaryHover,
          [buttonVariants.disabledBackgroundColor]: semantic.color.buttonSecondary,
          [buttonVariants.color]: semantic.color.labelTitle
        }
      },
      secondary: {
        vars: {
          [buttonVariants.backgroundColor]: semantic.color.buttonSecondary,
          [buttonVariants.hoverBackgroundColor]: semantic.color.buttonSecondaryHover,
          [buttonVariants.disabledBackgroundColor]: semantic.color.buttonSecondary,
          [buttonVariants.color]: semantic.color.labelInverse
        }
      },
      assistive: {
        vars: {
          [buttonVariants.backgroundColor]: semantic.color.buttonPrimary,
          [buttonVariants.hoverBackgroundColor]: primitive.color.gray100,
          [buttonVariants.disabledBackgroundColor]: semantic.color.backgroundSeconday,
          [buttonVariants.color]: semantic.color.labelTitle
        }
      },
      outline: {
        vars: {
          [buttonVariants.backgroundColor]: primitive.color.mono000,
          [buttonVariants.hoverBackgroundColor]: semantic.color.backgroundPrimary,
          [buttonVariants.disabledBackgroundColor]: semantic.color.backgroundSeconday,
          [buttonVariants.color]: semantic.color.labelTitle,
          [buttonVariants.boxShadow]: `0 0 0 1px ${semantic.color.borderDefault}`
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
