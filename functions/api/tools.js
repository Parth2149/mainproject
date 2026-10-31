import seed from '../../revkit-seed-data.json' with { type: 'json' };
import { matchesTool } from '../../src/lib/search.js';

/** Optional Cloudflare Pages backend. The site itself also works without it. */
export function onRequest({ request }) {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    return Response.json({ error: 'Method not allowed' }, { status: 405, headers: { Allow: 'GET, HEAD' } });
  }
  const params = new URL(request.url).searchParams;
  const limit = Number(params.get('limit') || 40);
  const offset = Number(params.get('offset') || 0);
  if (!Number.isInteger(limit) || limit < 1 || limit > 100 || !Number.isSafeInteger(offset) || offset < 0) {
    return Response.json({ error: 'limit must be an integer from 1 to 100; offset must be a nonnegative safe integer.' }, { status: 400 });
  }
  const tools = seed.tools.filter(tool => tool.category !== 'Comparisons' && matchesTool(tool, Object.fromEntries(params)));
  const body = JSON.stringify({ total: tools.length, offset, limit, tools: tools.slice(offset, offset + limit) });
  return new Response(request.method === 'HEAD' ? null : body, { headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'public, max-age=300', 'X-Content-Type-Options': 'nosniff' } });
}
