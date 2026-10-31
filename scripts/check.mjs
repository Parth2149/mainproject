import {readFile, readdir, stat} from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
const root=path.resolve('dist');
const base=(process.env.BASE_PATH||'').replace(/\/$/,'');
async function walk(dir){return (await Promise.all((await readdir(dir,{withFileTypes:true})).map(e=>e.isDirectory()?walk(path.join(dir,e.name)):path.join(dir,e.name)))).flat();}
const pages=(await walk(root)).filter(f=>f.endsWith('.html'));
let largest={bytes:0,file:''};
const canonicalUrls=new Set();
const titles=new Set();
const descriptions=new Set();
const decode=value=>value.replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#(?:39|x27);/g,"'").replace(/&lt;/g,'<').replace(/&gt;/g,'>');
for(const file of pages){
 const html=await readFile(file,'utf8');
 assert.equal((html.match(/<h1[ >]/g)||[]).length,1,file+' needs one h1');
 assert.match(html,/<meta name="description"/,file);
 assert.match(html,/<link rel="canonical"/,file);
 const canonical=decode(html.match(/<link rel="canonical" href="([^"]+)"/)[1]);
 const title=decode(html.match(/<title>(.*?)<\/title>/s)[1]);
 const description=decode(html.match(/<meta name="description" content="([^"]+)"/)[1]);
 assert.ok(!canonicalUrls.has(canonical),`Duplicate canonical: ${canonical}`);
 assert.ok(!titles.has(title),`Duplicate title: ${title}`);
 assert.ok(!descriptions.has(description),`Duplicate description: ${description}`);
 assert.ok(description.length<=160,`Description too long: ${file}`);
 assert.equal(new URL(canonical).search,'',`Query parameters in canonical: ${file}`);
 canonicalUrls.add(canonical);titles.add(title);descriptions.add(description);
 assert.match(html,/<meta name="twitter:image"/);
 assert.match(html,/<meta property="og:image:alt"/);
 let bytes=Buffer.byteLength(html);
 const assets=new Set();
 for(const [,url] of html.matchAll(/(?:href|src)="([^"#]+)"/g)){
  if(!url.startsWith('/'))continue;
  assert.ok(!base||url.startsWith(base+'/'),`Missing base path: ${url}`);
  const relative=decodeURIComponent(url.slice(base.length)).split('?')[0];
  let target=path.join(root,relative);
  if(relative.endsWith('/')) target=path.join(target,'index.html');
  await stat(target).catch(()=>{throw Error(`Broken link in ${file}: ${url}`);});
  if(/\.(css|js|svg)$/.test(relative))assets.add(target);
 }
 for(const asset of assets)bytes+=(await stat(asset)).size;
 assert.ok(bytes<100000,`${file}: ${bytes} bytes exceeds 100KB budget`);
 if(bytes>largest.bytes)largest={bytes,file:path.relative(root,file)};
 for(const [,s] of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)){
  const schema=JSON.parse(s);
  assert.equal(schema['@context'],'https://schema.org');
  const graph=schema['@graph'];
  assert.ok(Array.isArray(graph),`Missing schema graph: ${file}`);
  const webpage=graph.find(node=>['WebPage','CollectionPage','AboutPage'].includes(node['@type']));
  assert.equal(webpage.url,canonical,`Schema URL differs from canonical: ${file}`);
  const breadcrumb=graph.find(node=>node['@type']==='BreadcrumbList');
  if(breadcrumb){
   assert.match(html,/aria-label="Breadcrumb"/,'Structured breadcrumbs must also be visible');
   assert.equal(breadcrumb.itemListElement.at(-1).item,canonical);
   breadcrumb.itemListElement.forEach((item,i)=>assert.equal(item.position,i+1));
  }
  const list=graph.find(node=>node['@type']==='ItemList');
  if(list)assert.equal(list.numberOfItems,list.itemListElement.length);
 }
 if(file.includes(path.sep+'tools'+path.sep)){
  assert.match(html,/SoftwareApplication/);
  assert.equal((html.match(/class="tool-card"/g)||[]).length,3,'Need three alternatives');
 }
}
const home=await readFile('dist/index.html','utf8');
const seed=JSON.parse(await readFile('revkit-seed-data.json','utf8'));
assert.equal((home.match(/class="tool-card"/g)||[]).length,seed.tools.filter(t=>t.category!=='Comparisons').length);
const sitemap=await readFile('dist/sitemap.xml','utf8');
assert.equal((sitemap.match(/<loc>/g)||[]).length,pages.length-1);
const sitemapUrls=[...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(([,url])=>decode(url));
assert.equal(new Set(sitemapUrls).size,sitemapUrls.length,'Duplicate sitemap entries');
for(const url of sitemapUrls)assert.ok(canonicalUrls.has(url),`Sitemap URL has no canonical page: ${url}`);
assert.ok(sitemapUrls.every(url=>!url.endsWith('/404.html')));
assert.match(await readFile('dist/404.html','utf8'),/content="noindex, follow"/);
const ogImage=await readFile('dist/assets/og.png');
assert.equal(ogImage.readUInt32BE(16),1200);assert.equal(ogImage.readUInt32BE(20),630);
console.log(`PASS: ${pages.length} HTML pages; internal links, unique SEO metadata, canonical URLs, schema graphs, breadcrumbs, three alternatives, sitemap, social image, and 100KB page budget.`);
console.log(`Largest cold-load page (HTML + CSS + JS + favicon): ${largest.bytes} bytes (${largest.file}). OG image excluded: social crawlers only.`);
