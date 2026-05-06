---
'@dnd-lab/token': patch
---

**@dnd-lab/token**

타이포그래피 토큰의 JSON 스키마를 정리해요. 토큰 파이프라인에서 일관되게 읽히도록 `\$value`/`\$type` 형식을 `value`/`type`으로 맞췄어요.

| 토큰                          | Before              | After           |
| ----------------------------- | ------------------- | --------------- |
| `primitive.size.10`           | `\$value`, `\$type` | `value`, `type` |
| `semantic.title.1.size`       | `\$value`, `\$type` | `value`, `type` |
| `semantic.body.2.line-height` | `\$value`, `\$type` | `value`, `type` |

영향: 타이포그래피 토큰을 읽는 빌드/변환 파이프라인의 키 스키마가 일관돼요.
