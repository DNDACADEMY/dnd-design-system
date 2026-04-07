import { HTMLAttributes, ReactNode } from 'react'

import { FieldboxBottomTxt, FieldboxLabel } from './compound'
import { FieldboxContextProvider, useFieldboxContext } from './context'
import { fieldboxContainerCss, fieldboxContentCss } from './styles.css'
import { FieldBoxSize } from './type'
import { cx } from '../../utils/cx'

export interface FieldboxProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * 상단에 배치할 컴포넌트 영역이에요.
   * 주로 `Fieldbox.Label` 또는 부가 설명 요소를 전달할 때 사용해요.
   */
  topAddon?: ReactNode
  /**
   * 하단에 배치할 컴포넌트 영역이에요.
   * 주로 `Fieldbox.BottomTxt`처럼 검증 메시지나 보조 설명을 노출할 때 사용해요.
   */
  bottomAddon?: ReactNode
  /**
   * 컴포넌트 크기를 설정해요.
   * 높이와 내부 여백, 간격이 함께 조절돼요.
   *
   * @default medium
   */
  size?: FieldBoxSize
  /**
   * 컴포넌트 비활성화 여부를 설정해요.
   * 비활성화 시 상호작용이 불가능한 상태를 시각적으로 표현해요.
   *
   * @default false
   */
  disabled?: boolean
  /**
   * 컴포넌트 에러 여부를 설정해요.
   * 에러 상태일 때 테두리 색상 등을 통해 시각적으로 강조해요.
   *
   * @default false
   */
  error?: boolean
  /**
   * 필수 필드 여부를 설정해요.
   * `Fieldbox.Label`과 함께 사용할 경우 라벨에 * 표시를 추가하는 데 활용돼요.
   *
   * @default false
   */
  required?: boolean
  /**
   * 입력 영역을 읽기 전용 상태로 설정해요.
   * 값을 변경할 수 없는 읽기 전용 필드를 표시할 때 사용해요.
   *
   * @default false
   */
  readonly?: boolean
}

const FieldboxImpl = (props: FieldboxProps) => {
  const {
    topAddon,
    bottomAddon,
    children,
    className: classNameFromProps,
    size = 'medium',
    disabled = false,
    error = false,
    required = false,
    readonly = false,
    ...restProps
  } = props
  return (
    <FieldboxContextProvider
      size={size}
      required={required}
      error={error}
      disabled={disabled}
      readonly={readonly}>
      <div
        className={cx(fieldboxContainerCss, classNameFromProps)}
        {...restProps}>
        {topAddon}
        {children}
        {bottomAddon}
      </div>
    </FieldboxContextProvider>
  )
}

export interface FieldboxContentProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * 입력 영역의 왼쪽에 배치할 컴포넌트 영역이에요.
   * 아이콘, prefix 텍스트 등을 배치할 때 사용해요.
   */
  leftAddon?: ReactNode
  /**
   * 입력 영역의 오른쪽에 배치할 컴포넌트 영역이에요.
   * 토글 버튼, suffix 텍스트 등 보조 액션을 배치할 때 사용해요.
   */
  rightAddon?: ReactNode
}

const FieldboxContent = (props: FieldboxContentProps) => {
  const { leftAddon, rightAddon, children, className: classNameFromProps, ...restProps } = props
  const { size, error, disabled, readonly } = useFieldboxContext('Fieldbox.Content')

  return (
    <div
      className={cx(fieldboxContentCss({ size, error, disabled, readonly }), classNameFromProps)}
      {...restProps}>
      {leftAddon}
      {children}
      {rightAddon}
    </div>
  )
}

FieldboxContent.displayName = 'Fieldbox.Content'

export const Fieldbox = Object.assign(FieldboxImpl, {
  Content: FieldboxContent,
  Label: FieldboxLabel,
  BottomTxt: FieldboxBottomTxt
})
