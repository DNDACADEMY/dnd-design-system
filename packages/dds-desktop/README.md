# DDS Desktop

> **Vanilla Extract 기반 Recipe를 사용하는 데스크톱 디자인 시스템 패키지**

DDS Desktop은 일관된 UI/UX와 확장 가능한 스타일 아키텍처를 목표로 한 디자인 시스템 패키지입니다. Vanilla Extract를 기반으로 한 Recipe 패턴을 사용해 **타입 안정성**, **재사용성**, **유지보수성**을 높였습니다.

> [!NOTE]
> 본 패키지는 추후 독립 패키지로 분리될 예정입니다.

> [!IMPORTANT]
> 컴포넌트 개발 및 기여 전, 반드시 **[Component Guidelines](./docs/COMPONENT_GUIDELINES.md)** 문서를 확인해주세요.

### 설치 방법

DDS Desktop을 사용하려면 아래 명령어를 통해 패키지를 설치하세요.

```bash
# npm 사용 시
npm install @dds/desktop

# yarn 사용 시
yarn add @dds/desktop
```

#### 의존성 설치

`@dds/desktop`은 아래 패키지를 peer dependency로 사용합니다.

- `react`: `^18.0.0 || ^19.0.0`
- `react-dom`: `^18.0.0 || ^19.0.0`
- `framer-motion`: `^12.0.0`
- `vanilla-extract`: `^1.0.0`

프로젝트에 설치되어 있지 않다면 함께 설치해주세요.

```bash
# npm 사용 시
npm install react react-dom framer-motion vanilla-extract

# yarn 사용 시
yarn add react react-dom framer-motion vanilla-extract
```

### 사용 방법

#### 1. 전역 CSS import

Vanilla Extract로 빌드된 CSS 결과물을 애플리케이션 엔트리 포인트에서 한 번만 import 해주세요.

```tsx
// main.tsx
import '@dds/desktop/desktop.css'
import App from './App'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>
)
```

#### 2. 컴포넌트 사용

패키지에서 제공하는 컴포넌트를 import하여 바로 사용할 수 있습니다.

```tsx
import { Button } from '@dds/desktop'

export function Example() {
  return <Button variant='primary'>확인</Button>
}
```

### 문서

- 📘 [Component Guidelines](./docs/COMPONENT_GUIDELINES.md)
  - 컴포넌트 설계 원칙
  - 네이밍 규칙
  - Recipe 및 스타일 작성 가이드

- 📕 [Storybook](https://main--6961111a96f838d3ba78064b.chromatic.com/)
  - DDS Desktop에서 제공하는 모든 컴포넌트의 사용 예제 및 Variant를 확인할 수 있습니다.
  - 실제 서비스 적용을 고려한 인터랙션과 상태를 문서화합니다.

```bash
# 로컬에서 Storybook 실행
npm run storybook
# 또는
yarn storybook
```

### 기여 방법

기여를 환영합니다 🙌

- 새로운 컴포넌트 추가 시 Component Guidelines 준수 필수
- PR 전 로컬 빌드 및 테스트 확인
