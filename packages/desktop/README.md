# @dnd-lab/desktop

> **Vanilla Extract 기반 Recipe 를 사용하는 DND Academy 데스크톱 디자인 시스템 패키지**

`@dnd-lab/desktop` 은 일관된 UI/UX 와 확장 가능한 스타일 아키텍처를 목표로 한 디자인 시스템 패키지입니다. Vanilla Extract 를 기반으로 한 Recipe 패턴을 사용해 **타입 안정성**, **재사용성**, **유지보수성**을 높였습니다.

색상 / 타이포그래피 토큰은 [`@dnd-lab/token`](../token) 에서 가져와 사용합니다.

**컴포넌트 개발 및 기여 전, 반드시 [Component Guidelines](./docs/COMPONENT_GUIDELINES.md) 문서를 확인해주세요.**

## 설치 방법

`@dnd-lab/desktop` 을 사용하려면 아래 명령어를 통해 패키지를 설치하세요.

```bash
# npm 사용 시
npm install @dnd-lab/desktop

# yarn 사용 시
yarn add @dnd-lab/desktop
```

### 의존성 설치

`@dnd-lab/desktop`은 아래 패키지를 peer dependency로 사용합니다.

- `react`: `^18.0.0 || ^19.0.0`
- `react-dom`: `^18.0.0 || ^19.0.0`
- `framer-motion`: `^12.0.0`
- `@vanilla-extract/css`: `^1.0.0`
- `lucide-react`: `^0.562.0` — `Icon` 컴포넌트 사용 시 필요

프로젝트에 설치되어 있지 않다면 함께 설치해주세요.

```bash
# npm 사용 시
npm install react react-dom framer-motion @vanilla-extract/css lucide-react

# yarn 사용 시
yarn add react react-dom framer-motion @vanilla-extract/css lucide-react
```

## 사용 방법

### 1. 전역 CSS import

Vanilla Extract로 빌드된 CSS 결과물을 애플리케이션 엔트리 포인트에서 한 번만 import 해주세요.

```tsx
// main.tsx
import '@dnd-lab/desktop/desktop.css'
import App from './App'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>
)
```

### 2. 컴포넌트 사용

패키지에서 제공하는 컴포넌트를 import 하여 바로 사용할 수 있습니다.

```tsx
import { Button } from '@dnd-lab/desktop'

export function Example() {
  return <Button variant='primary'>확인</Button>
}
```

번들 크기를 줄이고 싶다면 컴포넌트별 서브경로 import 도 가능합니다.

```tsx
import { Button } from '@dnd-lab/desktop/primitives/button'
```

### 제공 컴포넌트

| 컴포넌트    | 설명                            |
| ----------- | ------------------------------- |
| `Button`    | 버튼 + Compound `Button.Icon`   |
| `Txt`       | 의미 기반 텍스트 컴포넌트       |
| `Icon`      | `lucide-react` 기반 아이콘 래퍼 |
| `Textfield` | 단일 라인 텍스트 입력           |
| `Textarea`  | 다중 라인 텍스트 입력           |
| `Chip`      | 태그/필터용 칩                  |
| `Popover`   | Radix UI 기반 팝오버            |

전체 변형(variant) 과 인터랙션은 [Storybook](https://main--6961111a96f838d3ba78064b.chromatic.com/) 참고.

## 문서

- 📘 [Component Guidelines](./docs/COMPONENT_GUIDELINES.md)
  - 컴포넌트 설계 원칙
  - 네이밍 규칙
  - Recipe 및 스타일 작성 가이드

- 📕 [Storybook](https://main--6961111a96f838d3ba78064b.chromatic.com/)
  - `@dnd-lab/desktop` 에서 제공하는 모든 컴포넌트의 사용 예제 및 Variant 를 확인할 수 있습니다.
  - 실제 서비스 적용을 고려한 인터랙션과 상태를 문서화합니다.

```bash
# 로컬에서 Storybook 실행
npm run storybook
# 또는
yarn storybook
```

## 기여 방법

기여를 환영합니다 🙌

- 새로운 컴포넌트 추가 시 Component Guidelines 준수 필수
- PR 전 로컬 빌드 및 테스트 확인
