---
name: check-variants
description: "@dnd-lab/desktop primitive 컴포넌트가 docs/VARIANT_GUIDELINES.md 의 변형·네이밍 표준을 따르는지 검사하고, 안전하게 자동 수정할 수 있는 위반은 사용자 승인 후 일괄 수정한다. \"variant 검사해줘\", \"check-variants\", \"네이밍 통일 검사\", \"가이드라인 위반 찾아줘\", \"BottomTxt 같은 거 잡아줘\", \"primitive 컨벤션 점검\" 같은 요청이나 새 컴포넌트 추가/수정 직후 셀프 점검이 필요할 때 반드시 이 스킬을 사용하라. 단순 위반(파일명, prop 케이싱, CSS export 접미사)은 사용자 승인 후 자동 Edit 까지 책임지고, API breaking change(compound 이름, variant prop 이름) 는 보고만 하고 사용자 결정에 맡긴다."
---

# check-variants

`packages/desktop/docs/VARIANT_GUIDELINES.md` 가 SSOT. 이 스킬은 그 가이드라인을 코드에 적용한다.

## 입력 받기

검사 대상 범위를 결정한다.

- 인자가 비어 있으면 → `packages/desktop/src/primitives/**` 전체.
- 컴포넌트 이름이 주어지면 (예: `/check-variants fieldbox`) → 해당 디렉토리만.
- 파일 경로가 주어지면 → 해당 파일만 (가능한 검사만 돌림).

## 스텝 1 — 가이드라인 로드

먼저 `packages/desktop/docs/VARIANT_GUIDELINES.md` 를 Read 한다. 표준이 바뀌었을 수 있으니 매번 SSOT 를 다시 확인한다. 이 문서에 없는 규칙은 검사하지 않는다 (false positive 방지).

## 스텝 2 — 검사 항목

규칙별로 어떻게 잡는지 정리. 위반은 **AUTO-FIX 가능** / **REPORT-ONLY** 두 등급으로 분류한다.

### 파일·디렉토리 네이밍 (AUTO-FIX 가능)

```bash
find packages/desktop/src/primitives -name "styles.css.ts"   # → style.css.ts
find packages/desktop/src/primitives -name "types.ts"        # → type.ts
```

### Boolean Prop 네이밍 (AUTO-FIX 가능)

`readonly` (전부 소문자) 가 React 컴포넌트의 props 타입에 쓰였는지.

```bash
grep -rn "readonly\??:" packages/desktop/src/primitives --include="*.ts" --include="*.tsx"
grep -rn "readonly={" packages/desktop/src/primitives --include="*.tsx"
```

`isDisabled`, `hasError` 같은 접두사 패턴도 props 표면에 노출돼 있으면 잡는다.

```bash
grep -rn "^\s*\(is\|has\)[A-Z][a-zA-Z]*\??:" packages/desktop/src/primitives --include="*.ts"
```

### CSS Export 네이밍 (AUTO-FIX 가능)

`*Style` 접미사로 export 된 vanilla-extract 객체.

```bash
grep -rn "^export const [a-zA-Z]*Style " packages/desktop/src/primitives --include="*.css.ts"
```

PascalCase 로 시작하는 export 도 검사:

```bash
grep -rn "^export const [A-Z][a-zA-Z]*\(Css\|Style\)" packages/desktop/src/primitives --include="*.css.ts"
```

### Compound 서브컴포넌트 네이밍 (REPORT-ONLY)

API breaking change 라 자동 수정 안 한다. 가이드라인 §6.1 카탈로그와 비교.

```bash
ls packages/desktop/src/primitives/*/compound/
```

알려진 위반: `BottomTxt.tsx` → `BottomText.tsx`.

### Variant Prop 이름 (REPORT-ONLY)

`variant` 가 아닌 `status`, `kind`, `type`, `intent`, `theme` 으로 시각 변형을 받는지.

```bash
grep -rn "^\s*\(status\|kind\|intent\|theme\)\??: " packages/desktop/src/primitives --include="*.ts"
```

알려진 위반: `chip/type.ts` 의 `ChipStatus`.

### Variant 값 형식 (REPORT-ONLY)

size 값이 `'sm'|'md'|'lg'`, `'S'|'M'|'L'`, 또는 숫자인 경우.

```bash
grep -rn "size.*['\"]\(sm\|md\|lg\|S\|M\|L\)['\"]" packages/desktop/src/primitives --include="*.ts" --include="*.tsx"
```

### inline 타입 정의 (REPORT-ONLY)

`type.ts` 가 없는데 props 타입을 메인 .tsx 안에 inline 으로 둔 경우. 카탈로그가 작아서 디렉토리 listing 으로 충분.

## 스텝 3 — 보고

검사 결과를 다음 형식으로 출력한다. 위반이 없는 항목은 한 줄로 압축.

```
## /check-variants 결과 — <대상>

### 자동 수정 가능 (N건)
- [fieldbox] styles.css.ts → style.css.ts (파일명)
- [txt] styles.css.ts → style.css.ts
- [txt] types.ts → type.ts
- [fieldbox] readonly → readOnly  (Fieldbox.tsx, type.ts, context.tsx, styles.css.ts)
- [sidebar] containerStyle → containerCss  (style.css.ts, Sidebar.tsx 외 N곳)
  ...

### 사용자 결정 필요 (N건 — API breaking)
- [fieldbox] BottomTxt → BottomText
  - 영향: Fieldbox.BottomTxt 를 쓰는 외부 사용처 전부. changeset 필요.
- [chip] status prop → variant prop
  - 영향: <Chip status="..."> 를 쓰는 외부 사용처 전부. changeset 필요.

### 권장 (N건 — non-breaking)
- [popover] type.ts 분리 권장

### 통과
파일 네이밍(7/9), readOnly(2/3), CSS export 접미사(8/9) ✓
```

## 스텝 4 — 자동 수정 (사용자 승인 후)

**AUTO-FIX 가능** 항목만. 사용자가 "수정해" / "고쳐줘" / "yes" 등 명시적 승인을 하면 진행한다. 승인 없이는 절대 Edit 하지 않는다.

### 절차

1. 자동 수정 가능 항목 전체 리스트를 한 번 더 보여주고 승인 요청.
2. 승인되면 항목별로:
   - **파일명 rename** (`styles.css.ts` → `style.css.ts`):
     - `git mv` 로 파일 이동.
     - 같은 컴포넌트 내 import 경로 grep → Edit.
     - 다른 컴포넌트에서 import 하는지 확인 (예: index 재export). 있으면 모두 수정.
   - **prop 이름 변경** (`readonly` → `readOnly`):
     - type 정의 파일에서 우선 변경.
     - 같은 컴포넌트 내 사용처 (.tsx, context.tsx, css.ts) 전부 grep → Edit.
     - JSX 의 `<Component readonly>` 도 변경.
   - **CSS export 이름 변경** (`containerStyle` → `containerCss`):
     - `*.css.ts` 에서 export 이름 변경.
     - 해당 export 를 import 하는 모든 위치 grep → Edit.
3. 수정 후 `pnpm check-types` 실행. 타입 에러가 나면 즉시 멈추고 보고. 임의로 추가 수정하지 않는다.
4. 수정한 파일 목록과 타입 체크 결과를 요약.

### 자동 수정 안 하는 것

- compound 컴포넌트 이름 변경 (`BottomTxt` → `BottomText`): 외부 API. 사용자가 결정 후 별도 PR.
- variant prop 이름 변경 (`status` → `variant`): 외부 API. 사용자가 결정 후 별도 PR.
- variant 값 형식 변경: 디자인 의사결정이 섞여 있어 자동화 부적절.
- inline 타입 분리: 단순 분리지만 의도가 있을 수 있어 자동화 안 함 — 권장만.

## 스텝 5 — 변경 후 안내

자동 수정을 했다면 다음을 안내한다 (자동 호출 X — 사용자가 명시적으로 실행).

- `pnpm lint`, `pnpm check-types` 통과 확인.
- 변경 규모에 따라 `/changeset` (외부에 노출된 prop 이 바뀌었으면 무조건).
- `/pr` 또는 `/pr-with-review`.

## 한계

- 정적 분석 한계로 재export 체인이 복잡한 경우 import 사용처를 놓칠 수 있다. 수정 후 타입 체크가 통과해야만 신뢰한다.
- 가이드라인이 변경되었는데 이 SKILL.md 의 grep 패턴이 안 따라갔을 수 있다. SSOT 와 본 스킬이 어긋나면 SSOT 를 우선하고 본 스킬은 `skill-admin` 으로 갱신.

## 절차 개선 — 막히는 지점이 있었다면

검사 룰이 빠뜨리는 패턴이나 자동 수정 절차가 모호한 지점이 있으면 짧게 메모해두자. 흐름은 그대로 진행하고, 세션 종료 후 `skill-admin` 으로 본 스킬을 갱신한다.

메모 위치: 채팅 "메모: <내용>" 한 줄 또는 `.claude/skill-notes/check-variants.md` (gitignore 권장).
