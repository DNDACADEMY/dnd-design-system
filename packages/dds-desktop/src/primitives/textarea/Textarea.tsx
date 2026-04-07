import { semantic } from '@dds/token'
import { ChangeEventHandler, HTMLAttributes, ReactNode } from 'react'

import { Fieldbox } from '../fieldbox'
import { TextareaIcon } from './compound'
import { TextareaContextProvider } from './context'
import { contentCss, TextareaCss } from './style.css'
import { TextareaSize } from './type'
import { useControllableState } from '../../hooks/useControllableState'
import { cx } from '../../utils/cx'
import { Txt } from '../txt'
import { Typography } from '../txt/types'

export interface TextareaProps extends HTMLAttributes<HTMLTextAreaElement> {
  /**
   * 상단에 배치할 컴포넌트 영역이에요.
   * 레이블을 사용할 때 주로 사용해요.
   */
  topAddon?: ReactNode
  /**
   * 하단에 배치할 컴포넌트 영역이에요.
   * 주로 `Textarea.BottomText`처럼 검증 메시지나 보조 설명을 노출할 때 사용해요.
   */
  bottomAddon?: ReactNode
  /**
   * 입력 영역의 왼쪽에 배치할 컴포넌트 영역이에요.
   * 아이콘 등을 배치할 때 사용해요.
   */
  leftAddon?: ReactNode
  /**
   * 입력 영역의 오른쪽에 배치할 컴포넌트 영역이에요.
   * 보조 액션을 배치할 때 사용해요.
   */
  rightAddon?: ReactNode
  /**
   * 컴포넌트 크기를 설정해요.
   * 높이와 내부 여백, 간격이 함께 조절돼요.
   *
   * @default medium
   */
  size?: TextareaSize
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
   * `Textarea.Label`과 함께 사용할 경우 라벨에 * 표시를 추가하는 데 활용돼요.
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
  readOnly?: boolean
  /**
   * 입력 필드에 표시할 placeholder 텍스트를 설정해요.
   */
  placeholder?: string
  /**
   * 입력 필드의 값을 설정해요.
   */
  value?: string
  /**
   * 입력 필드의 값이 변경될 때 호출되는 함수를 설정해요.
   */
  onChange?: ChangeEventHandler<HTMLTextAreaElement>
  /**
   * 입력 필드의 기본 값을 설정해요.
   * 해당 값을 설정할 경우 uncontrolled 컴포넌트로 동작해요.
   */
  defaultValue?: string
  /**
   * textarea의 행(row) 수를 설정해요.
   *
   * @default 3
   */
  rows?: number
}

const TextareaImpl = (props: TextareaProps) => {
  const {
    topAddon,
    bottomAddon,
    leftAddon,
    rightAddon,
    size = 'medium',
    disabled = false,
    error = false,
    required = false,
    readOnly = false,
    value: valueFromProps,
    defaultValue,
    onChange: onChangeFromProps,
    className: classNameFromProps,
    rows = 3,
    ...restProps
  } = props

  const { value, onChange } = useControllableState<string, HTMLTextAreaElement>({
    value: valueFromProps,
    defaultValue,
    onChange: onChangeFromProps
  })

  return (
    <TextareaContextProvider size={size}>
      <Fieldbox
        topAddon={topAddon}
        bottomAddon={bottomAddon}
        disabled={disabled}
        error={error}
        required={required}
        readonly={readOnly}>
        <Fieldbox.Content
          leftAddon={leftAddon}
          rightAddon={rightAddon}
          className={contentCss}>
          <Txt
            as='textarea'
            className={cx(TextareaCss, classNameFromProps)}
            typography={typographyBySize[size]}
            color={semantic.color.labelTitle}
            value={value}
            onChange={onChange}
            rows={rows}
            {...restProps}
          />
        </Fieldbox.Content>
      </Fieldbox>
    </TextareaContextProvider>
  )
}

const typographyBySize: Record<TextareaSize, Typography> = {
  medium: 'caption1',
  large: 'body2'
}

export const Textarea = Object.assign(TextareaImpl, {
  Label: Fieldbox.Label,
  BottomText: Fieldbox.BottomTxt,
  Icon: TextareaIcon
})
