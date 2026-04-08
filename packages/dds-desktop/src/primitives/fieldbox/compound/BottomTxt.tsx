import { semantic } from '@dds-lab/token'
import { HTMLAttributes, ReactNode } from 'react'

import { cx } from '../../../utils/cx'
import { Txt } from '../../txt'
import { useFieldboxContext } from '../context'
import { bottomTxtCss } from '../styles.css'

export interface FieldboxBottomTxtProps extends HTMLAttributes<HTMLParagraphElement> {
  /**
   * 하단 텍스트 내용을 설정해요.
   */
  children: ReactNode
}

export const FieldboxBottomTxt = (props: FieldboxBottomTxtProps) => {
  const { children, className: classNameFromProps, ...restProps } = props
  const { error } = useFieldboxContext('Fieldbox.BottomTxt')

  return (
    <Txt
      as='p'
      typography='caption1'
      color={error ? semantic.color.badgeRed : semantic.color.labelSubtitle}
      className={cx(bottomTxtCss, classNameFromProps)}
      {...restProps}>
      {children}
    </Txt>
  )
}

FieldboxBottomTxt.displayName = 'Fieldbox.BottomTxt'
