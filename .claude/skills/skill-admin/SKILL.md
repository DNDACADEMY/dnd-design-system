---
name: skill-admin
description: dnd-design-system 모노레포의 모든 프로젝트 스킬 SKILL.md 본문을 사용 경험 메모로부터 자동 갱신한다. "skill-admin", "스킬 갱신해줘", "스킬 개선", "메모로 스킬 고쳐줘", "changeset 본문 다듬기", "pr 절차 보강", "이 스킬 좀 더 명확하게" 같이 스킬을 쓰다가 발견한 부족함·모호함·누락 메모를 모아 SKILL.md 를 수정해야 할 때 반드시 이 스킬을 사용하라. 누적 메모를 분석해 어느 스킬의 어디를 어떻게 고칠지 제안하고, 사용자 승인 후 자동 Edit. 단, 5단계 워크플로우의 공통 룰(R#)·단계 구조·SSOT(`docs/AGENTS.md`)에 영향 있는 변경이면 `workflow-admin` 으로 위임한다 — skill-admin 은 단일 SKILL.md 본문의 절차·표현·예시·옵션 다듬기만 책임진다.
---

# skill-admin

스킬을 사용하다가 "이 부분이 모호하다", "이 절차가 빠진 것 같다", "옵션 표기가 헷갈린다" 같은 막힘을 발견하면, 흐름을 끊지 않고 메모로 남긴 뒤 세션 종료 시 이 스킬로 일괄 갱신한다. 다음 사람이 같은 곳에서 막히지 않게 만드는 게 목적이다.

## 책임 범위

| 대상                                                              | 처리                                                    |
| ----------------------------------------------------------------- | ------------------------------------------------------- |
| `.claude/skills/changeset/SKILL.md`                               | 본문 절차·표현·예시 갱신                                |
| `.claude/skills/commit/SKILL.md`                                  | 동일                                                    |
| `.claude/skills/pr/SKILL.md`                                      | 동일                                                    |
| `.claude/skills/pr-with-review/SKILL.md`                          | 동일                                                    |
| `.claude/skills/dds-component/SKILL.md`                           | 동일                                                    |
| `.claude/skills/a11y-spec-writer/SKILL.md`                        | 동일 (참조 자료 `references/` 갱신 포함)                |
| `.claude/skills/proposal/impact/preview/review/decision/SKILL.md` | 본문 표현만. 룰(R#)·단계 구조·입출력 계약 변경이면 위임 |

다음은 책임 밖이다 (위임):

- 5단계 워크플로우의 공통 룰(R#) 추가/수정/삭제 → `workflow-admin`
- 단계 추가/삭제, 단계 책임 변경 → `workflow-admin`
- `docs/AGENTS.md` 또는 `.claude/workflow/README.md` 변경 → `workflow-admin`
- `workflow-admin` / `skill-admin` 자기 자신의 본문 → 사람이 직접 수정 (자기 참조 회피)
- 글로벌 스킬(`~/.claude/skills/`) → 이 스킬 범위 밖

## 스텝 1: 메모 수집

`AskUserQuestion` 으로 어디서 메모를 가져올지 확정한다.

- `question`: "어디에 적힌 메모로 갱신할까요?"
- `header`: "메모 출처"
- `multiSelect`: true
- `options`:
  - `현재 세션 채팅의 "메모:" 줄`
  - `.claude/workflow/<id>/notes.md (워크플로우 안에서 적은 것)`
  - `.claude/skill-notes/ 의 파일들 (있다면)`
  - `지금 직접 입력`

선택된 출처에서 메모를 모아 한 화면에 보여준다. 메모마다 "어느 스킬에 대한 것인지" 추정해서 옆에 표기. 예:

```
1. [changeset] "Recommended 표기가 어떤 의미인지 헷갈렸음"
2. [/proposal] "토큰 후보가 모호할 때 옵션이 너무 많이 떠서 부담"
3. [?] "ID 발급 규칙이 복잡함"
```

스킬 추정이 안 되면 사용자에게 묻는다.

## 스텝 2: 위임 검사

각 메모를 읽고 다음 중 하나에 해당하면 `workflow-admin` 으로 위임 안내 후 그 메모를 따로 빼둔다:

- 룰 ID(R1~R11) 가 본문에 등장
- 단계 추가/삭제 또는 단계 이름 변경 의도
- `docs/AGENTS.md` 또는 `.claude/workflow/README.md` 의 표/스키마 변경 의도
- 단계 간 입출력 계약(JSON 필드) 변경

위임 안내 형식:

```
다음 메모는 SSOT 영향이 있어 workflow-admin 으로 처리해야 합니다:
- [3] "ID 발급 규칙이 복잡함" — R2 변경 가능성

skill-admin 에서는 나머지만 처리하고, workflow-admin 호출은 사용자가 직접 해주세요.
```

## 스텝 3: 메모 분류

남은 메모를 4 가지 카테고리로 분류한다.

| 카테고리  | 예시                                                   |
| --------- | ------------------------------------------------------ |
| 절차 누락 | "이 단계 다음에 X 를 해야 했는데 안내가 없었음"        |
| 표현 모호 | "Recommended 표기의 의미가 모호", "옵션 라벨이 헷갈림" |
| 예시 부족 | "이런 경우의 예시가 있으면 좋겠음"                     |
| 옵션 보강 | "AskUserQuestion 옵션을 추가하면 좋을 것 같음"         |

자동 분류가 어려운 메모는 `AskUserQuestion` 으로 사용자에게 분류 요청.

## 스텝 4: 수정안 제시

스킬마다 한 묶음으로, 변경 전/후를 보여준다. 같은 스킬에 메모가 여러 개면 한 번에 묶어서.

```
## changeset/SKILL.md 갱신 제안

### [표현 모호] 메모: "Recommended 표기가 어떤 의미인지 헷갈렸음"

수정 위치: 스텝 3 의 bump 타입 옵션

before:
- `patch — 버그 수정·내부 리팩토링`
- `minor — 새 컴포넌트·새 prop 추가 (Recommended)`

after:
- `patch — 버그 수정·내부 리팩토링`
- `minor — 새 컴포넌트·새 prop 추가 (Recommended: diff 분석 결과 가장 가능성 높음)`

이유: "Recommended" 가 무엇을 근거로 추천된 것인지 불명확하다는 메모.
```

## 스텝 5: 사용자 승인

`AskUserQuestion`:

- `question`: "이 수정안들로 갱신할까요?"
- `header`: "갱신 승인"
- `multiSelect`: false
- `options`:
  - `네, 모두 적용 (Recommended)`
  - `일부만 적용 — 어느 걸 빼야 하는지 알려주세요`
  - `수정안을 다시 다듬을게요`
  - `취소`

"일부만" 선택 시 어떤 항목을 뺄지 한 번 더 묻는다.

## 스텝 6: 자동 Edit 적용

승인된 수정안을 Edit 으로 적용한다. 같은 스킬에 변경이 여러 개면 충돌 없는 순서로 (긴 매칭 → 짧은 매칭, 또는 파일 끝 → 파일 앞).

각 Edit 후 결과를 한 줄씩 보고:

```
- changeset/SKILL.md 스텝 3 옵션 1건 갱신 ✓
- pr/SKILL.md 스텝 5 표현 1건 갱신 ✓
```

## 스텝 7: 검증

frontmatter 가 깨지지 않았는지, name/description 이 유효한지 가벼운 grep 으로 확인.

```bash
# frontmatter 시작/종료 확인
head -4 .claude/skills/<edited>/SKILL.md
```

명시적인 syntax 검사는 어렵지만, frontmatter 가 망가지면 스킬이 로드되지 않으니 한 번 눈으로 확인.

## 스텝 8: 메모 정리

처리된 메모는 출처에서 제거하거나 "처리됨" 마커를 박는다.

- `.claude/workflow/<id>/notes.md` — 처리된 줄 앞에 `~~ ~~` 취소선 또는 `[처리됨 YYYY-MM-DD]` 접두
- `.claude/skill-notes/` — 동일
- 채팅 메모 — 별도 처리 없음 (세션 끝나면 어차피 사라짐)

## 사용 예시

### 예시 1: changeset 옵션 표현 다듬기

> 사용자: "오늘 세션에서 changeset 쓰면서 헷갈린 거 정리해줘"
>
> 스킬:
>
> 1. 채팅 메모 수집 — "Recommended 의미가 모호" 1건
> 2. 위임 검사 — SSOT 영향 없음
> 3. 분류 = 표현 모호
> 4. 수정안: changeset/SKILL.md 스텝 3 옵션 라벨 보강
> 5. 승인 → 적용

### 예시 2: 워크플로우 안에서 발견한 메모 처리

> 사용자: "button-radius-2026-05-07 에 적은 메모로 갱신"
>
> 스킬:
>
> 1. `.claude/workflow/button-radius-2026-05-07/notes.md` 읽음
> 2. 메모 3 건 중 R7 (raw count 금지) 표현이 너무 강하다는 메모 1 건 → workflow-admin 위임
> 3. 나머지 2 건만 분류 → 수정안 → 적용

### 예시 3: 여러 스킬 일괄 갱신

> 사용자: "쌓인 메모 정리해줘"
>
> 스킬:
>
> 1. 메모 12건 수집
> 2. 위임 검사 후 4건 위임, 8건 처리
> 3. 8건을 4개 스킬(changeset, pr, dds-component, /impact)로 묶음
> 4. 스킬별 수정안 4묶음 제시
> 5. 승인 → 일괄 적용

## 자기 참조 회피

`skill-admin` 자신의 절차에 문제가 있을 때는 본 스킬을 호출하지 않고 사람이 직접 이 SKILL.md 를 수정한다. `workflow-admin` 도 마찬가지.
