---
'@dnd-lab/desktop': patch
---

**Fieldbox**

Fieldbox의 상태별 배경/보더/보조 텍스트 표현을 새 디자인 규칙에 맞춰 정리했어요.

| 항목                  | Before                 | After                                |
| --------------------- | ---------------------- | ------------------------------------ |
| 기본/hover/focus 보더 | primitive 중심 매핑    | semantic 토큰 중심 상태 매핑         |
| 보조 텍스트 색상      | 컴포넌트에서 직접 주입 | `error` variant 기반으로 스타일 제어 |
| 라벨 타이포그래피     | `label1`               | `title4` + emphasized                |

영향: Fieldbox가 포함된 입력 계열 컴포넌트의 상태 표현이 더 일관되게 보여요.
