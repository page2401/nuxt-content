---
title: "05. 高阶代码块与语法高亮"
description: "实测 Nuxt 4 + @nuxt/content v3 (3.17.0) 基于 @nuxtjs/mdc + Shiki 的 [filename]{3,7-9} 组合标记、内置 Diff Transformer 与 ::code-group MDC 组件。"
order: 5
badge: "Shiki"
category: "syntax"
---

# 05. 高阶代码块与语法高亮 :badge{type="tip" text="content@3.17.0 · Shiki"}

在 **Nuxt 4 (`4.7.0`) + `@nuxt/content` v3 (`3.17.0`)** 架构下，代码块管线展现出鲜明的 **“AST 元数据解析内置 + Prose 视图组件解耦”** 特征：底层 `@nuxtjs/mdc` 使用双主题 **Shiki**（`github-light` / `github-dark` CSS 变量切换）并自动提取文件名与高亮行号传给 `components/content/ProsePre.vue`，但行高亮背景色与多标签切换框需由业务层 CSS / MDC 组件接管。

## 1. 代码块文件名标题栏（MDC `[filename]` 元数据提取）

不同于 VitePress 在独立代码块中剥离 `[title]`、也不同于 VuePress v2 / Starlight 的 `title="..."`，`@nuxtjs/mdc` 内置的 `parseThematicBlock` 正则原生识别方括号 ```` ```ts [scripts/resolve-route.ts] ````，并将 `filename="scripts/resolve-route.ts"` 作为 Prop 传入 `ProsePre.vue` 渲染顶栏：

```ts [scripts/resolve-route.ts]
export interface RouteContext {
  basePath: string
  slug: string
  cleanUrls: boolean
}

export function formatDocRoute(ctx: RouteContext): string {
  const prefix = ctx.basePath.endsWith('/') ? ctx.basePath : `${ctx.basePath}/`
  const normalized = ctx.slug.replace(/^\/+|\/+$/g, '')
  if (!normalized || normalized === 'index') return prefix
  return ctx.cleanUrls ? `${prefix}${normalized}/` : `${prefix}${normalized}.html`
}
```

## 2. 关键行聚焦与高亮（`[filename]{3,7-9}` 同行组合）

在 MDC 围栏信息串中，`[filename]` 与 `{3,7-9}` 可按任意顺序同行并列。`@nuxtjs/mdc` 的 `mdc:highlight` 转换器会向第 `3` 行与第 `7–9` 行的 `<span class="line highlight" line="3">` 注入 `.highlight` 类名：

```json [benchmark.config.json]{3,7-9}
{
  "id": "ssg-benchmark",
  "routeStyle": "clean",
  "strictZeroCdn": true,
  "markdown": {
    "mathEngine": "katex",
    "diagramEngine": "mermaid",
    "lineHighlight": true,
    "codeTransformers": ["diff", "focus"]
  }
}
```

::callout{type="info" title="无头 Prose 机制注意：类名内置 vs 样式自备"}
裸 `@nuxt/content` 只负责在 HTML 产物中输出 `<span class="line highlight">` 与 `--shiki-dark` 变量，**不附带任何默认代码块样式表**——必须在 `assets/main.css` 中自行声明 `.line.highlight` 与 `.line.diff.add / .remove` 背景色（或引入重型 `@nuxt/ui`），否则高亮行在视觉上与普通行无异。
::

## 3. 保留 TypeScript 词法着色的行级 Diff

查阅 `@nuxtjs/mdc/dist/runtime/highlighter/shiki.js` 源码可见，模块在初始化 Shiki 时已默认挂载 `@shikijs/transformers` 四大转换器（`transformerNotationDiff`、`transformerNotationHighlight`、`transformerNotationFocus`、`transformerNotationErrorLevel`），因此直接在 `ts` 代码块中使用 `// [!code --]` 与 `// [!code ++]` 即可保留完整 TypeScript 语法着色：

```ts [scripts/mount-subsite.ts]
export function mountSubsite(baseDir: string, subPath: string): string | null {
  const cleanRel = decodeURIComponent(subPath).replace(/\.\./g, '') // [!code --]
  return `${baseDir}/${cleanRel}` // [!code --]
  const resolvedBase = path.resolve(baseDir) // [!code ++]
  const target = path.resolve(resolvedBase, decodeURIComponent(subPath).replace(/^\/+/, '')) // [!code ++]
  return target.startsWith(`${resolvedBase}${path.sep}`) ? target : null // [!code ++]
}
```

## 4. 多语言运行时命令组（MDC `::code-group` 组件）

Nuxt Content 不使用三冒号 `::: code-group`，而是遵循双冒号 MDC 规范编写 `::code-group`，自动读取内部各代码块的 `[标签名]` Prop 渲染交互式标签栏（对应本项目 `components/content/CodeGroup.vue`）：

::code-group

```bash [Node.js (package.json)]
npm ci && npm run build
```

```bash [Deno 2 (deno.json)]
deno task build
```

```bash [Python (requirements.txt)]
pip install -r requirements.txt && sphinx-build -b dirhtml . _build/dirhtml
```

```bash [Ruby (Gemfile)]
bundle install && bundle exec jekyll build
```

::

## 5. 四大底层高亮引擎能力对照小结

| 高亮引擎代表 | 典型采用框架 | 构建期零运行时 JS | 原生行号 / 行高亮 | 保留词法着色的 Diff |
| :--- | :--- | :--- | :--- | :--- |
| **Shiki / Expressive Code** | **Nuxt Content v3**、VitePress、VuePress v2、Starlight、Fumadocs | ✅ 纯静态 CSS 变量 | ✅ `[file]{3,7-9}`（需配 CSS） | ✅ 内置 `transformerNotationDiff` |
| **Prism.js** | VuePress v1、Docusaurus、Eleventy (plugin) | ✅ 静态 Token 类名 | ✅ `{3,7-9}` / 魔法注释 | ⚠️ 需配 diff-highlight 插件 |
| **Pygments / Rouge** | MkDocs Material、Sphinx、Pelican、Jekyll | ✅ Python/Ruby 编译直出 | ✅ `hl_lines` / `emphasize-lines` | ⚠️ 仅标准 `diff` 块红绿 |
| **Chroma / Giallo / hljs** | Hugo (Go Chroma)、Zola (Rust Giallo)、mdBook (hljs) | ✅ (mdBook 为客户端 hljs) | ✅ Hugo/Zola 原生 `hl_lines` | ⚠️ 仅标准 `diff` 块红绿 |
