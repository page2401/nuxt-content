---
title: "嵌套子页 B：多级子目录与侧边栏同步机制"
description: "实测 Nuxt Content v3 通过 .navigation.yml 与 queryCollectionNavigation 自动同步中文多级侧边栏。"
order: 6
---

# 嵌套子页 B：多级子目录与侧边栏同步机制

在纯 Markdown 母版仓库中，新增一篇子目录文档无需修改任何外部配置文件；而在 `@nuxt/content` (`3.17.0`) 中：

1. **新增文档零配置入库**：任何放入 `content/04-directory/nested/` 的 `.md` 文件都会自动编译进 SQLite `docs` 集合并出现在 `queryCollectionNavigation('docs')` 侧边栏与 `queryCollectionItemSurroundings` 前后翻页流中，不会沦为“孤岛页”。
2. **`.navigation.yml` 轻量接管分组名**：在 `nested/` 目录下放置极简 `.navigation.yml` 即可将英文目录名 `nested` 映射为中文标题《嵌套子页实测 (.navigation.yml)》——需要确保部署到 GitHub Pages 时根产物包含 `.nojekyll`，以免 `_nuxt/` 与 `__nuxt_content/` 下划线静态目录被 Jekyll 过滤。

- [返回上一篇：《嵌套子页 A：排序前缀与 URL 纯净度权衡》](/04-directory/nested/01-order-and-url)
- [返回《04. 目录结构与路由取舍》](/04-directory)
