---
'@dnd-lab/token': patch
---

`style-dictionary` 와 `@tokens-studio/sd-transforms` 를 `devDependencies` 로 이동. 두 패키지는 토큰 빌드 스크립트에서만 사용되고 게시되는 산출물(`dist/*`)에는 런타임 의존성이 없으므로, 소비자가 불필요한 빌드 도구를 설치하지 않도록 한다.
