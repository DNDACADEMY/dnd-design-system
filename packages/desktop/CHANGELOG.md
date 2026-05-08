# @dnd-lab/desktop

## 0.4.0

### Minor Changes

- [#34](https://github.com/DNDACADEMY/dnd-design-system/pull/34) [`4707e66`](https://github.com/DNDACADEMY/dnd-design-system/commit/4707e66df6039b08d24eb13c2fbac60b0d1cb1a9) Thanks [@Zero-1016](https://github.com/Zero-1016)! - **Fieldbox / Textfield / Textarea / Sidebar**

  primitive 네이밍과 API 이름을 가이드라인에 맞게 통일했어요. `Fieldbox.BottomTxt` 를 `Fieldbox.BottomText` 로 바꾸고, `readonly` 를 `readOnly`, `isActive` 를 `active` 로 맞춰서 컴포넌트 간 사용 패턴을 일관되게 정리했어요.

  | 항목                     | Before                   | After                  |
  | ------------------------ | ------------------------ | ---------------------- |
  | Fieldbox compound        | `Fieldbox.BottomTxt`     | `Fieldbox.BottomText`  |
  | read-only prop           | `readonly`               | `readOnly`             |
  | Sidebar item active prop | `isActive`               | `active`               |
  | 파일명 규칙              | `styles.css.ts/types.ts` | `style.css.ts/type.ts` |

  마이그레이션: `Fieldbox.BottomTxt` 사용부를 `Fieldbox.BottomText` 로, `readonly` 를 `readOnly` 로, `isActive` 를 `active` 로 바꿔주세요.

- [#22](https://github.com/DNDACADEMY/dnd-design-system/pull/22) [`cea861c`](https://github.com/DNDACADEMY/dnd-design-system/commit/cea861c8d905cd4f14f5825ce6671c1d5eb33756) Thanks [@Zero-1016](https://github.com/Zero-1016)! - **Txt**

  신규 typography 토큰을 적용해 `typography` variant 를 의미 중심 14종으로 재정비하고, 굵기 조절 방식을 `emphasized` boolean 으로 단순화했어요.

  |              | Before                                                                   | After                                                                                        |
  | ------------ | ------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------- |
  | `typography` | `"h4"`, `"h5"`, `"h6"`, `"body1"`, `"body2"`, `"caption1"`, `"caption2"` | `"display1"`~`"display4"`, `"title1"`~`"title4"`, `"body1"`~`"body3"`, `"label1"`~`"label3"` |
  | `fontWeight` | `"regular"`, `"medium"`, `"bold"`                                        | (제거)                                                                                       |
  | `emphasized` | (없음)                                                                   | `boolean` — 각 typography 의 강조 굵기로 토글                                                |

  마이그레이션:

  ```tsx
  // Before
  <Txt typography="h5" fontWeight="bold">제목</Txt>
  <Txt typography="caption1">설명</Txt>
  <Txt typography="body2" fontWeight="medium">라벨</Txt>

  // After
  <Txt typography="title1" emphasized>제목</Txt>
  <Txt typography="body3">설명</Txt>
  <Txt typography="label1">라벨</Txt>
  ```

  내부에서 `Txt` 를 사용하던 `Button`, `Chip`, `Sidebar`, `Fieldbox`, `Textfield`, `Textarea` 도 새 토큰에 맞춰 업데이트 했어요. 굵기는 컴포넌트별 의도에 맞게 `emphasized` 또는 `label` 계열로 옮겼고, 보조 텍스트(caption) 는 `body3` / `label2` 로 매핑했어요.

### Patch Changes

- [#33](https://github.com/DNDACADEMY/dnd-design-system/pull/33) [`4352e3e`](https://github.com/DNDACADEMY/dnd-design-system/commit/4352e3e690909b0ee9d8d87ebf3d9dbca1ba8085) Thanks [@Zero-1016](https://github.com/Zero-1016)! - **Txt**

  Txt 기본 색상 주입 방식을 컴포넌트 외부 스타일과 자연스럽게 합쳐지도록 조정했어요.

  | 항목               | Before                             | After                                      |
  | ------------------ | ---------------------------------- | ------------------------------------------ |
  | 기본 색상 처리     | 컴포넌트 prop 기본값에서 직접 지정 | typography 스타일 레이어의 기본 var로 지정 |
  | 색상 override 방식 | prop 우선 지정 중심                | 스타일 var + prop override 병행            |

  영향: Txt를 기반으로 한 입력/라벨 컴포넌트에서 색상 커스터마이징 충돌이 줄어들어요.

- [#31](https://github.com/DNDACADEMY/dnd-design-system/pull/31) [`63dca37`](https://github.com/DNDACADEMY/dnd-design-system/commit/63dca37170d587ddfe57c541866cf7e007d23544) Thanks [@Zero-1016](https://github.com/Zero-1016)! - **Textfield**

  Textfield 입력 영역의 높이와 타이포그래피를 새 디자인에 맞춰 조정했어요.

  | 항목              | Before                       | After                              |
  | ----------------- | ---------------------------- | ---------------------------------- |
  | 입력 높이         | size별 텍스트 최소 높이 중심 | size별 컨테이너 높이 기준으로 정렬 |
  | 기본 타이포그래피 | `body2`(medium/large)        | `body3`(medium/large)              |

  영향: Textfield의 시각 밀도와 입력 텍스트 균형이 일관되게 보여요.

- [#32](https://github.com/DNDACADEMY/dnd-design-system/pull/32) [`f272577`](https://github.com/DNDACADEMY/dnd-design-system/commit/f272577a5c98501ddfac697cbda80ba1ae2c3489) Thanks [@Zero-1016](https://github.com/Zero-1016)! - **Fieldbox**

  Fieldbox의 상태별 배경/보더/보조 텍스트 표현을 새 디자인 규칙에 맞춰 정리했어요.

  | 항목                  | Before                 | After                                |
  | --------------------- | ---------------------- | ------------------------------------ |
  | 기본/hover/focus 보더 | primitive 중심 매핑    | semantic 토큰 중심 상태 매핑         |
  | 보조 텍스트 색상      | 컴포넌트에서 직접 주입 | `error` variant 기반으로 스타일 제어 |
  | 라벨 타이포그래피     | `label1`               | `title4` + emphasized                |

  영향: Fieldbox가 포함된 입력 계열 컴포넌트의 상태 표현이 더 일관되게 보여요.

- Updated dependencies [[`cea861c`](https://github.com/DNDACADEMY/dnd-design-system/commit/cea861c8d905cd4f14f5825ce6671c1d5eb33756), [`346e83f`](https://github.com/DNDACADEMY/dnd-design-system/commit/346e83f2ae8c729fd9614678d26824fd66e4a059)]:
  - @dnd-lab/token@0.3.0

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
