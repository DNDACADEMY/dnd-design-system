import { CSSProperties, ElementType, HTMLAttributes } from 'react'

import { typographyCss } from './style.css'
import { withLineBreaks } from './utils/formatTxt'
import { cx } from '../../utils/cx'
import { forwardRefWithAs } from '../../utils/forwardRefWithAs'

import type { Typography } from './type'

export interface TxtProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * 텍스트 스타일을 설정해요.
   *
   * @default body2
   */
  typography?: Typography

  /**
   * 텍스트 강조 여부를 설정해요.
   *
   * @default false
   */
  emphasized?: boolean

  /**
   * 텍스트 색상을 설정해요.
   *
   * @default color.semantic.text.neutral.primary
   */
  color?: string
}

export const Txt = forwardRefWithAs<ElementType, TxtProps>((props, ref) => {
  const {
    as = 'span',
    typography = 'body2',
    children,
    emphasized = false,
    color: colorFromProps,
    className: classNameFromProps,
    style: styleFromProps,
    ...restProps
  } = props

  const Component = as

  const style: CSSProperties = {
    color: colorFromProps,
    ...styleFromProps
  }

  return (
    <Component
      ref={ref}
      className={cx(typographyCss({ typography, emphasized }), classNameFromProps)}
      style={style}
      {...restProps}>
      {typeof children === 'string' ? withLineBreaks(children) : children}
    </Component>
  )
})
