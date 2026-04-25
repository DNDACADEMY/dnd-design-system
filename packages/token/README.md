# @dnd-lab/token

DND Academy 디자인 시스템의 디자인 토큰 패키지. Figma Tokens Studio 에서 export 한
JSON 을 [Style Dictionary](https://styledictionary.com/) 로 변환해 JS / TS / CSS 산출물을 만든다.

- 색상 / 타이포그래피 두 네임스페이스를 별도로 export
- 각 네임스페이스는 `primitive` → `semantic` → `component` 3단 계층
- `semantic` / `component` 는 `{primitive.slate.500}` 형식으로 primitive 를 참조

---

## 💻 개발자 가이드

### 설치

```bash
pnpm add @dnd-lab/token
# or
npm install @dnd-lab/token
```

### 사용

```ts
import { color, typography } from '@dnd-lab/token'

// 원시 색상 — var(--color-blue-500) 문자열로 컴파일됨
color.primitive.blue['500']

// 의미 색상 — 용도 기반
color.semantic.text.neutral.primary
color.semantic.background.brand.primary

// 컴포넌트 전용 색상
color.component.radio.border.default

// 타이포그래피 — 모두 number 값
typography.semantic.body['1'].size
typography.semantic.title['2'].lineHeight
typography.primitive.fontWeight.bold
```

`color.*` 값은 CSS 변수 (`var(--color-*)`) 로 빌드되므로 변수 정의를 제공하는
CSS 를 반드시 함께 import 해야 한다.

```ts
// 앱 진입점에서 한 번
import '@dnd-lab/token/css'
```

> [!NOTE]
> CSS 변수는 **`color` 토큰만** export 된다. `typography` 는 raw number 라서
> Vanilla Extract 등에서 직접 값으로 쓰면 된다.

### Vanilla Extract 예시

```ts
// style.css.ts
import { color, typography } from '@dnd-lab/token'
import { recipe } from '@vanilla-extract/recipes'

export const button = recipe({
  base: {
    backgroundColor: color.semantic.background.brand.primary,
    color: color.semantic.text.brand.onBrand,
    fontSize: typography.semantic.body['1'].size,
    fontWeight: typography.semantic.body['1'].fontWeight
  }
})
```

### 빌드

```bash
pnpm build           # Style Dictionary 로 토큰 빌드
```

빌드 후 `dist/` 에 생성되는 산출물:

| 파일                  | 용도                       |
| --------------------- | -------------------------- |
| `tokens.js` / `.d.ts` | JS/TS import 용 객체       |
| `variables.css`       | `:root` CSS 커스텀 프로퍼티 |

빌드 시 `.tokens-cache.json` 과 비교해 추가·삭제·변경된 토큰만 콘솔에 표시한다.

### 토큰 업데이트 워크플로우

```bash
# 1. tokens/color.json 또는 tokens/typography.json 교체
#    (디자이너가 Tokens Studio 에서 export 한 파일)
# 2. 빌드
pnpm build
# 3. 의존 패키지 재빌드 (루트에서)
pnpm build:packages
```

---

## 🎨 디자이너를 위한 가이드

### Tokens Studio 란?

Tokens Studio 는 Figma 플러그인으로, 디자인 토큰을 체계적으로 관리하고
개발팀과 동기화할 수 있게 해주는 도구다.

**디자이너가 할 수 있는 것:**

- ✅ Figma 에서 직접 디자인 토큰 생성/수정
- ✅ 색상, 타이포그래피 등을 체계적으로 관리
- ✅ JSON 파일로 export 하여 개발팀과 공유
- ✅ 디자인 변경사항을 빠르게 개발 코드에 반영

---

## 📚 목차

1. [Tokens Studio 설치](#1-tokens-studio-설치)
2. [토큰 구조 이해하기](#2-토큰-구조-이해하기)
3. [토큰 생성하기](#3-토큰-생성하기)
4. [토큰 Export](#4-토큰-export)
5. [개발팀에 전달](#5-개발팀에-전달)
6. [자주 묻는 질문 (FAQ)](#6-자주-묻는-질문)

---

## 1. Tokens Studio 설치

### Figma 플러그인 설치

1. Figma 열기
2. **Plugins** → **Find more plugins**
3. 검색: **"Tokens Studio for Figma"**
4. **Install** 클릭

### 플러그인 실행

1. Figma 파일 열기
2. **Plugins** → **Tokens Studio for Figma**
3. 플러그인 창 열림 ✅

---

## 2. 토큰 구조 이해하기

DND Academy 디자인 시스템은 **3단 계층** 구조를 사용한다.

```
color (Set)
└─ primitive   원시 토큰 — 실제 색상 값
└─ semantic    의미 토큰 — 용도에 따라 primitive 를 참조
└─ component   컴포넌트 전용 — semantic 또는 primitive 참조

typography (Set)
└─ primitive   원시 값 (size, lineHeight, fontWeight 등)
└─ semantic    텍스트 스타일 (display, title, body, caption ...)
└─ component   컴포넌트 전용 텍스트 토큰
```

> [!IMPORTANT]
> `semantic` 과 `component` 의 값은 직접 `#hex` 가 아니라 **참조**(`{primitive.cyan.500}`) 로
> 작성한다. 이렇게 해야 primitive 가 바뀔 때 의미·컴포넌트 토큰이 자동으로 따라온다.

### 참조 예시

```
color.semantic.text.neutral.primary  →  {primitive.slate.900}
color.component.radio.border.default →  {semantic.border.neutral.medium}
```

---

## 3. 토큰 생성하기

### 3-1. Token Set 만들기

DND 프로젝트는 **`color`** 와 **`typography`** 두 개의 Set 을 사용한다.

1. Tokens Studio 플러그인에서 **"+ New Set"** 클릭
2. Set 이름 입력 (`color` 또는 `typography`)
3. ✅ 체크박스 켜서 Set 활성화

### 3-2. 색상(Color) 토큰

`color` Set 안에 `primitive` / `semantic` / `component` 그룹을 만들고,
그 아래에 토큰을 추가한다.

**예: Cyan 색상 팔레트 (primitive)**

```
color
└─ primitive
    └─ cyan
        ├─ 50   (#ecfeff)
        ├─ 100  (#cffafe)
        ├─ 200  (#a5f3fc)
        ├─ 300  (#67e8f9)
        ├─ 400  (#22d3ee)
        ├─ 500  (#06b6d4)  ← 기본 색상
        ├─ 600  (#0891b2)
        ├─ 700  (#0e7490)
        ├─ 800  (#155e75)
        ├─ 900  (#164e63)
        └─ 950  (#083344)
```

**예: 의미 토큰 (semantic)** — primitive 를 참조

```
color
└─ semantic
    └─ text
        └─ neutral
            ├─ primary    {primitive.slate.900}
            ├─ secondary  {primitive.slate.700}
            └─ disabled   {primitive.slate.400}
```

### 3-3. 타이포그래피(Typography) 토큰

타이포그래피는 `number` 타입이며 단위 없이 입력한다.

```
typography
└─ primitive
    ├─ size
    │   ├─ 01  (12)
    │   ├─ 02  (14)
    │   └─ ...
    ├─ lineHeight
    ├─ fontWeight
    │   ├─ regular  (400)
    │   ├─ medium   (500)
    │   └─ bold     (700)
    └─ letterSpacing
└─ semantic
    └─ body
        └─ 1
            ├─ size            {primitive.size.03}
            ├─ lineHeight      {primitive.lineHeight.03}
            ├─ fontWeight      {primitive.fontWeight.regular}
            └─ letterSpacing   {primitive.letterSpacing.none}
```

### 3-4. 네이밍 규칙

> [!IMPORTANT]
> **일관된 네이밍이 매우 중요하다!**

**색상 (kebab + 숫자)**

```
✅ 올바른 예:
color / primitive / cyan / 500
color / semantic / text / neutral / primary
color / component / radio / border / default

❌ 잘못된 예:
Color / Cyan / 500          (대문자 시작)
color-cyan-500              (슬래시 대신 하이픈)
color / primary             (3단 계층 무시)
```

**타이포그래피**

```
✅ 올바른 예:
typography / primitive / size / 03
typography / semantic / body / 1 / size

❌ 잘못된 예:
typography / size-3                       (그룹 없음)
typography / semantic / body / 1 / 14px   (단위 포함)
```

---

## 4. 토큰 Export

### JSON 파일 다운로드

1. Tokens Studio 우측 상단 **⚙️ (Settings)**
2. **"Export"** 탭 선택
3. 각 Set 별로 export — `color`, `typography` 두 파일 생성
4. 파일명: `color.json`, `typography.json` (Set 이름과 동일)

### 파일 확인

다운로드된 `color.json` 일부:

```json
{
  "primitive": {
    "cyan": {
      "500": {
        "$type": "color",
        "$value": "#06b6d4"
      }
    }
  },
  "semantic": {
    "text": {
      "neutral": {
        "primary": {
          "$type": "color",
          "$value": "{primitive.slate.900}"
        }
      }
    }
  }
}
```

`typography.json` 일부:

```json
{
  "primitive": {
    "size": {
      "03": { "$type": "number", "$value": 14 }
    }
  },
  "semantic": {
    "body": {
      "1": {
        "size": { "$type": "number", "$value": "{primitive.size.03}" }
      }
    }
  }
}
```

> [!TIP]
> `$value` 가 `{...}` 형태면 **참조 토큰**, `#hex` / 숫자면 **원시 토큰** 이다.

---

## 5. 개발팀에 전달

### 방법 1: GitHub PR (추천)

1. GitHub 저장소 → [`packages/token/tokens/`](https://github.com/DNDACADEMY/dnd-design-system/tree/main/packages/token/tokens)
2. **"Add file"** → **"Upload files"**
3. `color.json` / `typography.json` 드래그 & 드롭 (기존 파일 덮어쓰기)
4. 커밋 메시지:

   ```
   chore(token): 디자인 토큰 업데이트

   - Cyan 500 수정 (#06b6d4 → #00bee8)
   - text.neutral.primary semantic 추가
   ```

5. **"Create pull request"**

### 방법 2: Slack

```
@개발팀 디자인 토큰 업데이트했습니다!

변경사항:
- Cyan 500 색상 수정 (#06b6d4 → #00bee8)
- text/neutral/primary semantic 추가

첨부: color.json, typography.json
```

---

## 6. 자주 묻는 질문

### Q1. 수정하면 바로 반영되나요?

**A.** 아니다. 다음 과정이 필요하다.

1. 디자이너: Tokens Studio 수정 → JSON Export
2. 디자이너: 개발팀에 전달
3. 개발자: `tokens/color.json` / `tokens/typography.json` 교체
4. 개발자: `pnpm build` 실행
5. 개발자: 사용처 코드 적용 (보통 token 변경만으로 자동 반영)

> [!NOTE]
> 보통 1~2일 소요. 급한 경우 Slack 으로 알려주세요!

### Q2. 색상 변경 시 영향 범위는?

**A.** 해당 토큰을 참조하는 **모든 semantic / component 토큰** 에 영향이 전파된다.

**예시**

- `color.primitive.cyan.500` 변경 시
  - 이를 참조하는 `semantic.background.brand.primary` 자동 변경
  - 그 semantic 을 사용하는 모든 버튼·링크·아이콘 자동 변경

> [!CAUTION]
> primitive 변경 전 개발팀과 상의 필수.

### Q3. 새 색상 팔레트 추가 방법은?

**A.** 기존 팔레트 구조를 따라 추가:

```
color / primitive / newColor
                    ├─ 50   (가장 밝음)
                    ├─ 100
                    ├─ ...
                    ├─ 500  (기본)
                    ├─ ...
                    ├─ 900
                    └─ 950  (가장 어두움)
```

> [!TIP]
> 도구 추천: [Coolors.co](https://coolors.co), [Material Palette](https://material.io/design/color/), [Tailwind Color](https://tailwindcss.com/docs/customizing-colors)

### Q4. 토큰 이름 수정하려면?

**A.** Tokens Studio 에서 수정:

1. 토큰 선택
2. 이름 클릭하여 편집
3. 새 이름 입력
4. 다시 Export

> [!WARNING]
> 개발에서 사용 중인 토큰 이름 변경은 **Breaking Change**. 변경 전 개발팀과 상의 필수!

### Q5. 토큰 삭제 방법은?

1. 토큰 선택
2. 우클릭 또는 **...** 메뉴
3. **Delete**

> [!CAUTION]
> **삭제 전 확인:**
>
> - Figma 디자인에서 사용 중?
> - 개발 코드에서 사용 중?
> - 다른 semantic / component 토큰이 참조 중?
> - 개발팀과 상의했나?

### Q6. Tokens Studio 가 느려요

- Figma 재시작
- Set 을 분리 유지 (`color`, `typography` 분리됨)
- Settings → "Update on change" 끄기

### Q7. 참조(`{primitive.xxx}`) 가 풀려서 hex 로 export 됩니다

**A.** Tokens Studio Settings → Export → **"Resolve references"** 옵션을 끄면
참조가 그대로 유지된다. 우리 빌드는 참조 형태를 기대하므로 반드시 꺼두자.

### 참고 링크

- [Tokens Studio 공식 문서](https://docs.tokens.studio/)
- [디자인 토큰이란? (Adobe Spectrum)](https://spectrum.adobe.com/page/design-tokens/)
- [Style Dictionary](https://styledictionary.com/)

---

## ✅ 체크리스트

### 토큰 생성 시

- [ ] 3단 계층(primitive / semantic / component) 준수
- [ ] semantic / component 는 참조(`{primitive.xxx}`) 사용
- [ ] 네이밍 규칙 준수 (`color / primitive / cyan / 500`)
- [ ] Type 올바르게 선택 (`color`, `number`)
- [ ] 팔레트 완성 (50 ~ 950)

### 개발팀 전달 시

- [ ] 변경된 Set 의 JSON 파일 모두 첨부
- [ ] 변경사항 명확히 설명 (added / removed / changed)
- [ ] Breaking Change 여부 표기
- [ ] 급한 일정이면 별도 표기

---

**Maintained by**: DND Academy Design System Team
