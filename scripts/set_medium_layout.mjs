import fs from 'node:fs';

const cssPath = 'public/assets/style.css';
let css = fs.readFileSync(cssPath, 'utf-8');

const marker = '/* ==========================================================================\n   COMPACT ABOVE-THE-FOLD LAYOUT';
const idx = css.indexOf(marker);

const mediumCSS = `
/* ==========================================================================
   PERFECT BALANCED MEDIUM LAYOUT (Natural breathing room & top cards visible)
   ========================================================================== */
.nav {
  height: 64px !important;
}
.hero {
  padding: 30px 0 18px !important;
  text-align: center !important;
}
.hero-kicker {
  font-size: 12px !important;
  font-weight: 600 !important;
  letter-spacing: 0.6px !important;
  margin-top: 0 !important;
  margin-bottom: 6px !important;
  opacity: 0.88;
}
.hero h1 {
  font-size: clamp(30px, 3.6vw, 42px) !important;
  letter-spacing: -1.3px !important;
  line-height: 1.18 !important;
  margin: 6px 0 12px !important;
  color: #3A0F34 !important;
}
.hero p {
  color: #4A2844 !important;
  font-size: 14.5px !important;
  line-height: 1.6 !important;
  margin: 0 auto 12px !important;
  max-width: 680px !important;
}
.hero-stats {
  display: flex !important;
  justify-content: center !important;
  gap: 18px !important;
  margin-top: 12px !important;
  margin-bottom: 0 !important;
  font-size: 11px !important;
}
.hero-stats b {
  font-size: 13px !important;
}
.hero-stats > span + span {
  padding-left: 18px !important;
  border-left: 1px solid #C9B8DB !important;
}
.hero-category-links {
  display: flex !important;
  gap: 8px !important;
  justify-content: center !important;
  flex-wrap: wrap !important;
  margin-top: 14px !important;
  margin-bottom: 0 !important;
}
.hero-category-links a {
  padding: 6px 13px !important;
  font-size: 11px !important;
  border-radius: 99px !important;
  font-weight: 600 !important;
}
.directory {
  padding-top: 12px !important;
  margin-top: 0 !important;
}
.directory-bar {
  margin-top: 4px !important;
  margin-bottom: 12px !important;
  display: flex !important;
  justify-content: space-between !important;
  align-items: flex-end !important;
}
.directory-bar .eyebrow {
  font-size: 9.5px !important;
  letter-spacing: 1.2px !important;
}
.directory-bar h2 {
  font-size: 19px !important;
  letter-spacing: -0.5px !important;
  margin: 4px 0 0 !important;
  color: #3A0F34 !important;
}
.directory-note {
  font-size: 11px !important;
}
.filters {
  padding: 14px 18px !important;
  border-radius: 12px !important;
}
.search {
  height: 46px !important;
  border-radius: 9px !important;
  padding: 0 14px !important;
}
.search input {
  font-size: 14px !important;
}
.filter-row {
  margin-top: 10px !important;
  gap: 10px !important;
}
.filter-row label {
  font-size: 11.5px !important;
}
.filter-row select {
  padding: 7px 11px !important;
  font-size: 12.5px !important;
  border-radius: 7px !important;
}
.filter-row .reset {
  font-size: 11px !important;
  padding: 7px 12px !important;
  border-radius: 7px !important;
}
.results-bar {
  margin: 12px 0 16px !important;
  font-size: 11px !important;
}
`;

if (idx !== -1) {
  css = css.substring(0, idx) + mediumCSS.trim() + '\n';
} else {
  css += '\n' + mediumCSS.trim() + '\n';
}

fs.writeFileSync(cssPath, css, 'utf-8');
console.log('Applied balanced medium layout in style.css');

// Bump Layout.astro to v=16
const layoutPath = 'src/layouts/Layout.astro';
let layout = fs.readFileSync(layoutPath, 'utf-8');
layout = layout.replace(/style\.css\?v=\d+/, 'style.css?v=16');
fs.writeFileSync(layoutPath, layout, 'utf-8');
console.log('Bumped style.css to v16 in Layout.astro');
