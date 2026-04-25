---
'@dnd-lab/desktop': minor # major | minor | patch
'@dnd-lab/token': minor # major | minor | patch
---

## 변경 유형

<!-- 해당하는 항목에 [x] 표시 -->

- [ ] 🎨 디자인 토큰 변경 (Tokens)
- [ ] ✨ 컴포넌트 추가 (New Component)
- [ ] 🔧 컴포넌트 API 변경 (Component API)
- [ ] 🗑️ 컴포넌트/API 삭제 (Removal)
- [ ] 🐛 버그 수정 (Bug Fix)

## 요약

<!-- 한 줄로 변경 사항을 요약해주세요 -->

## 상세 내용

### 🎨 변경된 토큰

<!-- 토큰 변경이 있을 경우 작성. 없으면 섹션 삭제 -->

| 토큰명              | Before    | After     | 영향 범위           |
| ------------------- | --------- | --------- | ------------------- |
| `color.primary.500` | `#3B82F6` | `#2563EB` | Button, Link, Badge |

### ✨ 추가된 컴포넌트

<!-- 신규 컴포넌트가 있을 경우 작성. 없으면 섹션 삭제 -->

- **`<ComponentName />`**
  - 용도:
  - 주요 Props:
  - Storybook 링크:

### 🔧 변경된 API

<!-- API 시그니처 변경이 있을 경우 작성. 없으면 섹션 삭제 -->

#### `<ComponentName />`

```tsx
// Before
<Button variant="primary" size="md" />

// After
<Button intent="primary" size="medium" />
```

**변경 사유:**

### 🗑️ 삭제된 항목

<!-- Deprecation 또는 삭제가 있을 경우 작성. 없으면 섹션 삭제 -->

- `<OldComponent />` → `<NewComponent />` 사용 권장
- `oldProp` prop 제거 → `newProp` 으로 대체

## Breaking Changes

<!-- major 버전인 경우 필수 작성 -->

- [ ] 이 변경은 Breaking Change 입니다.

### 마이그레이션 가이드

```tsx
// Before
import { OldButton } from '@your-org/design-system'
;<OldButton type='primary' />

// After
import { Button } from '@your-org/design-system'
;<Button intent='primary' />
```

## 영향 범위 체크리스트

- [ ] Figma 라이브러리 동기화 필요
- [ ] 디자인 토큰 문서 업데이트 필요
- [ ] Storybook 업데이트 완료
- [ ] 비주얼 회귀 테스트 통과
- [ ] 접근성(a11y) 검증 완료
- [ ] 다크모드 대응 확인
- [ ] RTL 지원 확인 (해당 시)

## 관련 링크

- 이슈:
- PR:
- Figma:
- Storybook:
