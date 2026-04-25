---
name: pr-with-review
description: dnd-design-system 모노레포에서 PR 을 생성하면서 AI 인라인 코드 리뷰까지 자동으로 받는다. "PR 만들고 리뷰", "AI 리뷰 받으면서 PR", "PR with review", "리뷰 포함 PR 생성", "코드 리뷰 같이 올려줘" 같은 요청이나 PR 생성 시 자동 코드 리뷰가 필요할 때 반드시 이 스킬을 사용하라. pr 스킬과 동일한 절차를 따르되 `gh pr create` 명령 끝에 `# ai-review` 주석을 붙여 pr-review 훅을 트리거한다. 리뷰 코멘트가 등록되면 사용자에게 반영 여부를 묻고, 수락 시 코드를 수정하고 각 코멘트에 답글을 단다.
---

# PR with AI Review

`pr` 스킬과 동일하게 실행하되, `gh pr create` 명령 끝에 반드시 `# ai-review`를 붙인다.

```bash
gh pr create \
  --assignee @me \
  --title "..." \
  --body "..." # ai-review
```

`# ai-review`는 shell 주석이라 실행에 영향 없고, pr-review 훅이 이를 감지해 자동으로 AI 인라인 코드 리뷰를 달아준다.

나머지 모든 단계는 `pr` 스킬과 동일하다 (PR 템플릿 준수, scope 자동 감지, conventional commit 형식 한국어 제목 등).

## PR 생성 후 처리

`gh pr create` 직후 반드시 아래 명령을 실행해 리뷰 결과를 확인한다:

```bash
cat /tmp/pr-review-pending.json 2>/dev/null
```

파일이 존재하면 사용자에게 다음을 질문한다:

> 리뷰가 등록됐습니다. 리뷰 내용을 코드에 반영하고 각 코멘트에 답글을 달까요?

사용자가 수락하면:

1. `comments` 배열의 각 항목을 읽고 해당 파일/라인의 코드를 수정한다.
2. 각 코멘트에 수정 완료 답글을 단다 (`gh api .../replies`).
3. 완료 후 `/tmp/pr-review-pending.json`을 삭제한다.
