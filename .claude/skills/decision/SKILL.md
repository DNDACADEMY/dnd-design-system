---
name: decision
description: dnd-design-system 모노레포에서 5단계 디자인 변경 워크플로우의 마지막 단계 — 진행/보류/반려를 명시적으로 선택하고 그 근거를 함께 기록한다. "/decision", "결정", "이거 진행할게요", "보류로 바꿔주세요", "반려할게요" 같은 요청이나 proposal/impact/preview/review 까지 거친 변경에 대해 진행 의사를 확정해야 할 때 반드시 이 스킬을 사용하라. CLAUDE.local.md 4-5 에서 강조했듯 결정의 근거가 휘발되지 않게 박아두는 게 목적이다. `proceed` 면 후속으로 `/changeset` `/pr` 안내(자동 호출 X — 사용자가 명시적으로 다음 명령을 실행). 결과는 `.claude/workflow/<id>/decision.json` + `state.status` 갱신(`Approved | OnHold | Rejected`).
---

# decision

5단계 워크플로우의 마지막 단계. 사람이 명시적으로 진행/보류/반려를 선택하고 근거를 같이 박는다. CLAUDE.local.md 4-5 에서 적었듯, 채팅으로 "그럼 진행해주세요" 하고 끝내면 그 이유가 같이 사라진다 — 이 단계의 핵심은 의사결정을 휘발되지 않게 만드는 것이다.

> 단계 간 데이터 컨벤션은 `.claude/workflow/README.md` 참조.

## 스텝 1: 가드 — 입력 존재 확인

`<id>` 받아 `.claude/workflow/<id>/` 의 4개 파일이 모두 있는지 확인:

- `proposal.json`
- `impact.json`
- `preview.md`
- `review.json`

빠진 게 있으면 어디부터 시작해야 하는지 안내. `/preview` 가 빠진 경우는 예외적으로 허용 — 토큰 제거(`token-remove`)에서 `impact.json` 이 차단된 케이스에서는 `preview` 를 건너뛰고 `decision` 으로 바로 와도 된다 (이때는 `humanAsks` 로 사용자에게 미리보기 없는 결정인지 확인).

## 스텝 2: 한 화면 요약

이전 4단계 산출물을 압축한 요약을 사용자에게 한 번에 보여준다.

```md
## 결정 대상 — <id>

**의도**: <proposal.intent>
**변경 타입**: <proposal.changeType>
**대상**: <proposal.targets 1줄 요약>

**영향**: <impact.summary>

**미리보기 샘플**: <preview.md 의 샘플 컴포넌트 N개 + URL 1개>

**리뷰 요약**:

- WCAG AA: <review.auto[wcag-contrast-aa].status> — <note>
- 토큰 일관성: <review.auto[token-consistency].status> — <note>
- 디자인: <review.humanAsks[design].answer>
- 개발 비용: <review.humanAsks[dev-cost].answer>
- 접근성: <review.humanAsks[a11y].answer>
```

리뷰에서 `warn` 이나 `fail` 항목이 있으면 시각적으로 강조 (`⚠️` 아이콘).

## 스텝 3: 진행 의사 질문

`AskUserQuestion`:

- `question`: "이 변경, 진행할까요?"
- `header`: "결정"
- `multiSelect`: false
- `options`:
  - `진행 (proceed) — /changeset → /pr 으로`
  - `보류 (hold) — 아직 결정 보류, 나중에 다시`
  - `반려 (reject) — 진행 안 함`

리뷰에서 `warn/fail` 또는 `중단/보류` 답변이 있으면 첫 번째 옵션을 `보류` 로 바꿔서 안전 추천.

## 스텝 4: 근거 입력

선택과 무관하게 근거를 받는다.

`AskUserQuestion`:

- `question`: "이 결정의 근거를 한 줄로 골라주세요."
- `header`: "결정 근거"
- `multiSelect`: false
- `options`: 직전 단계 결과에서 추출한 후보 2~3개. 예시:
  - `리뷰가 모두 OK 라 진행`
  - `영향이 좁아 부담 적음`
  - `색 대비 경고가 있어 보류`
  - (자유 입력은 "Other" 폴백)

자유 입력이 들어오면 그대로 `rationale` 에 박는다.

## 스텝 5: decision.json 직렬화

```jsonc
{
  "id": "<id>",
  "choice": "<proceed | hold | reject>",
  "rationale": "<한 줄 또는 자유 입력>",
  "decidedBy": "user",
  "decidedAt": "<ISO 8601 with KST offset>",
  "nextActions": [...]
}
```

`nextActions` 는 `choice` 별로:

- `proceed`: `["run /changeset <id>", "run /pr <id>"]`
- `hold`: `["resume later — same <id> 로 다시 들어오면 됨"]`
- `reject`: `[]`

## 스텝 6: state.json 갱신

`choice` 에 따라 `state.status` 를 박는다:

- `proceed` → `Approved`
- `hold` → `OnHold`
- `reject` → `Rejected`

`stage = "decision"`, `updatedAt` 갱신.

`Merged` 상태로의 전이는 이 스킬에서 안 한다 — `/pr` 머지 후 후속 자동화나 수동 갱신으로 따로 처리.

## 스텝 7: 후속 안내

`choice` 별로 다른 안내:

### proceed

```md
✅ 진행 결정 — `<id>`

다음 명령으로 이어가세요:

1. `/changeset` — 패키지 변경 노트 작성
2. `/pr` — PR 생성

(자동 호출은 안 합니다 — 디자이너/개발자가 명시적으로 실행해주세요)
```

`/changeset` 호출은 자동화하지 않는다. 사용자가 직접 명령을 입력해야 다음 단계로 넘어가는 휴식 지점을 보존한다.

### hold

```md
⏸ 보류 — `<id>`

근거: <rationale>
다시 진행할 준비가 되면 `/decision <id>` 또는 처음부터 다시 보고 싶으면 `/proposal` 로 새로 시작하면 됩니다.
```

### reject

```md
❌ 반려 — `<id>`

근거: <rationale>
이 변경은 진행하지 않습니다. 워크플로우 디렉터리(`.claude/workflow/<id>/`) 는 기록 보관용으로 유지됩니다.
```

## 가드 — 이미 결정된 id 에 다시 들어올 때

`decision.json` 이 이미 있으면:

- `question`: "<id> 는 이미 `<choice>` 로 결정됐어요. 어떻게 할까요?"
- `options`:
  - `결정 변경 (덮어쓰기)`
  - `근거만 보강`
  - `취소`

결정을 바꾸면 `state.status` 도 함께 갱신.
