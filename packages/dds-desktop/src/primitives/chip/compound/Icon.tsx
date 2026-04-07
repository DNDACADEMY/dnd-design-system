import { semantic } from '@dds/token'

import { Icon, IconProps } from '../../icon'
import { useChipContext } from '../context'
import { ChipStatus } from '../type'

export type ChipIconProps = IconProps

export const ChipIcon = (props: ChipIconProps) => {
  const { size = 12, color: colorFromProps, ...restProps } = props
  const { status } = useChipContext('Chip.Icon')
  const color = colorFromProps ?? IconColorByStatusMap[status]

  return (
    <Icon
      size={size}
      color={color}
      {...restProps}
    />
  )
}

ChipIcon.displayName = 'Chip.Icon'

const IconColorByStatusMap: Record<ChipStatus, string> = {
  default: semantic.color.labelSubtitle,
  selected: semantic.color.labelInverse
} as const
