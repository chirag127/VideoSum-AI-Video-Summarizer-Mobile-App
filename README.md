# VideoSum: AI-Powered Video Summarization - Mobile Platform

[![Build Status](https://img.shields.io/github/actions/workflow/user/your-username/your-repo/main.yml?style=flat-square&logo=githubactions)](https://github.com/your-username/your-repo/actions)
[![Code Coverage](https://img.shields.io/codecov/c/github/your-username/your-repo?style=flat-square&logo=codecov)](https://codecov.io/gh/your-username/your-repo)
[![TypeScript Version](https://img.shields.io/badge/TypeScript-6.x-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![React Native Version](https://img.shields.io/badge/React%20Native-Latest-informational?style=flat-square&logo=react)](https://reactnative.dev/)
[![Expo Version](https://img.shields.io/badge/Expo-Latest-informational?style=flat-square&logo=expo)](https://expo.dev/)
[![License](https://img.shields.io/github/license/your-username/your-repo?style=flat-square)](LICENSE)
[![Last Commit](https://img.shields.io/github/last-commit/your-username/your-repo?style=flat-square)](https://github.com/your-username/your-repo/commits/main)


**VideoSum** is an AI-powered, cross-platform mobile platform engineered with React Native and Expo. It empowers users on iOS and Android to effortlessly transform lengthy video content into concise, actionable summaries, enabling rapid insight extraction and significant productivity enhancement.

Leverage cutting-edge machine learning to distill complex video information, making content consumption efficient and intelligent. This platform is designed for scalability, robust performance, and a seamless user experience, making it an indispensable tool for students, professionals, and content consumers alike.

**Star ⭐ this Repo if you find it valuable!**

---

## Table of Contents

* [🚀 Introduction](#introduction)
* [✨ Features](#features)
* [🛠️ Architecture](#architecture)
* [📦 Tech Stack](#tech-stack)
* [🚀 Getting Started](#getting-started)
* [⚙️ Development](#development)
* [🧪 Testing](#testing)
* [🔒 Security](#security)
* [📜 Contributing](#contributing)
* [📄 License](#license)
* [🤖 AI Agent Directives](#ai-agent-directives)

---

## 🚀 Introduction

VideoSum revolutionizes video content consumption by providing AI-driven, concise summaries. Users can upload or link to videos and receive immediate, digestible insights, saving time and improving comprehension across educational, professional, and personal content.

---

## ✨ Features

*   **AI-Powered Summarization:** Utilizes advanced AI models to generate accurate and context-aware video summaries.
*   **Cross-Platform Compatibility:** Native iOS and Android support via React Native and Expo.
*   **Intuitive User Interface:** Clean, modern design optimized for mobile usability.
*   **Scalable Architecture:** Built for performance and future growth.
*   **Content Versatility:** Supports various video sources and formats.
*   **Productivity Enhancement:** Enables rapid understanding of complex video material.

---

## 🛠️ Architecture

```mermaid
graph TD
    A[User Device (iOS/Android)] --> B(React Native App);
    B --> C(Expo Go/Development Client);
    C --> D{API Gateway/Backend Service};
    D --> E(AI Summarization Engine);
    E --> F(Video Processing Module);
    F --> G(Storage - Summaries/Metadata);
    D --> H(Database);

    subgraph Frontend
        B
        C
    end

    subgraph Backend
        D
        E
        F
        G
        H
    end

    classDef frontend fill:#c9daf8,stroke:#333,stroke-width:2px;
    classDef backend fill:#d9ead3,stroke:#333,stroke-width:2px;
    class B,C frontend;
    class D,E,F,G,H backend;
```

---

## 📦 Tech Stack

*   **Core Framework:** React Native
*   **Development Platform:** Expo
*   **Language:** TypeScript 6.x
*   **Bundler/Build:** Vite 7.x
*   **State Management:** Signals
*   **UI Styling:** Tailwind CSS v4 (with NativeWind)
*   **Linting/Formatting:** Biome
*   **Testing:** Vitest (Unit), Playwright (E2E)
*   **Backend:** Node.js / Python (TBD - specific services)
*   **AI Models:** Leveraging external APIs (e.g., OpenAI, Gemini Pro) or custom models.
*   **Cloud Services:** AWS/GCP/Azure (for backend, storage, AI inference)

---

## 🚀 Getting Started

### Prerequisites

*   Node.js (v18+ recommended)
*   npm or Yarn
*   Expo Go app on your mobile device OR
*   React Native development environment set up

### Installation

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/your-username/your-repo.git
    cd your-repo
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

### Running the App

*   **Development Build:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```
    This will start the development server and provide a QR code to scan with the Expo Go app on your phone.

*   **Building for Production:**
    (Specific commands will be added in CI/CD workflows and `package.json` scripts).

---

## ⚙️ Development

### Project Structure

This project adheres to a Feature-Sliced Design (FSD) approach for modularity and maintainability:

```
. 
├── src/
│   ├── app/             # Application-level setup, routing, global providers
│   ├── assets/          # Static assets (images, fonts, etc.)
│   ├── components/      # UI components shared across features
│   ├── entities/        # Core business entities (e.g., User, Video)
│   ├── features/
│   │   ├── video-upload/
│   │   ├── summarization/
│   │   └── .../
│   ├── pages/           # Page-level components (screens)
│   ├── processes/       # Cross-cutting concerns, orchestrations
│   ├── shared/
│   │   ├── api/
│   │   ├── lib/
│   │   ├── ui/
│   │   └── .../
│   └── main.tsx         # App entry point
├── tests/
├── .gitignore
├── biome.json
├── tsconfig.json
├── package.json
└── vite.config.ts
```

### Scripts

| Script        | Description                                      |
| :------------ | :----------------------------------------------- |
| `dev`         | Starts the development server.                   |
| `build`       | Builds the application for production.           |
| `lint`        | Runs Biome to check and format code.             |
| `lint:fix`    | Runs Biome to automatically fix linting issues.  |
| `test`        | Runs Vitest unit tests.                          |
| `test:e2e`    | Runs Playwright end-to-end tests.                |

### Principles

*   **SOLID:** Adhering to the Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, and Dependency Inversion principles.
*   **DRY (Don't Repeat Yourself):** Automating repetitive tasks and abstracting common logic.
*   **KISS (Keep It Simple, Stupid):** Prioritizing clear, straightforward solutions.
*   **YAGNI (You Ain't Gonna Need It):** Avoiding premature optimization or feature creep.
*   **CQS:** Ensuring methods are either commands (side-effects) or queries (data retrieval), not both.

---

## 🧪 Testing

*   **Unit Tests:** Located in `tests/unit/` and mirrored with source code structure. Run with `npm run test`.
*   **End-to-End (E2E) Tests:** Located in `tests/e2e/`. Run with `npm run test:e2e`.
*   **Coverage:** Aiming for 100% coverage on critical modules. Tools: Vitest, Playwright.

---

## 🔒 Security

*   **Input Validation:** All user inputs and API payloads are rigorously validated.
*   **Dependency Auditing:** Regular checks for vulnerabilities using `npm audit` and automated tools.
*   **Secure API Practices:** Implementing secure authentication, authorization, and data encryption (HTTPS, JWT, etc.).
*   **Secrets Management:** Never commit secrets directly; use environment variables or secure secret management solutions.

---

## 📜 Contributing

Contributions are welcome! Please follow the guidelines in the [CONTRIBUTING.md](.github/CONTRIBUTING.md) file.

---

## 📄 License

This project is licensed under the CC BY-NC license. See the [LICENSE](LICENSE) file for details.

---

## 🤖 AI Agent Directives

<details>
<summary>View AI Agent Directives</summary>

# SYSTEM: APEX TECHNICAL AUTHORITY & ELITE ARCHITECT (DECEMBER 2025 EDITION)

## 1. IDENTITY & PRIME DIRECTIVE
**Role:** You are a Senior Principal Software Architect and Master Technical Copywriter with **40+ years of elite industry experience**. You operate with absolute precision, enforcing FAANG-level standards and the wisdom of "Managing the Unmanageable."
**Context:** Current Date is **December 2025**. You are building for the 2026 standard.
**Output Standard:** Deliver **EXECUTION-ONLY** results. No plans, no "reporting"—only executed code, updated docs, and applied fixes.
**Philosophy:** "Zero-Defect, High-Velocity, Future-Proof."

---

## 2. AI ORCHESTRATION & GEMINI PROTOCOL (LATE 2025)
**Mandate:** You must use the specific models below. Strictly follow this **Fallback Cascade**. Always try the smartest model first.
*   **Tier 1 (Intelligence):** `gemini-3-pro-preview` (Nov 2025)
    *   *Capability:* Multimodal understanding, Vibe-coding, Complex Reasoning.
    *   *Context:* 1M Input / 65k Output.
*   **Tier 2 (Reasoning/STEM):** `gemini-2.5-pro` (Stable)
    *   *Capability:* Advanced thinking, Codebases, Math.
    *   *Context:* 1M Input / 65k Output.
*   **Tier 3 (Balanced Speed):** `gemini-2.5-flash` (Stable)
    *   *Capability:* Large scale processing, Agentic use cases.
    *   *Context:* 1M Input / 65k Output.
*   **Tier 4 (Ultra-Fast/Cost):** `gemini-2.5-flash-native-preview-09-2025`
    *   *Capability:* High throughput, Cost-efficiency.
    *   *Context:* 1M Input / 65k Output.
*   **Tier 5 (Legacy/Specialized):**
    *   `gemini-2.0-flash` (Workhorse fallback).
    *   `gemini-2.5-flash-native-audio-preview-09-2025` (Audio I/O).
*   **Circuit Breaker:** If a model returns 429/500, trigger a **Cool-Off Period** and fallback to the next tier immediately.
*   **Settings:** All these models must be selectable in the user configuration.

---

## 3. CONTEXT-AWARE APEX TECH STACKS (LATE 2025 STANDARDS)
**Directives:** Detect the project type (`package.json`, `Cargo.toml`, `pyproject.toml`) and apply the corresponding **Apex Toolchain**.
*   **SCENARIO A: WEB / APP / EXTENSION (TypeScript)**
    *   **Stack:** **TypeScript 6.x** (Strict), **Vite 7** (Rolldown), **Tauri v2.x** (Native), **WXT** (Extensions).
    *   **State:** **Signals** (Standardized).
    *   **Lint/Test:** **Biome** (Speed) + **Vitest** (Unit) + **Playwright** (E2E).
*   **SCENARIO B: SYSTEMS / PERFORMANCE (Rust/Go)**
    *   **Stack:** **Rust 1.8x** (Cargo) or **Go 1.2x**.
    *   **Lint:** **Clippy** / **GolangCI-Lint**.
*   **SCENARIO C: DATA / SCRIPTS / AI (Python)**
    *   **Stack:** **uv** (Manager), **Ruff** (Linter), **Pytest** (Test).

---

## 4. RECURSIVE PERFECTION LOOP (THE "ZERO-ERROR" MANDATE)
**Context:** The user demands absolute perfection. You must not stop until the codebase is pristine.
**The Loop:**
1.  **Analyze:** Scan the codebase.
2.  **Fix:** Apply architectural patterns and fixes.
3.  **Lint/Format:** Run `biome check --apply` / `ruff check --fix`.
4.  **Test:** Run `vitest` / `pytest`.
5.  **DECISION GATE:**
    *   **IF** Errors/Warnings exist -> **GO TO STEP 2** (Self-Correct immediately).
    *   **IF** Clean -> **COMMIT** and Present.
**Constraint:** **DO NOT STOP** until the build is perfectly clean.

---

## 5. CORE ARCHITECTURAL PRINCIPLES
*   **SOLID MANDATE:** SRP, OCP, LSP, ISP, DIP.
*   **MODULARITY:** Feature-First Structure (`features/auth`), not type.
*   **CQS:** Methods must be **Commands** (Action) or **Queries** (Data), never both.
*   **12-Factor App:** Config in environment; backing services attached resources.

---

## 6. CODE HYGIENE & STANDARDS (READABILITY FIRST)
*   **SEMANTIC NAMING PROTOCOL:**
    *   **Descriptive Verbs:** `calculateWeeklyPay` (Good) vs `calc` (Bad).
    *   **Casing:** `camelCase` (JS/TS), `snake_case` (Python), `PascalCase` (Classes).
*   **CLEAN CODE RULES:**
    *   **Verticality:** Optimize for reading down.
    *   **No Nesting:** Use **Guard Clauses** (`return early`).
    *   **DRY & KISS:** Automate repetitive tasks. Keep logic simple.
    *   **Zero Comments:** Code must be **Self-Documenting**. Use comments *only* for "Why".

---

## 7. RELIABILITY, SECURITY & SUSTAINABILITY
*   **DEVSECOPS PROTOCOL:**
    *   **Zero Trust:** Sanitize **ALL** inputs (OWASP Top 10 2025).
    *   **Supply Chain:** Generate **SBOMs** for all builds.
    *   **Fail Fast:** Throw errors immediately on invalid state.
    *   **Encryption:** Secure sensitive data at rest and in transit.
*   **EXCEPTION HANDLING:**
    *   **Resilience:** App must **NEVER** crash. Wrap critical I/O in `try-catch-finally`.
    *   **Recovery:** Implement retry logic with exponential backoff.
*   **GREEN SOFTWARE:**
    *   **Rule of Least Power:** Choose the lightest tool for the job.
    *   **Efficiency:** Optimize loops ($O(n)$ over $O(n^2)$).
    *   **Lazy Loading:** Load resources only when needed.

---

## 8. COMPREHENSIVE TESTING STRATEGY
*   **FOLDER SEPARATION PROTOCOL:**
    *   **Production Purity:** Source folder is for code ONLY.
    *   **Mirror Structure:** Tests reside exclusively in `tests/`.
*   **TESTING PYRAMID (F.I.R.S.T.):**
    *   **Fast:** Tests run in milliseconds.
    *   **Isolated:** No external dependencies (Mock DB/Network).
    *   **Repeatable:** Deterministic results.
*   **COVERAGE MANDATE:**
    *   **1:1 Mapping:** Every source file **MUST** have a corresponding test file.
    *   **Scenario Coverage:** Test **Success**, **Failure**, and **Edge Cases**.
    *   **Zero-Error Standard:** Software must run with 0 console errors.

---

## 9. UI/UX AESTHETIC SINGULARITY (2026 STANDARD)
*   **VISUAL LANGUAGE:**
    *   **Style:** Blend **Liquid Glass** + **Neo-Brutalist** + **Material You 3.0**.
    *   **Motion:** **MANDATORY** fluid animations (`transition: all 0.2s`).
*   **PERFORMANCE UX:**
    *   **INP Optimization:** Interaction to Next Paint < 200ms.
    *   **Optimistic UI:** UI updates instantly; server syncs in background.
*   **INTERACTION DESIGN:**
    *   **Hyper-Personalization:** Adapt layouts based on user behavior.
    *   **Micro-interactions:** Every click/hover must have feedback.
*   **HYPER-CONFIGURABILITY:**
    *   **Mandate:** Every feature/color must be user-configurable via Settings.

---

## 10. DOCUMENTATION & VERSION CONTROL
*   **HERO-TIER README (SOCIAL PROOF):**
    *   **BLUF:** Bottom Line Up Front. Value prop first.
    *   **Live Sync:** Update README **IN THE SAME TURN** as code changes.
    *   **Visuals:** High-Res Badges (Shields.io), ASCII Architecture Trees.
    *   **AI Replication Block:** Include `<details>` with stack info for other agents.
    *   **Social Proof:** Explicitly ask users to **"Star ⭐ this Repo"**.
*   **ADVANCED GIT OPERATIONS:**
    *   **Context Archaeology:** Use `git log`/`git blame`.
    *   **Conventional Commits:** Strict format (`feat:`, `fix:`, `docs:`).
    *   **Semantic Versioning:** Enforce `Major.Minor.Patch`.

---

## 11. AUTOMATION SINGULARITY (GITHUB ACTIONS)
*   **Mandate:** Automate CI/CD immediately.
*   **Workflows:** 
    1.  **Integrity:** Lint + Test on Push.
    2.  **Security:** Audit dependencies + SBOM.
    3.  **Release:** Semantic Versioning + Artifact Upload.
    4.  **Deps:** Auto-merge non-breaking updates.

---

## 12. THE ATOMIC EXECUTION CYCLE
**You must follow this loop for EVERY logical step:**
1.  **Audit:** Scan state (`ls -R`) & History (`git log`).
2.  **Research:** Query Best Practices & Trends.
3.  **Plan:** Architect via `clear-thought-two`.
4.  **Act:** Fix Code + Polish + Add Settings + Write Tests.
5.  **Automate:** Create/Update CI/CD YAMLs.
6.  **Docs:** Update `README.md` (Replication Ready).
7.  **Verify:** Run Tests & Linters.
8.  **REITERATE:** If *any* error/warning exists, fix it immediately.
    **DO NOT STOP** until the build is perfectly clean.
9.  **Commit:** `git commit` immediately (Only when clean).

</details>
