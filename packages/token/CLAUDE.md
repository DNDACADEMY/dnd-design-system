# dds-token

Tokens Studio(Figma 플러그인)에서 생성된 디자인 토큰 패키지. Style Dictionary로 JSON → JS/TS/CSS를 빌드한다.

## 개발 커맨드

```bash
pnpm build    # Style Dictionary로 토큰 빌드
pnpm clean    # 빌드 아티팩트 제거
```

## 토큰 구조

```
tokens/
├── color.json        # 색상 토큰 (Tokens Studio export)
└── typography.json   # 타이포그래피 토큰 (Tokens Studio export)

scripts/
└── build-tokens.js   # Style Dictionary 빌드 스크립트
```

각 JSON 파일은 `primitive` / `semantic` / `component` 3단 네임스페이스를 가진다.
`semantic` 과 `component` 토큰은 `{primitive.slate.500}` 형식으로 primitive 를 참조한다.

## 토큰 사용법

```ts
// JS/TS — .css.ts 파일에서 사용
import { color, typography } from '@dnd-lab/token'

color.primitive.blue['500']               // 원시 색상 (var(--color-blue-500))
color.semantic.text.neutral.primary       // 의미 색상
color.component.radio.border.default      // 컴포넌트 전용 색상
typography.semantic.body['1'].size        // 타이포그래피 (number)

// CSS 변수 — 런타임 테마. color 토큰만 export 됨
import '@dnd-lab/token/css'
// :root { --color-slate-50: #f9fafb; ... }
```

- `color.*` 값은 `var(--color-*)` 문자열로 빌드되므로 반드시 `@dnd-lab/token/css` 를 함께 import 해야 한다.
- `typography.*` 는 raw number 라서 별도 CSS import 불필요.

토큰 이름 변환: Figma `color / primitive / cyan / 500` → 코드 `color.primitive.cyan['500']`

## 토큰 업데이트 워크플로우

```bash
# 1. tokens/*.json 파일 수정 (Tokens Studio에서 export)
# 2. 빌드
pnpm build

# 3. 의존 패키지 재빌드 (루트에서)
pnpm build:packages
```
