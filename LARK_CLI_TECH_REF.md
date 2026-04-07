# Lark CLI 技术参考手册 (Lean Manager Mastery)

本手册基于 `lark-cli (v1.0.4+)` 官方技术规格，为“精细管理者”提供底层的身份逻辑与命令粒度决策支持。

## 1. 认证与身份管理 (Authentication)

精细管理者必须根据操作对象的隐私级别和系统属性切换执行身份。

### 角色权能矩阵
- **`--as user` (用户身份)**：
    - **适用场景**：访问该用户的私人日程、私人列表中的待办任务、读取该用户有权访问的私密文档、分析该用户的收件箱邮件。
    - **核心限制**：取决于该用户在组织内的真实权限。
- **`--as bot` (机器人身份)**：
    - **适用场景**：发送系统告警、在已加入的群组中发消息、操作应用已通过权限审批的多维表格记录。
    - **核心限制**：无法查看未公开分享给应用的私人数据。

### 认证状态维护
- **状态探测**：`lark-cli auth status` (检查当前已登录的身份列表及 Scopes)。
- **权限校验**：`lark-cli auth check --scope <target_scope>` (在执行写入前通过此命令预判是否会触发 403)。
- **降级处理**：若 Bot 指令执行失败，应尝试提示用户开启 `--as user` 模式重试。

## 2. 三层命令架构决策链路 (Three-Layer System)

AI Agent 必须根据“精确度”与“交互成本”选择执行层级。

### A层：Shortcuts (快捷层 / 前缀 `+`)
- **特点**：智能默认、表格化输出、支持 `--dry-run` 预览、参数极简（适合 AI 操作）。
- **决策场景**：**常规管理行为的首选**。
    - `lark-cli calendar +agenda` (查看日程)
    - `lark-cli im +messages-send` (快速通知)
    - `lark-cli base +data-query` (SQL 级多维表查询)

### B层：API Commands (标准层)
- **特点**：与 Lark OpenAPI 1:1 映射，涵盖 2500+ 命令。
- **决策场景**：**需要极精细参数控制或 Shortcuts 未覆盖的边缘场景**。
    - 示例：`lark-cli calendar calendars list` (列出所有可见日历)。

### C层：Raw API (原始层 / `api` 前缀)
- **特点**：直接调用 REST API，覆盖所有尚未封装的新功能。
- **决策场景**：**作为最终兜底，当上述两层均报错或缺失时使用**。
    - 语法：`lark-cli api [GET|POST] /open-apis/xxx`。

---

## 3. 生产级进阶参数指引

| 参数类型 | 命令语法 | 管理价值 |
| :--- | :--- | :--- |
| **输出优化** | `--format json/table/ndjson` | 配合 `jq` 进行大规模数据流水化处理。 |
| **安全预览** | `--dry-run` | 在正式进行任务删除或全员通知前进行模拟。 |
| **分页采集** | `--page-all --page-limit <n>` | 处理 100+ 记录时防止信息遗漏。 |
| **元数据自检** | `lark-cli schema <path>` | 在不确定的字段类型前进行结构探测，降低模型幻觉报错。 |

## 4. 核心 Skills 能力图谱

“精细管理者”可联动调用的官量子 Skill：
- `lark-shared`：基础认证与环境切换。
- `lark-event`：实时 WebSocket 监听（适用于管理看板的实时刷新）。
- `lark-vc/minutes`：获取会议纪要并反向提取 Action Items。
- `lark-approval`：审批流的自动化状态流转。

---
*注：本手册应作为 SKILL.md 的技术补集，当决策逻辑出现歧义时，以本手册的命令规范为准。*
