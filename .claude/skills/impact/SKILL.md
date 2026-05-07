---
name: impact
description: dnd-design-system 모노레포에서 5단계 디자인 변경 워크플로우의 두 번째 단계 — `/proposal` 이 만든 `proposal.json` 의 `targets[]` 가 실제로 어디까지 영향을 주는지 정적 분석한다. "/impact", "영향도 분석", "이 토큰 어디까지 쓰여요?", "Button 을 바꾸면 어디가 영향받아요?" 같은 요청이나 변경 결정 전에 노출 범위를 가늠해야 할 때 반드시 이 스킬을 사용하라. `packages/desktop/src/**/*.css.ts` 와 `*.tsx` 를 grep 으로 추적해 토큰 사용처와 컴포넌트 임팩트를 모으고, 디자이너가 읽을 수 있는 가독 포맷("주요 컴포넌트 N개 / 그중 노출도 높은 X")으로 요약해 `.claude/workflow/<id>/impact.json` 에 저장한다. raw count 는 별도 필드에만 두고 본문에는 노출하지 않는다 — 정보 과잉이 결정을 막는 것을 막기 위함이다.
---

# impact

5단계 워크플로우의 두 번째 단계. `/proposal` 결과를 입력으로 받아 변경의 실제 영향 범위를 정적 분석으로 산출한다. **결과 포맷이 디자이너 가독성을 통과하지 못하면 이 단계는 의미가 없다** — raw count 는 본문 금지 (R7).

> 흐름·구성 요소·공통 룰 SSOT: `docs/AGENTS.md`. 단계별 산출 디렉터리·JSON 스키마: `.claude/workflow/README.md`.

## 스텝 1: 가드 — 입력 존재 확인

`<id>` 인자를 받아(없으면 워크플로우 디렉터리에서 고르게) `.claude/workflow/<id>/proposal.json` 을 로드한다. 없으면 안내하고 종료 (R5):

> `<id>` 의 proposal.json 이 없어요. 먼저 `/proposal` 로 변경 의도를 정리해주세요.

## 스텝 2: changeType 별 분석 분기

`proposal.json.changeType` 에 따라 분석 전략이 다르다.

| changeType      | 주 분석                                                     |
| --------------- | ----------------------------------------------------------- |
| `token-value`   | 토큰 사용처 grep → 컴포넌트 임팩트 매핑                     |
| `token-add`     | 사용처 0 임을 확인 후, 도입 예정 위치를 사용자에게 질문     |
| `token-remove`  | 사용처 grep → 0 이 아니면 deprecation 경로 제안 (제거 차단) |
| `component-new` | 의존하는 토큰 grep + 기존 컴포넌트와 토큰 일관성 비교       |
| `component-api` | 컴포넌트 사용처 grep → 외부 호출자 영향 평가                |
| `bug`           | 증상 발생 컴포넌트 사용처 grep → 노출도 높은 화면 추정      |

## 스텝 3: 토큰 사용처 grep

`targets[]` 에서 `kind: 'token'` 인 항목 각각에 대해:

```bash
grep -rn "<token-path>" packages/desktop/src --include='*.css.ts' --include='*.tsx'
```

토큰 경로는 `.css.ts` 에 직접 박혀 있는 형태(`color.semantic.text.neutral.primary`)라 false positive 가 거의 없다. 결과를 `tokenUsages[]` 로 모은다.

```jsonc
"tokenUsages": [
  {
    "token": "<token-path>",
    "files": [
      { "path": "packages/desktop/src/primitives/Button/styles.css.ts", "lines": [12, 47] }
    ]
  }
]
```

## 스텝 4: 컴포넌트 임팩트 매핑

각 사용처 파일 경로에서 컴포넌트 이름을 추출한다 (`packages/desktop/src/primitives/<Component>/`).

`exposure` 추정 휴리스틱:

| exposure | 기준                                                                    |
| -------- | ----------------------------------------------------------------------- |
| `high`   | primitives 의 핵심(Button, Txt, Input 류) 또는 사용 라인이 5+ 곳인 토큰 |
| `medium` | primitives 의 보조 컴포넌트(Badge, Tag 류) 또는 사용 라인 2~4곳         |
| `low`    | 사용 라인 1곳, 또는 internal-only 컴포넌트                              |

확실치 않으면 `medium` 으로 두고 사용자에게 확인 옵션 제공.

```jsonc
"componentImpact": [
  {
    "component": "Button",
    "exposure": "high",
    "files": ["packages/desktop/src/primitives/Button/styles.css.ts"]
  }
]
```

## 스텝 5: 디자이너 가독 summary (R7)

raw count 를 그대로 노출하지 않고 다음 포맷을 따른다:

> 주요 컴포넌트 **N**개에 영향이 가요. 그중 **{최고 exposure 컴포넌트}** 가 가장 자주 쓰이는 자리예요.

여러 컴포넌트가 high 면 두 개까지 나열. 영향이 0~1 컴포넌트면 다음 포맷:

> 영향이 좁아요 — `<Component>` 한 곳에서만 쓰여요.

이 문장을 `summary` 필드에 박는다. raw 통계는 `rawCount` 필드에 따로:

```jsonc
"rawCount": { "files": <int>, "lines": <int> }
```

## 스텝 6: changeType 별 추가 처리

- **token-add**: `tokenUsages` 가 비어 있으면 정상. `AskUserQuestion` 으로 도입 예정 컴포넌트를 받아 `componentImpact` 에 `{component, exposure: 'planned'}` 항목을 채운다
- **token-remove**: `tokenUsages` 가 1+ 면 자동으로 다음 안내를 띄우고 `summary` 에 `[차단] 사용처가 남아있어 제거 불가 — deprecation 경로 권장` 으로 박는다
- **component-api / bug**: 컴포넌트 사용처 grep 을 추가로 돌려 `Storybook 외부에서의 사용처` 를 별도 줄로 요약 (예: `Storybook 5건, 실제 코드 사용처 0건` 또는 `다른 컴포넌트 내부에서 2건 참조`)

## 스텝 7: impact.json 직렬화

```jsonc
{
  "id": "<id>",
  "tokenUsages": [...],
  "componentImpact": [...],
  "summary": "<디자이너 가독 한 단락>",
  "rawCount": { "files": <int>, "lines": <int> }
}
```

`state.json` 의 `stage = "impact"`, `status = "Analyzing"` 으로 갱신, `updatedAt` 도 갱신.

## 스텝 8: 사용자 확인 및 후속 안내

`summary` 와 `componentImpact` 표를 사용자에게 보여준 뒤:

- `question`: "이 영향 범위로 미리보기로 넘어갈까요?"
- `header`: "다음 단계"
- `multiSelect`: false
- `options`:
  - `네, /preview <id> 로 진행 (Recommended)`
  - `영향 범위가 너무 넓어 제안을 다시 좁힐게요 (/proposal 로 복귀)`
  - `중단하고 사람과 상의할게요`

## 가드 — 이미 분석 결과가 있을 때 (R6)

`impact.json` 이 존재하면 덮어쓰기 전 확인:

- `question`: "<id> 에 이미 영향 분석이 있어요. 어떻게 할까요?"
- `options`: `재분석 (덮어쓰기)`, `기존 결과 보기만 하기`, `취소`
