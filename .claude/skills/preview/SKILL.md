---
name: preview
description: dnd-design-system 모노레포에서 5단계 디자인 변경 워크플로우의 세 번째 단계 — `/impact` 가 추정한 영향 범위를 디자이너가 시각적으로 확인할 수 있게 Storybook 링크와 before/after 비교 노트로 정리한다. "/preview", "미리보기 만들어줘", "이 변경 어떻게 보여요?", "Storybook 으로 비교해줘" 같은 요청이나 변경 결정 전에 실제 모양을 봐야 할 때 반드시 이 스킬을 사용하라. `packages/desktop/.storybook/` 의 기존 Storybook 인프라를 활용해 노출도 높은 컴포넌트 3~5 개의 URL 을 산출하고, before/after 노트(토큰 변경이면 값 차이, 컴포넌트 변경이면 props 차이)를 `.claude/workflow/<id>/preview.md` 에 Markdown 으로 저장한다. v1 범위는 컴포넌트 단위 미리보기까지 — 페이지 컨텍스트 미리보기는 후순위.
---

# preview

5단계 워크플로우의 세 번째 단계. 디자이너에게는 숫자보다 그림이 빠르다. `/impact` 가 "47개 컴포넌트에 영향" 이라고 알려주는 것만으로는 결정이 안 되고, 그중 대표 컴포넌트 몇 개를 실제로 렌더한 모습을 봐야 판단이 들어간다.

> 흐름·구성 요소·공통 룰 SSOT: `docs/AGENTS.md`. 단계별 산출 디렉터리·JSON 스키마: `.claude/workflow/README.md`.
>
> v1 범위: 컴포넌트 단위까지만 (R10). 페이지 컨텍스트는 후순위.

## 스텝 1: 가드 — 입력 존재 확인

`<id>` 받아 `.claude/workflow/<id>/impact.json` 로드. 없으면 안내 (R5):

> `<id>` 의 impact.json 이 없어요. 먼저 `/impact` 로 영향 범위를 정리해주세요.

`impact.json.summary` 에 `[차단]` 마커가 있으면 (예: token-remove 인데 사용처가 남음) 미리보기를 만들지 않고 결정 단계로 바로 넘어갈 것을 안내한다.

## 스텝 2: 샘플 선정

`impact.json.componentImpact[]` 에서 상위 3~5 개 샘플을 고른다.

선정 규칙:

1. `exposure: high` 인 항목 모두 (단 5개 초과면 컷)
2. 비어 있으면 `medium` 에서 채워 3개 맞춤
3. 둘 다 비어 있으면 `low` 1개라도 보여주고 사용자에게 안내

각 샘플은 `samples[]` 항목으로 다음 정보를 모은다:

```jsonc
{
  "component": "Button",
  "scope": "component", // v1 은 항상 "component"
  "storybookUrl": "<실제 URL>",
  "beforeAfterNote": "<token-value 면 값 비교, component-api 면 props 비교>"
}
```

## 스텝 3: Storybook URL 산출

`packages/desktop/src/primitives/<Component>/<Component>.stories.tsx` 가 존재하는지 확인하고, 컴포넌트 이름을 kebab-case 로 변환해 URL 을 만든다:

```bash
ls packages/desktop/src/primitives/<Component>/*.stories.tsx
```

URL 패턴 (Storybook 7+ 기본):

```
http://localhost:6006/?path=/story/components-<kebab-component>--default
```

기본 스토리 ID 가 `default` 가 아닌 케이스가 있을 수 있으니, `*.stories.tsx` 를 열어 첫 번째 export 된 스토리 이름을 확인한 뒤 kebab-case 로 변환해 사용한다 (`Default` → `default`, `WithIcon` → `with-icon`).

스토리 파일 자체가 없으면 `.spec.stories.tsx` 를 폴백으로 사용하거나, "Storybook 항목 없음" 으로 표기하고 `samples[]` 에서 제외 + 사용자 알림.

## 스텝 4: before/after 노트 작성

`changeType` 별로 다르다.

### token-value

`packages/token/tokens/*.json` 에서 현재 값을 읽어 before 로 두고, 사용자에게 after 값을 받는다 (`AskUserQuestion` 으로 후보를 제시 — 토큰 카테고리 단계 값들).

```md
- before: `radius.button` = 6px
- after: `radius.button` = 12px
- 체크 포인트: hover 그림자 영역과 어색하지 않은가
```

### component-api

`proposal.json.intent` 에서 변경 내용을 가져와 props 차이로 적는다.

```md
- before props: `size: 'sm' | 'md'`
- after props: `size: 'sm' | 'md' | 'xlarge'`
- 체크 포인트: xlarge 가 다른 size 와 시각적으로 구분되는가
```

### component-new

before 가 없으므로 생략. after 만 적고 의존 토큰을 함께 적는다.

```md
- 신규 컴포넌트
- 의존 토큰: `color.semantic.bg.surface`, `radius.md`
- 체크 포인트: Toast 류와 톤이 일관되는가
```

### bug

before/after 가 동작 시점에 따라 달라져 텍스트로만 적는다.

```md
- 증상: 줄바꿈이 한 줄로 표시됨
- 수정 후: `\n` 이 정상 줄바꿈으로 보임
- 재현: Storybook 상단 "줄바꿈 포함" 입력 케이스
```

## 스텝 5: Storybook 실행 여부 확인

URL 을 발급해도 Storybook 이 안 떠 있으면 디자이너가 클릭해도 안 열린다. 사용자에게 묻는다:

- `question`: "Storybook 이 떠 있나요?"
- `header`: "Storybook"
- `multiSelect`: false
- `options`:
  - `네, 떠 있어요`
  - `아니요, 지금 띄울게요 — 명령 알려주세요`

"띄울게요" 면 다음 명령을 안내한다 (자동 실행 X — 별도 터미널에서 띄우는 게 디자이너 워크플로우에 맞음):

```bash
pnpm --filter @dnd-lab/desktop storybook
```

## 스텝 6: preview.md 직렬화

`.claude/workflow/<id>/preview.md` 에 Markdown 으로 저장한다.

```md
# Preview — <id>

> 변경 의도: <proposal.intent>
> 영향 요약: <impact.summary>

## 샘플

### Button (exposure: high)

http://localhost:6006/?path=/story/components-button--default

- before: `radius.button` = 6px
- after: `radius.button` = 12px
- 체크 포인트: hover 그림자와 모서리가 어색하지 않은가

### Badge (exposure: medium)

http://localhost:6006/?path=/story/components-badge--default

- before: `radius.button` = 6px (Badge 도 같은 토큰 사용)
- after: `radius.button` = 12px
- 체크 포인트: 텍스트와의 좌우 여백이 어색하지 않은가

## v1 범위

페이지 컨텍스트(여러 컴포넌트가 모인 화면) 미리보기는 후순위. 이번 단계에서는 컴포넌트 단위까지만 다룬다.
```

`state.json` 의 `stage = "preview"`, `status = "Previewing"` 갱신.

## 스텝 7: 사용자 확인 및 후속 안내

URL 리스트를 보여준 뒤:

- `question`: "샘플들 확인했나요? 다음 단계는?"
- `header`: "다음 단계"
- `multiSelect`: false
- `options`:
  - `리뷰로 넘어갈게요 — /review <id> (Recommended)`
  - `샘플을 더 늘려주세요`
  - `before/after 노트를 다시 적을게요`
  - `이 변경 안 하기로 — /decision 으로 바로 가서 hold/reject`

## 가드 — Storybook 인프라가 없을 때

`packages/desktop/.storybook/` 디렉터리 자체가 없는 환경이면 (이론상 있음) 미리보기를 .css.ts diff 로 대체한다. preview.md 본문에 `[Storybook 미설치]` 마커를 박고 영향 파일의 코드 블록만 첨부.

## 절차 개선 — 막히는 지점이 있었다면

이 스킬을 쓰다가 절차가 부족하거나 룰이 모호하다고 느낀 부분이 있으면 짧게 메모해두자. 흐름은 그대로 진행하고, 세션 종료 후 라우팅:

- 룰(R#)·단계 구조·SSOT(`docs/AGENTS.md`)에 영향 있는 변경 → `workflow-admin` (§5-5)
- 본문 표현·옵션·예시 미세 조정 → `skill-admin`

메모 위치: `.claude/workflow/<id>/notes.md` (gitignore) 또는 채팅 "메모:" 한 줄.
