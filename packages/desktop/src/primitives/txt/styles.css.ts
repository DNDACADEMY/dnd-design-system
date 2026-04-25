import { globalFontFace } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

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

export const typographyCss = recipe({
  base: {
    fontFamily: `${pretendard}, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif`
  },
  variants: {
    typography: {
      h4: {
        fontSize: '32px',
        lineHeight: '140%'
      },
      h5: {
        fontSize: '24px',
        lineHeight: '140%'
      },
      h6: {
        fontSize: '20px',
        lineHeight: '140%'
      },
      body1: {
        fontSize: '16px',
        lineHeight: '160%'
      },
      body2: {
        fontSize: '14px',
        lineHeight: '160%'
      },
      caption1: {
        fontSize: '12px',
        lineHeight: '140%'
      },
      caption2: {
        fontSize: '10px',
        lineHeight: '140%'
      }
    }
  }
})
