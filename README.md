# 时空跃迁

一个用于展示历史节点选择的 React 交互演示。页面包含科幻系统弹窗、逐字叙事、选项结果、错误反馈、键盘焦点管理和鼠标网格拖尾效果。

## 技术栈

- React 19
- Vite 8
- Tailwind CSS 3
- Oxlint

## 本地运行

要求 Node.js `^20.19.0` 或 `>=22.12.0`，推荐使用 Node.js 22 LTS。

```powershell
npm ci
npm run dev
```

打开 `http://127.0.0.1:5173/`。

长文本验收场景：

```text
http://127.0.0.1:5173/?fixture=long
```

## 检查与构建

```powershell
npm run lint
npm run build
npm run preview
```

生产静态文件输出到 `dist/`。该目录不会提交到 Git，部署前需要重新构建。

## 部署到 UUMit

完整的队友部署步骤见 [docs/DEPLOY_UUMIT.md](docs/DEPLOY_UUMIT.md)。

简要流程：

```powershell
git clone https://github.com/moss-02/time-travel-demo.git
cd time-travel-demo
npm ci
npm run lint
npm run build
uumit-connector pages publish --json --no-browser --title "时空跃迁演示" -- "$PWD\dist"
```

UUMit 文件发布默认仅发布者本人可访问。需要给队友验收时，再通过 `uumit-connector publish <port> --to granted` 和成员邀请流程授权，不要默认公开到互联网。

## 项目结构

```text
.
├─ .github/workflows/ci.yml   # GitHub Actions 构建检查
├─ docs/                      # 验收与部署文档
├─ public/                    # 原样复制的静态资源
├─ src/
│  ├─ components/             # 弹窗与鼠标网格效果
│  ├─ config/                 # 效果参数
│  ├─ data/                   # 演示事件与备用数据
│  └─ lib/                    # 数据适配逻辑
├─ index.html
├─ vite.config.js             # 已配置相对资源路径，适配 UUMit 子路径
└─ package.json
```

## 演示数据

默认展示唐朝“安史之乱”事件。备用数据位于 `src/data/fallbackMockData.json`，包含秦、唐、清三个朝代共 9 个事件。数据适配入口为 `src/lib/eventAdapter.js`。

## 验收

桌面端、笔记本和手机布局的验收记录见 [docs/DEMO_ACCEPTANCE.md](docs/DEMO_ACCEPTANCE.md)。
