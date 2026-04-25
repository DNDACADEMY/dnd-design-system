import { Slot } from '@radix-ui/react-slot'
import { ComponentPropsWithRef, useCallback } from 'react'

import { composeHandler } from '../../../utils/composeHandler'
import { cx } from '../../../utils/cx'
import { useSidebarContext } from '../context'
import { triggerStyle } from '../style.css'

export interface SidebarTriggerProps extends Omit<ComponentPropsWithRef<'button'>, 'type'> {
  /**
   * 자식 요소를 트리거 요소로 사용할지 여부를 설정해요.
   * @default false
   */
  asChild?: boolean
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export const SidebarTrigger = (props: SidebarTriggerProps) => {
  const { asChild = false, onClick, className: classNameFromProps, ...restProps } = props
  const { open, id, setOpen } = useSidebarContext('Sidebar.Trigger')
  const Component = asChild ? Slot : 'button'

  const handleClick = useCallback(() => {
    setOpen((prev) => !prev)
  }, [setOpen])

  return (
    <Component
      aria-controls={id}
      aria-expanded={open}
      type={asChild ? undefined : 'button'}
      onClick={composeHandler(onClick, handleClick)}
      className={cx(triggerStyle, classNameFromProps)}
      {...restProps}
    />
  )
}

SidebarTrigger.displayName = 'Sidebar.Trigger'
