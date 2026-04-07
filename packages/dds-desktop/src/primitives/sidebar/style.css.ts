import { semantic } from '@dds/token'
import { createVar, style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

const DEFAULT_VERTICAL_PADDING = 20
const DEFAULT_HORIZONTAL_PADDING = 24

const containerVariants = {
  verticalPadding: createVar()
} as const

export const containerStyle = recipe({
  base: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: semantic.color.backgroundSeconday,
    height: '100vh',
    paddingTop: containerVariants.verticalPadding,
    paddingBottom: containerVariants.verticalPadding
  },
  variants: {
    open: {
      true: {
        vars: {
          [containerVariants.verticalPadding]: `${DEFAULT_VERTICAL_PADDING}px`
        }
      },
      false: {
        vars: {
          [containerVariants.verticalPadding]: '40px'
        }
      }
    }
  }
})

const affixVariants = {
  paddingLeft: createVar(),
  paddingRight: createVar()
} as const

export const affixStyle = recipe({
  base: {
    paddingLeft: affixVariants.paddingLeft,
    paddingRight: affixVariants.paddingRight
  },
  variants: {
    padded: {
      true: {},
      false: {}
    },
    open: {
      true: {},
      false: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }
  },
  compoundVariants: [
    {
      variants: {
        padded: true,
        open: true
      },
      style: {
        vars: {
          [affixVariants.paddingLeft]: `${DEFAULT_HORIZONTAL_PADDING}px`,
          [affixVariants.paddingRight]: `${DEFAULT_HORIZONTAL_PADDING}px`
        }
      }
    }
  ]
})

export const contentStyle = style({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  minHeight: 0
})

export const scrollAreaRootStyle = style({
  position: 'relative',
  flex: 1,
  minHeight: 0
})

export const scrollAreaViewportStyle = style({
  width: '100%',
  height: '100%'
})

export const scrollAreaScrollbarStyle = style({
  display: 'flex',
  width: 8,
  paddingTop: 4,
  paddingBottom: 4
})

export const scrollAreaThumbStyle = style({
  flex: 1,
  borderRadius: 9999,
  backgroundColor: semantic.color.borderDefault
})

export const collapsedHiddenStyle = style({
  display: 'none'
})

export const visuallyHiddenStyle = style({
  border: 0,
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  margin: -1,
  overflow: 'hidden',
  padding: 0,
  position: 'absolute',
  whiteSpace: 'nowrap',
  width: 1
})

const DEFAULT_ITEM_HORIZONTAL_PADDING = 16

const itemVariants = {
  paddingVertical: createVar(),
  paddingHorizontal: createVar(),
  flexDirection: createVar()
} as const

export const itemStyle = recipe({
  base: {
    listStyle: 'none',
    cursor: 'pointer',
    flexDirection: itemVariants.flexDirection,
    padding: `${DEFAULT_ITEM_HORIZONTAL_PADDING}px ${itemVariants.paddingHorizontal}`
  },
  variants: {
    isActive: {
      true: {
        color: semantic.color.badgePrimary
      },
      false: {
        color: semantic.color.labelTitle
      }
    },
    hasIcon: {
      true: {
        display: 'flex',
        alignItems: 'center',
        gap: 10
      }
    },
    open: {
      true: {
        vars: {
          [itemVariants.flexDirection]: 'row',
          [itemVariants.paddingHorizontal]: `${DEFAULT_HORIZONTAL_PADDING}px`
        }
      },
      false: {
        vars: {
          [itemVariants.flexDirection]: 'column',
          [itemVariants.paddingHorizontal]: '0px'
        }
      }
    }
  }
})

export const groupLabelContainerStyle = style({
  padding: `${DEFAULT_ITEM_HORIZONTAL_PADDING}px ${DEFAULT_HORIZONTAL_PADDING}px`,
  color: semantic.color.labelDisable
})

export const groupListStyle = style({
  listStyle: 'none',
  padding: 0,
  margin: 0
})

export const itemTextStyle = style({
  textAlign: 'center',
  whiteSpace: 'normal',
  wordBreak: 'keep-all',
  overflowWrap: 'normal'
})

export const triggerStyle = style({
  border: 'none',
  backgroundColor: 'transparent',
  cursor: 'pointer'
})

const DEFAULT_LOGO_SIZE = 40

export const logoStyle = recipe({
  base: {
    width: DEFAULT_LOGO_SIZE,
    aspectRatio: 1
  }
})
