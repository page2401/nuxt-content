# page2401/nuxt-content

独立静态站点对比子模块 —— **Nuxt 4 (`4.7.0`) + `@nuxt/content` v3 (`3.17.0`)**。

- **线上预览地址**：`https://page.2401.xyz/nuxt-content/`
- **对比总站地址**：`https://page.2401.xyz/`
- **分支模型**：
  - `main`：仅保存纯工程源码、MDC 组件与适配版 `*.md` 基准文档（挂载为主仓库 `sites/nuxt-content` 子模块）
  - `page`：由 GitHub Actions 执行 `nuxt generate` 自动构建并强制覆盖的纯静态产物孤儿分支（供 GitHub Pages 发布）

## 精确锁定依赖版本

- `nuxt`: `4.7.0`
- `@nuxt/content`: `3.17.0`
- `better-sqlite3`: `13.2.0`
- `vue` / `vue-router`: `3.5.46` / `5.5.1`
- `remark-math` / `rehype-katex`: `6.0.0` / `7.0.1`
- `katex`: `0.19.1`
- `mermaid`: `12.3.0`

## 本地开发与独立构建

```bash
npm install
npm run dev      # 本地开发预览
npm run build    # 执行 nuxt generate 输出纯静态站点至 .output/public (默认 baseURL: /nuxt-content/)

# 如需部署到独立根域名：
BASE_PATH=/ npm run build
```
