---
'@dnd-lab/desktop': major
---

**@dnd-lab/desktop**

`@dnd-lab/desktop/desktop.css` 한 번만 import 하면 토큰 CSS 변수 (`:root`) 와 컴포넌트 스타일이 함께 주입돼요. 서브패스 경로 (`@dnd-lab/desktop/primitives/button` 등) 로 들어와도 동일하게 동작해요.

내부 컴포넌트 구현을 신규 토큰 API 로 전면 마이그레이션했어요. 공개 컴포넌트 prop 과 사용법은 동일하지만, 같은 프로젝트에서 `@dnd-lab/token` 을 직접 참조하고 있다면 새 API 로의 업데이트가 필요해요.

|            | Before                                       | After                                           |
| ---------- | -------------------------------------------- | ----------------------------------------------- |
| CSS import | `import '@dnd-lab/token/css'` 를 별도 import | `import '@dnd-lab/desktop/desktop.css'` 한 번만 |
