# 场景示例：深度工作周报与效能对齐 (Deep Weekly Report & Performance Alignment)

本示例展示了“精细管理者”如何自动获取团队多个维度的任务进度，并生成高信噪比的汇报产物。

## 场景背景
周五下午，经理需要快速获取技术团队在“春季战役”项目清单中的工作进度。仅仅看“已完成”是不够的，还需要分析**逾期率**和**核心难点**。

## 执行链路 (Thinking Chain)

### 第一阶段：目标对齐 (Align)
**核心要点**：定义本周报的“终局”，即发现并预警进度偏差。
- **目标产物**：发送至核心群的消息卡片。
- **排除浪费**：不罗列所有琐碎任务，只聚焦于高优先级与风险项。

### 第二阶段：路径解算 (Solve) — 事实锚定汇总
管理者首先通过 API 直接触达一手事实。

```bash
# 1. 获取任务清单中的所有任务 (带分页)
lark-cli task task_lists tasks list \
  --params '{"task_list_guid":"tl_123456"}' \
  --as user

# 2. 获取任务详情 (包含评论，用于挖掘难点)
# 假设某高优先级任务 ID 为 om_abcdef
lark-cli task tasks get \
  --params '{"task_guid":"om_abcdef"}'
```

### 第二阶段：身份信息关联 (Entity Correlation)
任务返回的负责人通常只有 ID (如 `ou_xxx`)，精细管理需要将其转换为人类可识读的姓名。

```bash
# 3. 通过通讯录获取用户姓名
lark-cli contact users get \
  --params '{"user_id":"ou_xxx"}'
```

### 第三阶段：闭环校验 (Validate)
数据采集后，通过 AI 进行精炼并反向核实 ID 的一致性。

### 第四阶段：闭环校验 (Validate) 与 极简信息交付
基于分析出的风险点，向群组发送携带“行动建议”的消息卡片，并提取发送返回结果。

```bash
# 4. 发送交互式消息并过滤确认 ID
lark-cli im +messages-send \
  --chat-id "oc_88888" \
  --text "..." \
  --msg_type "interactive" \
  --format json | grep message_id
```

### 第五阶段：反思总结与认知进化 (Review & Memory)
此次操作成功挖掘到了 `tl_123456` 是研发组特有清单标识，以及外部接口延期处理的一些话术。主动将此规律写入本地存证，避免复读。

```bash
# 5. AI 自主写入本地记忆库
# 目标文件: lean-manager/memory/project-spring-campaign.md
# 写入内容: "(2026-04-07) 研发部春季战役关键清单ID为 tl_123456，其日常卡点多聚集在开放平台接口联调，后续抓周报优先检查此清单的延期待办并抄送 oc_88888群。"
```

