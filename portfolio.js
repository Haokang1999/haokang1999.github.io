const state = { lang: "zh" };

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

function createPortfolioCard(work, lang) {
  const item = work[lang];
  const article = document.createElement("article");
  article.className = "portfolio-card";
  article.setAttribute("data-animate", "");
  article.innerHTML = `
    <a href="./artwork.html?id=${work.id}">
      <div class="portfolio-card-media tall">
        <img src="${encodeURI(work.image)}" alt="${item.title}" loading="lazy" />
      </div>
      <div class="portfolio-card-copy">
        <p class="portfolio-card-title">${item.title}</p>
        <p class="portfolio-card-meta">${item.medium} · ${item.dimensions} · ${item.year}</p>
      </div>
    </a>
  `;
  return article;
}

let observer;

function observeAnimated() {
  if (observer) observer.disconnect();
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("is-visible");
      });
    },
    { threshold: 0.12 }
  );
  $$("[data-animate]").forEach((node) => observer.observe(node));
}

function applyLanguage(lang) {
  state.lang = lang;
  const data = SITE_TEXT[lang];

  document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  document.title = lang === "zh" ? "作品集 | 傅豪康" : "Portfolio | Fu Haokang";
  $(".lang-toggle").textContent = lang === "zh" ? "EN" : "中";

  $$("[data-global-nav]").forEach((node) => {
    node.textContent = data.globalNav[node.dataset.globalNav];
  });
  $$("[data-portfolio-field]").forEach((node) => {
    node.textContent = data.portfolioPage[node.dataset.portfolioField];
  });

  const grid = $("#portfolio-page-grid");
  grid.innerHTML = "";
  ARTWORKS.forEach((work) => grid.appendChild(createPortfolioCard(work, lang)));
  observeAnimated();
}

function init() {
  $(".lang-toggle").addEventListener("click", () => {
    applyLanguage(state.lang === "zh" ? "en" : "zh");
  });
  applyLanguage("zh");
}

init();
