const state = { lang: "zh" };

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

function getArtwork() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  return ARTWORKS.find((item) => item.id === id) || ARTWORKS[0];
}

function renderArtwork(lang) {
  const data = SITE_TEXT[lang];
  const work = getArtwork();
  const item = work[lang];

  document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  document.title = `${item.title} | Fu Haokang`;
  $(".lang-toggle").textContent = lang === "zh" ? "EN" : "中";

  $$("[data-global-nav]").forEach((node) => {
    node.textContent = data.globalNav[node.dataset.globalNav];
  });
  $$("[data-artwork-field]").forEach((node) => {
    node.textContent = data.artworkPage[node.dataset.artworkField];
  });

  const img = $("#artwork-image");
  img.src = encodeURI(work.image);
  img.alt = item.title;

  $("#artwork-title").textContent = item.title;
  $("#artwork-meta").textContent = `${item.medium} · ${item.dimensions} · ${item.year}`;
  $("#artwork-description").textContent = item.description;

  $("#artwork-details").innerHTML = `
    <div class="detail-row"><span>${data.artworkPage.medium}</span><strong>${item.medium}</strong></div>
    <div class="detail-row"><span>${data.artworkPage.dimensions}</span><strong>${item.dimensions}</strong></div>
    <div class="detail-row"><span>${data.artworkPage.year}</span><strong>${item.year}</strong></div>
    <div class="detail-row"><span>${data.artworkPage.series}</span><strong>${item.series}</strong></div>
  `;
}

function init() {
  $(".lang-toggle").addEventListener("click", () => {
    state.lang = state.lang === "zh" ? "en" : "zh";
    renderArtwork(state.lang);
  });
  renderArtwork("zh");
}

init();
