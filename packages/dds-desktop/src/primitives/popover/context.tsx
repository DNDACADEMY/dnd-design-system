import { ReactNode, RefObject, useRef, useState } from 'react'

import { createCtxProvider } from '../../utils/createCtxProvider'

type PopoverContextValue = {
  open: boolean
  onOpenChange: (open: boolean) => void
  closeTimerRef: RefObject<NodeJS.Timeout | null>
  clearCloseTimer: () => void
}

const [PopoverContextProvider, usePopoverContext] = createCtxProvider<PopoverContextValue>('Popover')

interface PopoverProviderProps {
  children: ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

export const PopoverProvider = (props: PopoverProviderProps) => {
  const { children, open: controlledOpen, defaultOpen = false, onOpenChange: externalOnOpenChange } = props

  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen)
  const closeTimerRef = useRef<NodeJS.Timeout | null>(null)

  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : uncontrolledOpen

  const handleOpenChange = (newOpen: boolean) => {
    if (!isControlled) {
      setUncontrolledOpen(newOpen)
    }
    externalOnOpenChange?.(newOpen)
  }

  const clearCloseTimer = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
  }

  return (
    <PopoverContextProvider
      open={open}
      onOpenChange={handleOpenChange}
      closeTimerRef={closeTimerRef}
      clearCloseTimer={clearCloseTimer}>
      {children}
    </PopoverContextProvider>
  )
}

export { usePopoverContext }
