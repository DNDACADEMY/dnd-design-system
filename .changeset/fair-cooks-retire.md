---
'@dnd-lab/desktop': minor
---

**Fieldbox / Textfield / Textarea / Sidebar**

primitive 네이밍과 API 이름을 가이드라인에 맞게 통일했어요. `Fieldbox.BottomTxt` 를 `Fieldbox.BottomText` 로 바꾸고, `readonly` 를 `readOnly`, `isActive` 를 `active` 로 맞춰서 컴포넌트 간 사용 패턴을 일관되게 정리했어요.

| 항목                     | Before                   | After                  |
| ------------------------ | ------------------------ | ---------------------- |
| Fieldbox compound        | `Fieldbox.BottomTxt`     | `Fieldbox.BottomText`  |
| read-only prop           | `readonly`               | `readOnly`             |
| Sidebar item active prop | `isActive`               | `active`               |
| 파일명 규칙              | `styles.css.ts/types.ts` | `style.css.ts/type.ts` |

마이그레이션: `Fieldbox.BottomTxt` 사용부를 `Fieldbox.BottomText` 로, `readonly` 를 `readOnly` 로, `isActive` 를 `active` 로 바꿔주세요.
