# dnd-design-system

DND Academy 디자인 시스템 모노레포. UI 컴포넌트(`@dds-lab/desktop`)와 디자인 토큰(`@dds-lab/token`)을 한 곳에서 빌드·배포한다.

> pnpm 9 + Turborepo 기반. Node 22.21.1 (mise 로 고정).

## 워크스페이스

| 경로                      | 패키지                   | 설명                         |
| ------------------------- | ------------------------ | ---------------------------- |
| `packages/dds-token`      | `@dds-lab/token`             | Style Dictionary 디자인 토큰 |
| `packages/dds-desktop`    | `@dds-lab/desktop`           | Vanilla Extract UI 컴포넌트  |
| `tools/eslint-config`     | `@dds-lab/eslint-config`     | 공유 ESLint preset           |
| `tools/typescript-config` | `@dds-lab/typescript-config` | 공유 tsconfig preset         |

빌드 의존: `dds-token` → `dds-desktop` (Turborepo 가 강제).

## 시작하기

### 1. 사전 요구사항

- Node 22.21.1
- pnpm 9.15.9
- (선택) [mise](https://mise.jdx.dev) — `.mise.toml` 로 위 버전을 자동 관리

### 2. 셋업

```bash
git clone <repo-url>
cd dnd-design-system

# mise 사용 시 (권장)
mise trust .mise.toml
mise install            # node + pnpm + lefthook 자동 설치

# mise 미사용 시
corepack enable
corepack prepare pnpm@9.15.9 --activate

pnpm install            # postinstall 에서 lefthook hooks 자동 등록
```

### 3. 자주 쓰는 커맨드

```bash
pnpm dev                                  # 전체 dev 서버
pnpm build                                # 전체 빌드 (token → desktop)
pnpm build:packages                       # packages/** 만 빌드
pnpm build:tools                          # tools/** 만 빌드
pnpm lint                                 # 전체 lint
pnpm check-types                          # 전체 타입 체크
pnpm format                               # Prettier
pnpm clean                                # turbo 캐시 제거

pnpm --filter @dds-lab/desktop storybook      # Storybook 개발 서버 (포트 6006)
pnpm --filter @dds-lab/desktop build-storybook
pnpm --filter @dds-lab/desktop test-storybook # 인터랙션/접근성 테스트
```

### 4. 컴포넌트 추가

```bash
pnpm --filter @dds-lab/desktop generate:component
```

또는 Claude Code 에서 `/dds-component` 스킬을 호출하면 구현 + 접근성 spec 까지 한 번에 만든다. 기존 컴포넌트에 spec 만 추가하려면 `/a11y-spec-writer`.

## 의존성 변경 워크플로우

```bash
# 의존성 추가/업데이트
pnpm --filter @dds-lab/desktop add <pkg>
pnpm install

# 락파일을 커밋
git add pnpm-lock.yaml package.json packages/**/package.json
git commit -m "chore: bump <pkg>"
```

`pnpm-lock.yaml` 이 변경된 커밋을 pull/checkout 하면 lefthook (`post-merge` / `post-checkout`) 이 자동으로 `pnpm install` 을 실행한다.

## Git Hooks (Lefthook)

- **pre-commit** — 변경 파일 기준 lint / format / check-types
- **pre-push** — 전체 lint / format / check-types / build
- **post-merge / post-checkout** — `pnpm-lock.yaml` 변경 시 자동 `pnpm install`

훅을 우회해야 할 때만: `git commit --no-verify` (지양).

## CI

`.github/workflows/`

- `pr-check.yml` — `packages/**`, `tools/**`, lockfile 변경 시 build / type-check / lint
- `storybook-test.yml` — `*.spec.stories.tsx` 변경 시 Storybook 인터랙션 테스트
- `storybook.yml` — main push 또는 `alpha-storybook` 라벨 PR → Chromatic 배포
- `delete-merged-branch.yml` — 머지된 PR 브랜치 자동 삭제

## 컨벤션

- **커밋**: Conventional Commits (`feat:`, `fix:`, `chore:`, `refactor:`, `docs:`, `ci:`, ...)
- **ESLint import 순서**: builtin → external → internal → parent/sibling, 그룹 간 빈 줄
- **Prettier**: 세미콜론 없음, single quote, `printWidth: 150`
- **Vanilla Extract**: 토큰은 `@dds-lab/token` 의 `primitive` / `semantic` 만 사용

## 디렉토리 구조

```
dnd-design-system/
├── .claude/                # Claude Code skills, commands, hooks
├── .github/workflows/      # CI
├── packages/
│   ├── dds-token/          # 디자인 토큰 (Style Dictionary)
│   └── dds-desktop/        # UI 컴포넌트 (Vanilla Extract + Storybook)
├── tools/
│   ├── eslint-config/      # 공유 ESLint preset
│   └── typescript-config/  # 공유 tsconfig preset
├── lefthook.yml            # git hooks
├── turbo.json              # 빌드 파이프라인
├── pnpm-workspace.yaml
└── package.json
```

각 패키지의 상세 가이드는 해당 디렉토리의 `CLAUDE.md` 참고.
