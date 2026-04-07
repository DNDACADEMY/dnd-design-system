import { Icon, IconProps } from '../../icon'
import { useTextfieldContext } from '../context'
import { TextfieldSize } from '../type'

export type TextfieldIconProps = IconProps

export const TextfieldIcon = (props: TextfieldIconProps) => {
  const { size: sizeFromProps, ...restProps } = props
  const { size: sizeFromCtx } = useTextfieldContext('Textfield.Icon')
  const size = sizeFromProps ?? IconSizeByTextfieldSize[sizeFromCtx]

  return (
    <Icon
      size={size}
      {...restProps}
    />
  )
}

TextfieldIcon.displayName = 'Textfield.Icon'

const IconSizeByTextfieldSize: Record<TextfieldSize, number> = {
  small: 16,
  medium: 16,
  large: 24
} as const
