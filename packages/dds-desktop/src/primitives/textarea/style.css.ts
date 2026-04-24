import { color } from '@dnd-lab/token'
import { style } from '@vanilla-extract/css'

export const contentCss = style({
  padding: '12px 16px',
  alignItems: 'flex-start'
})

export const TextareaCss = style({
  flex: 1,
  backgroundColor: 'transparent',
  padding: 0,
  border: 'none',
  outline: 'none',
  color: color.semantic.text.neutral.primary,

  selectors: {
    '&::placeholder': {
      color: color.semantic.text.neutral.secondary
    }
  }
})
