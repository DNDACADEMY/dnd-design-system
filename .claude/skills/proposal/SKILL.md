---
name: proposal
description: dnd-design-system 모노레포에서 디자인 변경 워크플로우의 첫 단계 — 자연어로 표현된 변경 의도를 구조화된 `proposal.json` 으로 정리한다. "변경 제안", "/proposal", "버튼을 더 둥글게 하고 싶어요", "이 색을 진하게 바꾸자", "X 컴포넌트가 필요해요" 같이 디자이너/개발자가 변경 의도를 자연어로 풀어놓고 시작할 때 반드시 이 스킬을 사용하라. 변경 타입(token-value/token-add/token-remove/component-new/component-api/bug) 6 가지 카탈로그(`references/change-types.md`)에 맞춰 분류하고, 토큰명·컴포넌트명 후보를 grep 으로 검증해 `targets[]` 까지 채운 뒤 `.claude/workflow/<id>/proposal.json` 으로 직렬화한다. 후속 단계(`/impact /preview /review /decision`)의 입력이 되는 단계이므로 자연어 원문은 `raw` 필드에만 보존하고 이후 단계는 구조화 필드만 사용한다.
---

# proposal

5단계 디자인 변경 워크플로우(`/proposal → /impact → /preview → /review → /decision`)의 첫 단계. 자연어 의도를 다음 단계가 입력으로 사용할 수 있는 구조화된 형태로 정규화하는 게 목적이다.

> 흐름·구성 요소·공통 룰 SSOT: `docs/AGENTS.md`. 단계별 산출 디렉터리·JSON 스키마: `.claude/workflow/README.md`.
>
> 사용자 확인은 항상 `AskUserQuestion` (R1). 자유 입력은 도구가 제공하는 "Other" 폴백.

## 스텝 1: id 발급 및 state.json 작성

자연어에서 1~3 단어 주제를 뽑아 `<id>` 를 만든다 (R2). 예: "버튼 모서리 좀 더 둥글게" → `button-radius-2026-05-07`.

`.claude/workflow/<id>/` 디렉터리를 만들고 `state.json` 을 초기화한다.

```jsonc
{
  "id": "<id>",
  "stage": "proposal",
  "status": "Draft",
  "createdAt": "<ISO 8601 with KST offset>",
  "updatedAt": "<same>",
  "title": "<자연어에서 뽑은 한 줄 제목>"
}
```

## 스텝 2: 변경 타입 분류

`references/change-types.md` 의 6 가지 타입 카탈로그를 읽고 자연어 원문과 매칭한다. 시그널이 명확하면 추천 타입을 1순위로 두고, 모호하면 `AskUserQuestion` 으로 확정한다.

| 타입            | 한 줄 정의                               |
| --------------- | ---------------------------------------- |
| `token-value`   | 기존 토큰의 값이 바뀜                    |
| `token-add`     | 새 토큰 추가                             |
| `token-remove`  | 토큰 제거                                |
| `component-new` | 새 컴포넌트 추가                         |
| `component-api` | 기존 컴포넌트 props/variant/타입 변경    |
| `bug`           | 의도된 동작과 실제 동작이 다른 것을 고침 |

질문 형식 (모호할 때만):

- `question`: "이 변경은 어떤 종류에 가까운가요?"
- `header`: "변경 타입"
- `multiSelect`: false
- `options`: 후보 2~4개. 시그널 일치도 가장 높은 옵션을 첫 번째에 두고 `(Recommended)` 표기

분류 우선순위가 헷갈리면 카탈로그의 "분류 우선순위" 섹션을 따른다.

## 스텝 3: targets[] 추출 및 검증

자연어에서 변경 대상을 뽑아 `targets[]` 에 채운다.

**토큰 후보 검증**:

```bash
grep -rn "<후보-토큰-경로>" packages/token/src
```

`packages/token/src/**/index.ts` 에 export 된 트리에 후보가 실제로 있는지 확인한다. 없으면 `AskUserQuestion` 으로 가까운 후보 2~3개를 제시.

**컴포넌트 후보 검증**:

```bash
ls packages/desktop/src/primitives/
ls packages/desktop/src/components/  # 존재한다면
```

이름이 정확히 일치하지 않으면 fuzzy 후보를 옵션으로 제시.

복합 변경(예: 토큰 값 변경 + 컴포넌트 props 변경)은 한 `proposal.json` 에 묶지 않는다. 별도 `<id>` 두 개로 분리하라고 사용자에게 안내한다 (R9).

## 스텝 4: 의도 한 줄 정리

`intent` 필드는 "왜 이걸 바꾸려는지" 를 한 문장으로 적는다. 자연어 원문이 짧으면 그대로, 길면 1문장으로 압축. 추측이 필요하면 `AskUserQuestion` 으로 사용자에게 확인한다.

질문 형식 (필요 시):

- `question`: "이 변경의 의도를 한 문장으로 고른다면 어느 게 가까운가요?"
- `header`: "변경 의도"
- `multiSelect`: false
- `options`: 자연어에서 추정 가능한 후보 2~3개

## 스텝 5: 우선순위

`AskUserQuestion` 으로 받는다. 디자이너가 추정하기 어려우면 `medium` 을 기본 추천.

- `question`: "이 변경의 우선순위는 어떻게 잡을까요?"
- `header`: "우선순위"
- `multiSelect`: false
- `options`:
  - `low — 다른 작업 사이에 끼워 넣어도 되는 정도`
  - `medium — 이번 분기 내 처리 (Recommended)`
  - `high — 이번 주/스프린트 내 처리`

## 스텝 6: proposal.json 직렬화

`.claude/workflow/<id>/proposal.json` 에 다음 형식으로 저장한다.

```jsonc
{
  "id": "<id>",
  "changeType": "<token-value | token-add | token-remove | component-new | component-api | bug>",
  "targets": [
    { "kind": "token", "name": "<토큰 경로>" },
    { "kind": "component", "name": "<PascalCase>" }
  ],
  "intent": "<한 문장>",
  "priority": "<low | medium | high>",
  "raw": "<디자이너가 적은 자연어 원문>"
}
```

`state.json` 의 `updatedAt` 도 같은 시각으로 갱신한다. (`status` 는 `Draft` 유지)

## 스텝 7: 사용자 확인 및 후속 안내

`proposal.json` 본문을 보여준 뒤 `AskUserQuestion` 으로 다음 행동을 묻는다.

- `question`: "이 제안으로 영향도 분석으로 넘어갈까요?"
- `header`: "다음 단계"
- `multiSelect`: false
- `options`:
  - `좋아요, /impact <id> 로 진행 (Recommended)`
  - `targets 를 다시 잡고 싶어요`
  - `의도(intent) 문장만 다듬을게요`

세부 수정은 "Other" 자유 입력으로 받는다. 사용자가 `/impact` 로 넘어가겠다고 하면 다음 명령을 안내만 하고 자동 호출하지 않는다 (R4).

## 가드 — 같은 id 가 이미 있을 때

`.claude/workflow/<id>/proposal.json` 이 이미 존재하면 덮어쓰기 전에 확인 (R6):

- `question`: "<id> 에 이미 proposal 이 있어요. 어떻게 할까요?"
- `header`: "기존 제안 처리"
- `multiSelect`: false
- `options`:
  - `덮어쓰기 (이전 내용 버림)`
  - `다른 id 로 새로 시작 (-2 접미사 자동)`
  - `취소`

## 절차 개선 — 막히는 지점이 있었다면

이 스킬을 쓰다가 절차가 부족하거나 룰이 모호하다고 느낀 부분이 있으면 짧게 메모해두자. 흐름은 그대로 진행하고, 세션 종료 후 라우팅:

- 룰(R#)·단계 구조·SSOT(`docs/AGENTS.md`)에 영향 있는 변경 → `workflow-admin` (§5-5)
- 본문 표현·옵션·예시 미세 조정 → `skill-admin`

메모 위치: `.claude/workflow/<id>/notes.md` (gitignore) 또는 채팅 "메모:" 한 줄.
