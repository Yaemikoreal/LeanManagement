# 场景示例：高效团队同步与时空管理 (Team Sync & Scheduling Alignment)

本示例展示了“精细管理者”如何面对复杂的跨部门日程，找到最优同步方案。

## 场景背景
项目进入冲刺阶段，需要研发(A组)、产品(B组)和设计(C组)在下周二下午 2:00 至 6:00 之间，寻找 45 分钟的同步窗口，并提前下发会议议程。

## 执行链路 (Thinking Chain)

### 第一阶段：目标对齐 (Align)
**核心要点**：确定会议在项目大图中的必要性。同步不只是沟通，而是决策。
- **目标产物**：创建 45 分钟无冲突日程并联通议程文档。
- **排除浪费**：利用系统原生的忙闲检测，拒绝人工逐一私聊确认。

### 第二阶段：路径解算 (Solve) — 多维度时空调研
通过 API 快速解算不同部门的核心参会者时刻。

```bash
# 1. 查询 4 月 8 日下午 14:00 - 18:00 参与者的真实忙闲
# 涉及 ou_研发, ou_产品, ou_设计
lark-cli calendar +freebusy \
  --users "ou_dev,ou_pm,ou_designer" \
  --start "2026-04-08T14:00" \
  --end "2026-04-08T18:00" \
  --as user
```

### 第二阶段：智能推荐与决策 (Suggestion for Best Time)
利用 `lark-cli` 的计算密集型快捷方式 `+suggestion` 自动解算冲突。

```bash
# 2. 获取 45 分钟、无冲突的最佳时段建议
lark-cli calendar +suggestion \
  --duration 45 \
  --users "ou_dev,ou_pm,ou_designer"
```

### 第三阶段：闭环校验 (Validate) — 文档与日程同步
在创建日程的同时，必须保证“知识载体” (lark-doc) 的协同性。

```bash
# 3. 创建会议议程文档 (关联文档 token 准备)
lark-cli docx documents create \
  --params '{"title":"[项目同步] 4月8日会议议程"}' \
  --as user
```

### 第四阶段：日程正式下发与通知 (Action & Notification)
选定建议的时段 (如 15:30) 后，下发正式日程。

```bash
# 4. 下发日程
lark-cli calendar +create \
  --summary "[冲刺同步] 项目关键节点对齐" \
  --start "2026-04-08T15:30" \
  --duration 45 \
  --attendees "ou_dev,ou_pm,ou_designer" \
  --as user
```

### 第四阶段：极简通知与闭环触达 (Minimalist Delivery)
下发正式日程后，向全员推送含有“预期交付物”链接的消息。

```bash
# 5. 群组内极简推送
lark-cli im +messages-send \
  --chat-id "oc_sync_group" \
  --text "⏰ **会议同步提醒**：本周二 15:30 准时对齐进度。请各组提前完善议程：[会议议程文档链接]" \
  --as user
```

### 第五阶段：反思总结与认知进化 (Review & Evolve)
完成排期后，AI Agent 反思了 `ou_designer` （设计部）周二下午往往由于集体评审而常报出时间冲突。将此时段避险偏好记入团队上下文库中。

```bash
# 6. AI 自动录入时空对齐经验
# 目标库: lean-manager/memory/team-context.md
# 写入内容: "- 避让规则：设计部门周二下午 14:00-18:00 属于硬核禁航区 (Hard Block)。下一次尝试 +suggestion 时建议主动将优先级降级或绕开此时段。"
```
