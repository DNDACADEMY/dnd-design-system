# 변경 타입 카탈로그

`/proposal` 이 자연어 입력을 분류할 때 참조하는 6가지 변경 타입. 각 타입은 `proposal.json.changeType` 의 enum 값과 1:1 매핑된다.

---

## token-value

**한 줄**: 기존 토큰의 값(숫자/색상/문자열)이 바뀌는 변경.

**시그널**:

- "더 둥글게", "좀 더 진하게", "한 단계 키우자" 같이 **기존 무언가의 정도** 를 바꾸는 표현
- 토큰 이름이 직접 언급되거나(`radius.button`) 컴포넌트 + 속성 조합으로 추정 가능(`Button + 모서리`)
- `packages/token/tokens/*.json` 에서 같은 키의 값만 바뀌는 케이스

**target 추출**:

- 자연어에서 "어떤 컴포넌트의 어떤 속성" 을 뽑고, `packages/token/src/**/index.ts` 에 export 된 토큰 트리에서 일치 후보를 찾는다
- 후보가 2개 이상이면 `AskUserQuestion` 으로 좁힌다 (예: `radius.button` vs `radius.lg`)

**예시**:

- "버튼 모서리 좀 더 둥글게" → `targets: [{kind: 'token', name: 'radius.button'}]`
- "Primary 색상을 한 단계 진하게" → `targets: [{kind: 'token', name: 'color.semantic.primary.500'}]`

**후속 분석 힌트**: `/impact` 가 grep 으로 토큰명을 추적하기 가장 쉬운 케이스. `*.css.ts` 에 토큰 경로가 직접 박혀 있어 false positive 가 거의 없다.

---

## token-add

**한 줄**: 새 토큰을 추가하는 변경 (기존 값 영향 없음).

**시그널**:

- "새로운 단계 추가", "X 라는 토큰이 있으면 좋겠다", "한 칸 더"
- 기존 카테고리(예: `radius`, `spacing`)에 단계가 늘어나는 케이스
- 새로운 semantic 토큰을 만드는 케이스 (component → semantic 승격 포함)

**target 추출**:

- 추가할 토큰의 카테고리(color/spacing/radius/typography)와 제안 이름을 자연어에서 뽑는다
- 이름이 모호하면 `AskUserQuestion` 으로 후보 2~3개를 제시한다

**예시**:

- "spacing 에 28 단계 추가하자" → `targets: [{kind: 'token', name: 'spacing.7 (제안)'}]`

**후속 분석 힌트**: 기존 사용처에 영향이 거의 없다. `/impact` 는 "현재는 사용처 없음, 도입 시 어디에 쓸지" 를 사용자에게 묻는 모드로 빠진다.

---

## token-remove

**한 줄**: 기존 토큰을 제거하는 변경.

**시그널**:

- "정리하자", "더 이상 안 쓰는 X 빼자", "통합"
- 같은 의미의 토큰이 둘 이상 있을 때 하나로 합치는 케이스
- 사용처가 0 으로 떨어진 토큰 제거

**target 추출**:

- 제거 대상 토큰명을 명확히 받는다. 모호하면 거부하고 자연어 재입력 요청

**예시**:

- "color.legacy.\* 카테고리 제거" → `targets: [{kind: 'token', name: 'color.legacy.*'}]`

**후속 분석 힌트**: `/impact` 가 사용처 0 인지 반드시 검증해야 한다. 1곳이라도 남아 있으면 자동으로 제거 대신 deprecation 경로를 제안.

---

## component-new

**한 줄**: 새 컴포넌트를 추가.

**시그널**:

- "X 컴포넌트가 필요해요", "Y 라는 새 UI 패턴", `packages/desktop/src/<NewName>/` 디렉터리 신설
- 기존 컴포넌트와 명백히 구분되는 새 prop 시그니처

**target 추출**:

- 컴포넌트 이름 (PascalCase) + 1줄 용도

**예시**:

- "Toast 알림 컴포넌트" → `targets: [{kind: 'component', name: 'Toast'}]`

**후속 분석 힌트**: `/impact` 가 분석할 기존 사용처가 없다. 대신 어떤 토큰을 새로 의존하는지를 추적해 일관성 검토에 사용한다.

---

## component-api

**한 줄**: 기존 컴포넌트의 props/variant/타입 시그니처 변경.

**시그널**:

- "Button 의 size 옵션 늘리자", "variant 이름을 바꾸자"
- 기존 props 가 바뀌는 모든 케이스 (Breaking 여부는 별도 판단)

**target 추출**:

- `{kind: 'component', name: 'Button'}` + 자연어에 `intent` 로 어떤 prop 이 어떻게 바뀌는지 보존

**예시**:

- "Button 에 xlarge size 추가" → `intent: "Button.size 에 'xlarge' 옵션 추가"`

**후속 분석 힌트**: `/impact` 는 컴포넌트 사용처를 grep 으로 잡고, props 변경이 외부 호출자에 영향을 주는지 판단한다. Breaking 여부는 `/review` 에서 사람에게 묻는다.

---

## bug

**한 줄**: 의도된 동작과 실제 동작이 다른 것을 고치는 변경.

**시그널**:

- "X 가 안 돼요", "Y 가 깨져 있어요", 재현 가능한 시나리오
- 토큰/컴포넌트 어느 쪽이든 가능

**target 추출**:

- 증상이 나타나는 컴포넌트/토큰을 우선 적고, 원인이 다르면 `/impact` 에서 갱신한다

**예시**:

- "Txt 에서 줄바꿈이 한 줄로 보여요" → `targets: [{kind: 'component', name: 'Txt'}], intent: '\\n 처리 버그'`

**후속 분석 힌트**: 다른 타입과 달리 `/impact` 는 "이 버그가 영향을 주는 화면" 위주로 요약. 변경 범위는 작아도 노출도가 높을 수 있어 디자이너가 결정 단계에서 신중해야 한다.

---

## 분류 우선순위

자연어 한 문장에 여러 시그널이 섞이면 다음 순서로 1순위 타입을 정한다:

1. `bug` (재현 가능한 결함이면 다른 모든 의도보다 우선)
2. `component-new`
3. `token-remove`
4. `component-api`
5. `token-value`
6. `token-add`

복합 변경(예: 토큰 값 변경 + 컴포넌트 props 변경)은 `proposal.json` 을 두 개로 나누어 각각 `<id>` 를 따로 발급하는 게 원칙. 한 changeType 에 묶지 않는다.
