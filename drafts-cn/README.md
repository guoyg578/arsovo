# 中文草稿目录

这个目录**不会被 Astro 构建、不会被发布、不会被 Google 索引**。
你可以在这里自由用中文写初稿、记想法、贴参考资料。

## 工作流程

1. 在这里新建 `xxx.md`,用中文写完整的文章草稿
2. 把草稿复制给 Claude / ChatGPT,让它翻译成地道英文
3. 把英文版本保存到 `src/content/blog/xxx.md`,加上 frontmatter(title / description / pubDate / tags)
4. 发布

## Frontmatter 模板(复制到英文版顶部)

```yaml
---
title: "Your Article Title Here"
description: "One-sentence hook that appears in search results and social previews."
pubDate: 2026-04-21
tags: ["cursor", "review"]
---
```

## 翻译提示词模板(给 AI 用)

> 请把下面这篇中文技术文章翻译成地道的英文博客风格。
> 要求:
> 1. 保留代码块、链接、表格、列表格式不变
> 2. 技术术语用业界通用英文(Cursor / Claude Code / prompt / refactor 等不要硬翻)
> 3. 语气:专业但不枯燥,像经验丰富的工程师分享实战心得
> 4. 避免机翻腔,该用 "you" 的地方就用 "you",不要过度正式
> 5. 保留我的观点和措辞风格,不要加我没说的内容
>
> [粘贴中文原文]
