import { Root as RadixPopoverRoot, PopoverProps as RadixPopoverRootProps } from '@radix-ui/react-popover'

import { PopoverAnchor, PopoverContent, PopoverTrigger } from './compound'
import { PopoverProvider, usePopoverContext } from './context'

export interface PopoverProps extends RadixPopoverRootProps {
  /**
   * 팝오버의 열림/닫힘 상태를 제어합니다. (제어 컴포넌트)
   */
  open?: boolean
  /**
   * 팝오버의 초기 열림 상태를 설정합니다. (비제어 컴포넌트)
   * @default false
   */
  defaultOpen?: boolean
  /**
   * 팝오버의 열림/닫힘 상태가 변경될 때 호출되는 콜백입니다.
   */
  onOpenChange?: (open: boolean) => void
  /**
   * 팝오버를 모달로 표시할지 여부를 설정합니다.
   * @default false
   */
  modal?: boolean
}

const PopoverRoot = (props: RadixPopoverRootProps) => {
  const { children, modal = false, ...restProps } = props
  const { open, onOpenChange } = usePopoverContext('Popover.Root')

  return (
    <RadixPopoverRoot
      open={open}
      onOpenChange={onOpenChange}
      modal={modal}
      {...restProps}>
      {children}
    </RadixPopoverRoot>
  )
}

const PopoverImpl = (props: PopoverProps) => {
  const { children, open, defaultOpen, onOpenChange, modal = false, ...restProps } = props

  return (
    <PopoverProvider
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}>
      <PopoverRoot
        modal={modal}
        {...restProps}>
        {children}
      </PopoverRoot>
    </PopoverProvider>
  )
}

export const Popover = Object.assign(PopoverImpl, {
  Anchor: PopoverAnchor,
  Content: PopoverContent,
  Trigger: PopoverTrigger
})
