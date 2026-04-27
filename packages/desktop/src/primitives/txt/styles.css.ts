import { typography } from '@dnd-lab/token'
import { globalFontFace, StyleRule } from '@vanilla-extract/css'
import { createVar } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

import { Typography } from './types'

const pretendard = 'pretendard'

globalFontFace(pretendard, [
  {
    src: 'url(/assets/fonts/Pretendard-Regular.subset.woff2) format("woff2")',
    fontWeight: '400',
    fontStyle: 'normal'
  },
  {
    src: 'url(/assets/fonts/Pretendard-Medium.subset.woff2) format("woff2")',
    fontWeight: '500',
    fontStyle: 'medium'
  },
  {
    src: 'url(/assets/fonts/Pretendard-Bold.subset.woff2) format("woff2")',
    fontWeight: '600',
    fontStyle: 'bold'
  }
])

const TYPOGRAPHY_VARIANTS = {
  size: createVar(),
  lineHeight: createVar(),
  fontWeight: createVar(),
  letterSpacing: createVar()
} as const

export const typographyCss = recipe({
  base: {
    fontFamily: `${pretendard}, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif`,
    fontSize: TYPOGRAPHY_VARIANTS.size,
    lineHeight: TYPOGRAPHY_VARIANTS.lineHeight,
    fontWeight: TYPOGRAPHY_VARIANTS.fontWeight,
    letterSpacing: TYPOGRAPHY_VARIANTS.letterSpacing
  },
  variants: {
    typography: {
      display1: {
        vars: {
          [TYPOGRAPHY_VARIANTS.size]: `${typography.semantic.display['1'].size}px`,
          [TYPOGRAPHY_VARIANTS.lineHeight]: `${typography.semantic.display['1'].lineHeight}px`,
          [TYPOGRAPHY_VARIANTS.fontWeight]: `${typography.semantic.display['1'].fontWeight}`,
          [TYPOGRAPHY_VARIANTS.letterSpacing]: `${typography.semantic.display['1'].letterSpacing}px`
        }
      },
      display2: {
        vars: {
          [TYPOGRAPHY_VARIANTS.size]: `${typography.semantic.display['2'].size}px`,
          [TYPOGRAPHY_VARIANTS.lineHeight]: `${typography.semantic.display['2'].lineHeight}px`,
          [TYPOGRAPHY_VARIANTS.fontWeight]: `${typography.semantic.display['2'].fontWeight}`,
          [TYPOGRAPHY_VARIANTS.letterSpacing]: `${typography.semantic.display['2'].letterSpacing}px`
        }
      },
      display3: {
        vars: {
          [TYPOGRAPHY_VARIANTS.size]: `${typography.semantic.display['3'].size}px`,
          [TYPOGRAPHY_VARIANTS.lineHeight]: `${typography.semantic.display['3'].lineHeight}px`,
          [TYPOGRAPHY_VARIANTS.fontWeight]: `${typography.semantic.display['3'].fontWeight}`,
          [TYPOGRAPHY_VARIANTS.letterSpacing]: `${typography.semantic.display['3'].letterSpacing}px`
        }
      },
      display4: {
        vars: {
          [TYPOGRAPHY_VARIANTS.size]: `${typography.semantic.display['4'].size}px`,
          [TYPOGRAPHY_VARIANTS.lineHeight]: `${typography.semantic.display['4'].lineHeight}px`,
          [TYPOGRAPHY_VARIANTS.fontWeight]: `${typography.semantic.display['4'].fontWeight}`,
          [TYPOGRAPHY_VARIANTS.letterSpacing]: `${typography.semantic.display['4'].letterSpacing}px`
        }
      },
      title1: {
        vars: {
          [TYPOGRAPHY_VARIANTS.size]: `${typography.semantic.title['1'].size}px`,
          [TYPOGRAPHY_VARIANTS.lineHeight]: `${typography.semantic.title['1'].lineHeight}px`,
          [TYPOGRAPHY_VARIANTS.fontWeight]: `${typography.semantic.title['1'].fontWeight}`,
          [TYPOGRAPHY_VARIANTS.letterSpacing]: `${typography.semantic.title['1'].letterSpacing}px`
        }
      },
      title2: {
        vars: {
          [TYPOGRAPHY_VARIANTS.size]: `${typography.semantic.title['2'].size}px`,
          [TYPOGRAPHY_VARIANTS.lineHeight]: `${typography.semantic.title['2'].lineHeight}px`,
          [TYPOGRAPHY_VARIANTS.fontWeight]: `${typography.semantic.title['2'].fontWeight}`,
          [TYPOGRAPHY_VARIANTS.letterSpacing]: `${typography.semantic.title['2'].letterSpacing}px`
        }
      },
      title3: {
        vars: {
          [TYPOGRAPHY_VARIANTS.size]: `${typography.semantic.title['3'].size}px`,
          [TYPOGRAPHY_VARIANTS.lineHeight]: `${typography.semantic.title['3'].lineHeight}px`,
          [TYPOGRAPHY_VARIANTS.fontWeight]: `${typography.semantic.title['3'].fontWeight}`,
          [TYPOGRAPHY_VARIANTS.letterSpacing]: `${typography.semantic.title['3'].letterSpacing}px`
        }
      },
      title4: {
        vars: {
          [TYPOGRAPHY_VARIANTS.size]: `${typography.semantic.title['4'].size}px`,
          [TYPOGRAPHY_VARIANTS.lineHeight]: `${typography.semantic.title['4'].lineHeight}px`,
          [TYPOGRAPHY_VARIANTS.fontWeight]: `${typography.semantic.title['4'].fontWeight}`,
          [TYPOGRAPHY_VARIANTS.letterSpacing]: `${typography.semantic.title['4'].letterSpacing}px`
        }
      },
      body1: {
        vars: {
          [TYPOGRAPHY_VARIANTS.size]: `${typography.semantic.body['1'].size}px`,
          [TYPOGRAPHY_VARIANTS.lineHeight]: `${typography.semantic.body['1'].lineHeight}px`,
          [TYPOGRAPHY_VARIANTS.fontWeight]: `${typography.semantic.body['1'].fontWeight}`,
          [TYPOGRAPHY_VARIANTS.letterSpacing]: `${typography.semantic.body['1'].letterSpacing}px`
        }
      },
      body2: {
        vars: {
          [TYPOGRAPHY_VARIANTS.size]: `${typography.semantic.body['2'].size}px`,
          [TYPOGRAPHY_VARIANTS.lineHeight]: `${typography.semantic.body['2'].lineHeight}px`,
          [TYPOGRAPHY_VARIANTS.fontWeight]: `${typography.semantic.body['2'].fontWeight}`,
          [TYPOGRAPHY_VARIANTS.letterSpacing]: `${typography.semantic.body['2'].letterSpacing}px`
        }
      },
      body3: {
        vars: {
          [TYPOGRAPHY_VARIANTS.size]: `${typography.semantic.body['3'].size}px`,
          [TYPOGRAPHY_VARIANTS.lineHeight]: `${typography.semantic.body['3'].lineHeight}px`,
          [TYPOGRAPHY_VARIANTS.fontWeight]: `${typography.semantic.body['3'].fontWeight}`,
          [TYPOGRAPHY_VARIANTS.letterSpacing]: `${typography.semantic.body['3'].letterSpacing}px`
        }
      },
      label1: {
        vars: {
          [TYPOGRAPHY_VARIANTS.size]: `${typography.semantic.label['1'].size}px`,
          [TYPOGRAPHY_VARIANTS.lineHeight]: `${typography.semantic.label['1'].lineHeight}px`,
          [TYPOGRAPHY_VARIANTS.fontWeight]: `${typography.semantic.label['1'].fontWeight}`,
          [TYPOGRAPHY_VARIANTS.letterSpacing]: `${typography.semantic.label['1'].letterSpacing}px`
        }
      },
      label2: {
        vars: {
          [TYPOGRAPHY_VARIANTS.size]: `${typography.semantic.label['2'].size}px`,
          [TYPOGRAPHY_VARIANTS.lineHeight]: `${typography.semantic.label['2'].lineHeight}px`,
          [TYPOGRAPHY_VARIANTS.fontWeight]: `${typography.semantic.label['2'].fontWeight}`,
          [TYPOGRAPHY_VARIANTS.letterSpacing]: `${typography.semantic.label['2'].letterSpacing}px`
        }
      },
      label3: {
        vars: {
          [TYPOGRAPHY_VARIANTS.size]: `${typography.semantic.label['3'].size}px`,
          [TYPOGRAPHY_VARIANTS.lineHeight]: `${typography.semantic.label['3'].lineHeight}px`,
          [TYPOGRAPHY_VARIANTS.fontWeight]: `${typography.semantic.label['3'].fontWeight}`,
          [TYPOGRAPHY_VARIANTS.letterSpacing]: `${typography.semantic.label['3'].letterSpacing}px`
        }
      }
    } satisfies Record<Typography, StyleRule>,
    emphasized: {
      true: {},
      false: {}
    }
  },
  compoundVariants: [
    {
      variants: {
        typography: 'title1',
        emphasized: true
      },
      style: {
        vars: {
          [TYPOGRAPHY_VARIANTS.fontWeight]: `${typography.semantic.title['1'].fontWeightEmphasized}`
        }
      }
    },
    {
      variants: {
        typography: 'title2',
        emphasized: true
      },
      style: {
        vars: {
          [TYPOGRAPHY_VARIANTS.fontWeight]: `${typography.semantic.title['2'].fontWeightEmphasized}`
        }
      }
    },
    {
      variants: {
        typography: 'title3',
        emphasized: true
      },
      style: {
        vars: {
          [TYPOGRAPHY_VARIANTS.fontWeight]: `${typography.semantic.title['3'].fontWeightEmphasized}`
        }
      }
    },
    {
      variants: {
        typography: 'title4',
        emphasized: true
      },
      style: {
        vars: {
          [TYPOGRAPHY_VARIANTS.fontWeight]: `${typography.semantic.title['4'].fontWeightEmphasized}`
        }
      }
    },
    {
      variants: {
        typography: 'body1',
        emphasized: true
      },
      style: {
        vars: {
          [TYPOGRAPHY_VARIANTS.fontWeight]: `${typography.semantic.body['1'].fontWeightEmphasized}`
        }
      }
    },
    {
      variants: {
        typography: 'body2',
        emphasized: true
      },
      style: {
        vars: {
          [TYPOGRAPHY_VARIANTS.fontWeight]: `${typography.semantic.body['2'].fontWeightEmphasized}`
        }
      }
    },
    {
      variants: {
        typography: 'body3',
        emphasized: true
      },
      style: {
        vars: {
          [TYPOGRAPHY_VARIANTS.fontWeight]: `${typography.semantic.body['3'].fontWeightEmphasized}`
        }
      }
    },
    {
      variants: {
        typography: 'label1',
        emphasized: true
      },
      style: {
        vars: {
          [TYPOGRAPHY_VARIANTS.fontWeight]: `${typography.semantic.label['1'].fontWeightEmphasized}`
        }
      }
    },
    {
      variants: {
        typography: 'label2',
        emphasized: true
      },
      style: {
        vars: {
          [TYPOGRAPHY_VARIANTS.fontWeight]: `${typography.semantic.label['2'].fontWeightEmphasized}`
        }
      }
    },
    {
      variants: {
        typography: 'label3',
        emphasized: true
      },
      style: {
        vars: {
          [TYPOGRAPHY_VARIANTS.fontWeight]: `${typography.semantic.label['3'].fontWeightEmphasized}`
        }
      }
    }
  ]
})
