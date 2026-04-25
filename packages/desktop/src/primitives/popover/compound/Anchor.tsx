import { PopoverAnchor as RadixPopoverAnchor, PopoverAnchorProps as RadixPopoverAnchorProps } from '@radix-ui/react-popover'
import { RefObject } from 'react'

export interface PopoverAnchorProps extends RadixPopoverAnchorProps {
  ref?: RefObject<HTMLDivElement>
}

export const PopoverAnchor = (props: PopoverAnchorProps) => {
  const { ref, ...restProps } = props
  return (
    <RadixPopoverAnchor
      ref={ref}
      {...restProps}
    />
  )
}

PopoverAnchor.displayName = 'Popover.Anchor'
