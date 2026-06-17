const state = { lang: "zh" };

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

function createTimelineItem(item) {
  const article = document.createElement("article");
  article.className = "timeline-item";
  article.setAttribute("data-animate", "");
  article.innerHTML = `
    <div class="timeline-head">
      <div>
        <p class="timeline-title">${item.title}</p>
        <p class="timeline-subtitle">${item.subtitle}</p>
      </div>
      <span class="timeline-period">${item.period}</span>
    </div>
    <p class="timeline-body">${item.body}</p>
  `;
  return article;
}

function createStackItem(item) {
  const article = document.createElement("article");
  article.className = "stack-item";
  article.setAttribute("data-animate", "");
  article.innerHTML = `<h4>${item.title}</h4><p>${item.body}</p>`;
  return article;
}

function createPortfolioCard(work, lang) {
  const item = work[lang];
  const article = document.createElement("article");
  article.className = "portfolio-card";
  article.setAttribute("data-animate", "");
  article.innerHTML = `
    <a href="./artwork.html?id=${work.id}">
      <div class="portfolio-card-media">
        <img src="${encodeURI(work.image)}" alt="${item.title}" loading="lazy" />
      </div>
      <div class="portfolio-card-copy">
        <p class="portfolio-card-title">${item.title}</p>
        <p class="portfolio-card-meta">${item.medium} · ${item.dimensions}</p>
      </div>
    </a>
  `;
  return article;
}

function renderFacts(items) {
  const list = $("#facts-list");
  list.innerHTML = "";
  items.forEach(([label, value]) => {
    const li = document.createElement("li");
    li.innerHTML = `<span class="fact-label">${label}</span><span class="fact-value">${value}</span>`;
    list.appendChild(li);
  });
}

function renderTimeline(selector, items) {
  const list = $(selector);
  list.innerHTML = "";
  items.forEach((item) => list.appendChild(createTimelineItem(item)));
}

function renderStack(selector, items) {
  const list = $(selector);
  list.innerHTML = "";
  items.forEach((item) => list.appendChild(createStackItem(item)));
}

function renderTags(selector, items) {
  const list = $(selector);
  list.innerHTML = "";
  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    list.appendChild(li);
  });
}

function renderPortfolioPreview(lang) {
  const container = $("#portfolio-preview");
  container.innerHTML = "";
  ARTWORKS.slice(0, 6).forEach((work) => container.appendChild(createPortfolioCard(work, lang)));
}

function applyLanguage(lang) {
  state.lang = lang;
  const data = SITE_TEXT[lang];

  document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  document.title = lang === "zh" ? "傅豪康 | Fu Haokang" : "Fu Haokang | Portfolio";
  $(".lang-toggle").textContent = lang === "zh" ? "EN" : "中";

  $$("[data-field]").forEach((node) => {
    node.textContent = data[node.dataset.field];
  });

  $$("[data-nav]").forEach((node) => {
    node.textContent = data.nav[node.dataset.nav];
  });

  renderFacts(data.facts);
  renderTimeline("#education-list", data.education);
  renderStack("#publications-list", data.publications);
  renderStack("#projects-list", data.projects);
  renderTags("#affiliations-list", data.affiliations);
  renderTags("#skills-list", data.skills);
  renderPortfolioPreview(lang);
  renderTimeline("#exhibitions-list", data.exhibitions);

  const email = "814317574@qq.com";
  const phone = "18908835572";
  $("#email-link").href = `mailto:${email}`;
  $("#email-link").textContent = `${data.emailLabel}: ${email}`;
  $("#phone-link").href = `tel:${phone}`;
  $("#phone-link").textContent = `${data.phoneLabel}: ${phone}`;

  observeAnimated();
}

let observer;

function observeAnimated() {
  if (observer) observer.disconnect();
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    },
    { threshold: 0.16 }
  );

  $$("[data-animate]").forEach((node) => observer.observe(node));
}

function init() {
  $$("section.panel, .hero-card, .quickfacts li, .portrait-card").forEach((node) => {
    node.setAttribute("data-animate", "");
  });

  $(".lang-toggle").addEventListener("click", () => {
    applyLanguage(state.lang === "zh" ? "en" : "zh");
  });

  applyLanguage("zh");
}

init();
