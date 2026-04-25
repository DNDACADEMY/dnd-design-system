import { HTMLAttributes } from 'react'

import { cx } from '../../../utils/cx'
import { useSidebarContext } from '../context'
import { affixStyle } from '../style.css'

export interface SidebarAffixProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * 기본 패딩을 사용할지 여부를 설정해요.
   * @default true
   */
  padded?: boolean
}

export const SidebarAffix = (props: SidebarAffixProps) => {
  const { padded = true, className: classNameFromProps, ...restProps } = props

  const { open } = useSidebarContext('Sidebar.Affix')

  return (
    <div
      className={cx(affixStyle({ padded, open }), classNameFromProps)}
      {...restProps}
    />
  )
}

SidebarAffix.displayName = 'Sidebar.Affix'
