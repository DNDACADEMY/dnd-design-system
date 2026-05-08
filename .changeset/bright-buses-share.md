---
'@dnd-lab/desktop': patch
---

**Txt**

Txt 기본 색상 주입 방식을 컴포넌트 외부 스타일과 자연스럽게 합쳐지도록 조정했어요.

| 항목 | Before | After |
| - | - | - |
| 기본 색상 처리 | 컴포넌트 prop 기본값에서 직접 지정 | typography 스타일 레이어의 기본 var로 지정 |
| 색상 override 방식 | prop 우선 지정 중심 | 스타일 var + prop override 병행 |

영향: Txt를 기반으로 한 입력/라벨 컴포넌트에서 색상 커스터마이징 충돌이 줄어들어요.
