import { canonical } from '../lib/catalog';
export function GET() {
  return new Response(`User-agent: *\nAllow: /\nSitemap: ${canonical('/sitemap.xml')}\n`, { headers: { 'Content-Type': 'text/plain' } });
}
