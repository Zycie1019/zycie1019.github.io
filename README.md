# Yicheng Zhu Portfolio

This is the free static GitHub Pages version of the portfolio.

## Adding a new project

1. Upload the cover and gallery images into `assets/`.
2. Upload an MP4 video into `media/` (or use a public video URL).
3. Edit `content/projects.json` and add a project object.
4. Set `videoUrl` to a path such as `media/my-film.mp4`. For a Bilibili, YouTube, Vimeo, or other public page, set `videoPage` instead; clicking the cover will open that video page directly.
5. Commit the changes. GitHub Pages will publish the update automatically.

Example:

```json
{
  "slug": "my-film",
  "title": "我的新片",
  "titleEn": "MY NEW FILM",
  "category": "AIGC SHORT FILM",
  "year": "2026",
  "role": "DIRECTOR / EDITOR",
  "status": "NEW WORK",
  "summary": "项目简介。",
  "summaryEn": "A short description.",
  "cover": "assets/my-film-cover.jpg",
  "videoUrl": "",
  "videoPage": "https://www.bilibili.com/video/你的链接",
  "gallery": []
}
```

封面会显示悬停动效，点击后直接打开 `videoPage`；如果没有 `videoPage`，则进入作品详情页。页面还包含平滑转场、滚动显现、光标跟随和封面微视差。

GitHub Pages has no visual admin panel. Changes are made through the repository file editor.
