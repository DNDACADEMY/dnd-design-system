# @dnd-lab/desktop

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
