---
title: "00. 概览与版本档案"
description: "锁定版本 nuxt@4.7.0 + @nuxt/content@3.17.0 · MDC 组件语法 + SQLite Collections + KaTeX + Mermaid 12"
order: 0
badge: "v3.17"
---

::hero-banner{eyebrow="Nuxt 4 · Content v3 SQLite Engine" title="Nuxt Content v3 静态基准实测" tagline="锁定版本 nuxt@4.7.0 + @nuxt/content@3.17.0 · 独创 ::component 双冒号 MDC 语法 + SQLite 强类型内容集合 + KaTeX 0.19 + Mermaid 12" primary-text="01. 专属标注与元数据 →" primary-link="/01-annotations" secondary-text="02. 流程图 Mermaid" secondary-link="/02-diagrams" tertiary-text="03. 数学公式 Math" tertiary-link="/03-math"}
::

::feature-grid
  ::feature-card{title="01. 独创 MDC 双冒号组件与 Zod 集合" to="/01-annotations"}
  无需改后缀为 `.mdx` 或手写 `import`，直接在纯 `.md` 中通过 `::callout{type="tip" title="..."}` 与 `:badge` 调用 `components/content/` 下的 Vue 组件；同时由 `content.config.ts` 提供 SQLite 集合 Schema 校验。
  ::

  ::feature-card{title="02. ProsePre 接管 Mermaid 12 图表" to="/02-diagrams"}
  利用 `@nuxtjs/mdc` 的 Prose 组件映射机制，在 `components/content/ProsePre.vue` 中无侵入拦截 `language="mermaid"` 代码块并交由本地打包的 `mermaid@12.3.0` 客户端响应式渲染。
  ::

  ::feature-card{title="03. 构建期 KaTeX 0.19 公式排版" to="/03-math"}
  在 `nuxt.config.ts` 的 `content.build.markdown` 中挂载 `remark-math@6.0.0` 与 `rehype-katex@7.0.1`，配合本地打包的 `katex/dist/katex.min.css` Webfont 实现零外部 CDN 构建期公式直出。
  ::

  ::feature-card{title="04. SQLite 内容层与 .navigation.yml 导航树" to="/04-directory"}
  所有 `content/` 文档编译入本地 SQLite 表，由 `queryCollectionNavigation` 结合 `.navigation.yml` 自动生成中文多级侧栏；实测剖析 `1.xxx.md` 点号前缀自动剥离与 `01-` 连字符保留机制。
  ::
::

## 子模块版本档案

本站点由独立仓库 [`page2401/nuxt-content`](https://github.com/page2401/nuxt-content) 构建，`main` 分支仅保存纯工程源码与派生适配后的 `*.md` 基准文档，GitHub Actions 在每次推送后执行 `nuxt generate` 并将 `.output/public` 发布至孤儿分支 `page`。

| 依赖模块 | 精确锁定版本 | 在本子站中的职责 |
| :--- | :--- | :--- |
| `nuxt` | `4.7.0` | 核心全栈/静态生成框架（Vite + Nitro 预渲染管线 `nuxt generate`） |
| `@nuxt/content` | `3.17.0` | 第 3 代 SQLite 驱动的内容集合引擎（`defineCollection` + `queryCollection`） |
| `better-sqlite3` | `13.2.0` | 构建期本地 SQLite 集合编译与导航树查询连接器 |
| `vue` / `vue-router` | `3.5.46` / `5.5.1` | 视图渲染层、MDC 自定义组件宿主与同源子路径 `/nuxt-content/` 路由 |
| `remark-math` / `rehype-katex` | `6.0.0` / `7.0.1` | Markdown `$...$` / `$$...$$` 公式解析与构建期 KaTeX HTML 生成 |
| `katex` | `0.19.1` | 本地打包数学排版样式与离线 `.woff2` 字体资源（零外部 CDN） |
| `mermaid` | `12.3.0` | 本地打包第 12 代流程图、时序图与状态机渲染引擎（跟随深浅色重绘） |
