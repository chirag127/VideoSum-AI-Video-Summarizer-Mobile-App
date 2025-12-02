# Pull Request Checklist & Review Template

**Repository:** `VideoSum-AI-Powered-Video-Summarization-Mobile-Platform`

This template ensures that all Pull Requests (PRs) meet the **Apex Technical Authority** standards for zero-defect, high-velocity deployment on the React Native/Expo platform.

---

## 🚀 Summary of Changes

<!-- Briefly describe what this PR achieves. Link relevant issues using keywords like `Fixes #123` or `Implements feature #456`. -->

## ✅ Checklist (Developer Actions)

Before requesting a review, ensure *every* item below is checked:

- [ ] **Code Quality:** All code adheres to strict TypeScript standards and Biome/Ruff formatting rules (if applicable to tooling). DRY principles maintained.
- [ ] **Feature Isolation:** Changes are atomic and focus on a single feature or fix. No scope creep.
- [ ] **Testing:** New unit tests (Vitest) or E2E tests (Playwright/Detox) are added/updated to cover new logic. All existing tests pass.
- [ ] **Performance:** No blocking UI operations. Asynchronous operations are correctly handled (React Query/Redux Toolkit setup).
- [ ] **Architecture:** Changes respect the Feature-Sliced Design (FSD) boundaries within the React Native structure (Layers: App, Pages, Features, Entities, Shared).
- [ ] **Documentation:** Relevant internal code comments (JSDoc/TSDoc) are updated.
- [ ] **CI/CD Readiness:** Local builds (`npm run build:android` / `npm run build:ios`) succeed without warnings.
- [ ] **Security:** No hardcoded secrets. Dependencies are reviewed for known vulnerabilities.

## 🧪 Verification Steps (Reviewer Actions)

Reviewers must verify the following in addition to code logic:

1.  **Build Verification:** Can the reviewer successfully build and run the platform on both target OSs (iOS/Android)?
    *   *Command:* `npx expo run:ios` and `npx expo run:android`
2.  **Feature Validation:** Does the change behave *exactly* as described in the issue/summary?
3.  **Performance Spot Check:** Test summarization speed on a sample video file. Look for UI stuttering during video processing/API calls.
4.  **Type Safety:** Review type definitions. Are there any `any` types introduced that could have been strictly typed?

## ✍️ Architectural Notes (Self-Correction/Alignment)

<!-- Use this section to document any deviations from the standard FSD structure or any complex async interactions that require deep understanding. -->

## 🏷️ Related Artifacts

*   **Project Repository:** [VideoSum-AI-Powered-Video-Summarization-Mobile-Platform](https://github.com/chirag127/VideoSum-AI-Powered-Video-Summarization-Mobile-Platform)
*   **CI Pipeline Status:** [View Workflow](https://github.com/chirag127/VideoSum-AI-Powered-Video-Summarization-Mobile-Platform/actions/workflows/ci.yml)
*   **Latest Release:** [Releases](https://github.com/chirag127/VideoSum-AI-Powered-Video-Summarization-Mobile-Platform/releases)

---

**Reviewer Sign-off:**

- [ ] Approved
- [ ] Requested Changes (Comments attached)

**Status Update:**

- [ ] Merge Ready
- [ ] Blocked (Reason: ___________)