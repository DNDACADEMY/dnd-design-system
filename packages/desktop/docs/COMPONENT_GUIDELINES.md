# 컴포넌트 개발 가이드라인

## Table of Contents

- [1. Ref 지원 필수](#1-ref-지원-필수)
- [2. Props 네이밍 규칙](#2-props-네이밍-규칙)
- [3. Props 구조분해 할당](#3-props-구조분해-할당)
- [4. 스타일 커스터마이징 지원](#4-스타일-커스터마이징-지원)
- [5. Type Export](#5-type-export)
- [체크리스트](#체크리스트)

## 1. Ref 지원 필수

모든 컴포넌트는 `ref`를 지원해야 합니다. `as` prop을 통해 다양한 HTML 요소로 렌더링이 필요한 경우, `forwardRefWithAs` 유틸리티를 사용하여 타입 안전한 polymorphic 컴포넌트를 구현하세요.

```tsx
import { forwardRefWithAs } from '../../utils/forwardRefWithAs'

export const Component = forwardRefWithAs<ElementType, ComponentProps>((props, ref) => {
  // ...
})
```

## 2. Props 네이밍 규칙

Props의 출처를 명확히 하기 위해 변수명에 출처를 표기해야 합니다.

| 출처              | 네이밍 규칙    | 예시                                  |
| ----------------- | -------------- | ------------------------------------- |
| Context에서 전달  | `xxxFromCtx`   | `sizeFromCtx`, `variantFromCtx`       |
| Props로 직접 전달 | `xxxFromProps` | `sizeFromProps`, `classNameFromProps` |

**예시**

```tsx
const { sizeFromProps, classNameFromProps, ...restProps } = props
const sizeFromCtx = useContext(SomeContext)
```

## 3. Props 구조분해 할당

직접 사용하지 않는 props는 `...restProps`로 전달하여 유연성을 확보하세요.

```tsx
const { as, typography, fontWeight, classNameFromProps, children, ...restProps } = props

return <Component {...restProps}>{children}</Component>
```

## 4. 스타일 커스터마이징 지원

컴포넌트는 `className`, `style` 등의 props를 받아 커스터마이징을 지원해야 합니다.

```tsx
<Component
  className={cx(baseStyles, classNameFromProps)}
  style={styleFromProps}
  {...restProps}
/>
```

> [!IMPORTANT]
> 동일한 사용자 경험을 제공하기 위해 `className`과 `style`은 반드시 **같은 DOM 엘리먼트**에 적용되어야 합니다.
> 이를 통해 사용자가 어디서든 일관된 방식으로 스타일을 커스터마이징할 수 있습니다.

## 5. Type Export

컴포넌트와 Props 타입을 반드시 export하여 사용처에서 타입을 활용할 수 있게 하세요.

```tsx
export interface ComponentProps {
  // prop 정의
}

export const Component = forwardRefWithAs<ElementType, ComponentProps>(...)
```

---

## 체크리스트

컴포넌트 작성 시 다음 항목을 확인하세요.

- [ ] `forwardRefWithAs`를 사용하여 ref 지원
- [ ] Props 출처를 변수명에 명시 (`FromProps`, `FromCtx`)
- [ ] `...restProps`로 추가 props 전달
- [ ] `className`, `style` 등 커스터마이징 props 지원
- [ ] 컴포넌트와 Props 타입 모두 export
- [ ] Arrow function 사용
