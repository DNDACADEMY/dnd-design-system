# Auto-Generate Commit Message

현재 staged 변경사항을 분석하여 conventional commit 형식의 커밋 메시지를 자동 생성하고 커밋합니다.

## Usage

```bash
/commit
```

## What it does

1. `git diff --staged` 분석
2. 변경된 파일 및 코드 분석
3. 변경된 워크스페이스/scope 감지
4. 커밋 타입 자동 결정 (feat/fix/chore 등)
5. 커밋 메시지 생성 (conventional commit 형식)
6. **자동으로 커밋 실행**

## Workflow

```bash
# 1. 변경사항 stage
git add .

# 2. 커밋 메시지 자동 생성 및 커밋
/commit
```

## Output Example

```
🔍 Staged 변경사항 분석 중...

📦 워크스페이스: @dds/token
📁 변경된 파일: 5개
  • src/tokens/colors.json (추가)
  • src/tokens/typography.json (추가)
  • build.js (수정)
  • package.json (수정)

🔧 커밋 타입: feat

💬 생성된 커밋 메시지:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
feat(token): 디자인 토큰 시스템 구축

- 컬러 토큰 JSON 파일 추가
- 타이포그래피 토큰 정의
- Style Dictionary 빌드 스크립트 구현
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ 커밋 완료!
commit: a1b2c3d
```

## Commit Message Format

### Title (첫 줄)

```
<type>(<scope>): <subject>
```

**예시:**

```
feat(token): 디자인 토큰 시스템 구축
fix(desktop): IPC 통신 오류 해결
chore(root): ESLint 설정 업데이트
```

### Body (본문)

주요 변경사항을 bullet point로 나열:

```
- 컬러 토큰 JSON 파일 추가
- 타이포그래피 토큰 정의
- Style Dictionary 빌드 스크립트 구현
```

## Commit Type Detection

파일 변경 패턴 기반 자동 감지:

- **feat**: 새 파일 추가, 새 기능 구현
- **fix**: 버그 수정, 에러 핸들링
- **refactor**: 코드 구조 변경, 리팩토링
- **style**: 포맷팅, 스타일 변경
- **perf**: 성능 최적화
- **test**: 테스트 파일 추가/수정
- **docs**: README, 문서 파일 변경
- **chore**: 설정 파일, package.json, 빌드 스크립트

## Scope Detection

변경된 워크스페이스 기반 자동 감지:

```
packages/dds-token/       → token
packages/dds-desktop/     → desktop
services/admin-web/       → admin-web
services/passboard/       → passboard
tools/xxx/                → tools
```

**⚠️ Root 파일 처리:**

- Root 파일(yarn.lock, .gitignore 등)은 커밋에 포함하되 scope에서 **제외**
- 워크스페이스 작업 + root 파일 변경 → 워크스페이스 scope만 사용
- Root 파일만 변경된 경우에만 `chore:` 사용

**여러 워크스페이스:**

- 1개 워크스페이스 + root 파일: `feat(desktop):` (root 제외)
- 2개 이상 워크스페이스: `feat(token,desktop):`

## Error Handling

### No staged changes

```
❌ Staged 된 변경사항이 없습니다.

다음 명령으로 파일을 stage 하세요:
git add <file>
또는
git add .
```

### Empty commit message

```
❌ 변경사항이 너무 적어 커밋 메시지를 생성할 수 없습니다.
수동으로 커밋 메시지를 작성해주세요.
```

## Implementation Steps

1. **Check staged files**

   ```bash
   git diff --staged --name-only
   ```

   **⚠️ IMPORTANT: Scope 결정 규칙**

   Root 파일들(`.gitignore`, `yarn.lock`, `.yarn/install-state.gz` 등)의 변경사항은 **커밋에 포함**하되,
   scope는 **절대 `root`로 설정하지 않습니다**.

   **Scope 결정 우선순위:**
   1. 주요 작업이 이루어진 워크스페이스를 scope로 사용
   2. 워크스페이스 파일 + root 파일이 함께 변경된 경우 → 워크스페이스 scope 사용
   3. Root 파일만 변경된 경우에만 → `chore(root):` 사용

   **예시:**

   ```
   ✅ feat(desktop): Storybook 설정 추가
      - packages/dds-desktop/.storybook/ 추가
      - yarn.lock 업데이트 (패키지 설치로 인한 변경)

   ❌ feat(root): Storybook 설정 추가  (잘못된 예시)
   ```

2. **Analyze changes**

   ```bash
   git diff --staged --stat
   git diff --staged
   ```

3. **Read package.json for scope**

   ```bash
   cat <workspace>/package.json | grep '"name"'
   ```

4. **Generate commit message**
   - Determine type and scope
   - Analyze actual code changes
   - Write concise subject (max 50 chars)
   - List key changes in body

5. **Execute commit**

   ```bash
   git commit -m "$(cat <<'EOF'
   feat(token): 디자인 토큰 시스템 구축

   - 컬러 토큰 JSON 파일 추가
   - 타이포그래피 토큰 정의
   - Style Dictionary 빌드 스크립트 구현
   EOF
   )"
   ```

6. **Show result**
   ```bash
   git log -1 --oneline
   ```

## Best Practices

✅ **변경사항을 먼저 stage**

```bash
git add .
```

✅ **관련 변경사항만 함께 커밋**

- 한 번에 너무 많은 변경사항 X
- 논리적으로 연관된 변경사항만 묶기

✅ **생성된 메시지 확인 후 수정 가능**

- 커밋 후 수정이 필요하면:

```bash
git commit --amend
```

✅ **큰 변경사항은 여러 커밋으로 분리**

```bash
# 기능별로 나눠서 stage
git add src/feature1/
/commit

git add src/feature2/
/commit
```

## Examples

### Example 1: New Feature

```bash
# 새 기능 추가
git add packages/dds-token/src/

/commit

# 출력:
# feat(token): 디자인 토큰 자동화 시스템 추가
#
# - Style Dictionary 설정 추가
# - JSON 토큰 파일 구조화
# - 빌드 스크립트 구현
```

### Example 2: Bug Fix

```bash
# 버그 수정
git add packages/dds-desktop/src/ipc/

/commit

# 출력:
# fix(desktop): IPC 메시지 처리 오류 해결
#
# - 비동기 처리 타임아웃 증가
# - 에러 핸들링 강화
```

### Example 3: Multiple Workspaces

```bash
# 여러 패키지 동시 수정
git add packages/dds-token/ packages/dds-desktop/

/commit

# 출력:
# feat(token,desktop): 디자인 토큰 통합
#
# - 토큰 시스템 구축
# - Desktop 앱에 토큰 적용
```

### Example 4: Config Changes

```bash
# 설정 파일만 변경
git add turbo.json .github/

/commit

# 출력:
# chore(root): Turbo 빌드 설정 최적화
#
# - 캐시 전략 개선
# - CI 워크플로우 업데이트
```

## Tips

💡 **빠른 커밋 워크플로우**

```bash
git add . && /commit
```

💡 **부분 커밋**

```bash
# 특정 파일만 stage
git add src/feature.ts
/commit
```

💡 **커밋 전 변경사항 확인**

```bash
git diff --staged
```

💡 **커밋 메시지 수정**

```bash
# 마지막 커밋 메시지 수정
git commit --amend
```

## Related Commands

- `/pr` - PR 자동 생성 (커밋 후 사용)
- `/pr-title` - PR 제목 미리보기
- `/commit-msg` - 커밋 메시지만 생성 (커밋 X)
