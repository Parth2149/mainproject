import { pages, canonical } from '../lib/catalog';
export function GET() {
  const escape = value => value.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  const compPages = pages.filter(p => p.kind === 'comparisons' || p.kind === 'comparison');
  const now = '2026-02-23';
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${compPages.map(p => `  <url><loc>${escape(canonical(p.route))}</loc><lastmod>${now}</lastmod><changefreq>weekly</changefreq></url>`).join('\n')}
</urlset>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
