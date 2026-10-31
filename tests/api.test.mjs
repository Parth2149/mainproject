import test from 'node:test';
import assert from 'node:assert/strict';
import { onRequest } from '../functions/api/tools.js';
const request = (query = '', method = 'GET') => onRequest({ request: new Request(`https://revkit.online/api/tools${query}`, { method }) });
test('API searches actual tool records and excludes editorial placeholders', async () => {
  const response = request('?q=ghidra');
  assert.equal(response.status, 200);
  const data = await response.json();
  assert.ok(data.total >= 1);
  assert.equal(data.tools[0].name, 'Ghidra');
  assert.equal(data.tools[0].github, 'https://github.com/NationalSecurityAgency/ghidra');
});
test('filters combine, with independent pagination', async () => {
  const all = await request('?category=Android&platform=Windows&pricing=Free').json();
  const page = await request('?category=Android&platform=Windows&pricing=Free&limit=2&offset=1').json();
  assert.ok(all.total > 2);
  assert.equal(page.total, all.total);
  assert.deepEqual(page.tools, all.tools.slice(1,3));
  assert.ok(page.tools.every(tool => tool.category === 'Android' && tool.platforms.includes('Windows') && tool.pricing === 'Free'));
});
test('empty matches, invalid bounds, unsupported methods, and HEAD', async () => {
  assert.equal((await request('?q=no-such-tool-xyz').json()).total, 0);
  for (const query of ['?limit=0','?limit=101','?offset=-1','?offset=1.2','?limit=nope']) assert.equal(request(query).status, 400);
  assert.equal(request('', 'POST').status, 405);
  assert.equal(request('', 'HEAD').status, 200);
  assert.equal(await request('', 'HEAD').text(), '');
});
