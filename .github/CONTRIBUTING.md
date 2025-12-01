# 🚀 Contributing to VideoSum-AI-Powered-Video-Summarization-Mobile-Platform

Welcome to the VideoSum project. We adhere to the **Apex Technical Authority** standards, demanding **Zero-Defect, High-Velocity, Future-Proof** contributions. By contributing, you agree to maintain FAANG-level code quality, rigorous testing, and strict adherence to our architectural principles (SOLID, DRY).

This repository operates under a **Meritocracy of Code Quality**.

---

## 1. Foundational Prerequisites

Before cloning or submitting any work, ensure your environment meets these non-negotiable requirements:

1.  **Node.js:** Version 20 LTS or higher.
2.  **Git:** Version 2.35+.
3.  **TypeScript:** Familiarity with strict mode programming.
4.  **Development Environment:** Valid setup for React Native/Expo development (Xcode/Android Studio dependencies).
5.  **Apex Toolchain:** Ensure you have access to `biome` and `vitest` environments.

## 2. Workflow: Feature Branching & Atomic Commits

We enforce **Conventional Commits** to maintain a clean, semantic `git history` and automate versioning.

### Branching Strategy

All development must occur on dedicated feature/fix branches originating from `main`.

*   **Features:** `feat/short-descriptive-name`
*   **Bug Fixes:** `fix/issue-number-brief-description`
*   **Refactoring/Cleanup:** `refactor/area-of-change`
*   **Documentation:** `docs/description`

### Commit Message Format

Every commit message **MUST** follow the format:

`<type>(<scope>): <subject>`

**Allowed Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`, `build`, `ci`.

**Example:** `feat(summarization): add exponential backoff to video processing API call`

## 3. Code Quality & Style Enforcement

**Manual Formatting is Forbidden.** The code style is immutable and enforced automatically by CI.

### Linters and Formatters

We use **Biome** as the single source of truth for linting and formatting.

1.  **Local Check:** Before committing, always run `npx @biomejs/biome check --apply .` to format and fix autofixable issues.
2.  **CI Gate:** The `.github/workflows/ci.yml` workflow will immediately fail if non-compliant code is detected.

### Architectural Adherence

New code must reflect the established principles:
*   **SOLID:** Adherence to Single Responsibility Principle is paramount.
*   **DRY:** Avoid duplication; leverage reusable utility hooks or modules.
*   **Guard Clauses:** Prefer early returns over deep nesting (Verticality over Horizontality).

## 4. Testing Mandate

**No logic without tests.** Contributions introducing new features or fixing bugs must include corresponding tests.

1.  **Unit Testing (Vitest):** All business logic, utility functions, and custom hooks must have corresponding unit tests achieving **at least 90% coverage** for the modified/added files.
2.  **Integration/E2E (Playwright/Expo Simulators):** Critical user flows (e.g., Video Upload -> Summary Generation -> Display) must be verified via E2E simulation or dedicated integration tests.
3.  **Isolation:** All tests must run in isolation. Mock all external services (API calls, local storage) using standard patterns.

## 5. The Pull Request (PR) Submission Protocol

Submitting a PR signals that you have passed the final local verification steps.

1.  **Target Branch:** Always target `main`.
2.  **PR Template:** Use the provided `.github/PULL_REQUEST_TEMPLATE.md` and fill out all sections thoroughly.
3.  **CI Status:** Your PR **MUST** pass all checks in the Continuous Integration workflow (Lint, Test, Build) before review can begin.
4.  **Reviewers:** A single Approving Reviewer is required for merging.
5.  **Self-Correction Loop:** If a reviewer points out style or testing gaps, **you are responsible** for correcting and pushing updates until the PR is merged.

--- 

*Thank you for investing your time in the VideoSum project. Your dedication to precision elevates our entire platform.*