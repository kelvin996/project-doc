# 📑 Project Documentation Index (DOC_INDEX)

> **Project Name**: [Enter project name]
> **Project Description**: One sentence describing the core functionality and goals.
> **Last Updated**: YYYY-MM-DD

---

## 🧭 Quick Navigation

### 1. 🟢 Requirements & Planning (`/01-Requirements`)

* **[Product Requirements Document (PRD)](./01-requirements/01_REQ_Main_v1.0.md)**: Defines core business logic and user stories.
* **[Product Roadmap](./01-requirements/02_Roadmap.md)**: Records near-term development plans and long-term vision.

### 2. 📐 Architecture & Design (`/02-Design`)

* **[System Architecture Overview](./02-design/01_ARCH_Overview.md)**: Tech stack, deployment topology, and core component interactions.
* **[Database Schema](./02-design/02_DB_Schema.md)**: Entity Relationship Diagram (ERD) and key table dictionary.
* **[API Specification](./02-design/03_API_Spec.md)**: Protocol definitions for external and internal service calls.

### 3. 🛠️ Technical Implementation & Maintenance (`/03-Technical`)

* **[Setup Guide](./03-technical/01_Setup_Guide.md)**: Local development environment configuration and dependency installation.
* **[Deployment Manual](./03-technical/02_Deployment.md)**: CI/CD process and production environment operations.
* **[Core Algorithm Logic](./03-technical/03_Logic_Explain.md)**: Technical documentation for complex business logic.

### 4. 📋 Process Management & Tracking (`/04-Management`)

* **[Task Tracker](./04-management/TASK_TRACKER.md)**: **(Recommended to maintain)** Current iteration tasks, assignees, and progress.
* **[Change Log](./04-management/CHANGELOG.md)**: Tracks every requirement change - cause, impact, and outcome.
* **[Meeting Minutes Archive](./04-management/MOM_Archive.md)**: Index of historical decision meeting records.

---

## 🏷️ Naming & Archiving Conventions

To keep documentation organized, follow these rules:

1. **File Naming**: `[Number]_[Category]_[Keyword]_[Date].md` (e.g., `01_REQ_UserAuth_20260414.md`).
2. **Storage Location**: Documents must be stored in appropriate subfolders, not in root directory.
3. **Deprecation**: Outdated documents should be moved to `/05-Archive` with `[DEPRECATED]` marker at the top.

---

## 🤖 AI Assistant Prompt (Claude Code Context)

* **Context Reading**: Claude, before handling code logic changes, please check relevant PRD in `/docs/01-requirements`.
* **Sync Updates**: After completing a feature implementation, please update status in `/04-management/TASK_TRACKER.md`.

---

### 📥 Maintainers

* Lead: @YourName
* Repository: [Code repository link]