import { Icon, IconProps } from '../../icon'
import { useTextareaContext } from '../context'
import { TextareaSize } from '../type'

export type TextareaIconProps = IconProps

export const TextareaIcon = (props: TextareaIconProps) => {
  const { size: sizeFromProps, ...restProps } = props
  const { size: sizeFromCtx } = useTextareaContext('Textarea.Icon')
  const size = sizeFromProps ?? IconSizeByTextareaSize[sizeFromCtx]

  return (
    <Icon
      size={size}
      {...restProps}
    />
  )
}

TextareaIcon.displayName = 'Textarea.Icon'

const IconSizeByTextareaSize: Record<TextareaSize, number> = {
  medium: 16,
  large: 24
} as const
