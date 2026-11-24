---
title: "01. 专属标注与元数据"
description: "测试 Nuxt 4 (4.7.0) + @nuxt/content v3 (3.17.0) 的 Zod 集合 Schema、独创 ::callout / ::details-box MDC 语法与 GFM Alerts 兼容性。"
order: 1
badge: "MDC"
category: "syntax"
---

# 01. 专属标注与元数据 :badge{type="tip" text="content@3.17.0"}

不同静态网站生成器对“提示框 / 标注（Callouts / Admonitions）”和页面元数据的语法约定存在显著分歧。本页由标准 GFM 母版派生适配，展示 **Nuxt 4 (`4.7.0`) + `@nuxt/content` (`3.17.0`)** 独创的 **MDC（Markdown Components）** 语法表现。

## 1. Frontmatter 元数据机制与 SQLite Schema

`@nuxt/content` v3 彻底重构为**基于 SQLite 表结构的强类型内容集合**（在 `content.config.ts` 中通过 `defineCollection` + Zod `z.object(...)` 定义）：

- **当前页标题与摘要**：`title` 与 `description` 为 `type: 'page'` 集合内置列（若省略还会自动提取首个 `<h1>` 与首段文本兜底）。
- **自定义扩展字段**：在 `content.config.ts` 声明 `order: z.number().optional()` 与 `badge: z.string().optional()` 后，这些 YAML 字段会被编译为真实的 SQLite 列，可直接执行 `.order('order', 'ASC')` 或 `.where('category', '=', 'syntax')` SQL 级过滤！
- **行内 MDC 组件直调**：无需像 Astro Starlight / Docusaurus 那样把后缀改为 `.mdx` 并手写 `import`，在纯 `.md` 中可直接用单冒号语法渲染 `components/content/Badge.vue`：:badge{type="info" text="Info"} :badge{type="warning" text="Warning"} :badge{type="danger" text="Danger"}。

## 2. 标准提示语义块（Nuxt MDC 双冒号组件）

Nuxt Content 不使用 `markdown-it` 的 `::: tip` 三冒号语法，而是独创了 **`::component-name{key="value"}` ... `::` 双冒号 MDC 块级组件语法**——直接映射到项目 `components/content/Callout.vue`（且不像 MDX 那样因正文出现裸 `{}` 花括号而编译崩溃）：

::callout{type="info" title="NOTE · 默认信息提示块"}
默认信息提示块：静态站点对比平台的每个子模块均独立维护 `main`（源码）与 `page`（构建产物）双分支，互不污染提交历史。
::

::callout{type="tip" title="性能优化建议（MDC 属性传参）"}
在 Nuxt MDC 语法中，组件 Props 统一写在紧随组件名的 `{type="tip" title="..."}` 花括号属性块中，内部天然支持嵌套行内代码如 `queryCollection('docs')`、加粗强调与列表。
::

::callout{type="warning" title="版本边界注意"}
注意区分各派系容器语法：VitePress / VuePress 使用三冒号空格标题 `::: warning 标题`，Starlight 使用方括号 `:::caution[标题]`，而 Nuxt Content 使用双冒号组件 `::callout{type="warning" title="标题"}`。
::

::callout{type="danger" title="不可逆分支覆盖警告"}
自动化流水线在向 `page` 分支推送构建产物时会启用 `force_orphan: true`，切勿在 `page` 分支直接手工修改代码！
::

## 3. 可折叠详情容器（MDC `::details-box` 组件）

得益于 `@nuxtjs/mdc` 内置 `rehype-raw`（允许语义化 HTML）与自定义组件自动挂载，既可直接保留母版原生 `<details>`，也可封装更易复用的 `components/content/DetailsBox.vue` 并通过 `::details-box{summary="..."}` 调用：

::details-box{summary="点击展开查看 Nuxt MDC 容器语法源码结构"}

```mdc
::callout{type="tip" title="性能优化建议（MDC 属性传参）"}
Props 通过花括号键值传入，无需把文件改成 .mdx 或顶层 import 组件。
::
```

除了代码块，MDC 折叠组件插槽内同样完整解析列表、表格与行内数学公式 $f(x) = x^2 + 1$。

::

## 4. GitHub 风格引用警报（GFM Alerts）跨框架直通测试

以下三段保持母版原始 GFM `> [!NOTE]` 语法**一字不改**。实测可见：`@nuxtjs/mdc@0.23.4` 虽默认内置 `remark-gfm`（表格、删除线、任务列表），但**未内置 GitHub Alert 引用块解析插件**，因此未改写的 `> [!NOTE]` 会退化为普通 `<blockquote>` 并原样露出标记字符串：

> [!NOTE]
> 这是一段标准的 GitHub Flavored Markdown `[!NOTE]` 警报文本，用于检验各生成器对母版语法的零改造直通能力。

> [!IMPORTANT]
> 跨平台迁移 Markdown 文档时，是否原生兼容 `> [!IMPORTANT]` 与 `> [!WARNING]` 直接决定了母版文档的派生改造成本。

> [!CAUTION]
> 若目标生成器未内置 GFM Alert 解析器（如 VuePress v1、Starlight 默认配置、Docsify v4 旧插件），上方标记会退化为普通引用块并原样露出 `[!CAUTION]` 字符串。
