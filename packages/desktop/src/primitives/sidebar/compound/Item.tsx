import { ElementType, HTMLAttributes, KeyboardEvent } from 'react'

import { cx } from '../../../utils/cx'
import { forwardRefWithAs } from '../../../utils/forwardRefWithAs'
import { Icon, IconName } from '../../icon'
import { Txt } from '../../txt'
import { useSidebarContext, useSidebarGroupContext } from '../context'
import { itemStyle, itemTextStyle } from '../style.css'

export interface SidebarItemProps extends HTMLAttributes<HTMLElement> {
  /**
   * 아이템의 아이콘 이름을 설정해요.
   *
   * @example
   * <SidebarItem iconName="home" />
   */
  iconName?: IconName
  /**
   * 아이템의 활성 상태를 설정해요.
   * 활성 상태일 때 아이템의 스타일을 변경해요.
   */
  isActive?: boolean
}

/**
 * Sidebar.Item은 `Sidebar.Group` 컴포넌트 내부에서만 `li`로 렌더링됩니다.
 * 그룹 외부에서는 문맥에 맞는 요소로 렌더링되어, 잘못된 목록 시맨틱을 방지합니다.
 * 이 방식은 `ul` + `li` 구조를 보장해 스크린 리더 및 키보드 탐색 접근성을 유지해요.
 */
export const SidebarItem = forwardRefWithAs<ElementType, SidebarItemProps>((props, ref) => {
  const { children, iconName, isActive, as, className: classNameFromProps, onClick, onKeyDown, tabIndex, role, ...restProps } = props

  const { open } = useSidebarContext('Sidebar.Item')
  const { isIncluded } = useSidebarGroupContext('Sidebar.Item')

  const hasIcon = iconName != null

  const Component = as ?? (isIncluded ? 'li' : 'div')

  const isIntrinsicComponent = typeof Component === 'string'
  const isNativeInteractive = isIntrinsicComponent && ['button', 'a', 'input', 'select', 'textarea', 'summary', 'details'].includes(Component)
  const enableKeyboardActivation = onClick != null && !isNativeInteractive

  const handleKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    onKeyDown?.(e)
    if (e.defaultPrevented || !enableKeyboardActivation) return

    if (e.key === 'Enter' || e.key === 'Space') {
      e.preventDefault()
      e.currentTarget.click()
    }
  }

  return (
    <Component
      role='menuitem'
      ref={ref}
      className={cx(itemStyle({ isActive, open, hasIcon }), classNameFromProps)}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      tabIndex={enableKeyboardActivation ? (tabIndex ?? 0) : tabIndex}
      {...restProps}>
      {iconName ? (
        <Icon
          name={iconName}
          size={18}
        />
      ) : null}
      <Txt
        color='inherit'
        typography={open ? 'body2' : 'caption1'}
        fontWeight='medium'
        className={itemTextStyle}>
        {children}
      </Txt>
    </Component>
  )
})

SidebarItem.displayName = 'Sidebar.Item'
