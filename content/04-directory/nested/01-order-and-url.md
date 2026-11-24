---
title: "嵌套子页 A：排序前缀与 URL 纯净度权衡"
description: "实测 Nuxt Content v3 对 1.xxx.md 点号前缀剥离与 01-xxx.md 连字符前缀保留的路由行为差异。"
order: 5
---

# 嵌套子页 A：排序前缀与 URL 纯净度权衡

在母版目录 `docs/04-directory/nested/` 中，文件名使用 `01-order-and-url.md` 以保证在 Git 与代码编辑器中按阅读先后顺序排列。派生至 `@nuxt/content` (`3.17.0`) 时：

- 若采用 Nuxt Content 原生约定改写为 **点号前缀** `1.order-and-url.md`，框架内置的 `pathMetaTransformer` 会自动剥离 `1.` 并产出纯净 URL `/04-directory/nested/order-and-url`，同时 `queryCollectionNavigation` 默认按 `stem ASC` 保持先后顺序。
- 本基准子站为对齐全站路由矩阵保留了母版连字符文件名 `01-order-and-url.md`，并结合 `content.config.ts` 中定义的 `order` SQLite 列确保首页与各章节严格有序。

- [返回《04. 目录结构与路由取舍》](/04-directory)
- [下一篇：《嵌套子页 B：多级子目录与侧边栏同步机制》](/04-directory/nested/02-sidebar-sync)
