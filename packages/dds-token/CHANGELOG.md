# @dnd-lab/token

## 0.2.0

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

## 0.1.0

### Minor Changes

- [#14](https://github.com/DNDACADEMY/dnd-design-system/pull/14) [`159a3b8`](https://github.com/DNDACADEMY/dnd-design-system/commit/159a3b8df8cf512620b6a4ce1eceee7028ede96a) Thanks [@Zero-1016](https://github.com/Zero-1016)! - **@dnd-lab/token**

  토큰 구조를 `primitive` / `semantic` / `component` 3단 계층으로 전면 개편해요. `color` 와 `typography` 네임스페이스를 분리했고, semantic / component 토큰이 primitive 를 참조하는 상속 체인이 결과물에 그대로 드러나요. 빌드할 때마다 이전 스냅샷과 비교해 추가·삭제·변경된 토큰만 콘솔에 표시해줘요.

  |               | Before                                                 | After                                                |
  | ------------- | ------------------------------------------------------ | ---------------------------------------------------- |
  | import        | `import { primitive, semantic } from '@dnd-lab/token'` | `import { color, typography } from '@dnd-lab/token'` |
  | 원시 색상     | `primitive.color.blue500`                              | `color.primitive.blue['500']`                        |
  | 의미 색상     | `semantic.color.labelTitle`                            | `color.semantic.text.neutral.primary`                |
  | 컴포넌트 색상 | —                                                      | `color.component.radio.border.default`               |
  | 타이포그래피  | —                                                      | `typography.semantic.body['1'].size`                 |

## 0.0.2

### Patch Changes

- [`b4ec2b0`](https://github.com/DNDACADEMY/dnd-design-system/commit/b4ec2b0500e6d0307a6555c28f206cc0de920b26) Thanks [@Zero-1016](https://github.com/Zero-1016)! - `style-dictionary` 와 `@tokens-studio/sd-transforms` 를 `devDependencies` 로 이동. 두 패키지는 토큰 빌드 스크립트에서만 사용되고 게시되는 산출물(`dist/*`)에는 런타임 의존성이 없으므로, 소비자가 불필요한 빌드 도구를 설치하지 않도록 한다.

## 0.0.1

### Patch Changes

- d9426d5: Initial public release of the DND Academy design system packages.
