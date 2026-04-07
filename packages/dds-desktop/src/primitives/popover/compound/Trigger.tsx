import { PopoverTrigger as RadixPopoverTrigger, PopoverTriggerProps as RadixPopoverTriggerProps } from '@radix-ui/react-popover'
import { RefObject, useCallback, useEffect, useRef } from 'react'

import { composeHandler } from '../../../utils/composeHandler'
import { Txt } from '../../txt'
import { usePopoverContext } from '../context'

export interface PopoverTriggerProps extends RadixPopoverTriggerProps {
  ref?: RefObject<HTMLButtonElement>
  /**
   * 자식 요소를 트리거로 사용할지 여부를 설정합니다.
   *
   * asChild가 true일 때 문자열만 전달하면 실제 DOM 요소가 없어
   * 팝오버가 열리지 않을 수 있습니다. 이 경우 asChild={false}로
   * 사용하거나 Popover.Anchor로 기준점을 지정하세요.
   *
   * @default true
   */
  asChild?: boolean
  /**
   * 팝오버를 열기 위한 트리거 방식을 설정합니다.
   * @default click
   */
  trigger?: 'click' | 'hover'
  /**
   * hover 트리거 사용 시, 마우스를 올린 후 팝오버가 열리기까지의 지연 시간(ms)을 설정합니다.
   * @default 300
   */
  hoverDelay?: number
  /**
   * hover 트리거 사용 시, 마우스를 뗀 후 팝오버가 닫히기까지의 지연 시간(ms)을 설정합니다.
   * @default 100
   */
  closeDelay?: number
}

export const PopoverTrigger = (props: PopoverTriggerProps) => {
  const {
    ref,
    children,
    asChild = true,
    trigger = 'click',
    hoverDelay = 300,
    closeDelay = 100,
    onClick,
    onMouseEnter,
    onMouseLeave,
    ...restProps
  } = props

  const { onOpenChange, closeTimerRef, clearCloseTimer } = usePopoverContext('Popover.Trigger')
  const openTimerRef = useRef<NodeJS.Timeout | null>(null)
  const isText = typeof children === 'string'

  useEffect(() => {
    return () => {
      if (openTimerRef.current) clearTimeout(openTimerRef.current)
      clearCloseTimer()
    }
  }, [clearCloseTimer])

  const handleMouseEnter = useCallback(() => {
    if (trigger === 'hover') {
      clearCloseTimer()

      if (!openTimerRef.current) {
        openTimerRef.current = setTimeout(() => {
          onOpenChange(true)
          openTimerRef.current = null
        }, hoverDelay)
      }
    }
  }, [trigger, hoverDelay, onOpenChange, clearCloseTimer])

  const handleMouseLeave = useCallback(() => {
    if (trigger === 'hover') {
      if (openTimerRef.current) {
        clearTimeout(openTimerRef.current)
        openTimerRef.current = null
      }

      closeTimerRef.current = setTimeout(() => {
        onOpenChange(false)
        closeTimerRef.current = null
      }, closeDelay)
    }
  }, [trigger, closeDelay, onOpenChange, closeTimerRef])

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (trigger === 'hover') {
        e.preventDefault()
        e.stopPropagation()
      }
      onClick?.(e)
    },
    [trigger, onClick]
  )

  return (
    <RadixPopoverTrigger
      ref={ref}
      asChild={asChild}
      onClick={composeHandler(onClick, handleClick)}
      onMouseEnter={composeHandler(onMouseEnter, handleMouseEnter)}
      onMouseLeave={composeHandler(onMouseLeave, handleMouseLeave)}
      tabIndex={trigger === 'hover' ? -1 : undefined}
      aria-haspopup='dialog'
      {...restProps}>
      {isText ? <Txt typography='body2'>{children}</Txt> : children}
    </RadixPopoverTrigger>
  )
}

PopoverTrigger.displayName = 'Popover.Trigger'
