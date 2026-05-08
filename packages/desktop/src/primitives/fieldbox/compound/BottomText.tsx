import { HTMLAttributes, ReactNode } from 'react'

import { cx } from '../../../utils/cx'
import { Txt } from '../../txt'
import { useFieldboxContext } from '../context'
import { bottomTextCss } from '../style.css'

export interface FieldboxBottomTextProps extends HTMLAttributes<HTMLParagraphElement> {
  /**
   * 하단 텍스트 내용을 설정해요.
   */
  children: ReactNode
}

export const FieldboxBottomText = (props: FieldboxBottomTextProps) => {
  const { children, className: classNameFromProps, ...restProps } = props
  const { error } = useFieldboxContext('Fieldbox.BottomText')

  return (
    <Txt
      as='p'
      typography='body3'
      className={cx(bottomTextCss({ error }), classNameFromProps)}
      {...restProps}>
      {children}
    </Txt>
  )
}

FieldboxBottomText.displayName = 'Fieldbox.BottomText'
