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
├── primitive.json   # 원시 토큰 (색상, 타이포그래피 등)
└── semantic.json    # 시맨틱 토큰 (용도 기반 매핑)

scripts/
└── build-tokens.js  # Style Dictionary 빌드 스크립트
```

## 토큰 사용법

```ts
// JS/TS — .css.ts 파일에서 사용
import { primitive, semantic } from '@dds-lab/token'
primitive.color.blue500
semantic.color.labelTitle

// CSS 변수 — 런타임 테마
import '@dds-lab/token/css'
```

토큰 이름 변환: Figma `Color/Cyan/500` → 코드 `primitive.color.cyan500`

## 토큰 업데이트 워크플로우

```bash
# 1. tokens/*.json 파일 수정 (Tokens Studio에서 export)
# 2. 빌드
pnpm build

# 3. 의존 패키지 재빌드 (루트에서)
pnpm build:packages
```
