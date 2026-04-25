# @dnd-lab/desktop

## 0.3.0

### Minor Changes

- [#18](https://github.com/DNDACADEMY/dnd-design-system/pull/18) [`6c376ed`](https://github.com/DNDACADEMY/dnd-design-system/commit/6c376edf045ff2b97594b8462c589d4603c5e47b) Thanks [@Zero-1016](https://github.com/Zero-1016)! - ## 변경 유형

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

### Patch Changes

- Updated dependencies [[`6c376ed`](https://github.com/DNDACADEMY/dnd-design-system/commit/6c376edf045ff2b97594b8462c589d4603c5e47b)]:
  - @dnd-lab/token@0.2.0

## 0.2.0

### Minor Changes

- [#14](https://github.com/DNDACADEMY/dnd-design-system/pull/14) [`159a3b8`](https://github.com/DNDACADEMY/dnd-design-system/commit/159a3b8df8cf512620b6a4ce1eceee7028ede96a) Thanks [@Zero-1016](https://github.com/Zero-1016)! - **@dnd-lab/desktop**

  `@dnd-lab/desktop/desktop.css` 한 번만 import 하면 토큰 CSS 변수 (`:root`) 와 컴포넌트 스타일이 함께 주입돼요. 서브패스 경로 (`@dnd-lab/desktop/primitives/button` 등) 로 들어와도 동일하게 동작해요.

  내부 컴포넌트 구현을 신규 토큰 API 로 전면 마이그레이션했어요. 공개 컴포넌트 prop 과 사용법은 동일하지만, 같은 프로젝트에서 `@dnd-lab/token` 을 직접 참조하고 있다면 새 API 로의 업데이트가 필요해요.

  |            | Before                                       | After                                           |
  | ---------- | -------------------------------------------- | ----------------------------------------------- |
  | CSS import | `import '@dnd-lab/token/css'` 를 별도 import | `import '@dnd-lab/desktop/desktop.css'` 한 번만 |

### Patch Changes

- Updated dependencies [[`159a3b8`](https://github.com/DNDACADEMY/dnd-design-system/commit/159a3b8df8cf512620b6a4ce1eceee7028ede96a)]:
  - @dnd-lab/token@0.1.0

## 0.1.0

### Minor Changes

- [#13](https://github.com/DNDACADEMY/dnd-design-system/pull/13) [`4e7a325`](https://github.com/DNDACADEMY/dnd-design-system/commit/4e7a32550234f4db25e7d3f349b513945b1600fc) Thanks [@Zero-1016](https://github.com/Zero-1016)! - **Icon**

  `lucide-react`를 `dependencies`에서 `peerDependencies`로 이동해요. 이제 `lucide-react`를 프로젝트에 직접 설치해야 해요.

### Patch Changes

- [#10](https://github.com/DNDACADEMY/dnd-design-system/pull/10) [`1fd385d`](https://github.com/DNDACADEMY/dnd-design-system/commit/1fd385d547f532c659e321127b1365dd6345d9cf) Thanks [@Zero-1016](https://github.com/Zero-1016)! - 라이브러리 빌드 설정을 개선하고 하위 경로 import를 지원해요.
  - `@dnd-lab/desktop/primitives/button` 같은 개별 컴포넌트 import가 가능해요.
  - CJS/ESM 동시 출력을 지원해요.

## 0.0.4

### Patch Changes

- [#8](https://github.com/DNDACADEMY/dnd-design-system/pull/8) [`6b4151b`](https://github.com/DNDACADEMY/dnd-design-system/commit/6b4151b2ddc690210e9406890badba76730d4bcc) Thanks [@Zero-1016](https://github.com/Zero-1016)! - **Txt**

  이스케이프 문자(`\n`)와 조합 문자(`\\n`) 모두 줄바꿈이 올바르게 동작하도록 수정해요.

## 0.0.3

### Patch Changes

- [#6](https://github.com/DNDACADEMY/dnd-design-system/pull/6) [`f0beb19`](https://github.com/DNDACADEMY/dnd-design-system/commit/f0beb19e2e0ceda3a1065f372e17946a0f153e22) Thanks [@Zero-1016](https://github.com/Zero-1016)! - **Txt**

  개행 문자(`\n`)가 올바르게 인식되지 않던 버그를 수정해요.

## 0.0.2

### Patch Changes

- Updated dependencies [[`b4ec2b0`](https://github.com/DNDACADEMY/dnd-design-system/commit/b4ec2b0500e6d0307a6555c28f206cc0de920b26)]:
  - @dnd-lab/token@0.0.2

## 0.0.1

### Patch Changes

- 750978f: Externalize all runtime and peer dependencies in the published bundle.
  `lucide-react`, `@radix-ui/*`, `framer-motion`, and `@vanilla-extract/css`
  are now imported from the consumer's `node_modules` instead of being
  inlined into `dist/index.js`. Bundle size dropped from 1.1 MB to ~19 KB.
  Consumers must already install all listed peer dependencies, which
  hasn't changed.
- d9426d5: Initial public release of the DND Academy design system packages.
- Updated dependencies [d9426d5]
  - @dnd-lab/token@0.0.1
