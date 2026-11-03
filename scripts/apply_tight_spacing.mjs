import fs from 'node:fs';

const cssPath = 'public/assets/style.css';
let css = fs.readFileSync(cssPath, 'utf-8');

const tightSpacingCSS = `
/* ==========================================================================
   ULTRA-TIGHT SPACING FIX (Remove all excessive top & middle gaps)
   ========================================================================== */
.nav {
  height: 58px !important;
}
.hero {
  padding-top: 4px !important;
  padding-bottom: 2px !important;
  margin-top: 0 !important;
  margin-bottom: 0 !important;
}
.hero-kicker {
  font-size: 10.5px !important;
  letter-spacing: 0.5px !important;
  margin-top: 0 !important;
  margin-bottom: 2px !important;
  opacity: 0.85;
}
.hero h1 {
  font-size: clamp(22px, 2.4vw, 32px) !important;
  letter-spacing: -1px !important;
  line-height: 1.12 !important;
  margin: 3px 0 6px !important;
  color: #3A0F34 !important;
}
.hero p {
  color: #4A2844 !important;
  font-size: 13px !important;
  line-height: 1.45 !important;
  margin: 0 auto 6px !important;
  max-width: 620px !important;
}
.hero-stats {
  display: flex !important;
  justify-content: center !important;
  gap: 14px !important;
  margin-top: 6px !important;
  margin-bottom: 0 !important;
  font-size: 10.5px !important;
}
.hero-stats b {
  font-size: 12px !important;
}
.hero-stats > span + span {
  padding-left: 14px !important;
}
.hero-category-links {
  display: flex !important;
  gap: 5px !important;
  justify-content: center !important;
  flex-wrap: wrap !important;
  margin-top: 6px !important;
  margin-bottom: 0 !important;
}
.hero-category-links a {
  padding: 3px 9px !important;
  font-size: 10px !important;
  border-radius: 99px !important;
}
.directory {
  padding-top: 4px !important;
  margin-top: 0 !important;
}
.directory-bar {
  margin-top: 4px !important;
  margin-bottom: 6px !important;
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
}
.directory-bar .eyebrow {
  font-size: 8.5px !important;
  letter-spacing: 1px !important;
}
.directory-bar h2 {
  font-size: 15px !important;
  letter-spacing: -0.3px !important;
  margin: 0 !important;
  line-height: 1.2 !important;
}
.directory-note {
  font-size: 10.5px !important;
}
.filters {
  padding: 8px 12px !important;
  border-radius: 8px !important;
}
.search {
  height: 38px !important;
  border-radius: 6px !important;
}
.filter-row {
  margin-top: 6px !important;
  gap: 6px !important;
}
.filter-row label {
  font-size: 10.5px !important;
}
.filter-row select {
  padding: 4px 8px !important;
  font-size: 11.5px !important;
}
.filter-row .reset {
  font-size: 10.5px !important;
  padding: 4px 8px !important;
}
.results-bar {
  margin: 6px 0 8px !important;
  font-size: 10px !important;
}
`;

css += '\n' + tightSpacingCSS.trim() + '\n';
fs.writeFileSync(cssPath, css, 'utf-8');
console.log('Appended ultra-tight spacing CSS.');

// Bump Layout.astro to v=15
const layoutPath = 'src/layouts/Layout.astro';
let layout = fs.readFileSync(layoutPath, 'utf-8');
layout = layout.replace(/style\.css\?v=\d+/, 'style.css?v=15');
fs.writeFileSync(layoutPath, layout, 'utf-8');
console.log('Bumped style.css to v15 in Layout.astro.');
