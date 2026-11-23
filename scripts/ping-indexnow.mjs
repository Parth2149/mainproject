import fs from 'node:fs';
import path from 'node:path';

const KEY = 'e8f49a37c15b4970a2f96e48bc72d1a3';
const HOST = 'revkit.online';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const DIST_DIR = path.resolve('dist');

async function main() {
  console.log('--- INDEXNOW AUTOMATED DISCOVERY PING ---');
  
  if (!fs.existsSync(DIST_DIR)) {
    console.warn('dist/ directory not found. Run build before pinging IndexNow.');
    return;
  }

  // Collect URLs from sitemap files in dist
  const urlSet = new Set();
  const sitemapFiles = fs.readdirSync(DIST_DIR).filter(f => f.startsWith('sitemap') && f.endsWith('.xml'));

  for (const file of sitemapFiles) {
    const content = fs.readFileSync(path.join(DIST_DIR, file), 'utf8');
    const matches = content.matchAll(/<loc>(https:\/\/[^<]+)<\/loc>/g);
    for (const match of matches) {
      const u = match[1];
      if (!u.endsWith('.xml')) {
        urlSet.add(u);
      }
    }
  }

  const urlList = Array.from(urlSet).slice(0, 10000); // IndexNow limit per submission
  console.log(`Discovered ${urlList.length} canonical URLs from sitemaps to submit to IndexNow.`);

  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: urlList
  };

  try {
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'User-Agent': 'RevKit-IndexNow-Bot/1.0'
      },
      body: JSON.stringify(payload)
    });

    if (res.status === 200 || res.status === 202) {
      console.log(`✓ IndexNow accepted submission (HTTP ${res.status}): ${urlList.length} URLs queued for instant Bing/ChatGPT search indexing.`);
    } else {
      console.log(`IndexNow responded with HTTP ${res.status}: ${await res.text()}`);
    }
  } catch (err) {
    console.warn(`IndexNow ping deferred (network/offline): ${err.message}`);
  }
}

main();
