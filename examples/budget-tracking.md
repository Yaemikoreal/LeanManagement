# 场景示例：基于多维分析的预算执行与风险管控 (Budget Execution & Risk Control)

本示例展示了“精细管理者”如何通过 `lark-base` 的 SQL 查询能力，实现对大规模报销与项目支出的实时监控。

## 场景背景
财务部在多维表格 `app_budget_2026` 中记录了上千条项目支出。精细管理者需要汇总本季各研发部的总支出，并对比预算池 `app_pool_2026` 进行实时偏差分析。

## 执行链路 (Thinking Chain)

### 第一阶段：目标对齐 (Align)
**核心要点**：确定数据的真实终局。预算监控不只是记录，而是防范“超支”风险。
- **目标产物**：完成月度对账并触发“超标”实时预警。
- **排除浪费**：利用 SQL 批量查询替代人工在多维表格中通过肉眼查找异常值。

### 第二阶段：路径解算 (Solve) — 多维度数据审计
执行高效的 SQL 模型查询。

```bash
# 1. 跨表查询本季度研发部门已审批的报销总额
# 假设 table_id 为 tbl_reimbursement
lark-cli base +data-query \
  --table "app_budget_2026" \
  --query "SELECT dept, SUM(amount) AS total_spent FROM tbl_reimbursement WHERE status='Approved' AND quarter='Q1' GROUP BY dept"
```

### 第二阶段：预算池偏离度分析 (Departure Analysis)
管理者在获取支出总额后，需要获取预算池中的设定上限。

```bash
# 2. 查询预算池设定
# 假设预算设定 table_id 为 tbl_budget_setting
lark-cli base +data-query \
  --table "app_pool_2026" \
  --query "SELECT dept, budget_limit FROM tbl_budget_setting WHERE dept='Research'"
```

### 第三阶段：精细化预警逻辑 (Lean Alert Logic)
如果 `total_spent` > `budget_limit * 0.8` (接近警戒线)，AI 应自动触发风险上报。

### 第四阶段：状态回写与审计留痕 (Audit Traceability)
在高额消费记录中，管理者可以自动添加审计标记。

```bash
# 3. 在多维表格中标记高额关注记录
lark-cli base +record-update \
  --table "app_budget_2026" \
  --record-id "rec_high_amount_001" \
  --fields '{"ai_audit_remark":"⚠️ 该项支出使本季预算使用率突破 85%，已上报主管审批。"}'
```

### 第三阶段：闭环校验 (Validate) — 风险标记与回写
通过反向读操作，确保每一项重要审计结论都已落库。

### 第四阶段：高信噪比决策看板推送 (Minimalist Delivery)
整合所有偏差数据，向管理者推送直达终局的消息卡片。

```bash
# 4. 推送风险通知
lark-cli im +messages-send \
  --chat-id "oc_finance_alert" \
  --text "💵 **季节预算异常预警**\n\n- **研发部预算已使用**：87% (超标 7%)\n- **主要增项**：服务器租赁 & 云计算成本上涨。\n- **详情看板**：[点击查看](https://link.feishu.cn/base_chart_link)\n- **处理意见**：建议启动 Q2 预算预审。" \
  --msg_type "interactive"
```

### 第五阶段：业务知识沉淀与记忆写入 (Evolve)
通过这轮查询，AI 解析了 `Q1` 作为 `app_budget_2026` 多维表的过滤核心，且财务部的警告群 ID 固定。将其记入业务常识库，下一期报账只需简令触发。

```bash
# 5. AI 将查询特征写入领域模式记忆
# 目标库: lean-manager/memory/domain-patterns.md
# 写入内容: "【财务管控领域】针对 `app_budget` 审批数据，查询条件绑定 status='Approved'，通知必须推流至预警群 chat_id: oc_finance_alert。"
```
