---
'@dnd-lab/token': minor
---

**@dnd-lab/token**

`alert-dialog`, `checkbox`, `radio` 컴포넌트용 의미 색상 토큰을 새로 추가했어요. 디자인이 확정된 슬롯을 미리 풀어둬서 컴포넌트 구현 시 바로 참조할 수 있어요.

추가된 토큰 그룹:

- `checkbox` — `border` / `checked` / `label` (상태·색상 변형 포함)
- `alert-dialog` — `background` 와 `button` (`primary`·`secondary`·`tertiary`·`quarternary` × `enabled`·`hovered`·`pressed`·`disabled`·`focused`)
- 공용 슬롯 추가 — `fill`, `group`, `description.default`·`description.error`, `unselected`, `focused`, `inverse`, `medium`, `disabled-deep`

함께 `typography.primitive.size` 일부 단계 값을 디자인 가이드에 맞춰 한 단계 조정했어요. 동일한 단계명을 참조하던 컴포넌트는 새 값으로 자동 갱신돼요.

영향: `Checkbox`, `Radio`, `AlertDialog` 구현 시 새 색상 키를 바로 참조할 수 있고, `Txt` 등 `primitive.size` 단계를 사용하던 곳은 시각적으로 한 단계 차이가 나요.
