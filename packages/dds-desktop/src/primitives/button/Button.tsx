import { ComponentPropsWithRef, ReactNode } from 'react'

import { ButtonIcon } from './compound'
import { ButtonContextProvider } from './context'
import { buttonCss, containerCss } from './style.css'
import { ButtonSize, ButtonVariant } from './type'
import { cx } from '../../utils/cx'
import { Txt } from '../txt'

export interface ButtonProps extends ComponentPropsWithRef<'button'> {
  /**
   * 버튼의 왼쪽 영역을 설정해요. 보통 아이콘을 배치할 때 사용해요.
   */
  leftAddon?: ReactNode
  /**
   * 버튼의 오른쪽 영역을 설정해요. 보통 아이콘을 배치할 때 사용해요.
   */
  rightAddon?: ReactNode
  /**
   * 버튼의 크기를 설정해요.
   *
   * @default medium
   */
  size?: ButtonSize
  /**
   * 버튼의 스타일를 설정해요.
   *
   * @default primary
   */
  variant?: ButtonVariant
  /**
   * 버튼의 비활성 상태를 설정해요.
   *
   * @default false
   */
  disabled?: boolean
}

const ButtonImpl = (props: ButtonProps) => {
  const { children, leftAddon, rightAddon, size = 'medium', variant = 'primary', disabled = false, className, ref, ...restProps } = props
  return (
    <ButtonContextProvider
      variant={variant}
      disabled={disabled}>
      <button
        ref={ref}
        className={cx(buttonCss({ size, variant }), className)}
        disabled={disabled}
        {...restProps}>
        <div className={containerCss({ size })}>
          {leftAddon}
          <Txt
            color='inherit'
            typography='body2'
            fontWeight='bold'>
            {children}
          </Txt>
          {rightAddon}
        </div>
      </button>
    </ButtonContextProvider>
  )
}

ButtonImpl.displayName = 'Button'

export const Button = Object.assign(ButtonImpl, {
  Icon: ButtonIcon
})
