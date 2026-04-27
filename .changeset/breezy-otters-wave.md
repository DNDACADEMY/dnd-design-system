---
'@dnd-lab/token': minor
---

**@dnd-lab/token**

color, typography 토큰을 더 의미 중심으로 정리했어요. 새로 만든 의미 키(`primary`/`secondary`/...)와 일관된 kebab-case primitive 키를 따라가도록 참조 경로가 바뀌었어요.

🎨 토큰 변경

`color.semantic` 의 배경 키를 숫자에서 의미 키로 재구성했어요.

| 토큰                          | Before                  | After                                                                                   |
| ----------------------------- | ----------------------- | --------------------------------------------------------------------------------------- |
| `color.semantic.background.*` | `50`, `100`, `200`, ... | `primary`, `secondary`, `tertiary`, `subtle`, `inverse`, `hover`, `pressed`, `disabled` |
| `color.semantic.brand.*`      | (없음)                  | 새로 추가 — 브랜드 컬러 묶음                                                            |

값도 raw hex 가 아니라 `{primitive.slate.50}` 같은 reference 로 통일했어요.

typography primitive 키를 모두 kebab-case 로 통일하고 단계를 더 추가했어요.

| 토큰                                  | Before                                     | After                                                                                          |
| ------------------------------------- | ------------------------------------------ | ---------------------------------------------------------------------------------------------- |
| `primitive.font-weight.*`             | `Thin`, `Light`, `Medium`, `Semibold`, ... | `thin`, `extra-light`, `light`, `regular`, `medium`, `semibold`, `bold`, `extra-bold`, `black` |
| `primitive.letter-spacing.*`          | `Tight`                                    | `tight`, `none` 추가                                                                           |
| `semantic.body.*`, `semantic.title.*` | `1` / `2` / `3`                            | `4` 단계 추가                                                                                  |

🔧 API 변경

기존 토큰 키를 그대로 참조하던 코드는 새 키로 교체해주세요.

마이그레이션:

```ts
// Before
color.semantic.background[50]
typography.primitive['font-weight'].Medium
typography.primitive['letter-spacing'].Tight

// After
color.semantic.background.primary
typography.primitive['font-weight'].medium
typography.primitive['letter-spacing'].tight
```

영향: `@dnd-lab/desktop` 의 `.css.ts` 에서 위 키를 참조하던 곳도 함께 업데이트가 필요해요.
