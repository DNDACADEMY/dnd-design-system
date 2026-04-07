import { primitive } from '@dds/token'
import { HTMLAttributes } from 'react'

import { Txt } from '../../txt'
import { useFieldboxContext } from '../context'
import { requiredStyleCss } from '../styles.css'

export interface FieldboxLabelProps extends HTMLAttributes<HTMLLabelElement> {
  /**
   * 레이블 고유 ID를 설정해요, 웹 접근성을 위해 설정하는 것을 권장해요.
   */
  id?: string
  /**
   * 필수 여부를 설정해요.
   *
   * @default false
   */
  required?: boolean
}

export const FieldboxLabel = (props: FieldboxLabelProps) => {
  const { id, children, required: requiredFromProps, ...restProps } = props
  const { required: requiredFromCtx } = useFieldboxContext('Fieldbox.Label')

  const required = requiredFromProps ?? requiredFromCtx

  return (
    <Txt
      as='label'
      htmlFor={id}
      typography={'body2'}
      fontWeight={'medium'}
      color={primitive.color.gray900}
      {...restProps}>
      {children}
      {required && <span className={requiredStyleCss}>*</span>}
    </Txt>
  )
}

FieldboxLabel.displayName = 'Fieldbox.Label'
