---
name: lean-manager
license: MIT
github: https://github.com/yaemiko/LeanManagement
description:
  所有涉及飞书 (Lark) 体系的任务管理行为、组织决策及执行协同必须通过此 skill。
  触发场景：任务调配分发、处理跨部门信息流转、追溯任务与执行率、处理复杂多维表格审计、安排高度冲突的日历日程、或者当出现执行卡点时需要从历史记忆中寻找解决方案时。
metadata:
  author: Yaemiko
  version: "2.0.0"
---

# Lean-Manager 深度精细管理与认知进化 Skill

## 前置检查与安装配置

在开始任何精细管理任务前，请确保您的环境已就绪。

### 环境要求
- **Node.js**: 16.0 及以上版本
- **包管理器**: npm 或 yarn

### 飞书CLI 快速安装与配置步骤
1. **第一步：安装 lark-cli**
   ```bash
   npm install -g @larksuite/cli
   ```
2. **第二步：安装相关 Skills**
   ```bash
   npx skills add https://github.com/larksuite/cli -y -g
   ```
3. **第三步：初始化应用配置**
   ```bash
   lark-cli config init --new
   ```

### 诊断脚本
环境安装到位后，运行诊断脚本确认状态：
```bash
node lean-manager/scripts/check-lark.mjs
```
*如遇报错，首先使用 `lark-cli info` 等命令探测自己的状态，或执行 `lark-cli auth login --recommend`*。

2. **核心原则告知**：检查通过后，必须向用户简要输出以下协议确认：
```
🧠 Lean Manager System [Ready]: 已开启事实锚定与持续记忆进化机制。在涉及非阅后即焚的大规模数据操作前，将提供执行简报和免打扰推演。
```

---

## 管理哲学核心：精益与自我进化五步法则

精细管理者不应是冰冷敲击 API 的机器，而应运用**结构化思考、数据为基**及**持续反思留痕**。

**① 目标解析 (Strategic Alignment)**
明确管理场景的真实意图。是“提醒”、“通知”还是“决策”？对于不同意图，工具成本与触达效果不同。能用 Task 闭环的绝不建群，能推消息卡片的绝不 @ 全局。

**② 场景检索与经验复用 (Recall Memory)**
不要盲目行动！在操作不熟悉的业务（如报销审理、跨国协同）或特定的飞书文档时，**必须优先搜索本地 `lean-manager/memory/` 下有无前人沉淀的规律或报错解决手册**。用过去成功的经验规避重复踩坑。

**③ 零假设锚定 (Source of Truth & Command Strategy)**
所有的决策依赖事实。
- **三层架构选择**：根据任务精度在 **Shortcuts (+)**、**API Commands** 与 **Raw API** 间选择最优层级。常规管理首选 Shortcut，精细控制选 API 层，兜底选 Raw API。详见 [技术参考手册](./LARK_CLI_TECH_REF.md)。
- **身份切换 (Identity Strategy)**：执行前明确是以个人 (`--as user`) 还是机器人 (`--as bot`) 身份。涉及私人待办/日程的操作必须切换为 `user`。
- **元数据探测**：如果不确定字段名或 ID，优先使用 `lark-cli schema` 自查。
- **输出控制**：将拉取的数据以 `--format json` 处理，大幅减少 Token 上下文干扰。

**④ 防御式执行与闭环验证 (Defensive Execution & Validate)**
写入操作存在时延和数据限制（飞书 API 的物理限制）。
- 执行涉及多层协同的操作（如建档、写任务），严格进行请求与反查闭环。
- **429 防御**：遇到海量写入自动触发延时重试或提示分批，切忌硬闯接口限流。

**⑤ 反思总结与认知进化 (Review & Evolve)**
执行成功（或者艰难排查后解决了某个复杂权限或字段错误）后，**必须将经验持久化沉淀到本地库**。只有当你能从中不仅交付了结果，还提取出“未来指南”时，任务才算圆满。

---

## 终极工具与快捷决策矩阵 (Lark-CLI Mastery)

使用最先进的 API 和 Shortcuts，摒弃无效沟通方式。

| 业务场景 | 核心工具 (Shortcuts) | 专家级语法解析 | 场景 Tradeoff (代偿考量) |
| :--- | :--- | :--- | :--- |
| **协同追责与节点** | `lark-task` | `lark-cli task task_lists tasks list --params '{"task_list_guid":""}' --as user` | **优**: 严防拖延。**劣**: 多维排序弱，需频繁追看评论。 |
| **大规模数据决断** | `lark-base` | `lark-cli base +data-query --table "" --query "SELECT * FROM ..."` | **优**: SQL 秒切海量数据，极致对账、看板能力。**劣**: 注意处理 13 位毫秒级时间戳以及只读字段。 |
| **时间博弈与解算** | `lark-calendar` | `lark-cli calendar +suggestion --users "" --duration 45` | **优**: 无极调和冲突。**劣**: 需要精确的时间区段（ISO格式）和 user 授权。 |
| **高信噪比决策触达** | `lark-im` | `lark-cli im +messages-send --chat-id "" --msg_type "interactive" --text "[卡片流]"` | **优**: 极具仪式感，直击灵魂。**劣**: 推送太多会导致认知疲态。 |
| **长效沉淀与阅读** | `lark-wiki/doc` | `lark-cli wiki spaces get_node` 换 Token 后读取内容。 | **优**: 完备的图文表达。**劣**: Wiki/Token 双层嵌套解析易出错。 |

---

## 高频死区与硬核技术事实

1. **多重 ID 重叠幻觉**
   飞书具备严密的 ID 隔离边界。不同业务下获取的人名 `User ID`（如 `ou_xxxx`、`union_id`），不可混用。在任何涉及新旧系统打通的操作时，先用 `lark-contact` 对照查找 `open_id`。

2. **长尾数据的死角 (Pagination Fact)**
   如果通过 `lark-task` 或 `lark-base` 获取列表，注意响应体中是否有 `has_more: true` 并且附带 `page_token`。如果是，必须通过循环和分页获取，否则就会漏掉尾部数据导致“局部盲区偏差”。

3. **错误不是失败，是状态侦测器**
   遇到 `Forbidden (403)`，不说是系统崩了，而明确告知是：应用层（Bot）无相关域权限或操作人非所有者。
   遇到 `Type mismatch`，多是在处理 Base 的选项/日期写操作，立刻调用 `--format json` 核对期望结构。

---

## 【必做】：记忆与归档操作规范

当**满足以下条件其一时**，必须在任务收尾阶段主动执行“认知增量录入”（即写入 `lean-manager/memory/`）：
1. 成功走通了一个涉及多步骤、多 API 调用的极复杂场景流程（如：一键新人入职、跨时区会议统筹等）。
2. 在摸索过程中，踩到了一个非直觉的坑并且最后成功解决了（如某种特殊日期的转化处理、通过某个底层绕过报错）。
3. 分析归类出了某业务线的常用群聊 ID、任务列表 Guid 或常用报表 Token。

**保存格式与位置**：
- 在 `lean-manager/memory/` 下根据领域新建或追加 markdown 文件，如 `troubleshooting.md`, `project-x-context.md` 或 `general-patterns.md`。
- 格式保持极简的“背景-痛点-解决方案/映射表”。避免写入冗长对话。

---

## References 索引

| 资源 | 作用 |
| :--- | :--- |
| [Lark CLI 技术参考](./LARK_CLI_TECH_REF.md) | **官方三层命令体系与身份切换深度指引 (必读)** |
| [Lark CLI 官网 README](./lark_cli_README.md) | 官方项目概览与 20 个 Agent Skills 图谱 |
| [Lark-CLI 完全指南](../files/lark-cli-complete-guide.md) | 查询 2500+ 原生 API 命令参数的完整底册 |
| [记忆引擎 README](./memory/README.md) | 认知沉淀与经验复用规范 |
