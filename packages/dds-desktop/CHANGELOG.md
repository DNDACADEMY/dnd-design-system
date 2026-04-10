# @dnd-lab/desktop

## 0.1.0

### Minor Changes

- [#13](https://github.com/DNDACADEMY/dnd-design-system/pull/13) [`4e7a325`](https://github.com/DNDACADEMY/dnd-design-system/commit/4e7a32550234f4db25e7d3f349b513945b1600fc) Thanks [@Zero-1016](https://github.com/Zero-1016)! - **Icon**

  `lucide-react`를 `dependencies`에서 `peerDependencies`로 이동해요. 이제 `lucide-react`를 프로젝트에 직접 설치해야 해요.

### Patch Changes

- [#10](https://github.com/DNDACADEMY/dnd-design-system/pull/10) [`1fd385d`](https://github.com/DNDACADEMY/dnd-design-system/commit/1fd385d547f532c659e321127b1365dd6345d9cf) Thanks [@Zero-1016](https://github.com/Zero-1016)! - 라이브러리 빌드 설정을 개선하고 하위 경로 import를 지원해요.
  - `@dnd-lab/desktop/primitives/button` 같은 개별 컴포넌트 import가 가능해요.
  - CJS/ESM 동시 출력을 지원해요.

## 0.0.4

### Patch Changes

- [#8](https://github.com/DNDACADEMY/dnd-design-system/pull/8) [`6b4151b`](https://github.com/DNDACADEMY/dnd-design-system/commit/6b4151b2ddc690210e9406890badba76730d4bcc) Thanks [@Zero-1016](https://github.com/Zero-1016)! - **Txt**

  이스케이프 문자(`\n`)와 조합 문자(`\\n`) 모두 줄바꿈이 올바르게 동작하도록 수정해요.

## 0.0.3

### Patch Changes

- [#6](https://github.com/DNDACADEMY/dnd-design-system/pull/6) [`f0beb19`](https://github.com/DNDACADEMY/dnd-design-system/commit/f0beb19e2e0ceda3a1065f372e17946a0f153e22) Thanks [@Zero-1016](https://github.com/Zero-1016)! - **Txt**

  개행 문자(`\n`)가 올바르게 인식되지 않던 버그를 수정해요.

## 0.0.2

### Patch Changes

- Updated dependencies [[`b4ec2b0`](https://github.com/DNDACADEMY/dnd-design-system/commit/b4ec2b0500e6d0307a6555c28f206cc0de920b26)]:
  - @dnd-lab/token@0.0.2

## 0.0.1

### Patch Changes

- 750978f: Externalize all runtime and peer dependencies in the published bundle.
  `lucide-react`, `@radix-ui/*`, `framer-motion`, and `@vanilla-extract/css`
  are now imported from the consumer's `node_modules` instead of being
  inlined into `dist/index.js`. Bundle size dropped from 1.1 MB to ~19 KB.
  Consumers must already install all listed peer dependencies, which
  hasn't changed.
- d9426d5: Initial public release of the DND Academy design system packages.
- Updated dependencies [d9426d5]
  - @dnd-lab/token@0.0.1
