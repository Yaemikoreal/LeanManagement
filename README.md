# Lean Manager: 飞书 (Lark) 自治执行与认知进化 Skill

> **“从简单的任务自动化，演进为具备认知能力的自治管理 Agent。”**

Lean Manager 是一款专为飞书 (Lark) 体系设计的高性能精细管理 Skill。它的核心目标是弥合底层 API 调用与高层管理意图之间的鸿沟，通过持续学习和事实锚定，实现管理流程的数字化闭环。

---

## 核心设计哲学：哲学 + 技术事实 (Philosophy + Technical Facts)

Lean Manager 的设计基于以下五大核心支柱，确保每一次执行都经过深思熟虑、数据驱动且具备自我进化的能力。

### 1. 目标解析与战略对齐 (Strategic Alignment)
不仅是“执行”，更是“对齐”。
- **意图识别**：在执行前明确任务的真实意图是提醒、通知还是辅助决策。
- **工具选型**：根据触达效果和干扰成本，在任务 (Task)、消息卡片 (IM) 或日历 (Calendar) 之间选择最优路径。

### 2. 经验复用与认知检索 (Recall Memory)
拒绝重复踩坑。
- **持久化记忆**：利用本地 `memory/` 目录存储领域模式、特定业务 Token 及报错解决方案。
- **环境预判**：在启动新任务前，优先检索历史成功经验和已知限制。

### 3. 事实锚定与零假设 (Source of Truth)
决策依赖事实而非假设。
- **三层架构选型**：根据任务精度在 Shortcuts (+)、API Commands 与 Raw API 之间动态选择。
- **身份切换策略**：根据数据隐私级别，在用户身份 (`--as user`) 与机器人身份 (`--as bot`) 之间自动切换。

### 4. 防御式执行与闭环验证 (Defensive Execution)
在高时延和多限制环境下确保可靠性。
- **429 频率防御**：内置对飞书 API 限流策略的感知，支持自动延时重试。
- **结果反查机制**：对写入操作进行强制性的结果验证，确保多步协同流的一致性。

### 5. 反思总结与认知进化 (Review & Evolve)
让 Skill 具备自我学习能力。
- **增量录入**：将复杂的排错过程或非直觉的业务逻辑自动沉淀至 `memory/` 引擎。
- **知识转化**：将单次任务的交付结果转化为未来的执行指南。

---

## 技术架构与实现方案

### 三层命令决策链路
| 层级 | 命令前缀 | 适用场景 | 技术优势 |
| :--- | :--- | :--- | :--- |
| **Shortcuts (快捷层)** | `+` | 常规管理行为 | 智能默认参数、表格化输出、支持 --dry-run 预览。 |
| **API Commands (标准层)** | *(无)* | 精细参数控制 | 1:1 映射飞书 2500+ OpenAPI 接口。 |
| **Raw API (原始层)** | `api` | 边缘或新功能 | 直接发起 REST 调用，覆盖 CLI 尚未封装的底层能力。 |

### 认知记忆引擎 (`memory/`)
结构化的组织知识库：
- `domain-patterns.md`：记录常用的 App Token、群聊 ID 及复杂表格的 Schema。
- `troubleshooting.md`：收录从权限报错到日期格式陷阱的完整解决手册。
- `team-context.md`：记录团队协作偏好与最佳 Auth 身份配置。

---

## 快速上手

### 环境要求
- **Node.js**: v16.0 及以上版本
- **Lark-CLI**: 需安装 `@larksuite/cli`

### 安装与配置
1. **初始化配置**：
   ```bash
   lark-cli config init --new
   ```
2. **添加 Skill**：
   ```bash
   npx skills add https://github.com/yaemiko/LeanManagement -y -g
   ```
3. **环境排查**：
   ```bash
   node scripts/check-lark.mjs
   ```

---

## 核心管理指令参考

- **任务审计**：`lark-cli task +list --user-id "ou_xxx"`
- **数据决断**：`lark-cli base +data-query --table "t_xxx" --query "SELECT..."`
- **日程筹划**：`lark-cli calendar +suggestion --users "ou_xxx,ou_yyy"`
- **高效触达**：`lark-cli im +messages-send --chat-id "oc_xxx" --msg-type "interactive"`

---

## 许可证
本项目采用 MIT 许可证，详情请参阅 `SKILL.md`。

---
*由 Antigravity & Yaemiko 协作构建，致力于更精益、更敏捷的管理世界。*
