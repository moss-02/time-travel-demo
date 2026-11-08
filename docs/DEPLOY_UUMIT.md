# 使用 UUMit 部署

这份文档面向拿到 GitHub 仓库后负责部署的队友。项目是纯前端静态站点，不需要后端或环境变量。

## 前置条件

- Git
- Node.js `^20.19.0` 或 `>=22.12.0`，推荐 Node.js 22 LTS
- 已安装并登录 UUMit 电脑客户端
- 本机装有 `uumit-connector` 命令

先确认 UUMit 连接状态：

```powershell
uumit-connector status --json
```

只有命令返回 `ok: true` 且状态已连接时，后续发布才会生效。

## 1. 克隆并构建

```powershell
git clone https://github.com/moss-02/time-travel-demo.git
cd time-travel-demo
npm ci
npm run lint
npm run build
```

构建完成后确认 `dist/index.html` 存在。`vite.config.js` 已使用相对资源路径，适合 UUMit 的应用子路径。

## 2. 发布静态文件夹

Windows PowerShell：

```powershell
uumit-connector pages publish --json --no-browser --title "时空跃迁演示" -- "$PWD\dist"
```

macOS / Linux：

```bash
uumit-connector pages publish --json --no-browser --title "时空跃迁演示" -- "$PWD/dist"
```

发布结果中应关注：

- `data.page.id`：页面编号
- `data.page.port`：后续授权使用的端口
- `data.page.url`：访问地址
- `data.has_index`：应为 `true`
- `data.registered`：应为 `true`

如果 `url` 暂时为空，使用下面的命令查询最终地址：

```powershell
uumit-connector pages list --json
```

## 3. 给队友访问

文件发布默认只有发布者本人能打开。需要让已登录 UUMit 的队友验收时，使用 `pages list --json` 找到页面的 `port`，然后授权给受邀成员：

```powershell
uumit-connector publish <port> --name time-travel-demo --to granted --reason "项目负责人：部署给队友验收" --json
```

随后按命令返回的 `next_actions` 邀请队友：

```powershell
uumit-connector members invite time-travel-demo --reason "项目负责人：邀请队友验收演示" --json
```

把生成的邀请链接发给队友，由队友本人完成接受。不要发送账号令牌或连接凭证。

## 4. 更新部署

拉取最新代码后，重新构建，再对同一个 `dist/` 目录执行一次 `pages publish`。不要直接发布 `node_modules`、源码根目录或用户主目录。

```powershell
git pull
npm ci
npm run lint
npm run build
uumit-connector pages publish --json --no-browser --title "时空跃迁演示" -- "$PWD\dist"
```

## 5. 验收地址

普通场景使用主页地址；长文本场景在主页地址后追加：

```text
?fixture=long
```

建议检查：

- 页面能加载样式和图标，无白屏
- 点击“重新进入历史节点”可打开弹窗
- 打字机效果正常
- 两个选项均能显示结果
- 错误选项触发红色闪光
- 手机宽度下选项纵向排列且内容可滚动

## 常见问题

`uumit-connector` 找不到：确认 UUMit 电脑客户端正在运行，并重新打开终端。

发布成功但没有地址：稍后执行 `uumit-connector pages list --json`，不要重复发布文件夹。

页面打开后没有样式：确认执行的是 `npm run build`，并发布仓库中的 `dist/`，不要发布源码根目录。

队友打不开：确认已经执行 `--to granted` 和成员邀请；默认发布仅发布者本人可访问。
