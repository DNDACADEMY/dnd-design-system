---
name: pr
description: dnd-design-system 모노레포에서 현재 브랜치 변경사항을 분석해 GitHub Pull Request 를 자동 생성한다. "PR 만들어줘", "PR 생성", "풀 리퀘스트 작성", "pull request 만들어", "main 으로 PR 올려줘" 같은 요청이나 작업 완료 후 PR 이 필요할 때 반드시 이 스킬을 사용하라. .github/PULL_REQUEST_TEMPLATE.md 의 섹션 구조(📝 변경사항 / 🔗 관련 링크)를 정확히 따르며 conventional commit 형식의 한국어 제목을 생성한다. AI 코드 리뷰까지 자동으로 받고 싶다면 pr-with-review 스킬을 사용하라.
---

# Claude Code PR Auto-Creator

## Automatically Create GitHub Pull Request

Analyze current branch changes and automatically create a GitHub Pull Request with title and description in Korean following conventional commit format.

### Execution Steps:

**⚠️ STEP 0: Read PR Template (MANDATORY)**

```bash
cat .github/PULL_REQUEST_TEMPLATE.md
```

- PR body 구조를 정확히 파악
- 모든 필수 섹션과 이모지 확인
- 주석 처리된 섹션도 포함할 것

1. **Detect Changed Workspaces**
   - Analyze file paths in `git diff main`
   - Read actual `package.json` files to get package names
   - Support all workspace types: `packages/`, `services/`, `tools/`

2. **Analyze Git Changes**
   - Run `git diff main --stat` for file overview
   - Run `git diff main --name-only` for file list
   - Check actual code changes with `git diff main` (selective files)

3. **Analyze Commit History**
   - Check `git log main..HEAD --oneline`
   - Extract work intention from commit messages
   - Identify patterns in commits

4. **Determine Commit Type**
   - **feat**: New files in `src/`, new features, new components
   - **fix**: Bug fixes, error handling improvements
   - **refactor**: Code restructuring, file moves, cleanup
   - **style**: CSS changes, formatting, linting fixes
   - **perf**: Performance optimizations
   - **test**: Test files (`__tests__/`, `*.test.ts`, `*.spec.ts`)
   - **docs**: README.md, documentation files
   - **chore**: package.json, config files, build scripts, CI/CD

5. **Generate PR Title**
   - Format: `<type>(<scope>): <description in Korean>`
   - Example: `feat(token): 디자인 토큰 시스템 구축`

6. **Create GitHub Pull Request**
   - Push current branch to remote if needed
   - Generate PR body matching template format
   - Use `gh pr create` to create PR automatically
   - Return PR URL to user

---

## Package Detection Rules

### Auto-detect from file paths:

```
packages/dds-token/       → @dnd-lab/token → scope: token
packages/dds-desktop/     → @dnd-lab/desktop → scope: desktop
.github/                  → scope: ci
root config files         → scope: root
```

### Scope extraction priority:

1. **Read package.json** if exists in changed directory
   - Extract name field: `"name": "@dnd-lab/token"` → scope: `token`
   - Remove `@dds/` or `@scope/` prefix
2. **Fallback to directory name** if no package.json
   - `services/admin-web` → scope: `admin-web`
3. **Special cases**:
   - Root files (`.github/`, `turbo.json`, etc.) → `root`
   - Multiple root configs only → `chore(root):`

### Multiple workspaces changed:

- **1 workspace + root files**: Use workspace scope `feat(desktop):` (root 제외)
- **2+ workspaces**: List all `feat(token,desktop):`
- **Root files only**: Only then use `chore:`

**⚠️ Root를 scope에 포함하지 않음:**

- `yarn.lock`, `.gitignore` 등 root 파일은 커밋/PR에 포함하되
- 워크스페이스 작업이 있다면 scope는 워크스페이스만 표시

---

## PR Title Examples

Following conventional commit format:

```
feat(token): 디자인 토큰 시스템 구축
fix(desktop): Electron IPC 통신 오류 해결
refactor(admin-web): 컴포넌트 구조 개선
style(passboard): 코드 포맷팅 적용
chore(root): Turbo 빌드 설정 개선
docs(desktop): 설치 가이드 추가
feat(token,desktop): 디자인 시스템 통합
```

---

## Output Format

### Step 1: Analyze Changes

**⚠️ IMPORTANT: Scope 결정 규칙**

Root 파일들(`.gitignore`, `yarn.lock`, `.yarn/install-state.gz` 등)의 변경사항은 **PR에 포함**하되,
PR 제목의 scope는 **절대 `root`로 설정하지 않습니다**.

**Scope 결정 우선순위:**

1. 주요 작업이 이루어진 워크스페이스를 scope로 사용
2. 워크스페이스 파일 + root 파일(yarn.lock 등)이 함께 변경된 경우 → 워크스페이스 scope 사용
3. Root 설정 파일만 변경된 경우에만 → `chore(root):` 사용

**예시:**

```
✅ feat(desktop): Storybook 설정 및 로고 추가
   - packages/dds-desktop/.storybook/ 변경
   - yarn.lock 업데이트 포함

❌ feat(root,desktop): ... (잘못된 예시 - root를 scope에 포함하지 않음)
❌ feat(root): ... (워크스페이스 작업이 있는데 root만 표시)
```

Run these git commands in parallel:

```bash
git diff main --stat
git diff main --name-only
git log main..HEAD --oneline
```

For each changed directory with package.json:

```bash
cat <workspace>/package.json | grep '"name"'
```

Analyze the changes and determine:

- Changed workspaces and their scopes
- Commit type (feat/fix/refactor/chore/etc)
- Main purpose of changes

### Step 2: Suggest PR Title

Output format:

```
🔍 변경사항 분석

📦 변경된 워크스페이스:
  • packages/dds-token (@dnd-lab/token)
  • services/admin-web

📁 변경된 파일: 12개
  ➕ 추가: 5개
  ✏️  수정: 7개

🏷️  권장 PR 제목:
feat(token): 디자인 토큰 시스템 구축

또는:
1. feat(token): Style Dictionary 기반 토큰 자동화
2. chore(token): 토큰 빌드 파이프라인 구축
```

### Step 3: Generate PR Body

**⚠️ CRITICAL: PR 템플릿 준수**

반드시 `.github/PULL_REQUEST_TEMPLATE.md` 파일을 읽고 정확한 구조를 따라야 합니다.

**필수 실행:**

```bash
cat .github/PULL_REQUEST_TEMPLATE.md
```

**템플릿 규칙:**

1. ✅ `## 📝 변경사항` 섹션 필수
2. ✅ `### 주요 변경 내용` 하위 섹션 필수
3. ✅ `## 🔗 관련 링크` 섹션 필수
4. ✅ 모든 섹션 제목과 이모지를 정확히 일치시킬 것
5. ✅ 주석 처리된 섹션(`<!-- -->`)은 제거하지 말고 그대로 유지
6. ✅ 실제 변경 내용을 git diff 분석 기반으로 작성

**PR Body 생성 예시:**

```markdown
## 📝 변경사항

### 주요 변경 내용

- Style Dictionary 기반 디자인 토큰 시스템 구축
- JSON 토큰 파일 구조화 및 빌드 설정 추가
- 자동화된 토큰 빌드 파이프라인 구현

## 🔗 관련 링크

-

<!-- ### 테스트 결과 -->

<!-- ### 의존성 변경 -->
```

### Step 4: Push and Create PR

**Check if push is needed:**

```bash
git status -sb
```

**Push if needed:**

```bash
git push -u origin <current-branch>
```

**Create PR using gh CLI:**

**⚠️ IMPORTANT: 반드시 템플릿 구조를 따를 것**

```bash
gh pr create \
  --assignee @me \
  --title "feat(token): 디자인 토큰 시스템 구축" \
  --body "$(cat <<'EOF'
## 📝 변경사항

### 주요 변경 내용

- Style Dictionary 기반 디자인 토큰 시스템 구축
- JSON 토큰 파일 구조화 및 빌드 설정 추가
- 자동화된 토큰 빌드 파이프라인 구현

## 🔗 관련 링크

-

<!-- ### 테스트 결과 -->

<!-- ### 의존성 변경 -->
EOF
)"
```

**검증 체크리스트:**

- ✅ `## 📝 변경사항` 섹션 포함
- ✅ `### 주요 변경 내용` 하위 섹션 포함
- ✅ `## 🔗 관련 링크` 섹션 포함
- ✅ 주석 처리된 추가 섹션 유지
- ✅ 실제 변경사항 기반 내용 작성

### Step 5: Return PR URL

```
✅ PR이 생성되었습니다!

🏷️  제목: feat(token): 디자인 토큰 시스템 구축
🔗 URL: https://github.com/username/repo/pull/123

💡 추가 작업:
  • 관련 이슈 링크 추가
  • 스크린샷 첨부 (필요시)
  • 리뷰어 지정
```

---

## Implementation Guidelines

### Must Do:

✅ **Read `.github/PULL_REQUEST_TEMPLATE.md`** before generating PR body
✅ **Check git status** before pushing
✅ **Read package.json** for accurate scope detection
✅ **Analyze git diff** to understand actual changes
✅ **Push branch** if not already pushed to remote
✅ **Use `gh pr create`** to create PR automatically
✅ **Generate body with HEREDOC** for proper formatting
✅ **Return PR URL** after creation
✅ **Write all content in Korean**
✅ **Match template structure exactly** - 모든 섹션 제목과 이모지 정확히 일치
✅ **Include all required sections**: `## 📝 변경사항`, `### 주요 변경 내용`, `## 🔗 관련 링크`
✅ **Preserve commented sections** from template (`<!-- -->` 주석 유지)

### Must Not Do:

❌ Don't create PR without pushing branch first
❌ Don't hardcode package names
❌ Don't guess changes without analyzing code
❌ Don't use placeholders - analyze actual changes
❌ Don't create PR if there are no commits
❌ Don't forget to handle git push errors

### Error Handling:

**If branch not pushed:**

```bash
git push -u origin $(git branch --show-current)
```

**If `gh` not installed:**

```
❌ GitHub CLI (gh)가 설치되어 있지 않습니다.
설치: brew install gh
인증: gh auth login
```

**If no commits on branch:**

```
❌ main 브랜치와 차이가 없습니다.
변경사항을 커밋한 후 다시 시도해주세요.
```

---

## Workflow Examples

### Example 1: Simple PR Creation

1. Analyzes git diff main
2. Reads package.json files
3. Generates title and body
4. Pushes branch (if needed)
5. Creates PR with gh pr create
6. Returns PR URL

---

## Tips

- **Always commit first** before creating a PR
- PR body can be edited on GitHub after creation
- Add reviewers and labels manually on GitHub
- AI 인라인 코드 리뷰까지 받고 싶다면 `pr-with-review` 스킬 사용
