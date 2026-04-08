import { semantic } from '@dds-lab/token'
import { ElementType, HTMLAttributes, ReactNode } from 'react'

import { Txt } from '../txt'
import { ChipIcon } from './compound'
import { ChipContextProvider } from './context'
import { containerCss } from './style.css'
import { ChipStatus } from './type'
import { cx } from '../../utils/cx'
import { forwardRefWithAs } from '../../utils/forwardRefWithAs'

export interface ChipProps extends HTMLAttributes<ElementType> {
  /**
   * 칩의 왼쪽 영역을 설정해요.
   * 보통 아이콘을 배치할 때 사용해요.
   *
   * @default undefined
   */
  leftAddon?: ReactNode

  /**
   * 칩의 오른쪽 영역을 설정해요.
   * 보통 아이콘을 배치할 때 사용해요.
   *
   * @default undefined
   */
  rightAddon?: ReactNode

  /**
   * 칩의 타입을 설정해요.
   *
   * @default default
   */
  status?: ChipStatus
}

export const ChipImpl = forwardRefWithAs<ElementType, ChipProps>((props, ref) => {
  const { as = 'div', children, leftAddon, className: classNameFromProps, rightAddon, status = 'default', ...restProps } = props

  const Component = as

  return (
    <ChipContextProvider status={status}>
      <Component
        ref={ref}
        className={cx(containerCss({ status }), classNameFromProps)}
        {...restProps}>
        {leftAddon}
        <Txt
          typography='body2'
          fontWeight='bold'
          color={colorByStatusMap[status]}
          as='span'>
          {children}
        </Txt>
        {rightAddon}
      </Component>
    </ChipContextProvider>
  )
})

const colorByStatusMap: Record<ChipStatus, string> = {
  default: semantic.color.labelSubtitle,
  selected: semantic.color.labelInverse
}

export const Chip = Object.assign(ChipImpl, {
  Icon: ChipIcon
})
