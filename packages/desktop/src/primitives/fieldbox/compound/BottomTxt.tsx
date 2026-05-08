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
      typography='body3'
      className={cx(bottomTxtCss({ error }), classNameFromProps)}
      {...restProps}>
      {children}
    </Txt>
  )
}

FieldboxBottomTxt.displayName = 'Fieldbox.BottomTxt'
