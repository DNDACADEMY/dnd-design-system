import { semantic } from '@dds/token'

import { Icon, IconProps } from '../../icon'
import { useButtonContext } from '../context'
import { ButtonVariant } from '../type'

export type ButtonIconProps = IconProps

export const ButtonIcon = (props: ButtonIconProps) => {
  const { size = 12, color: colorFromProps, ...restProps } = props
  const { variant, disabled } = useButtonContext('Button.Icon')
  const color = colorFromProps ?? getIconDefaultColor(variant, disabled)

  return (
    <Icon
      size={size}
      color={color}
      {...restProps}
    />
  )
}

ButtonIcon.displayName = 'Button.Icon'

function getIconDefaultColor(variant: ButtonVariant, disabled: boolean) {
  if (disabled) {
    return semantic.color.labelDisable
  }

  switch (variant) {
    case 'secondary':
      return semantic.color.labelInverse
    case 'primary':
    case 'assistive':
    case 'outline':
      return semantic.color.labelTitle
  }
}
