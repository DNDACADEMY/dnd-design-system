import { HTMLAttributes, ReactNode } from 'react'

import { SidebarCollapsible } from './Collapsible'
import { cx } from '../../../utils/cx'
import { Txt } from '../../txt'
import { SidebarGroupContextProvider } from '../context'
import { groupLabelContainerCss, groupListCss } from '../style.css'

export interface SidebarGroupProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * 그룹의 제목을 설정해요.
   */
  label?: ReactNode
}

export const SidebarGroup = (props: SidebarGroupProps) => {
  const { label, children, className: classNameFromProps, ...restProps } = props
  const hasLabel = label != null

  return (
    <div role='group'>
      <SidebarCollapsible>
        <div
          className={cx(groupLabelContainerCss, classNameFromProps)}
          {...restProps}>
          {hasLabel ? (
            <Txt
              color='inherit'
              typography='label1'>
              {label}
            </Txt>
          ) : null}
        </div>
      </SidebarCollapsible>
      <SidebarGroupContextProvider isIncluded={true}>
        <ul
          role='menu'
          className={groupListCss}>
          {children}
        </ul>
      </SidebarGroupContextProvider>
    </div>
  )
}

SidebarGroup.displayName = 'Sidebar.Group'
