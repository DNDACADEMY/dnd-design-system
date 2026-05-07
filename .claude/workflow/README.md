# 디자인 변경 워크플로우 — 데이터 컨벤션

`/proposal → /impact → /preview → /review → /decision` 다섯 단계의 산출물을 한 변경(`<id>`)당 한 디렉터리에 모아둔다. 모든 파일은 **로컬 캐시** — `.gitignore` 로 제외되며 어떤 머신에서든 다시 만들 수 있어야 한다.

> 이 디렉터리(`.claude/workflow/`) 자체는 빈 채로 커밋되고, 실제 `<id>` 디렉터리·파일은 git 에서 제외된다.

## 디렉터리 구조

```
.claude/workflow/
  README.md                  # 이 파일 (커밋됨)
  <id>/
    state.json               # 진행 상태 + 메타
    proposal.json            # /proposal 산출
    impact.json              # /impact 산출
    preview.md               # /preview 산출 (Markdown — Storybook URL/캡처 메모)
    review.json              # /review 산출
    decision.json            # /decision 산출 + 최종 근거
```

## `<id>` 규칙

`<kebab-주제>-<YYYY-MM-DD>` (예: `button-radius-2026-05-07`).

- 주제는 1~3 단어 kebab-case
- 같은 날 같은 주제가 두 번이면 `-2`, `-3` 접미사
- `/proposal` 만 `<id>` 를 새로 발급한다. 나머지 스킬은 기존 `<id>` 를 받아 직전 단계 산출물을 입력으로 사용한다

## 상태 머신

```
Draft        # /proposal 작성 직후
  ↓ /impact
Analyzing
  ↓ /preview
Previewing
  ↓ /review
Reviewing
  ↓ /decision
Approved | OnHold | Rejected
  ↓ /pr 병합 후 (수동 또는 후속 자동화)
Merged
```

각 스킬은 직전 단계 산출물이 없으면 가드한다 (예: `/impact` 는 `proposal.json` 이 없으면 `/proposal` 부터 안내).

## JSON 스키마

### `state.json`

```jsonc
{
  "id": "button-radius-2026-05-07",
  "stage": "proposal | impact | preview | review | decision",
  "status": "Draft | Analyzing | Previewing | Reviewing | Approved | OnHold | Rejected | Merged",
  "createdAt": "2026-05-07T09:30:00+09:00",
  "updatedAt": "2026-05-07T11:15:00+09:00",
  "title": "버튼 모서리를 더 둥글게"
}
```

### `proposal.json`

```jsonc
{
  "id": "button-radius-2026-05-07",
  "changeType": "token-value | token-add | token-remove | component-new | component-api | bug",
  "targets": [
    { "kind": "token", "name": "radius.button" },
    { "kind": "component", "name": "Button" }
  ],
  "intent": "버튼이 더 부드러운 인상을 갖도록 모서리를 한 단계 둥글게",
  "priority": "low | medium | high",
  "raw": "디자이너가 적은 자연어 원문 (참고용)"
}
```

### `impact.json`

```jsonc
{
  "id": "button-radius-2026-05-07",
  "tokenUsages": [
    {
      "token": "radius.button",
      "files": [{ "path": "packages/desktop/src/primitives/Button/styles.css.ts", "lines": [12, 47] }]
    }
  ],
  "componentImpact": [
    {
      "component": "Button",
      "exposure": "high | medium | low",
      "files": ["packages/desktop/src/primitives/Button/styles.css.ts"]
    }
  ],
  "summary": "주요 컴포넌트 N개 / 그중 노출도 높은 것: ...",
  "rawCount": { "files": 0, "lines": 0 }
}
```

> `summary` 는 디자이너 가독성 우선. raw count 는 `rawCount` 에만 두고 본문에는 노출하지 않는다.

### `preview.md`

자유 Markdown. 권장 머리글:

```md
# Preview — <id>

## 샘플

- **Button** (exposure: high) — http://localhost:6006/?path=/story/components-button--default
  - before: radius.button = 6
  - after: radius.button = 12
  - 체크 포인트: hover 시 그림자 영역과 어색하지 않은가
```

### `review.json`

```jsonc
{
  "id": "button-radius-2026-05-07",
  "auto": [
    { "rule": "wcag-contrast-aa", "status": "pass | warn | fail | n/a", "note": "..." },
    { "rule": "token-consistency", "status": "pass | warn | fail | n/a", "note": "..." }
  ],
  "humanAsks": [
    { "perspective": "design", "question": "...", "answer": null },
    { "perspective": "dev-cost", "question": "...", "answer": null },
    { "perspective": "a11y", "question": "...", "answer": null }
  ]
}
```

### `decision.json`

```jsonc
{
  "id": "button-radius-2026-05-07",
  "choice": "proceed | hold | reject",
  "rationale": "근거 — 왜 진행/보류/반려인지",
  "decidedBy": "user|designer-name",
  "decidedAt": "2026-05-07T15:00:00+09:00",
  "nextActions": ["run /changeset", "run /pr"]
}
```

## 가드 규칙 (모든 스킬 공통)

- `<id>` 인자가 없으면: `/proposal` 은 새로 발급, 나머지는 사용자에게 어떤 `<id>` 를 이어갈지 묻는다
- 직전 단계 산출물이 없으면: 어떤 단계부터 시작해야 하는지 안내
- 같은 단계가 이미 완료된 `<id>` 에 다시 들어가면: 덮어쓸지 사용자에게 확인 (`AskUserQuestion`)
- 자연어 원문은 `proposal.json.raw` 에만 보존, 이후 단계는 구조화 필드만 입력으로 사용

## 변경 이력

- 2026-05-07: 첫 버전. 5단계 골격 + 스키마 정의
