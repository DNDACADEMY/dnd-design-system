import { color } from '@dnd-lab/token'

import { Icon, IconProps } from '../../icon'
import { useButtonContext } from '../context'
import { ButtonVariant } from '../type'

export type ButtonIconProps = IconProps

export const ButtonIcon = (props: ButtonIconProps) => {
  const { size = 12, color: colorFromProps, ...restProps } = props
  const { variant, disabled } = useButtonContext('Button.Icon')
  const iconColor = colorFromProps ?? getIconDefaultColor(variant, disabled)

  return (
    <Icon
      size={size}
      color={iconColor}
      {...restProps}
    />
  )
}

ButtonIcon.displayName = 'Button.Icon'

function getIconDefaultColor(variant: ButtonVariant, disabled: boolean) {
  if (disabled) {
    return color.semantic.text.neutral.disabled
  }

  switch (variant) {
    case 'secondary':
      return color.semantic.text.neutral.primary
    case 'primary':
      return color.semantic.text.brand.onBrand
    case 'assistive':
    case 'outline':
      return color.semantic.text.neutral.primary
  }
}
