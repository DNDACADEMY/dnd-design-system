import { forwardRef } from 'react'

import type { ElementType, ComponentPropsWithRef, ReactElement } from 'react'

/**
 * `as` prop 타입 정의
 * @template T - HTML 요소 타입
 */
type AsProps<T extends ElementType> = {
  as?: T
}

/**
 * Polymorphic 컴포넌트의 전체 props 타입
 * @template T - HTML 요소 타입
 * @template Props - 커스텀 props 타입
 */
type PolymorphicComponentProps<T extends ElementType, Props = object> = AsProps<T> &
  Props &
  Omit<ComponentPropsWithRef<T>, keyof (AsProps<T> & Props)>

/**
 * Polymorphic ref 타입
 * @template T - HTML 요소 타입
 */
type PolymorphicRef<T extends ElementType> = ComponentPropsWithRef<T>['ref']

/**
 * ref를 포함한 Polymorphic 컴포넌트 props 타입
 * @template T - HTML 요소 타입
 * @template Props - 커스텀 props 타입
 */
type PolymorphicComponentPropsWithRef<T extends ElementType, Props = object> = PolymorphicComponentProps<T, Props> & { ref?: PolymorphicRef<T> }

/**
 * Polymorphic 컴포넌트를 위한 forwardRef 유틸리티
 *
 * @description
 * `as` prop을 통해 다양한 HTML 요소로 렌더링될 수 있는 컴포넌트를 만들 때 사용합니다.
 * 각 요소 타입에 맞는 props와 ref를 자동으로 타입 추론합니다.
 *
 * @template DefaultElement - 기본 HTML 요소 타입 (예: 'span', 'div', 'button')
 * @template OwnProps - 컴포넌트의 커스텀 props 타입
 *
 * @param render - 컴포넌트 렌더링 함수
 * @returns `as` prop을 지원하는 타입 안전한 컴포넌트
 *
 * @example
 * // 기본 사용법
 * type TxtProps = {
 *   typography: string
 *   fontWeight: string
 * }
 *
 * const Txt = forwardRefWithAs<'span', TxtProps>((props, ref) => {
 *   const { as, typography, fontWeight, classNameFromProps, ...restProps } = props
 *   const Component = as ?? 'span'
 *   return <Component ref={ref} className={cx(typography, fontWeight, classNameFromProps)} {...restProps} />
 * })
 *
 * @example
 * // 사용 예시
 * <Txt as="button" type="submit" onClick={handleSubmit}>버튼</Txt>
 * <Txt as="a" typography="body" fontWeight="normal" href="/home">링크</Txt>
 */
export const forwardRefWithAs = <DefaultElement extends ElementType, OwnProps = object>(
  render: <T extends ElementType = DefaultElement>(props: PolymorphicComponentProps<T, OwnProps>, ref: PolymorphicRef<T>) => ReactElement | null
) => {
  return forwardRef(render as never) as (<T extends ElementType = DefaultElement>(
    props: PolymorphicComponentPropsWithRef<T, OwnProps>
  ) => ReactElement | null) & { displayName?: string }
}
