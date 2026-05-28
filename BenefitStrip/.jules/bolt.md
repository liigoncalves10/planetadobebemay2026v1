## 2025-05-15 - [VTEX IO Hardcoded Typings & Naming Consistency]
**Learning:** Hardcoded typing URLs in `package.json` pointing to private workspaces cause 500 errors during `yarn install` or `vtex link`. Also, mismatch between React component name and `interfaces.json` can affect VTEX indexing/hydration.
**Action:** Always check for and remove hardcoded typing URLs from `package.json` and ensure component names match `interfaces.json`.
## 2025-05-15 - [CLS Prevention vs. Visibility]
**Learning:** Returning `null` while waiting for assets causes Cumulative Layout Shift (CLS). To meet "invisible until ready" requirements without CLS, use a container with `min-height` and toggle `visibility: hidden` instead of conditional rendering.
**Action:** Use `visibility: hidden` and reserved space for components that must load fully before appearing.
## 2025-05-15 - [Inline Styles for Critical Visibility]
**Learning:** External CSS files might load after the HTML is rendered, leading to a flash of unstyled/broken content even if CSS classes are present.
**Action:** Use inline styles (`visibility: hidden`) for critical loading states to ensure the component remains invisible from the very first frame of rendering.
