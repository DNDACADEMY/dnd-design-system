# DDS Design Workflow — Agents

5단계 디자인 변경 워크플로우(`/proposal → /impact → /preview → /review → /decision`)의 흐름·구성 요소·공통 룰을 한 곳에 모은 단일 진실 공급원(SSOT). 워크플로우와 관련된 모든 스킬은 이 문서를 기준으로 동작하며, 변경이 필요할 때는 `workflow-admin` 스킬로 일괄 수정한다.

> **관리 원칙**: 이 문서는 SSOT 다. 룰을 바꾸거나 단계를 추가하거나 스킬 동작을 조정해야 할 때는 **이 파일을 먼저 고치고**, `workflow-admin` 스킬이 영향받는 `SKILL.md` 와 `.claude/workflow/README.md` 를 동기화한다. 스킬 본문이 이 문서와 다르면 이 문서가 정답이다.

---

## 1. 워크플로우 흐름

```
[디자이너/개발자 요청]
        │
        ▼
   /proposal       ← 자연어 의도를 구조화 (changeType, targets, intent)
        │           output: proposal.json
        ▼
   /impact         ← grep 으로 영향 범위 정적 분석
        │           output: impact.json
        ▼
   /preview        ← Storybook URL + before/after 노트
        │           output: preview.md
        ▼
   /review         ← 자동 점검(WCAG, 일관성) + 사람 검토 3관점
        │           output: review.json
        ▼
   /decision       ← 진행/보류/반려 + 근거 기록
        │           output: decision.json + state.status 갱신
        ▼
   /changeset → /pr   (proceed 시에만, 기존 스킬)
```

### 단계 사이의 흐름 원칙

- **자연어 정규화는 한 번만** — `/proposal` 에서만 자연어를 받고, 이후 단계는 직전 산출 JSON 만 입력으로 사용한다 (CLAUDE.local.md 2번)
- **휴식 지점 보존** — 한 단계가 끝나면 자동으로 다음 스킬을 호출하지 않는다. 사용자가 명시적으로 다음 명령을 입력하게 둔다 (CLAUDE.local.md 3번)
- **사람 판단은 결정 단계에서만 강제** — 나머지는 자동 처리하고 막힐 때만 `AskUserQuestion`

---

## 2. 구성 요소

### 2-1. 단계별 스킬

| 스킬        | 입력                           | 핵심 출력 (`<id>` 디렉터리 내)       | 책임                                                             |
| ----------- | ------------------------------ | ------------------------------------ | ---------------------------------------------------------------- |
| `/proposal` | 자연어 + (선택) 컨텍스트       | `state.json`, `proposal.json`        | 의도 정규화. `changeType` 6 분류. `targets[]` 검증               |
| `/impact`   | `proposal.json`                | `impact.json`                        | 토큰/컴포넌트 사용처 grep. 디자이너 가독 summary 작성            |
| `/preview`  | `impact.json`, `proposal.json` | `preview.md`                         | 노출도 상위 3~5 컴포넌트의 Storybook URL + before/after 노트     |
| `/review`   | 위 3개                         | `review.json`                        | 자동(WCAG AA, 토큰 일관성) + 사람(디자인/개발 비용/접근성 3관점) |
| `/decision` | 위 4개                         | `decision.json`, `state.status` 갱신 | proceed/hold/reject + 근거. 후속 `/changeset` `/pr` 안내         |

### 2-2. 메타 스킬

| 스킬             | 책임                                                                                          |
| ---------------- | --------------------------------------------------------------------------------------------- |
| `workflow-admin` | 이 문서(SSOT)와 5개 단계 스킬·`workflow/README.md` 간 동기화. 룰/단계/스킬 수정의 단일 진입점 |

### 2-3. 보조 자료

| 경로                                                 | 역할                                                      |
| ---------------------------------------------------- | --------------------------------------------------------- |
| `.claude/workflow/README.md`                         | `<id>` 디렉터리 컨벤션 + JSON 스키마 (디렉터리 내부 설명) |
| `.claude/workflow/<id>/`                             | 단계별 산출물 캐시 (gitignore. README.md 만 추적)         |
| `.claude/skills/proposal/references/change-types.md` | `proposal` 의 6 가지 `changeType` 카탈로그                |

---

## 3. 공통 룰 (SSOT)

각 룰에 ID 를 붙여 스킬 본문에서 인용할 수 있게 한다. 룰을 추가·수정할 때는 ID 를 유지하고 (제거 시 deprecated 표시) 본 문서에서 먼저 변경한 뒤 `workflow-admin` 으로 영향 스킬을 동기화한다.

### R1. 사용자 확인은 항상 `AskUserQuestion`

자유 텍스트 질문 대신 옵션을 제시한다. 비개발자(디자이너)도 빠르게 응답할 수 있고 본문이 정확하게 다듬어진다. 자유 입력이 필요하면 도구가 자동 제공하는 "Other" 폴백을 활용한다.

### R2. `<id>` 발급은 `/proposal` 에서만

`<kebab-주제>-<YYYY-MM-DD>` 형태. 같은 날 같은 주제 충돌 시 `-2`, `-3` 접미사. 다른 단계 스킬은 기존 `<id>` 를 입력으로 받기만 한다.

### R3. 자연어는 `/proposal` 에서만 받는다

이후 단계는 직전 산출 JSON 만 입력으로 사용한다. 자연어 원문은 `proposal.json.raw` 에 보존한다.

### R4. 단계 사이는 자동 호출하지 않는다

각 스킬 마지막에 다음 단계로 넘어갈지 `AskUserQuestion` 으로 묻고, 사용자가 직접 다음 명령을 입력하게 둔다. 휴식 지점을 사용자 손에 둔다.

### R5. 가드 — 직전 산출물 부재

`/impact` 이후 단계는 직전 산출 파일이 없으면 진행을 거부하고 어디부터 시작해야 하는지 안내한다. 예외: `/decision` 은 `token-remove` 가 차단된 케이스에서 `preview` 없이 진행 가능 (사용자에게 미리보기 없는 결정인지 확인).

### R6. 가드 — 같은 단계 재진입

같은 `<id>` 의 같은 단계를 다시 호출하면 덮어쓸지 `AskUserQuestion` 으로 확인한다. 옵션: 덮어쓰기 / 다른 id 로 새로 시작 / 취소.

### R7. raw count 노출 금지 (impact 한정)

`/impact` 결과에서 "47 곳에 import" 같은 raw count 는 본문(`summary`)에 노출하지 않는다. 디자이너 가독 포맷("주요 컴포넌트 N 개 / 그중 노출도 높은 X")으로 요약하고, raw 통계는 `rawCount` 필드에만 보존한다 (CLAUDE.local.md 5번).

### R8. 상태 머신 전이

```
Draft (proposal 직후)
  → Analyzing (/impact)
  → Previewing (/preview)
  → Reviewing (/review)
  → Approved | OnHold | Rejected (/decision)
  → Merged (/pr 머지 후, 수동 또는 후속 자동화)
```

`state.json` 의 `stage` 와 `status` 필드는 이 머신을 따른다. `Merged` 전이는 `/decision` 이 아닌 별도 경로로 처리.

### R9. 복합 변경은 분리

토큰 값 변경 + 컴포넌트 props 변경처럼 두 종류가 섞이면 한 `proposal.json` 에 묶지 않고 별도 `<id>` 두 개로 분리한다.

### R10. v1 범위 — 컴포넌트 단위 미리보기

`/preview` 는 v1 에서 컴포넌트 단위까지만 지원. 페이지 컨텍스트 미리보기는 후순위 (CLAUDE.local.md 5번).

### R11. v1 범위 — 자동 점검 영역 한정

`/review` 의 자동 점검은 두 영역만:

- WCAG AA 색 대비 — `proposal.changeType` 이 `token-value` 또는 `token-add` 이고 대상이 색 토큰일 때만
- 토큰 일관성 — 같은 카테고리 내 다른 토큰이 함께 바뀌었어야 자연스러운 케이스 검출

나머지(디자인 정성, 개발 비용)는 `humanAsks[]` 로 분류해 `AskUserQuestion`.

---

## 4. 데이터 계약 (요약)

전체 JSON 스키마는 `.claude/workflow/README.md` 에 있다. 여기는 단계 간 입출력 계약 요약만.

| 산출물          | 핵심 필드                                                        |
| --------------- | ---------------------------------------------------------------- |
| `state.json`    | `id`, `stage`, `status`, `createdAt`, `updatedAt`, `title`       |
| `proposal.json` | `changeType`, `targets[]`, `intent`, `priority`, `raw`           |
| `impact.json`   | `tokenUsages[]`, `componentImpact[]`, `summary`, `rawCount`      |
| `preview.md`    | (Markdown) 샘플별 Storybook URL + before/after 노트              |
| `review.json`   | `auto[]` (rule, status, note), `humanAsks[]` (perspective, q, a) |
| `decision.json` | `choice`, `rationale`, `decidedBy`, `decidedAt`, `nextActions[]` |

---

## 5. 거버넌스 — 변경은 어떻게

### 5-1. 룰 추가·수정

1. 이 문서(`docs/AGENTS.md`)의 §3 에서 룰을 먼저 고친다 (ID 부여 또는 유지)
2. `workflow-admin` 스킬을 호출 — 영향받는 `SKILL.md` 를 grep 으로 찾아 동기화
3. 변경 이력(§7)에 한 줄 추가

### 5-2. 단계 추가·삭제

1. §1 흐름도와 §2-1 표를 먼저 업데이트
2. `.claude/workflow/README.md` 의 디렉터리 구조·상태 머신·JSON 스키마 갱신
3. `workflow-admin` 호출 — 신규 `SKILL.md` 골격 생성 또는 기존 스킬의 입출력 가드 갱신
4. 변경 이력에 단계 추가/제거 기록

### 5-3. 단일 스킬 절차 수정

1. 해당 단계의 책임이 §2-1 표와 어긋나지 않는지 확인 (어긋나면 표를 먼저 수정)
2. `SKILL.md` 본문의 스텝만 수정
3. 공통 룰 변경이 아니라면 `workflow-admin` 호출은 선택

### 5-4. 명확하지 않을 때

이 문서와 `SKILL.md` 가 다르면 **이 문서가 정답**. 스킬 본문이 SSOT 와 어긋난 채 발견되면 `workflow-admin` 으로 동기화한다.

---

## 6. 미해결 영역 (다음 분기)

CLAUDE.local.md 5번에서 짚은 깨질 것 같은 지점들. 골격은 박혔지만 실제로 디자이너 옆에 앉아 굴려보면서 깎아내야 풀리는 영역.

- **디자이너가 이 흐름을 자기 일이라 느낄 것인가** — 1차 사용자(1명)에게 맞춰 깎고 확산 (2026-W19~)
- **`/impact` 결과가 너무 많이 뱉을 가능성** — `summary` 포맷이 결정을 막지 않는지 추적, 필요 시 R7 강화
- **`/preview` 페이지 컨텍스트 미지원** (R10) — 비용 산정 후 v2 검토
- **`/review` 자동화 비율** — 현재 R11 두 영역. 추가 자동 점검 후보 발굴

---

## 7. 변경 이력

- 2026-05-07: 첫 버전. 5단계 워크플로우 골격 + 11개 공통 룰 + 거버넌스 정의. `workflow-admin` 도입.
