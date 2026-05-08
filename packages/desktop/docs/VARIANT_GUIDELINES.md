# 변형·네이밍 가이드라인

`@dnd-lab/desktop` 의 모든 primitive 가 따라야 할 **변형(variant)·이름(naming)** 표준.
ref·restProps·type export 같은 일반 컴포넌트 작성 규칙은 [`COMPONENT_GUIDELINES.md`](./COMPONENT_GUIDELINES.md) 를 참고.

이 문서는 검사 자동화 스킬 [`/check-variants`](../../../.claude/skills/check-variants/SKILL.md) 의 규칙 SSOT 다. 이 문서를 고치면 스킬도 함께 갱신해야 한다.

## Table of Contents

- [1. 파일·디렉토리 네이밍](#1-파일디렉토리-네이밍)
- [2. Variant Prop 네이밍](#2-variant-prop-네이밍)
- [3. Variant 값 표준](#3-variant-값-표준)
- [4. Boolean Prop 네이밍](#4-boolean-prop-네이밍)
- [5. CSS Recipe·Export 네이밍](#5-css-recipeexport-네이밍)
- [6. Compound 서브컴포넌트 네이밍](#6-compound-서브컴포넌트-네이밍)
- [7. 체크리스트](#7-체크리스트)
- [8. 현재 마이그레이션 대상 (스냅샷)](#8-현재-마이그레이션-대상-스냅샷)

---

## 1. 파일·디렉토리 네이밍

primitive 디렉토리 안의 파일명은 **단수형**으로 통일한다.

| 역할           | 표준 파일명               | 비고                                       |
| -------------- | ------------------------- | ------------------------------------------ |
| 메인 컴포넌트  | `{Name}.tsx`              | PascalCase                                 |
| 스타일         | `style.css.ts`            | **단수형**                                 |
| 타입 정의      | `type.ts`                 | **단수형**. inline 으로 두지 말고 분리한다 |
| Context        | `context.tsx`             | 상태 공유가 필요할 때만                    |
| Re-export      | `index.tsx`               | -                                          |
| Storybook 문서 | `{Name}.stories.tsx`      | -                                          |
| 접근성 스펙    | `{Name}.spec.stories.tsx` | 신규 컴포넌트 필수                         |
| 서브컴포넌트   | `compound/`               | 디렉토리                                   |

> [!IMPORTANT]
> `styles.css.ts`, `types.ts` (복수형) 은 금지. 새 컴포넌트도, 기존 컴포넌트 마이그레이션도 단수형으로 맞춘다.

---

## 2. Variant Prop 네이밍

스타일 변형을 받는 prop 은 다음 두 그룹 중 하나로 분류해서 이름을 정한다.

### 2.1 시각적 스타일 변형 → `variant`

배경/색/테두리 등 **시각적 모양**을 바꾸는 변형은 `variant` 로 통일한다.

```tsx
type ButtonVariant = 'primary' | 'secondary' | 'assistive' | 'outline'
type ChipVariant = 'default' | 'selected' // ❌ 'status' 금지 → 'variant' 로 마이그레이션
```

- `variant` 값은 **semantic 이름** (의미) 으로 짓는다: `primary`, `secondary`, `outline`, `assistive`, `selected`, `default` 등.
- `kind`, `type`, `style`, `theme`, `intent` 같은 다른 이름은 쓰지 않는다.

### 2.2 크기 변형 → `size`

```tsx
type ButtonSize = 'small' | 'medium' | 'large' | 'xlarge'
```

- 값 형식은 [§3 Variant 값 표준](#3-variant-값-표준) 을 따른다.
- 단계 수는 컴포넌트마다 자유롭게 선택할 수 있다 (Button=4, Textfield=3, Textarea=2).

### 2.3 도메인 특화 변형은 별도 prop

`Txt.typography`, `Sidebar.open` 처럼 컴포넌트 의미상 `variant`/`size` 로 부르기 어색한 변형은 도메인에 맞는 별도 이름을 쓴다. 단, 다른 컴포넌트가 이미 같은 의미로 쓰던 이름이 있으면 따라 맞춘다.

---

## 3. Variant 값 표준

### 3.1 size 값

| ✅ 허용                                      | ❌ 금지                |
| -------------------------------------------- | ---------------------- |
| `'small' \| 'medium' \| 'large' \| 'xlarge'` | `'sm' \| 'md' \| 'lg'` |
|                                              | `'S' \| 'M' \| 'L'`    |
|                                              | `1 \| 2 \| 3` (숫자)   |

- **소문자 + 영어 단어 전체** 만 허용.
- 단계 수는 컴포넌트가 선택. 다만 신규 컴포넌트는 3단계 (`small` / `medium` / `large`) 부터 시작하는 것을 권장.
- 더 큰 단계가 필요하면 `xlarge`, 더 작은 단계가 필요하면 `xsmall` 을 쓴다 (`tiny`, `huge` 같은 변종 금지).

### 3.2 variant 값

- semantic 이름. `primary`, `secondary`, `assistive`, `outline`, `default`, `selected`, `ghost`, `solid` 등.
- 색 이름 직접 노출 금지: ❌ `'blue' | 'red'`, ❌ `'#1976d2'`.
- camelCase 다중 단어 가능: `'primaryFilled'`. 다만 단일 단어로 표현 가능하면 단일 단어가 우선.

### 3.3 boolean variant

CSS recipe 의 boolean variant 키는 `true` / `false` 를 그대로 쓴다.

```ts
variants: {
  disabled: {
    true:  { ... },
    false: { ... }   // 기본 상태에 추가 스타일이 없으면 정의 생략 가능
  }
}
```

---

## 4. Boolean Prop 네이밍

상태를 boolean 으로 받는 props 는 **접두사 없이** 이름을 짓는다.

| ✅ 권장    | ❌ 금지                           |
| ---------- | --------------------------------- |
| `disabled` | `isDisabled`                      |
| `error`    | `hasError`                        |
| `required` | `isRequired`                      |
| `readOnly` | `readonly` (소문자), `isReadOnly` |
| `selected` | `isSelected`                      |

> [!IMPORTANT]
> `readOnly` 는 React/HTML DOM 표준 camelCase 로 통일한다. HTML attribute 의 `readonly` (전부 소문자) 는 React JSX 에서 쓰지 않는다.

내부 state/계산값(예: 컴포넌트 내부 변수)에는 `is*` / `has*` 접두사를 자유롭게 써도 된다. 규칙은 **외부로 노출되는 props 와 context value** 에만 적용된다.

---

## 5. CSS Recipe·Export 네이밍

### 5.1 recipe vs style

- 변형이 있는 스타일은 `recipe()` 사용.
- 변형 없는 단일 스타일만 `style()` 사용.

```ts
import { recipe } from '@vanilla-extract/recipes'
import { style }  from '@vanilla-extract/css'

export const buttonCss    = recipe({ base: { ... }, variants: { ... } })
export const containerCss = style({ display: 'flex' })
```

### 5.2 export 이름

- camelCase + **`Css` 접미사**.
- 컴포넌트별 prefix 는 명확성을 위해 권장하지만 강제는 아님 (`fieldboxContentCss`, `bottomTxtCss` 처럼).

| ✅ 권장              | ❌ 금지                            |
| -------------------- | ---------------------------------- |
| `buttonCss`          | `ButtonCss` (PascalCase)           |
| `fieldboxContentCss` | `containerStyle` (`*Style` 접미사) |
| `typographyCss`      | `TypographyCSS` / `typography_css` |

> [!NOTE]
> Sidebar 의 `*Style` 접미사는 마이그레이션 대상이다 ([§8](#8-현재-마이그레이션-대상-스냅샷) 참고).

### 5.3 variant 기본값 위치

variant 기본값은 **컴포넌트 props 기본값**에 둔다.

```tsx
type ButtonProps = {
  size?: 'small' | 'medium' | 'large'
  variant?: 'primary' | 'secondary'
}

function Button(props: ButtonProps) {
  const { size = 'medium', variant = 'primary' } = props
  return <button className={buttonCss({ size, variant })} />
}
```

- 기본값 SSOT 는 `Component.tsx` 로 통일한다 (DX: 기본 동작 탐색 지점 1곳).
- `defaultVariants` 는 recipe 를 컴포넌트 밖에서 직접 재사용하는 경우에만 선택적으로 둔다.
- `defaultVariants` 를 두더라도 props 기본값과 동일한 값으로 맞춘다.

---

## 6. Compound 서브컴포넌트 네이밍

### 6.1 서브컴포넌트 파일명 카탈로그

같은 역할의 서브컴포넌트는 컴포넌트가 달라도 **같은 이름**을 쓴다.

| 역할                   | 표준 이름    | 사용 예                           |
| ---------------------- | ------------ | --------------------------------- |
| 보조 텍스트(헬퍼/에러) | `BottomText` | Fieldbox, Textfield               |
| 라벨                   | `Label`      | Fieldbox, Textfield               |
| 아이콘                 | `Icon`       | Button, Chip, Textfield, Textarea |
| 트리거                 | `Trigger`    | Popover, Sidebar                  |
| 컨텐츠 컨테이너        | `Content`    | Popover, Sidebar, Fieldbox        |
| 위치 기준점            | `Anchor`     | Popover                           |
| 그룹                   | `Group`      | Sidebar                           |
| 항목                   | `Item`       | Sidebar                           |

> [!IMPORTANT]
> `BottomTxt` 는 금지. `BottomText` 로 통일한다 (Fieldbox 마이그레이션 대상).

### 6.2 Export 패턴

`Object.assign` 으로 메인 컴포넌트에 서브컴포넌트를 매단다.

```tsx
const ButtonImpl = (props: ButtonProps) => { ... }
ButtonImpl.displayName = 'Button'

export const Button = Object.assign(ButtonImpl, {
  Icon: ButtonIcon
})
```

- 서브컴포넌트 구현체는 `Button{Sub}` (예: `ButtonIcon`) 이름으로 두고, `Button.Icon` 형태로 노출한다.
- 메인 컴포넌트의 `displayName` 은 prefix 없는 컴포넌트 이름 (`'Button'`).

### 6.3 Context Value 타입

```tsx
type ButtonContextType = {
  variant: ButtonVariant
  disabled: boolean
}
```

- 타입 이름은 `*ContextType` 으로 통일 (`*ContextValue` 금지).
- context value 의 prop 이름은 [§4](#4-boolean-prop-네이밍) 의 boolean prop 규칙을 그대로 따른다.

---

## 7. 체크리스트

새 컴포넌트를 만들거나 기존 컴포넌트를 손볼 때 확인한다. 자동 검사는 [`/check-variants`](../../../.claude/skills/check-variants/SKILL.md) 로 돌릴 수 있다.

**파일/디렉토리**

- [ ] `style.css.ts`, `type.ts` 단수형
- [ ] `{Name}.tsx`, `{Name}.stories.tsx`, `{Name}.spec.stories.tsx` PascalCase

**Props**

- [ ] 시각 변형은 `variant`, 크기 변형은 `size`
- [ ] size 값은 `small | medium | large | xlarge` 중에서만
- [ ] boolean prop 은 접두사 없음 (`disabled`, `error`, `required`)
- [ ] `readOnly` (camelCase)

**스타일**

- [ ] 변형이 있으면 `recipe()`, 없으면 `style()`
- [ ] export 이름 camelCase + `Css` 접미사
- [ ] variant 기본값은 컴포넌트 props 기본값에서 관리
- [ ] (선택) recipe 직접 재사용 시 `defaultVariants` 사용

**Compound**

- [ ] 표준 카탈로그 이름 사용 (`BottomText`, `Label`, `Icon` 등)
- [ ] `Object.assign` 패턴
- [ ] `*ContextType` 네이밍

---

## 8. 현재 마이그레이션 대상 (스냅샷)

작성 시점(2026-05-08) 기준으로 가이드라인 위반인 항목. 점진적으로 정리한다.

| primitive | 위반                                       | 마이그레이션                        |
| --------- | ------------------------------------------ | ----------------------------------- |
| fieldbox  | `styles.css.ts` (복수)                     | → `style.css.ts`                    |
| txt       | `styles.css.ts` (복수)                     | → `style.css.ts`                    |
| txt       | `types.ts` (복수)                          | → `type.ts`                         |
| fieldbox  | `BottomTxt.tsx`, `bottomTxtCss`            | → `BottomText.tsx`, `bottomTextCss` |
| fieldbox  | `readonly` prop                            | → `readOnly`                        |
| chip      | `status` prop                              | → `variant`                         |
| sidebar   | `*Style` 접미사 (`containerStyle` 등 다수) | → `*Css`                            |
| popover   | inline 타입 정의 (별도 `type.ts` 없음)     | → `type.ts` 분리                    |
| -         | variant 기본값 위치 혼재 가능성            | → props 기본값으로 통일             |

이 표는 `/check-variants` 가 동적으로 갱신할 수 있는 영역이라 수동으로 매번 맞추지 않아도 된다 (스킬이 검사 결과를 그때그때 출력함).
