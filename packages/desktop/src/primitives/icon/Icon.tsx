import * as LucideIcons from 'lucide-react'

import { toPascalCase } from '../../utils/toPascalCase'

import type { IconProps, NameIconProps, UrlIconProps } from './type'
import type { LucideProps } from 'lucide-react'

export const Icon = (props: IconProps) => {
  if (isUrlIconProps(props)) {
    const { url, size = 24, ...restProps } = props
    return (
      <img
        src={url}
        width={size}
        height={size}
        {...restProps}
      />
    )
  }

  if (!isNameIconProps(props)) {
    return null
  }

  const { name, size = 24, ...restProps } = props

  const pascalCaseName = toPascalCase(name)

  const LucideIcon = LucideIcons[pascalCaseName as keyof typeof LucideIcons] as React.ComponentType<LucideProps> | undefined

  if (LucideIcon == null) {
    console.warn(`Icon "${name}" (${pascalCaseName}) not found in lucide-react`)
    return null
  }

  return (
    <LucideIcon
      size={size}
      {...restProps}
    />
  )
}

function isNameIconProps(props: IconProps): props is NameIconProps {
  return 'name' in props && props.name != null
}

function isUrlIconProps(props: IconProps): props is UrlIconProps {
  return 'url' in props && props.url != null
}
