---
'@dnd-lab/desktop': minor
---

**Txt**

신규 typography 토큰을 적용해 `typography` variant 를 의미 중심 14종으로 재정비하고, 굵기 조절 방식을 `emphasized` boolean 으로 단순화했어요.

|              | Before                                                          | After                                                                                                            |
| ------------ | --------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `typography` | `"h4"`, `"h5"`, `"h6"`, `"body1"`, `"body2"`, `"caption1"`, `"caption2"` | `"display1"`~`"display4"`, `"title1"`~`"title4"`, `"body1"`~`"body3"`, `"label1"`~`"label3"` |
| `fontWeight` | `"regular"`, `"medium"`, `"bold"`                               | (제거)                                                                                                           |
| `emphasized` | (없음)                                                          | `boolean` — 각 typography 의 강조 굵기로 토글                                                                    |

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
