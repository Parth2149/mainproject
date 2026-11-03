import fs from 'node:fs';

// 1. Update Directory.jsx to remove unnecessary break
const dirJsxPath = 'src/components/Directory.jsx';
let dirJsx = fs.readFileSync(dirJsxPath, 'utf-8');
dirJsx = dirJsx.replace('<br className="desktop"/> Discover decompilers', ' Discover decompilers');
fs.writeFileSync(dirJsxPath, dirJsx, 'utf-8');
console.log('Updated Directory.jsx');

// 2. Append compact layout CSS to public/assets/style.css
const cssPath = 'public/assets/style.css';
let css = fs.readFileSync(cssPath, 'utf-8');

const compactCSS = `
/* ==========================================================================
   COMPACT ABOVE-THE-FOLD LAYOUT (Immediate Product Visibility Without Scroll)
   ========================================================================== */
.hero {
  padding: 20px 0 12px !important;
  text-align: center;
}
.hero-kicker {
  font-size: 10.5px !important;
  letter-spacing: 0.5px !important;
  margin-bottom: 2px !important;
  opacity: 0.85;
}
.hero h1 {
  font-size: clamp(26px, 2.7vw, 36px) !important;
  letter-spacing: -1.2px !important;
  line-height: 1.14 !important;
  margin: 6px 0 8px !important;
  color: #3A0F34 !important;
}
.hero p {
  color: #4A2844 !important;
  font-size: 13.5px !important;
  line-height: 1.5 !important;
  margin: 0 auto 8px !important;
  max-width: 640px !important;
}
.hero-stats {
  display: flex !important;
  justify-content: center !important;
  gap: 16px !important;
  margin-top: 8px !important;
  font-size: 10.5px !important;
}
.hero-stats b {
  font-size: 12.5px !important;
}
.hero-stats > span + span {
  padding-left: 16px !important;
}
.hero-category-links {
  display: flex !important;
  gap: 6px !important;
  justify-content: center !important;
  flex-wrap: wrap !important;
  margin-top: 10px !important;
}
.hero-category-links a {
  padding: 4px 10px !important;
  font-size: 10px !important;
  border-radius: 99px !important;
}
.directory {
  padding-top: 10px !important;
}
.directory-bar {
  margin-bottom: 10px !important;
  display: flex !important;
  justify-content: space-between !important;
  align-items: flex-end !important;
}
.directory-bar .eyebrow {
  font-size: 9px !important;
  letter-spacing: 1px !important;
}
.directory-bar h2 {
  font-size: 17px !important;
  letter-spacing: -0.4px !important;
  margin: 2px 0 0 !important;
}
.directory-note {
  font-size: 11px !important;
}
.filters {
  padding: 10px 14px !important;
  border-radius: 10px !important;
}
.search {
  height: 42px !important;
  border-radius: 8px !important;
}
.filter-row {
  margin-top: 8px !important;
  gap: 8px !important;
}
.filter-row select {
  padding: 6px 10px !important;
  font-size: 12px !important;
}
.filter-row .reset {
  font-size: 11px !important;
  padding: 6px 10px !important;
}
.results-bar {
  margin: 8px 0 10px !important;
  font-size: 11px !important;
}
`;

if (!css.includes('COMPACT ABOVE-THE-FOLD LAYOUT')) {
  css += '\n' + compactCSS.trim() + '\n';
  fs.writeFileSync(cssPath, css, 'utf-8');
  console.log('Appended compact above-the-fold CSS');
} else {
  console.log('Compact CSS already present');
}

