# BAZINGA's Blog

<https://caoyudong.com> 的源码。用 [Astro](https://astro.build) 生成静态页面，push 到 `master` 后由 GitHub Actions 自动构建并发布到 GitHub Pages。

## 写文章

在 `src/content/posts/` 新建一个 `.md` 文件：

```markdown
---
title: "文章标题"
date: 2026-11-03 20:00:00
tags: ["树莓派"]
slug: "url-里的名字"
---

正文……
```

- 文章地址是 `/年/月/日/slug/`，与旧 Hexo 站点的链接保持一致。
- 草稿加 `draft: true`，不会被发布。
- 图片放到 `public/image/`，正文里用 `![](/image/文件名.jpg)` 引用。建议先把长边缩到 1600px 以内。
- "关于"页面在 `src/content/pages/about.md`。

## 本地预览

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # 输出到 dist/
npm run check-links  # 检查站内链接和图片是否失效
```

## 目录

```text
src/content/posts/   文章（Markdown）
src/content/pages/   独立页面（关于）
src/pages/           路由：首页分页、文章、归档、标签、RSS
src/layouts/         页面框架
src/styles/          样式（自动跟随系统深色模式）
public/              原样复制的静态文件（CNAME、favicon、图片）
```

## 部署

`.github/workflows/deploy.yml`：push 到 `master` 时构建、检查链接并发布。
仓库 Settings → Pages → Build and deployment → Source 需要设为 **GitHub Actions**。
