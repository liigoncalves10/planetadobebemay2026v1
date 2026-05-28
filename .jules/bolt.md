## 2025-02-06 - [VTEX Component Optimization]
**Learning:** Wrapping VTEX Storefront components in React.memo() loses the .schema static property required for Site Editor integration if not handled carefully.
**Action:** Always assign the schema back to the memoized component (e.g., const Memoized = memo(Component); (Memoized as any).schema = Component.schema;) to ensure CMS compatibility.
## 2025-02-06 - [Performance: IntersectionObserver vs Scroll Listener]
**Learning:** Using 'scroll' event listeners with getBoundingClientRect() and document.querySelector() causes significant main-thread blocking and scroll jank.
**Action:** Replace scroll-based visibility checks with IntersectionObserver for native, high-performance element tracking.
