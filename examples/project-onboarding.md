# 场景示例：项目新成员入职自动化协同 (New Member Onboarding Automation)

本示例展示了“精细管理者”如何在一个动作下，自动化完成多维度（权限、日程、任务、群聊）的入职协同。

## 场景背景
项目引进了新成员 `ou_new_member`。作为精细管理者，需要在一分钟内：
1.  将其拉入核心沟通群。
2.  在项目 Base 成员表中登记。
3.  分配入职“新兵训练营”的任务清单。
4.  预约下周一的入职谈心会议。

## 执行链路 (Thinking Chain)

### 第一阶段：目标对齐 (Align)
**核心要点**：定义“入职成功”的标志。不只是账号开通，而是“成员具备生产力”。
- **目标产物**：完成权限、任务、日程的 100% 同步开通。
- **排除浪费**：一次性下发标准任务包，避免碎片化沟通。

### 第二阶段：路径解算 (Solve) — 多端异步推送
一次触达，解决 IM、Base、Task、Calendar 的状态同步。

```bash
# 1. 加入飞书群聊
# 假设群 ID 为 oc_project_group
lark-cli im chats members create \
  --params '{"chat_id":"oc_project_group"}' \
  --data '{"id_list":["ou_new_member"]}'
```

接着，在项目管理多维表中登记。

```bash
# 2. 登记入职记录
# 假设表 ID 为 app_member_status
lark-cli base +record-create \
  --table "app_member_status" \
  --fields '{"Name":"新成员","Status":"Active","Joined_Date":1712496000000}'
```

### 第二阶段：任务清单指派 (Task Provisioning)
将一系列标准化的入职任务指派给成员。

```bash
# 3. 在“新兵训练营”列表 (tl_onboarding) 下创建任务
lark-cli task +create \
  --summary "查阅项目架构文档" \
  --members "ou_new_member" \
  --due "2026-04-10" \
  --list "tl_onboarding"
```

### 第三阶段：日程占位 (Scheduling)
自动预约入职谈心时间。

```bash
# 4. 创建入职沟通日程
lark-cli calendar +create \
  --summary "[入职谈心] 导师与新成员对齐" \
  --start "2026-04-13T10:00" \
  --duration 30 \
  --attendees "ou_mentor,ou_new_member"
```

### 第三阶段：闭环校验 (Validate) — 状态登记与核实
在所有配置完成后，通过反向读取校验权限是否生效，并在成员库中闭环登记。

### 第四阶段：仪式感建立与极简导流 (Final Delivery)
发送交互式欢迎消息，作为管理动作的最终交付。

```bash
# 5. 发送欢迎通知
lark-cli im +messages-send \
  --chat-id "oc_project_group" \
  --text "🌟 **项目欢迎礼包**：欢迎 @NewMember 加入！所有权限已开通，请查阅新手指南：[Doc链接]\n\n已经为你安排了 [新兵训练项] 和 [下周一沟通会]，加油！" \
  --msg_type "interactive"
```

### 第五阶段：复盘断点与智能演进 (Memory & Evolve)
完成此次 onboarding 后，若发现 `tl_onboarding` 下发放的任务中有两个外链在企业域外不可见，Agent 可以将该注意事项记忆，为下期优化流程提供基线。

```bash
# 6. 新人入职流水线经验存卷
# 目标库: lean-manager/memory/project-x-context.md
# 写入内容: "在执行 onboarding 流程排表时，须确认 `ou_mentor`（项目导师）当日的休假历，如其不在，任务指派负责人 fallback 到辅助 PM `ou_assist`。"
```
