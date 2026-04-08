---
'@dds/desktop': patch
---

Externalize all runtime and peer dependencies in the published bundle.
`lucide-react`, `@radix-ui/*`, `framer-motion`, and `@vanilla-extract/css`
are now imported from the consumer's `node_modules` instead of being
inlined into `dist/index.js`. Bundle size dropped from 1.1 MB to ~19 KB.
Consumers must already install all listed peer dependencies, which
hasn't changed.
