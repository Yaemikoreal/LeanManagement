# 场景示例：基于认知记忆的高阶排查与经验唤醒 (Advanced Troubleshooting & Memory Recall)

本示例展示了“精细管理者” (Lean Manager) 如何像真正的人类专家一样，在面对全新的飞书报错时，通过命令行自我查证并将经验刻录成永久记忆。当下次再遇到同类需求时，直接唤醒记忆，秒级通关。

## 场景背景 (Day 1 - 遭遇阻碍)
PM 要求用 Bot 身份在公共 Wiki 库里新建一个每周规划的挂载文档（docx）。
AI 按照常规思维，拿到了 `wiki_token` 后直接尝试新建，结果飞出意料外的红字报错。

## 执行链路 (Thinking Chain: The First Encounter)

### 第一阶段：目标突发中断 (Unexpected Error)
```bash
# 1. 尝试直接把 docx 挂在 wiki 的 token 下
lark-cli wiki nodes create \
  --params '{"space_id":"7123","obj_type":"docx","parent_node_token":"wikcn_xyz"}' \
  --as bot

# 🔴 报错返回：
# ERROR: [10004] Forbidden. User or Bot has no permission to create node in this space.
```

### 第二阶段：事实深挖与诊断 (Solve & Investigate)
精细管理者不会立刻对用户说“我做不到，飞书崩了或者缺少权限”。而是调用其他命令诊断权限全貌。

```bash
# 2. 检查当前 Bot 的真实权限集
lark-cli auth check --scope "drive:drive"

# 发现 drive:drive 有权限，转而思考是不是 API 接口参数给错。
# 3. 使用 schema 探查正确参数结构
lark-cli schema wiki.nodes.create
# 分析发现，如果是建 wiki，不仅要求 bot 有 space 权限，还要求当前 parent_node 是真实可挂载的。
```

### 第三阶段：闭环校验与迂回突围 (Validate via Bypass)
AI 决定换一条路：先通过正常的 docx API 建文档，再挂载回 wiki_space 中。

```bash
# 4. 迂回操作：先建 docx，再绑定到 wiki
doc_token=$(lark-cli docx documents create --as bot --format json | jq -r '.document.document_id')

lark-cli wiki spaces nodes create \
  --params '{"space_id":"7123"}' \
  --data "{\"obj_type\":\"docx\",\"obj_token\":\"$doc_token\",\"node_type\":\"origin\"}" \
  --as bot

# ✅ 成功！
```

### 第四阶段：知识萃取与记忆沉淀 (Evolve & Memory)
既然发现“Bot 直接在复杂 Wiki 树内建节点”极易触发隐式 Permission Denied，而“先建 Doc 后挂载”是安全路径，必须记录下来以防后患。

```bash
# 5. 生成高价值排错记忆
# 目标库: lean-manager/memory/troubleshooting.md
# 写入内容: 
# "【Wiki节点创建故障与绕路】
# 触发场景：在 Wiki Space 下以 Bot 身份直接建 docx 节点报错 10004 Forbidden。
# 核心原因：Bot 的隐式协作者权限继承在复杂的父子节点中存在延迟判断。
# 最佳绕过路径：分两步走。1) lark-cli docx documents create 创建孤立文档拿到 obj_token。2) 调 lark-cli wiki spaces nodes create 传入 obj_token 进行 bind。"
```

---

## 场景背景 (Day 15 - 记忆唤醒)
两周后，另一位用户提出了几乎一样的需求：“把这份市场周报建在项目 Wiki 的产品目录下”。

## 执行链路 (Thinking Chain: The Master Call)

### 第一阶段：目标对齐与记忆预读 (Align & Recall)
接收任务后，精细管理者在动手前，主动扫略本地脑库。

```bash
# 1. 查阅可能相关的排错指南
cat lean-manager/memory/troubleshooting.md | grep -A 5 "Wiki"
# 💡 瞬间提取到 Day 1 记录的【Wiki节点创建故障与绕路】。
```

### 第二阶段：降维打击 (Direct Solve)
掌握了底层机制后，直接采取成熟的“两步走”策略，甚至都没让错误发生。

```bash
# 2. 无缝的两步并作一步建文档并挂载
new_doc=$(lark-cli docx documents create --params '{"title":"市场周报"}' --format json | jq -r ...)
lark-cli wiki spaces nodes create --data "{\"obj_token\":\"$new_doc\"...}"
```

### 第三阶段：极简交付 (Minimalist Delivery)
```bash
# 3. 推送结果给用户
lark-cli im +messages-send --text "✅ 文档已规避节点冲突顺利建好在 Wiki 中：链接拉取..."
```

## 认知进化价值：
真正的“精细管理”不在于手速有多快，而在于**绝对不在同一个坑里摔倒第二次**。引入认知记忆机制后，Agent 使用的时间越长，对团队业务与 Lark API 的理解就越深如骨髓。
