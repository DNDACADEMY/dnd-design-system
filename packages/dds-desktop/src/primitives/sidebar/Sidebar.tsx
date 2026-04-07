import { motion, MotionProps } from 'framer-motion'
import { ComponentPropsWithRef, useEffect, useId, useState } from 'react'

import { SidebarAffix, SidebarCollapsible, SidebarContent, SidebarGroup, SidebarItem, SidebarTrigger } from './compound'
import { SidebarContextProvider } from './context'
import { containerStyle } from './style.css'
import { cx } from '../../utils/cx'

type CombinedSidebarProps = Omit<ComponentPropsWithRef<'div'>, keyof MotionProps> & MotionProps

export interface SidebarProps extends CombinedSidebarProps {
  /**
   * 사이드바의 확장 상태를 설정해요.
   *
   * @default true
   * @example
   * <Sidebar open={true} />
   * <Sidebar open={false} />
   */
  open?: boolean
  /**
   * 사이드바의 확장 상태를 변경할 때 호출되는 함수를 설정해요.
   *
   * @example
   * <Sidebar onOpenChange={(open) => {
   *   console.log(open)
   * }} />
   */
  onOpenChange?: (open: boolean) => void
}

const SidebarImpl = (props: SidebarProps) => {
  const { open: openFromProps = false, onOpenChange, children, className: classNameFromProps, ...restProps } = props

  const [open, setOpen] = useState(openFromProps)

  const id = useId()

  useEffect(
    function updateExpandedEffect() {
      onOpenChange?.(open)
    },
    // NOTE: Sidebar의 확장 상태가 변경될 때만 호출되어야 해요.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [open]
  )

  return (
    <SidebarContextProvider
      id={id}
      open={open}
      setOpen={setOpen}>
      <motion.div
        id={id}
        initial={false}
        animate={open ? { width: '280px' } : { width: '64px' }}
        transition={{ duration: 0.3 }}
        className={cx(containerStyle({ open }), classNameFromProps)}
        data-state={open ? 'open' : 'closed'}
        {...restProps}>
        {children}
      </motion.div>
    </SidebarContextProvider>
  )
}

SidebarImpl.displayName = 'Sidebar'

export const Sidebar = Object.assign(SidebarImpl, {
  Content: SidebarContent,
  Group: SidebarGroup,
  Item: SidebarItem,
  Affix: SidebarAffix,
  Collapsible: SidebarCollapsible,
  Trigger: SidebarTrigger
})
