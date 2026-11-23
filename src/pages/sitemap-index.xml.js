import { canonical } from '../lib/catalog';
export function GET() {
  const now = '2026-02-23';
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap><loc>${canonical('/sitemap-tools.xml')}</loc><lastmod>${now}</lastmod></sitemap>
  <sitemap><loc>${canonical('/sitemap-categories.xml')}</loc><lastmod>${now}</lastmod></sitemap>
  <sitemap><loc>${canonical('/sitemap-alternatives.xml')}</loc><lastmod>${now}</lastmod></sitemap>
  <sitemap><loc>${canonical('/sitemap-compare.xml')}</loc><lastmod>${now}</lastmod></sitemap>
  <sitemap><loc>${canonical('/sitemap-stacks.xml')}</loc><lastmod>${now}</lastmod></sitemap>
</sitemapindex>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
