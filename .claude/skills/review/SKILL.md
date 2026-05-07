---
name: review
description: dnd-design-system 모노레포에서 5단계 디자인 변경 워크플로우의 네 번째 단계 — 변경을 디자인/개발 비용/접근성 세 관점으로 점검한다. "/review", "리뷰", "이 변경 검토해줘", "접근성 점검", "색 대비 확인" 같은 요청이나 결정 직전에 다른 관점을 한 번 더 거쳐야 할 때 반드시 이 스킬을 사용하라. 자동 점검(WCAG AA 색 대비 — 색 토큰 한정, 토큰 일관성)은 자동으로 돌리고, 정성 평가가 필요한 영역(디자인 톤, 개발 비용)은 `humanAsks[]` 로 분류해 `AskUserQuestion` 으로 받는다. CLAUDE.local.md 5번에서 강조했듯 자동화 비율이 낮은 단계라 처음부터 하이브리드(자동 점검 + 사람 검토)로 설계됨. 결과는 `.claude/workflow/<id>/review.json`.
---

# review

5단계 워크플로우의 네 번째 단계. 디자이너 본인이 챙기기 어려운 접근성·개발 비용 관점을 명시적으로 거치게 강제하는 단계다. 자동 점검은 명백한 케이스(R11 — WCAG AA, 토큰 일관성)만 잡고, 나머지는 사람한테 명시적으로 패스한다.

> 흐름·구성 요소·공통 룰 SSOT: `docs/AGENTS.md`. 단계별 산출 디렉터리·JSON 스키마: `.claude/workflow/README.md`.

## 스텝 1: 가드 — 입력 존재 확인 (R5)

`<id>` 받아 `.claude/workflow/<id>/` 의 `proposal.json`, `impact.json`, `preview.md` 가 모두 있는지 확인. 없으면 안내:

> 리뷰는 proposal/impact/preview 가 모두 있어야 의미가 있어요. 빠진 단계: `<list>`

## 스텝 2: 자동 점검 — WCAG AA 색 대비

다음 두 조건이 모두 맞을 때만 돌린다:

- `proposal.changeType in ['token-value', 'token-add']`
- 대상 토큰의 카테고리가 색상 (`color.*`)

색 대비 계산 절차:

1. 변경 후 색상 값(사용자에게 받은 후보 또는 `preview.md` 의 after) 을 RGB 로 파싱
2. 페어가 되는 배경/전경 토큰을 `packages/token/tokens/color.json` 에서 자동 추정 (예: `color.semantic.text.*` 의 페어는 `color.semantic.bg.*`)
3. WCAG 2.1 명도 대비 공식으로 비율 계산
4. AA 기준 (일반 텍스트 4.5:1, 큰 텍스트 3:1) 에 따라 `pass | warn | fail` 판정

```jsonc
{ "rule": "wcag-contrast-aa", "status": "warn", "note": "primary.500 / bg.surface 대비 4.3:1 — AA 일반 기준 4.5 에 약간 못 미침" }
```

색 토큰이 아니면 `status: "n/a"` 로 박고 `note` 는 비운다.

## 스텝 3: 자동 점검 — 토큰 일관성

같은 카테고리 안에서 다른 토큰이 함께 바뀌었어야 자연스러운데 한 토큰만 바뀌는 경우를 잡는다.

휴리스틱:

- `radius.button` 만 바뀌고 `radius.input`, `radius.badge` 는 그대로 → `warn` ("폼 컴포넌트들의 모서리만 따로 둥글어집니다 — 의도 확인 필요")
- `color.semantic.primary.500` 만 바뀌고 `color.semantic.primary.{400, 600}` 은 그대로 → `warn` ("primary 단계 중 500 만 변경 — 그라데이션이 어색해질 수 있어요")

해당 없으면 `status: "n/a"` 또는 `pass`.

## 스텝 4: humanAsks[] — 사람 검토 영역

세 관점 각각에 대해 `AskUserQuestion` 을 띄운다. 자동 점검 결과를 컨텍스트로 함께 보여준다.

### 4-1. 디자인 (정성)

- `question`: "이 변경, 디자인 시스템 전체 톤과 일관되나요?"
- `header`: "디자인 톤"
- `multiSelect`: false
- `options`:
  - `네, 일관됨`
  - `다른 컴포넌트 토큰도 같이 손봐야 해요`
  - `한 번 더 검토 필요 — 보류`

### 4-2. 개발 비용

- `question`: "개발 입장에서 이 변경의 작업 규모는?"
- `header`: "개발 비용"
- `multiSelect`: false
- `options`:
  - `작음 — 토큰 값만 바꾸면 됨 (Recommended for token-value)`
  - `중간 — 컴포넌트 한두 곳 수정 필요`
  - `큼 — 여러 컴포넌트의 props/스토리 갱신 필요`

### 4-3. 접근성 (자동 점검 보조)

자동 점검이 `pass` 나오면 옵션의 첫 번째에 `(자동 점검 통과)` 표기. `warn/fail` 이면 그 결과를 보여주고:

- `question`: "접근성 관점에서 진행해도 될까요?"
- `header`: "접근성"
- `multiSelect`: false
- `options`:
  - `진행 — 자동 점검 결과 OK`
  - `진행 — 경고 있지만 디자인적 이유로 승인`
  - `중단 — 색 대비 등 보완 후 재검토`

## 스텝 5: review.json 직렬화

```jsonc
{
  "id": "<id>",
  "auto": [
    { "rule": "wcag-contrast-aa", "status": "<pass|warn|fail|n/a>", "note": "..." },
    { "rule": "token-consistency", "status": "<...>", "note": "..." }
  ],
  "humanAsks": [
    { "perspective": "design", "question": "...", "answer": "..." },
    { "perspective": "dev-cost", "question": "...", "answer": "..." },
    { "perspective": "a11y", "question": "...", "answer": "..." }
  ]
}
```

`state.json` 의 `stage = "review"`, `status = "Reviewing"` 갱신.

## 스텝 6: 사용자 확인 및 후속 안내

리뷰 요약(자동 결과 + 사람 답변)을 보여준 뒤:

- `question`: "결정 단계로 넘어갈까요?"
- `header`: "다음 단계"
- `multiSelect`: false
- `options`:
  - `네, /decision <id> 로 진행 (Recommended)`
  - `리뷰 답변을 다시 잡을게요`
  - `중단 — 보류`

## 가드 — 자동 점검 자체가 실패할 때

색 토큰 페어를 자동으로 찾지 못하거나 라이브러리 의존성 문제로 색 대비 계산이 안 되면, 해당 항목은 `status: "n/a"` 로 두고 `note` 에 사유를 적는다. 사람 답변으로 우회 가능.

## 절차 개선 — 막히는 지점이 있었다면

이 스킬을 쓰다가 절차가 부족하거나 룰이 모호하다고 느낀 부분이 있으면 짧게 메모해두자. 흐름은 그대로 진행하고, 세션 종료 후 `workflow-admin` 으로 SSOT(`docs/AGENTS.md`)와 본 스킬을 함께 갱신한다 (§5-5).

메모 위치: `.claude/workflow/<id>/notes.md` (gitignore) 또는 채팅 "메모:" 한 줄.
