export const TYPOGRAPHY_OPTIONS = [
  'display1',
  'display2',
  'display3',
  'display4',
  'title1',
  'title2',
  'title3',
  'title4',
  'body1',
  'body2',
  'body3',
  'label1',
  'label2',
  'label3'
] as const

export type Typography = (typeof TYPOGRAPHY_OPTIONS)[number]
