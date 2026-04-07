import { execSync } from 'child_process';
import os from 'os';
import path from 'path';
import fs from 'fs';

/**
 * Lean-Manager 环境检查脚本 (v2.1)
 * 功能：
 * 1. 检查 Node.js 版本 (>= 16.0)
 * 2. 自动检测 lark-cli 是否安装
 * 3. 若缺失，提供标准的 3 步安装与配置指引
 * 4. 检查认证状态
 */

async function checkLark() {
  console.log('🔍 正在启动精细管理者 (Lean Manager) 环境诊断...');

  // 1. 检查 Node.js 版本
  const nodeVersion = process.versions.node;
  const majorVersion = parseInt(nodeVersion.split('.')[0], 10);
  if (majorVersion < 16) {
    console.error(`❌ Node.js 版本过低: 当前为 v${nodeVersion}。`);
    console.log('💡 精细管理者要求 Node.js 16.0 及以上版本。请升级您的环境。');
    process.exit(1);
  }
  console.log(`✅ Node.js 版本检查通过: v${nodeVersion}`);

  // 2. 检查 lark-cli 是否安装
  let cliInstalled = false;
  try {
    execSync('lark-cli --version', { stdio: 'ignore' });
    cliInstalled = true;
    console.log('✅ lark-cli 已安装。');
  } catch (e) {
    console.log('⚠️ 未找到 lark-cli。需要执行快速安装步骤。');
  }

  if (!cliInstalled) {
    console.log('\n--- 🚀 飞书 CLI 快速安装与配置 ---');
    console.log('环境要求: Node.js 16.0+ | npm 或 yarn');
    console.log('\n请依次执行以下命令：');
    console.log('1️⃣  安装 Lark CLI:');
    console.log('   npm install -g @larksuite/cli');
    console.log('\n2️⃣  添加核心 Skills:');
    console.log('   npx skills add https://github.com/larksuite/cli -y -g');
    console.log('\n3️⃣  初始化应用配置:');
    console.log('   lark-cli config init --new');
    console.log('\n完成后，请通过 `lark-cli auth login --recommend` 完成登录。');
    process.exit(1);
  }

  // 3. 检查应用配置初始化状态
  const configPath = path.join(os.homedir(), '.lark-cli', 'config.json');
  if (!fs.existsSync(configPath)) {
    console.error('❌ 未检测到 Lark CLI 配置文件 (~/.lark-cli/config.json)。');
    console.log('💡 请运行: lark-cli config init --new 来初始化配置。');
    process.exit(1);
  }

  // 4. 检查认证状态
  try {
    const status = execSync('lark-cli auth status', { encoding: 'utf-8' });
    if (status.includes('No authentication found') || status.includes('Expired')) {
      console.error('❌ 飞书身份认证失效或未登录。');
      console.log('💡 请运行: lark-cli auth login --recommend');
      process.exit(1);
    }
    console.log('✅ 飞书身份认证有效。');
  } catch (e) {
    console.error('❌ 检查认证状态时发生错误。');
    console.log('💡 请手动尝试运行: lark-cli auth status');
    process.exit(1);
  }

  console.log('\n🚀 环境准备就绪，精细管理者已就命！');
}

checkLark();
