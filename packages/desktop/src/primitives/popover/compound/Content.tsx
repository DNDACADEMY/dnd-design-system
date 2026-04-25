import {
  PopoverPortal as RadixPopoverPortal,
  PopoverContent as RadixPopoverContent,
  PopoverContentProps as RadixPopoverContentProps
} from '@radix-ui/react-popover'
import { RefObject, useCallback } from 'react'

import { cx } from '../../../utils/cx'
import { usePopoverContext } from '../context'
import { popoverContentCss } from '../style.css'

export interface PopoverContentProps extends RadixPopoverContentProps {
  ref?: RefObject<HTMLDivElement>
  /**
   * 팝오버가 나타날 위치를 설정합니다.
   * @default 'bottom'
   */
  side?: 'top' | 'right' | 'bottom' | 'left'
  /**
   * 팝오버의 정렬을 설정합니다.
   * @default 'center'
   */
  align?: 'start' | 'center' | 'end'
  /**
   * 팝오버가 트리거 요소를 기준으로 얼마나 떨어져 있을지 설정합니다.
   * @default 8
   */
  sideOffset?: number
  /**
   * 충돌을 피하기 위해 위치를 자동으로 조정할지 여부를 설정합니다.
   * @default true
   */
  avoidCollisions?: boolean
  /**
   * 포커스 스코프 외부 상호작용을 비활성화할지 여부를 설정합니다.
   * @default false
   */
  hideWhenDetached?: boolean
}

export const PopoverContent = (props: PopoverContentProps) => {
  const {
    ref,
    className,
    side = 'bottom',
    sideOffset = 8,
    align = 'center',
    avoidCollisions = true,
    hideWhenDetached = false,
    onMouseEnter,
    onMouseLeave,
    ...restProps
  } = props

  const { onOpenChange, closeTimerRef, clearCloseTimer } = usePopoverContext('Popover.Content')

  // hover 모드 지원: Content 위에 마우스가 있을 때는 닫기 타이머 취소
  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      clearCloseTimer()
      onMouseEnter?.(e)
    },
    [clearCloseTimer, onMouseEnter]
  )

  // Content에서 마우스가 떠나면 닫기 타이머 시작
  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      closeTimerRef.current = setTimeout(() => {
        onOpenChange(false)
        closeTimerRef.current = null
      }, 100) // closeDelay와 동일한 값 사용
      onMouseLeave?.(e)
    },
    [onOpenChange, closeTimerRef, onMouseLeave]
  )

  return (
    <RadixPopoverPortal>
      <RadixPopoverContent
        ref={ref}
        side={side}
        align={align}
        sideOffset={sideOffset}
        avoidCollisions={avoidCollisions}
        hideWhenDetached={hideWhenDetached}
        className={cx(popoverContentCss, className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        role='dialog'
        aria-modal='false'
        {...restProps}
      />
    </RadixPopoverPortal>
  )
}

PopoverContent.displayName = 'Popover.Content'
