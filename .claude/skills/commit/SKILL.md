---
name: commit
description: dnd-design-system 모노레포에서 staged 변경사항을 분석해 conventional commit 형식의 메시지를 자동 생성·커밋한다. "커밋해줘", "커밋 메시지 만들어줘", "auto commit", "feat/fix 메시지 작성", "스코프 자동 감지" 같은 요청이나 사용자가 `git add` 후 커밋을 요청할 때 반드시 이 스킬을 사용하라. 워크스페이스(packages/dds-token, packages/dds-desktop, tools/) 기반 scope 자동 감지와 root 파일 처리 규칙(pnpm-lock.yaml, .gitignore 등은 커밋에 포함하되 scope 에서 제외)을 따른다.
---

# commit

staged 된 변경을 분석해 conventional commit 형식으로 자동 커밋한다.

## 스텝 1: staged 변경 확인

```bash
git diff --staged --stat
git diff --staged
```

staged 가 비어 있으면 사용자에게 알리고 `git add` 안내 후 종료한다.

## 스텝 2: scope 자동 감지

변경된 파일 경로로 scope 를 결정한다.

| 경로 패턴                                                        | scope      |
| ---------------------------------------------------------------- | ---------- |
| `packages/dds-token/**`                                          | `token`    |
| `packages/dds-desktop/**`                                        | `desktop`  |
| `tools/eslint-config/**`, `tools/typescript-config/**`           | `tools`    |
| 루트 설정 파일 (`turbo.json`, `pnpm-lock.yaml`, `.gitignore` 등) | scope 생략 |

규칙:

- 워크스페이스 변경 + 루트 파일이 같이 변경 → 워크스페이스 scope 만 사용 (root 는 scope 에 넣지 않음)
- 여러 워크스페이스가 함께 변경 → 콤마로 묶기 (예: `feat(token,desktop):`)
- 루트 파일만 변경 → scope 생략 (`chore: ...`)

## 스텝 3: type 결정

| type       | 기준                                           |
| ---------- | ---------------------------------------------- |
| `feat`     | 새 기능, 새 파일 (`src/` 추가)                 |
| `fix`      | 버그 수정, 에러 처리 보강                      |
| `refactor` | 동작 동일·내부 구조 변경                       |
| `style`    | 포맷팅 / lint 자동 수정                        |
| `perf`     | 성능 개선                                      |
| `test`     | 테스트 파일 (`*.test.ts`, `*.spec.ts`)         |
| `docs`     | 문서 (README, CLAUDE.md, `.changeset/*.md` 등) |
| `chore`    | 설정 / 빌드 / CI / lock 파일 / 릴리즈          |

## 스텝 4: 메시지 작성

형식:

```
<type>(<scope>): <한국어 한 줄 설명>

- <주요 변경 1>
- <주요 변경 2>
```

좋은 예:

```
feat(token,desktop): 토큰 시스템 재설계 및 CSS 자동 주입

- primitive/semantic/component 3단 토큰 계층 도입
- @dnd-lab/desktop/desktop.css 한 번 import 만으로 토큰+컴포넌트 스타일 적용
```

```
fix(desktop): 줄바꿈 문자가 표시되지 않던 Txt 컴포넌트 동작 수정
```

```
chore: pnpm-lock.yaml 갱신
```

나쁜 예:

- `feat(root): ...` — root 는 scope 가 아니다
- `fix: getButtonProps 함수에서 nullish 처리 추가` — 내부 함수명 노출

## 스텝 5: 커밋 실행

HEREDOC 으로 메시지를 안전하게 전달한다.

```bash
git commit -m "$(cat <<'EOF'
<type>(<scope>): <subject>

- <bullet>
EOF
)"
```

pre-commit 훅(lefthook)이 변경 파일을 대상으로 lint·format·type-check 를 돌린다. 실패하면 원인을 고친 뒤 다시 stage 해서 **새 커밋**으로 만든다 (`--amend` 금지 — 훅 실패 시 커밋이 생성되지 않았으므로 amend 는 직전 커밋을 덮어쓴다).

## 스텝 6: 결과 확인

```bash
git log -1 --oneline
```

생성된 커밋 메시지를 사용자에게 보여준다.
