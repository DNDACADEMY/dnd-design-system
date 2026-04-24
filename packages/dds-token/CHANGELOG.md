# @dnd-lab/token

## 1.0.0

### Major Changes

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
