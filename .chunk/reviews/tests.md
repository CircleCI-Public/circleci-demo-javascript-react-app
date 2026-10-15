Review the uncommitted changes in this repo for test coverage. Every new or changed behavior
should have a test in src/*.test.tsx (Vitest + Testing Library). Flag behavior that has no test,
tests that pass without actually checking the behavior, and tests that leak state between cases
(e.g. shared storage not cleared). Say exactly which test to add and what it should assert.
If coverage is adequate, say so.
