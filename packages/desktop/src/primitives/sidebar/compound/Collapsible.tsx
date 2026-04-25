import { HTMLAttributes } from 'react'

import { cx } from '../../../utils/cx'
import { useSidebarContext } from '../context'
import { collapsedHiddenStyle, visuallyHiddenStyle } from '../style.css'

export interface SidebarCollapsibleProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * 사이드바가 닫힌 상태일 때도 스크린리더에 노출할지 여부를 설정해요.
   * true일 경우 시각적으로만 숨겨져요.
   * @default true
   */
  keepAccessibleWhenCollapsed?: boolean
}

export const SidebarCollapsible = (props: SidebarCollapsibleProps) => {
  const { keepAccessibleWhenCollapsed = true, className: classNameFromProps, ...restProps } = props
  const { open } = useSidebarContext('Sidebar.Collapsible')

  return (
    <div
      className={cx(classNameFromProps, !open && (keepAccessibleWhenCollapsed ? visuallyHiddenStyle : collapsedHiddenStyle))}
      data-state={open ? 'open' : 'closed'}
      {...restProps}
    />
  )
}

SidebarCollapsible.displayName = 'Sidebar.Collapsible'
