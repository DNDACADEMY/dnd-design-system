# `.claude/workflow/` — 디렉터리 컨벤션 & JSON 스키마

5단계 디자인 변경 워크플로우의 단계별 산출물을 한 변경(`<id>`)당 한 디렉터리에 모아두는 로컬 캐시. 모든 파일은 `.gitignore` 로 제외되며 어떤 머신에서든 다시 만들 수 있어야 한다.

> **흐름·구성요소·공통 룰의 SSOT 는 `docs/AGENTS.md`** 다. 이 문서는 `<id>` 디렉터리의 자료 구조만 다룬다. 흐름·룰을 바꾸려면 `docs/AGENTS.md` 를 먼저 고치고 `workflow-admin` 스킬을 호출.

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
- 발급은 `/proposal` 에서만 (룰 R2 — `docs/AGENTS.md`)

## JSON 스키마

### `state.json`

```jsonc
{
  "id": "button-radius-2026-05-07",
  "stage": "proposal | impact | preview | review | decision",
  "status": "Draft | Analyzing | Previewing | Reviewing | Approved | OnHold | Rejected | Merged",
  "createdAt": "2026-05-07T09:30:00+09:00",
  "updatedAt": "2026-05-07T11:15:00+09:00",
  "title": "버튼 모서리를 더 둥글게",
}
```

상태 머신 전이는 `docs/AGENTS.md` §3 R8 참조.

### `proposal.json`

```jsonc
{
  "id": "button-radius-2026-05-07",
  "changeType": "token-value | token-add | token-remove | component-new | component-api | bug",
  "targets": [
    { "kind": "token", "name": "radius.button" },
    { "kind": "component", "name": "Button" },
  ],
  "intent": "버튼이 더 부드러운 인상을 갖도록 모서리를 한 단계 둥글게",
  "priority": "low | medium | high",
  "raw": "디자이너가 적은 자연어 원문 (참고용)",
}
```

### `impact.json`

```jsonc
{
  "id": "button-radius-2026-05-07",
  "tokenUsages": [
    {
      "token": "radius.button",
      "files": [{ "path": "packages/desktop/src/primitives/Button/styles.css.ts", "lines": [12, 47] }],
    },
  ],
  "componentImpact": [
    {
      "component": "Button",
      "exposure": "high | medium | low",
      "files": ["packages/desktop/src/primitives/Button/styles.css.ts"],
    },
  ],
  "summary": "주요 컴포넌트 N개 / 그중 노출도 높은 것: ...",
  "rawCount": { "files": 0, "lines": 0 },
}
```

> `summary` 의 디자이너 가독성은 룰 R7 (`docs/AGENTS.md`) 참조. raw count 는 `rawCount` 에만 두고 본문에는 노출 금지.

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
    { "rule": "token-consistency", "status": "pass | warn | fail | n/a", "note": "..." },
  ],
  "humanAsks": [
    { "perspective": "design", "question": "...", "answer": null },
    { "perspective": "dev-cost", "question": "...", "answer": null },
    { "perspective": "a11y", "question": "...", "answer": null },
  ],
}
```

자동 점검 영역은 룰 R11 (`docs/AGENTS.md`) 두 가지로 한정.

### `decision.json`

```jsonc
{
  "id": "button-radius-2026-05-07",
  "choice": "proceed | hold | reject",
  "rationale": "근거 — 왜 진행/보류/반려인지",
  "decidedBy": "user|designer-name",
  "decidedAt": "2026-05-07T15:00:00+09:00",
  "nextActions": ["run /changeset", "run /pr"],
}
```

## 변경 이력

- 2026-05-07: 첫 버전 (흐름·룰 포함)
- 2026-05-07: SSOT 분리 — 흐름/공통 룰을 `docs/AGENTS.md` 로 이동, 본 문서는 디렉터리 컨벤션·JSON 스키마만 유지
