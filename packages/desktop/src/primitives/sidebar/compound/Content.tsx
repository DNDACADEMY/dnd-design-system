import * as ScrollArea from '@radix-ui/react-scroll-area'
import { HTMLAttributes, ReactNode } from 'react'

import { contentStyle, scrollAreaRootStyle, scrollAreaScrollbarStyle, scrollAreaThumbStyle, scrollAreaViewportStyle } from '../style.css'

export interface SidebarContentProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * 콘텐츠의 왼쪽 영역을 설정해요.
   * 주로 아이콘을 배치할 때 사용해요.
   */
  leftAddon?: ReactNode
  /**
   * 콘텐츠의 활성 상태를 설정해요.
   * 활성 상태일 때 콘텐츠의 스타일을 변경해요.
   */
  isActive?: boolean
}

export const SidebarContent = (props: SidebarContentProps) => {
  const { children, ...restProps } = props

  return (
    <nav
      aria-label='Sidebar Content'
      className={contentStyle}
      {...restProps}>
      <ScrollArea.Root className={scrollAreaRootStyle}>
        <ScrollArea.Viewport className={scrollAreaViewportStyle}>{children}</ScrollArea.Viewport>
        <ScrollArea.Scrollbar
          className={scrollAreaScrollbarStyle}
          orientation='vertical'>
          <ScrollArea.Thumb className={scrollAreaThumbStyle} />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>
    </nav>
  )
}

SidebarContent.displayName = 'Sidebar.Content'
