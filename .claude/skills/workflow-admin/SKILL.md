---
name: workflow-admin
description: dnd-design-system 모노레포의 5단계 디자인 변경 워크플로우(`/proposal /impact /preview /review /decision`)를 관리한다. SSOT 인 `docs/AGENTS.md` 와 5개 단계 스킬·`.claude/workflow/README.md` 의 일관성을 유지하는 메타 스킬이다. "workflow-admin", "워크플로우 룰 추가해줘", "공통 룰 변경", "워크플로우 단계 추가", "5단계 스킬 일괄 수정", "AGENTS.md 갱신", "워크플로우 정합성 점검", "디자인 워크플로우 거버넌스" 같은 요청이나 룰(R1~R11)을 추가·수정·제거할 때, 단계를 추가·삭제할 때, 단계 스킬의 책임이 바뀔 때 반드시 이 스킬을 사용하라. SSOT(`docs/AGENTS.md`)를 먼저 수정하고 grep 으로 영향받는 `SKILL.md` 와 `workflow/README.md` 를 찾아 동기화한 뒤 변경 이력을 한 줄 박는다. 단일 스킬의 절차만 손보는 작은 수정은 이 스킬 없이 직접 해도 되지만, 공통 룰·흐름·구성 요소가 바뀌면 반드시 이 스킬을 거친다.
---

# workflow-admin

5단계 디자인 변경 워크플로우의 단일 진입점. SSOT 인 `docs/AGENTS.md` 가 정답이라는 원칙을 강제하고, 룰·흐름·구성 요소 변경이 영향받는 모든 파일에 빠짐없이 반영되게 한다.

> 이 스킬은 워크플로우 자체의 거버넌스를 다룬다. 워크플로우 _안에서_ 변경을 만드는 작업(예: 토큰 값 바꾸기)은 `/proposal` 부터 시작한다.

## 관리 대상 파일

이 스킬이 동기화 책임을 지는 파일은 다음 7개다:

| 파일                               | 역할                          |
| ---------------------------------- | ----------------------------- |
| `docs/AGENTS.md`                   | SSOT (흐름·구성 요소·공통 룰) |
| `.claude/workflow/README.md`       | 디렉터리 컨벤션·JSON 스키마   |
| `.claude/skills/proposal/SKILL.md` | /proposal 절차                |
| `.claude/skills/impact/SKILL.md`   | /impact 절차                  |
| `.claude/skills/preview/SKILL.md`  | /preview 절차                 |
| `.claude/skills/review/SKILL.md`   | /review 절차                  |
| `.claude/skills/decision/SKILL.md` | /decision 절차                |

`proposal/references/change-types.md` 는 changeType enum 변경이 있을 때만 갱신 대상에 포함된다.

## 스텝 1: 변경 카테고리 분류

`AskUserQuestion` 으로 어떤 종류의 변경인지 확정한다. 카테고리에 따라 동기화 절차가 달라진다.

- `question`: "어떤 종류의 워크플로우 변경인가요?"
- `header`: "변경 카테고리"
- `multiSelect`: false
- `options`:
  - `룰 추가/수정/제거 (R# 추가나 의미 변경)`
  - `단계 추가/삭제 (스킬 자체를 늘리거나 줄임)`
  - `단계 책임 변경 (입출력/책임 표 §2-1 갱신)`
  - `구성 요소 네이밍/경로 변경`

자유 입력이 들어오면 가장 가까운 카테고리로 매핑하되, 모호하면 다시 묻는다.

## 스텝 2: SSOT 먼저 수정

`docs/AGENTS.md` 를 먼저 고친다. 이 단계가 끝나기 전에는 다른 파일을 손대지 않는다 — SSOT 가 정답이라는 원칙을 코드 흐름에서도 강제하기 위함이다.

| 카테고리         | 수정 위치                                                                   |
| ---------------- | --------------------------------------------------------------------------- |
| 룰               | §3 (R# 추가/갱신, deprecated 표시 시 본문에 ~~취소선~~ 또는 명시 비고)      |
| 단계 추가/삭제   | §1 흐름도 + §2-1 표 + §2-2/2-3 보조 자료 표 + §3 R8 상태 머신 + §5 거버넌스 |
| 단계 책임 변경   | §2-1 표의 책임 컬럼 + 영향 룰(있다면) §3                                    |
| 네이밍/경로 변경 | §2 표 전체와 §4 데이터 계약                                                 |

수정 후 변경 이력(§7)에 한 줄 추가:

```md
- YYYY-MM-DD: <카테고리> — <한 줄 설명>
```

## 스텝 3: 영향 범위 grep

SSOT 수정으로 영향받을 가능성이 있는 파일을 찾는다. 항상 7개 관리 대상 파일을 모두 확인하되, 다음 grep 으로 핫스팟을 빠르게 잡는다.

```bash
# 룰 ID 인용 위치
grep -rn "R[0-9]\+" .claude/skills/ docs/AGENTS.md .claude/workflow/README.md

# 단계 이름 사용처
grep -rn "/proposal\|/impact\|/preview\|/review\|/decision" .claude/skills/ docs/AGENTS.md .claude/workflow/README.md

# 변경하려는 특정 토큰/경로/필드명
grep -rn "<changed-name>" .claude/ docs/
```

결과를 사용자에게 표로 보여주고, 동기화할 파일 목록을 확인한다 (R1).

## 스텝 4: 영향 파일 동기화

각 영향 파일에 대해 변경 전/후를 사용자에게 보여주고 일괄 Edit. 큰 변경(예: 단계 추가)은 파일별로 끊어서 보여주되, 작은 변경(예: 단어 한두 개)은 묶어서 한 번에 보여준다.

동기화 원칙:

- **본문 룰을 다시 적지 않는다** — SKILL.md 본문에는 룰을 인용 형태(R#)로만 둔다. 룰 본문을 SSOT 외에 적으면 다음 변경 때 동기화 누락이 생긴다
- **단계 이름은 자연어 트리거를 보존한다** — 단계 이름 변경 시 SKILL.md 의 `name` frontmatter 외에 `description` 의 트리거 문구도 업데이트
- **JSON 스키마 변경은 workflow/README.md 가 우선** — SSOT 가 §4 에 요약을 두지만, 정답은 `workflow/README.md`. 두 파일이 어긋나면 수정 후 다시 grep 으로 검증

## 스텝 5: 검증

동기화 후 한 번 더 grep 으로 일관성을 확인한다.

```bash
# 모든 R# 가 SSOT 에 정의되어 있는가
grep -hno "R[0-9]\+" .claude/skills/ -r | sort -u | while read rule; do
  grep -q "^### $rule\." docs/AGENTS.md || echo "MISSING: $rule"
done

# 단계 이름이 §2-1 표와 SKILL.md frontmatter 에서 일치하는가
ls .claude/skills/ | grep -E "^(proposal|impact|preview|review|decision)$"
```

깨진 곳이 있으면 다시 스텝 4 로.

## 스텝 6: 변경 이력 마무리

다음 두 곳에 변경 이력을 박는다 (이미 스텝 2 에서 SSOT 는 박았음):

- `docs/AGENTS.md` §7 — 한 줄 (이미 박힘)
- `.claude/workflow/README.md` "변경 이력" 섹션 — 디렉터리 구조·JSON 스키마가 바뀐 경우만

5개 단계 SKILL.md 본문에는 별도 변경 이력을 두지 않는다 (git log 가 충분).

## 스텝 7: 사용자 확인

`AskUserQuestion`:

- `question`: "동기화 완료. 커밋할까요?"
- `header`: "후속"
- `multiSelect`: false
- `options`:
  - `네, 한 커밋으로 묶어주세요 (Recommended)`
  - `워크플로우 검증 한 번 더 돌릴게요`
  - `우선 멈춤 — 변경사항만 검토`

커밋 메시지 추천 형식:

```
chore(workflow): <카테고리 한 줄 요약>

SSOT(docs/AGENTS.md) <변경 부위> 갱신 + 영향 SKILL.md N개 동기화.
```

## 가드 — SSOT 와 스킬이 어긋나 있을 때

스텝 3 의 grep 결과 SSOT 와 다르게 적힌 룰/단계명이 발견되면, 사용자에게 **어느 쪽이 정답인지** 묻는다.

- `question`: "어긋난 부분이 있어요. 어느 쪽이 정답인가요?"
- `header`: "어느 쪽이 정답"
- `multiSelect`: false
- `options`:
  - `docs/AGENTS.md 가 정답 — 스킬을 SSOT 에 맞춤 (Recommended)`
  - `스킬이 정답 — SSOT 를 갱신`
  - `둘 다 틀림 — 새로 정의`

원칙은 SSOT 가 정답이지만, 의도 없이 SSOT 가 잘못 박힌 케이스도 있어 한 번 묻고 진행한다.

## 사용 예시

### 예시 1: 룰 추가

> 사용자: "리뷰 자동 점검에 토큰 네이밍 컨벤션도 추가하고 싶어요"
>
> 스킬:
>
> 1. 카테고리 = 룰 추가
> 2. SSOT 의 §3 에 R12 추가, R11 본문도 갱신 (자동 점검 영역이 늘어남)
> 3. grep — `.claude/skills/review/SKILL.md` 가 R11 인용
> 4. review/SKILL.md 의 자동 점검 섹션을 갱신, R12 인용 추가
> 5. 검증
> 6. 변경 이력 한 줄

### 예시 2: 단계 책임 변경

> 사용자: "/preview 가 페이지 컨텍스트도 다루도록 하자"
>
> 스킬:
>
> 1. 카테고리 = 단계 책임 변경
> 2. SSOT §2-1 의 preview 책임 + R10 (v1 범위) 갱신
> 3. grep — preview/SKILL.md, AGENTS.md, workflow/README.md
> 4. preview/SKILL.md 본문의 v1 범위 섹션 갱신
> 5. 검증
> 6. 변경 이력

### 예시 3: 누적된 메모로 일괄 갱신

> 사용자: "오늘 세션에서 쌓아둔 메모로 워크플로우 갱신해줘"
>
> 스킬:
>
> 1. `.claude/workflow/<id>/notes.md` 들과 채팅의 "메모:" 줄을 모은다 (§5-5)
> 2. 각 메모를 카테고리(룰/단계 책임/네이밍 등)로 분류
> 3. 카테고리별로 스텝 1~6 을 순서대로 적용 (룰 추가 → 단계 책임 변경 순)
> 4. 마지막에 검증 한 번 + 변경 이력 묶음 한 줄

## skill-admin 과의 경계

워크플로우 안의 단계 SKILL.md(`proposal/impact/preview/review/decision`)는 메모 종류에 따라 `skill-admin` 으로 위임할 수 있다.

| 메모 성격                                                        | 처리         |
| ---------------------------------------------------------------- | ------------ |
| 룰(R#) 추가/수정/제거                                            | workflow-admin |
| 단계 추가/삭제, 단계 책임/입출력 계약 변경                       | workflow-admin |
| `docs/AGENTS.md` 또는 `.claude/workflow/README.md` 표·스키마 변경 | workflow-admin |
| 단계 SKILL.md 본문의 표현·옵션 라벨·예시 다듬기                   | skill-admin    |
| 비-워크플로우 스킬(changeset/pr/commit 등) 본문 갱신              | skill-admin    |

스텝 1 의 카테고리 분류 결과가 "본문 표현·옵션 다듬기" 면 사용자에게 `skill-admin` 으로 위임할지 묻고 진행한다.

## 자기 참조 회피

`workflow-admin` 자신의 절차에 문제가 있을 때는 본 스킬을 호출하지 않고 사람이 직접 이 SKILL.md 를 수정한다 (`docs/AGENTS.md` §5-5). `skill-admin` 도 마찬가지로 자기 자신은 사람이 직접 수정.
