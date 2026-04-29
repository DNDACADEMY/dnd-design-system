---
name: pr
description: dnd-design-system 모노레포에서 현재 브랜치 변경사항을 분석해 GitHub Pull Request 를 자동 생성한다. "PR 만들어줘", "PR 생성", "풀 리퀘스트 작성", "pull request 만들어", "main 으로 PR 올려줘" 같은 요청이나 작업 완료 후 PR 이 필요할 때 반드시 이 스킬을 사용하라. .github/PULL_REQUEST_TEMPLATE.md 의 섹션 구조(📝 변경사항 / 🔗 관련 링크)를 정확히 따르며 conventional commit 형식의 한국어 제목을 생성한다. 변경 규모에 따라 단순 bullet 부터 표·details·AS-IS/TO-BE 스크린샷 비교까지 본문 깊이를 조정한다. AI 코드 리뷰까지 자동으로 받고 싶다면 pr-with-review 스킬을 사용하라.
---

# pr

현재 브랜치를 분석해 GitHub PR 을 자동 생성한다. 제목은 conventional commit 형식, 본문은 `.github/PULL_REQUEST_TEMPLATE.md` 의 섹션 구조를 그대로 따르고, **변경 규모에 따라 가독성 골격을 분기**한다.

## 스텝 1: PR 템플릿 읽기 (필수)

```bash
cat .github/PULL_REQUEST_TEMPLATE.md
```

이 템플릿이 PR 본문 구조를 정한다. 섹션 제목·이모지·주석(`<!-- -->`) 모두 그대로 보존한다.

## 스텝 2: base 브랜치 확인 + 변경 분석

PR 의 base 가 `main` 이 아닐 수 있으니 (분기 작업, stacked PR) **base 브랜치를 먼저 확인**한다.

```bash
# 이미 PR 이 있으면 base 확인
gh pr view --json baseRefName 2>/dev/null

# 없으면 분기 지점에서 추정
git merge-base --fork-point main HEAD 2>/dev/null || echo "main"
```

base 가 정해지면 그 기준으로 diff 를 본다.

```bash
BASE=<base-branch>   # 예: main, feature/token-updated
git diff $BASE...HEAD --stat
git diff $BASE...HEAD --name-only
git log $BASE..HEAD --oneline
```

워크스페이스 감지 규칙은 `commit` 스킬과 동일하다 (`packages/token` → `token`, `packages/desktop` → `desktop`, `tools/*` → `tools`).

## 스텝 3: 제목 생성

`<type>(<scope>): <한국어 설명>`. type / scope 규칙은 `commit` 스킬과 동일.

좋은 예:

- `feat(token,desktop): 토큰 시스템 재설계 및 CSS 자동 주입`
- `fix(desktop): Toast 닫기 애니메이션 끊김 수정`
- `refactor(desktop): lucide-react 를 peerDependencies 로 이동`
- `chore: release packages`

## 스텝 4: 본문 생성

`.github/PULL_REQUEST_TEMPLATE.md` 의 섹션 구조와 주석을 그대로 유지한다. 그 안을 어떻게 채울지는 **변경 규모로 결정**한다.

### 4-1. 변경 규모 판단

| 규모       | 기준                                             | 본문 형태                                                |
| ---------- | ------------------------------------------------ | -------------------------------------------------------- |
| **light**  | 파일 1~3개, 한 패키지, 단일 토픽                 | bullet 4~6줄                                             |
| **medium** | 여러 파일, 한 패키지, 다중 토픽                  | "한눈에 보기" 표 + 섹션 1~2개                            |
| **heavy**  | 여러 패키지, API 변경, 마이그레이션·UI 변화 동반 | 한눈에 보기 + 섹션 3개 + 마이그레이션 details + 스크린샷 |

확실하지 않으면 **medium 으로 시작**한다 — 짧으면 추가 정보가 군더더기가 되지만, 모자라면 리뷰어가 매번 묻게 된다.

### 4-2. light — bullet 만

```md
## 📝 변경사항

### 주요 변경 내용

- <사용자 관점 변경 1>
- <변경 2>
- <변경 3>

## 🔗 관련 링크

-

<!-- ### 테스트 결과 -->

<!-- ### 의존성 변경 -->
```

### 4-3. medium / heavy — 가독성 골격

다음 골격에서 필요 없는 섹션은 통째로 제거한다. medium 은 보통 "한눈에 보기 + 섹션 1~2개" 까지, heavy 는 스크린샷 표까지 모두 사용.

````md
## 📝 변경사항

### 한눈에 보기

> <한 줄 요약·해요체>

| 패키지/대상 | 변경 요약 | 영향 |
| ----------- | --------- | ---- |
| ...         | ...       | ...  |

> base 가 `main` 이 아니거나 전제 조건이 있으면 인용문으로 한 줄 더 추가.
> (예: "토큰 자체 변경은 base 브랜치(`feature/token-updated`) 에서 다뤄요. 이 PR 은 desktop 적용에만 집중해요.")

---

### 1. <섹션 제목 — 컴포넌트/모듈명 또는 카테고리>

<무엇을 / 왜 한 줄>

|              | Before  | After   |
| ------------ | ------- | ------- |
| `<prop/key>` | `<...>` | `<...>` |

<details>
<summary>마이그레이션 예시</summary>

```ts
// Before
<Component oldProp="x" />

// After
<Component newProp="y" />
```

</details>

---

### 2. <두 번째 섹션 — 사용처 마이그레이션 등>

| 컴포넌트     | Before  | After   |
| ------------ | ------- | ------- |
| `<Consumer>` | `<...>` | `<...>` |

---

### 📸 스크린샷 (AS-IS / TO-BE)

> Storybook 등에서 캡처한 변경 전/후 화면이에요.

| 컴포넌트 | AS-IS       | TO-BE       |
| -------- | ----------- | ----------- |
| `<Name>` | _첨부 예정_ | _첨부 예정_ |

## 🔗 관련 링크

-

<!-- ### 테스트 결과 -->

<!-- ### 의존성 변경 -->
````

### 4-4. 작성 원칙

- **첫 줄은 사용자 관점·해요체로 한 줄 요약** — 무엇이 달라지는지만 적는다.
- **표는 비교가 명확할 때만** — props/토큰/매핑처럼 짝이 떨어지는 데이터에 쓴다. bullet 두 줄을 표로 늘리지 않는다.
- **마이그레이션 예시는 `<details>` 로 접는다** — 본문이 길어지지 않도록.
- **중간 구분선 `---`** — 섹션이 3개 이상일 때만. 1~2개면 헤더만으로 충분.
- **스크린샷 placeholder** — UI 변경이 있는 PR 이면 표만 미리 만들어 두고, 사용자가 GitHub 편집창에서 드래그-드롭으로 채우게 한다 (GitHub 가 자동으로 `user-attachments` URL 발급). 캡처를 자동화할 수 있다면 Playwright + Storybook 으로 별도 진행하되, 이 스킬에서는 자리만 마련한다.
- **내부 함수명·파일명 노출 금지** — `withLineBreaks` 가 아니라 "줄바꿈 처리" 처럼 표현.
- 주석 처리된 추가 섹션(`<!-- ### ... -->`) 은 삭제하지 말고 그대로 유지.
- `## 📝 변경사항` / `## 🔗 관련 링크` 섹션 제목은 정확히 일치시킨다.

## 스텝 5: 푸시 후 PR 생성

리모트에 푸시되어 있지 않으면 먼저 푸시한다.

```bash
git push -u origin "$(git branch --show-current)"
```

`gh` 로 PR 생성. base 가 main 이 아니면 `--base` 로 명시한다. 본문은 HEREDOC 으로 전달.

```bash
gh pr create \
  --assignee @me \
  --base "<base-branch>" \
  --title "<제목>" \
  --body "$(cat <<'EOF'
<스텝 4 에서 만든 본문>
EOF
)"
```

`--base` 를 생략하면 기본값(`main`) 으로 들어가므로, 분기 PR 이면 반드시 명시한다.

## 스텝 6: 결과 확인

생성된 PR URL 을 사용자에게 보여주고 후속 안내:

- 리뷰어 지정
- 관련 이슈 링크
- 라벨 / 마일스톤
- (heavy 인 경우) 스크린샷 placeholder 자리에 이미지 드래그-드롭

## 에러 처리

- `gh` 미설치 → `brew install gh && gh auth login` 안내
- base 와 차이 없음 → "변경사항을 커밋한 후 다시 시도해주세요"
- 푸시 거부 → 원인을 사용자에게 물어보고 수동 처리

## Related

- AI 인라인 코드 리뷰까지 같이 받으려면 `pr-with-review` 스킬을 사용한다.
- PR 직전에 changeset 본문이 필요하면 `changeset` 스킬을 먼저 실행한다.
