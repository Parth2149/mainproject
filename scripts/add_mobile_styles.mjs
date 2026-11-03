import fs from 'node:fs';

const responsiveCSS = `
/* ==========================================================================
   MOBILE & RESPONSIVE PERFECTION (iOS & Android)
   ========================================================================== */
html, body {
  overflow-x: hidden;
  width: 100%;
  -webkit-text-size-adjust: 100%;
}
@media (max-width: 960px) {
  .tool-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
    gap: 16px !important;
  }
  .detail {
    grid-template-columns: 1fr !important;
    gap: 32px !important;
    padding: 20px 0 50px !important;
  }
  .comparison-list {
    grid-template-columns: 1fr !important;
    gap: 16px !important;
  }
  .actions {
    flex-wrap: wrap;
  }
}
@media (max-width: 640px) {
  .shell {
    padding-left: max(16px, env(safe-area-inset-left)) !important;
    padding-right: max(16px, env(safe-area-inset-right)) !important;
    width: 100% !important;
    box-sizing: border-box !important;
  }
  header {
    padding-top: env(safe-area-inset-top);
  }
  .nav {
    height: auto !important;
    min-height: 56px !important;
    padding: 10px 0 !important;
    flex-direction: column !important;
    align-items: center !important;
    gap: 10px !important;
  }
  .nav .brand {
    font-size: 22px !important;
    gap: 8px !important;
  }
  .nav nav {
    width: 100% !important;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    flex-wrap: wrap !important;
    gap: 10px 14px !important;
    font-size: 12px !important;
  }
  .nav-about {
    display: inline-block !important;
  }
  .nav-submit {
    padding: 6px 12px !important;
    font-size: 11.5px !important;
    border-radius: 6px !important;
  }
  .hero {
    padding: 28px 0 20px !important;
  }
  .hero-kicker {
    font-size: 11px !important;
  }
  .hero h1 {
    font-size: clamp(26px, 7.5vw, 36px) !important;
    letter-spacing: -1px !important;
    line-height: 1.15 !important;
    margin: 14px 0 !important;
  }
  .hero br.desktop {
    display: none !important;
  }
  .hero p {
    font-size: 13.5px !important;
    line-height: 1.6 !important;
  }
  .hero-stats {
    flex-wrap: wrap !important;
    gap: 8px 14px !important;
    font-size: 10.5px !important;
  }
  .hero-stats > span + span {
    padding-left: 0 !important;
  }
  .hero-category-links {
    display: flex !important;
    flex-wrap: wrap !important;
    gap: 6px !important;
    margin-top: 18px !important;
  }
  .hero-category-links a {
    font-size: 10px !important;
    padding: 6px 9px !important;
  }
  .directory-bar {
    flex-direction: column !important;
    align-items: flex-start !important;
    gap: 8px !important;
  }
  .directory-note {
    display: inline-flex !important;
    font-size: 11px !important;
  }
  .search {
    height: 46px !important;
    padding: 0 12px !important;
  }
  .search input {
    font-size: 14px !important;
  }
  .search kbd {
    display: none !important;
  }
  .filter-row {
    display: grid !important;
    grid-template-columns: 1fr 1fr !important;
    gap: 10px !important;
    width: 100% !important;
  }
  .filter-row label {
    width: 100% !important;
    font-size: 11px !important;
    display: flex !important;
    flex-direction: column !important;
    gap: 5px !important;
  }
  .filter-row select {
    width: 100% !important;
    font-size: 13px !important;
    padding: 8px 10px !important;
    border-radius: 8px !important;
  }
  .filter-row .reset {
    grid-column: 1 / -1 !important;
    width: 100% !important;
    text-align: center !important;
    padding: 10px !important;
    margin-top: 2px !important;
    font-size: 12px !important;
    justify-content: center !important;
  }
  .tool-grid {
    grid-template-columns: 1fr !important;
    gap: 14px !important;
    width: 100% !important;
  }
  .tool-card {
    padding: 16px !important;
    width: 100% !important;
    box-sizing: border-box !important;
  }
  .card-replaces {
    font-size: 11px !important;
    max-width: 100% !important;
  }
  .detail {
    grid-template-columns: 1fr !important;
    gap: 24px !important;
    padding: 16px 0 40px !important;
  }
  .detail h1, .page-intro h1 {
    font-size: clamp(26px, 7vw, 36px) !important;
    letter-spacing: -1px !important;
    word-break: break-word !important;
  }
  .lead {
    font-size: 15px !important;
    line-height: 1.65 !important;
  }
  .actions {
    flex-direction: column !important;
    gap: 10px !important;
  }
  .actions .button {
    width: 100% !important;
    text-align: center !important;
    justify-content: center !important;
    box-sizing: border-box !important;
  }
  .metadata {
    padding: 18px !important;
    width: 100% !important;
    box-sizing: border-box !important;
  }
  .metadata dl {
    margin: 16px 0 !important;
  }
  .metadata dt {
    margin-top: 16px !important;
  }
  .comparison-list {
    grid-template-columns: 1fr !important;
    gap: 14px !important;
  }
  .table-wrap {
    overflow-x: auto !important;
    -webkit-overflow-scrolling: touch !important;
    width: 100% !important;
    margin: 14px 0 !important;
  }
  .table-wrap table {
    min-width: 480px !important;
    font-size: 12px !important;
  }
  td, th {
    padding: 12px 14px !important;
  }
  .contribute {
    flex-direction: column !important;
    align-items: flex-start !important;
    gap: 16px !important;
    padding: 22px 16px !important;
    border-radius: 14px !important;
  }
  .contribute h2 {
    font-size: 20px !important;
  }
  .contribute p {
    font-size: 13px !important;
  }
  .contribute .button {
    width: 100% !important;
    text-align: center !important;
    justify-content: center !important;
    box-sizing: border-box !important;
  }
  footer {
    flex-direction: column !important;
    align-items: center !important;
    text-align: center !important;
    gap: 12px !important;
    padding: 30px 16px max(24px, env(safe-area-inset-bottom)) !important;
    min-height: auto !important;
  }
  footer > span {
    margin: 0 !important;
  }
  .submit-layout {
    grid-template-columns: 1fr !important;
    gap: 20px !important;
  }
  .submission {
    padding: 20px 16px !important;
  }
  .submission .two-col {
    grid-template-columns: 1fr !important;
    gap: 14px !important;
  }
  .submission .button {
    width: 100% !important;
    text-align: center !important;
    justify-content: center !important;
  }
}
`;

const cssPath = 'public/assets/style.css';
let existing = fs.readFileSync(cssPath, 'utf-8');
// If not already appended:
if (!existing.includes('MOBILE & RESPONSIVE PERFECTION')) {
  fs.appendFileSync(cssPath, '\n' + responsiveCSS.trim() + '\n');
  console.log('Appended mobile responsive styles.');
} else {
  console.log('Styles already present.');
}
