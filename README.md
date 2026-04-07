# 🧠 Lean Manager: The Autonomous Management Agent for Lark/Feishu

> **"From Routine Automation to Cognitive Management Evolution."**

Lean Manager is an advanced, high-performance management skill for Lark (Feishu), designed to evolve from a simple task executor into a cognitive autonomous agent. It bridges the gap between raw API capabilities and strategic management intentions.

---

## 🏛️ Design Philosophy: The "Philosophy + Technical Facts" Framework

Lean Manager is built on five core pillars that ensure every action is deliberate, data-driven, and continuously improving.

### 1. 🎯 Strategic Alignment (Goal Analysis)
We don't just "execute"; we "align."
- **Intent Recognition**: Determining if a task requires a *reminder*, a *notification*, or a *decision*.
- **Tool Selection**: Choosing the right communication channel (Task vs. Message Card vs. Calendar) for maximum impact and minimum noise.

### 2. 🧠 Recall Memory (Experience Retrieval)
Never repeat a mistake.
- **Persistent Memory**: Leveraging a local database in `memory/` for domain patterns and troubleshooting guides.
- **Context Awareness**: Prioritizing historical successes and known pitfalls before initiating new operations.

### 3. 🔍 Source of Truth (Fact Anchoring)
Decisions are anchored in data, not assumptions.
- **Three-Layer Command System**: Utilizing Shortcuts (+), API Commands, and Raw API for varying levels of precision.
- **Identity Strategy**: Dynamic switching between `--as user` and `--as bot` to respect privacy and organizational scope.

### 4. 🛡️ Defensive Execution (Closed-Loop Validation)
Reliability in a high-latency system.
- **429 Defense**: Built-in handling for rate limiting and API physical constraints.
- **Verification Feedback**: Mandatory request-and-verify loops to ensure data consistency in multi-step workflows.

### 5. 📈 Cognitive Evolution (Review & Grow)
The skill learns from its own execution.
- **Observation & Archiving**: Every complex solve or non-intuitive fix is automatically summarized into the `memory/` engine.
- **Continuous Learning**: Transforming executed tasks into "future guidelines."

---

## 🛠️ Technical Architecture & Implementation

### 🏗️ The Three-Layer Command System
| Layer | Prefix | Best For | Technical Advantage |
| :--- | :--- | :--- | :--- |
| **Shortcuts** | `+` | Routine Management | Smart defaults, tabular output, and `--dry-run` safety. |
| **API Commands** | *(None)* | Precision Control | 1:1 mapping with 2500+ Lark/Feishu OpenAPI endpoints. |
| **Raw API** | `api` | Edge Cases | Direct REST calls for newly released features not yet in CLI. |

### 📂 Cognitive Memory Engine (`memory/`)
A structured repository for institutional knowledge:
- `domain-patterns.md`: App tokens, Chat IDs, and frequently accessed Base schemas.
- `troubleshooting.md`: The "Grand Dictionary" of error codes and their solutions.
- `team-context.md`: Personnel preferences and best-fit authentication roles.

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v16+
- **Lark-CLI**: `@larksuite/cli`

### Installation & Setup
1. **Initialize CLI**:
   ```bash
   lark-cli config init --new
   ```
2. **Install Skill**:
   ```bash
   npx skills add https://github.com/yaemiko/LeanManagement -y -g
   ```
3. **Environment Diagnosis**:
   ```bash
   node scripts/check-lark.mjs
   ```

---

## ⚡ Mastery Commands

- **Task Audit**: `lark-cli task +list --user-id "ou_xxx"`
- **Data Query**: `lark-cli base +data-query --table "t_xxx" --query "SELECT..."`
- **Schedule Harmony**: `lark-cli calendar +suggestion --users "ou_xxx,ou_yyy"`
- **High-Signal Notify**: `lark-cli im +messages-send --chat-id "oc_xxx" --msg-type "interactive"`

---

## 📜 License
This project is licensed under the MIT License - see the `SKILL.md` for more details.

---
*Built with ❤️ by Antigravity & Yaemiko for a leaner, faster management world.*
