---
'@dnd-lab/token': major
---

**@dnd-lab/token**

토큰 구조를 `primitive` / `semantic` / `component` 3단 계층으로 전면 개편해요. `color` 와 `typography` 네임스페이스를 분리했고, semantic / component 토큰이 primitive 를 참조하는 상속 체인이 결과물에 그대로 드러나요. 빌드할 때마다 이전 스냅샷과 비교해 추가·삭제·변경된 토큰만 콘솔에 표시해줘요.

|               | Before                                                 | After                                                |
| ------------- | ------------------------------------------------------ | ---------------------------------------------------- |
| import        | `import { primitive, semantic } from '@dnd-lab/token'` | `import { color, typography } from '@dnd-lab/token'` |
| 원시 색상     | `primitive.color.blue500`                              | `color.primitive.blue['500']`                        |
| 의미 색상     | `semantic.color.labelTitle`                            | `color.semantic.text.neutral.primary`                |
| 컴포넌트 색상 | —                                                      | `color.component.radio.border.default`               |
| 타이포그래피  | —                                                      | `typography.semantic.body['1'].size`                 |
