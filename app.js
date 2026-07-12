const projectsUrl = "content/projects.json";

const esc = (value = "") => String(value).replace(/[&<>'"]/g, (char) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
}[char]));

function header() {
  return `<header class="site-header grid-lines"><a href="index.html" class="site-name">YICHENG ZHU</a><nav><a href="index.html#work">WORK</a><a href="index.html#about">ABOUT</a><a href="index.html#contact">CONTACT</a></nav><span class="edition">PORTFOLIO / 2026</span></header>`;
}

function projectVisual(project) {
  if (project.cover) return `<img src="${esc(project.cover)}" alt="${esc(project.title)} 项目封面" />`;
  return `<div class="project-placeholder"><span>山</span><span>海</span><span>刑</span><span>天</span></div>`;
}

function projectCard(project, index) {
  return `<article class="project-card"><div class="project-index">${String(index + 1).padStart(2, "0")}.</div><div class="project-meta"><span>${esc(project.category)}</span><span>${esc(project.year)}</span></div><a class="project-visual" href="work.html?slug=${encodeURIComponent(project.slug)}">${projectVisual(project)}<span class="project-hover">ENTER PROJECT ↗</span></a><div class="project-copy"><div><p class="project-status">${esc(project.status)}</p><h3>${esc(project.title)}</h3><p class="project-title-en">${esc(project.titleEn)}</p></div><div class="project-summary"><p>${esc(project.summary)}</p><p>${esc(project.summaryEn)}</p><p class="project-role">ROLE · ${esc(project.role)}</p></div></div></article>`;
}

function renderHome(projects) {
  document.title = "竺亦成 · Film & AI Visual Portfolio";
  document.querySelector("#home").innerHTML = `${header()}<section class="hero grid-lines"><div class="hero-kicker">A FILM & AI VISUAL PORTFOLIO</div><div class="hero-number">00.</div><h1>PORTF<span class="blur-letter">O</span>LIO</h1><div class="hero-bottom"><div class="hero-subtitle">FROM PROMPT TO FILM</div><div class="hero-intro"><p>I am a digital media creator focused on AIGC filmmaking, cinematic storytelling and AI-driven visual production.</p><p>我是一名以 AIGC 影像创作为核心方向的数字媒体艺术创作者，关注电影叙事、人工生成图像与新媒体传播之间的关系。</p></div></div><a class="scroll-cue" href="#work">SCROLL TO EXPLORE ↓</a></section><section id="work" class="work-section"><div class="section-heading grid-lines"><p>01. SELECTED WORKS</p><h2>Film, AI Visual<br>& World Building</h2><span>SELECTED PROJECTS / 2025—2026</span></div><div class="project-list">${projects.map(projectCard).join("")}</div></section><section id="about" class="about-section grid-lines"><div class="about-heading"><p>02. PROLOGUE</p><h2>From Prompt<br>To Film</h2></div><figure class="portrait-frame"><img src="assets/portrait.jpg" alt="竺亦成黑白肖像"></figure><div class="about-copy"><p class="about-name">Yicheng Zhu <span>竺亦成</span></p><p>I am a digital media creator focused on AIGC filmmaking, cinematic storytelling and AI-driven visual production.</p><p>我是一名以 AIGC 影像创作为核心方向的数字媒体艺术创作者，关注电影叙事、人工生成图像与新媒体传播之间的关系。</p><div class="capabilities"><span>AIGC FILMMAKING</span><span>CREATIVE DIRECTION</span><span>STORYBOARD & PREVIS</span><span>GAME WORLD BUILDING</span><span>EDITING & SOUND</span></div></div><div class="experience-note"><span>ADDITIONAL PRACTICE</span><p>BILIBILI CONTENT OPERATION / FILM ANALYSIS / VISUAL CULTURE</p></div></section><section id="contact" class="contact-section grid-lines"><p>03. CONTACT</p><h2>LET’S CREATE<br>SOMETHING T<span class="blur-letter">O</span>GETHER.</h2><span class="contact-placeholder">CONTACT DETAILS / AVAILABLE SOON</span></section><footer class="site-footer"><span>© 2026 YICHENG ZHU</span><span>SELECTED WORKS UNDER ZAIVER STUDIO</span><a href="https://github.com/Zycie1019/zycie1019.github.io">GITHUB ↗</a></footer>`;
}

function renderDetail(projects, project) {
  document.title = `${project.title} · Yicheng Zhu`;
  const index = projects.findIndex((item) => item.slug === project.slug);
  const next = projects[(index + 1) % projects.length];
  const media = project.videoUrl ? `<video controls preload="metadata" poster="${esc(project.cover)}"><source src="${esc(project.videoUrl)}" type="video/mp4">您的浏览器暂不支持视频播放。</video>` : projectVisual(project);
  document.querySelector("#detail").innerHTML = `<main class="project-page"><header class="project-header"><a href="index.html">YICHENG ZHU</a><a href="index.html#work">← ALL WORKS</a><span>${esc(project.category)} / ${esc(project.year)}</span></header><section class="project-hero grid-lines"><div class="project-hero-number">PROJECT ${String(index + 1).padStart(2, "0")}</div><div class="project-hero-status">${esc(project.status)}</div><h1>${esc(project.title)}</h1><p class="project-hero-en">${esc(project.titleEn)}</p><div class="project-hero-copy"><p>${esc(project.summary)}</p><p>${esc(project.summaryEn)}</p></div><div class="project-hero-role">ROLE<br>${esc(project.role)}</div></section><section class="project-feature">${media}</section>${project.gallery.length ? `<section class="project-gallery"><div class="gallery-label">AIGC VISUAL DEVELOPMENT / PROJECT ARCHIVE</div>${project.gallery.map((image, i) => `<figure><img src="${esc(image)}" alt="${esc(project.title)} 项目视觉 ${i + 1}"></figure>`).join("")}</section>` : ""}<section class="next-project grid-lines"><p>NEXT PROJECT</p><a href="work.html?slug=${encodeURIComponent(next.slug)}">${esc(next.title)} <span>${esc(next.titleEn)}</span> →</a></section></main>`;
}

fetch(projectsUrl).then((response) => response.json()).then((projects) => {
  const slug = new URLSearchParams(window.location.search).get("slug");
  if (document.querySelector("#detail")) {
    renderDetail(projects, projects.find((project) => project.slug === slug) || projects[0]);
  } else renderHome(projects);
}).catch(() => {
  document.body.innerHTML = "<p style='padding:40px;font-family:Arial'>Content could not be loaded.</p>";
});
