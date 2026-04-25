import { color } from '@dnd-lab/token'

import { Icon, IconProps } from '../../icon'
import { useChipContext } from '../context'
import { ChipStatus } from '../type'

export type ChipIconProps = IconProps

export const ChipIcon = (props: ChipIconProps) => {
  const { size = 12, color: colorFromProps, ...restProps } = props
  const { status } = useChipContext('Chip.Icon')
  const iconColor = colorFromProps ?? iconColorByStatus[status]

  return (
    <Icon
      size={size}
      color={iconColor}
      {...restProps}
    />
  )
}

ChipIcon.displayName = 'Chip.Icon'

const iconColorByStatus: Record<ChipStatus, string> = {
  default: color.semantic.text.neutral.secondary,
  selected: color.semantic.text.neutral.inverse
} as const
