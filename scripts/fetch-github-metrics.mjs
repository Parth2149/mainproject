import fs from 'node:fs';
import path from 'node:path';

const CACHE_FILE = path.resolve('scripts/github-metrics-cache.json');
const SEED_FILE = path.resolve('revkit-seed-data.json');

const seed = JSON.parse(fs.readFileSync(SEED_FILE, 'utf8'));

// Closed-source and freeware tools that must NEVER have stars
const CLOSED_SOURCE_OR_FREEWARE = new Set([
  'obsidian', 'davinci-resolve', 'ida-free', 'burp-suite', 'photopea',
  'binary-ninja', 'charles-proxy', 'fiddler', 'pdf24-creator', 'cerbero-suite',
  'pdf-stream-dumper', 'cff-explorer', 'dotpeek', 'gda', 'hopper-disassembler',
  'ida-pro', 'intel-pin', 'jeb-decompiler', 'ollydbg', 'pestudio',
  'process-explorer', 'trid', 'windbg', 'procmon'
]);

const CLOSED_LICENSES = new Set(['Proprietary', 'Freeware', 'Commercial', 'Closed Source']);

let cache = {};
if (fs.existsSync(CACHE_FILE)) {
  try {
    const raw = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'));
    // Purge any closed-source / synthetic entries from previous runs
    for (const [key, val] of Object.entries(raw)) {
      if (val && typeof val.stars === 'number' && !val.synthetic && val.verified) {
        cache[key.toLowerCase()] = val;
      }
    }
  } catch (err) {
    cache = {};
  }
}

const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN || '';
const headers = {
  'User-Agent': 'RevKit-Metrics-Engine/2.0',
  'Accept': 'application/vnd.github.v3+json'
};
if (token) {
  headers['Authorization'] = `token ${token}`;
}

async function fetchRepoMetrics(repoKey) {
  try {
    const res = await fetch(`https://api.github.com/repos/${repoKey}`, { headers });
    if (res.status === 403 || res.status === 429) {
      console.warn(`GitHub API Rate limit reached when requesting ${repoKey}. Stopping batch.`);
      return { rateLimited: true };
    }
    if (!res.ok) {
      console.warn(`Repo ${repoKey} returned status ${res.status}. Skipping.`);
      return null;
    }
    const data = await res.json();
    const pushed = data.pushed_at ? new Date(data.pushed_at) : null;
    const daysSincePush = pushed ? Math.floor((Date.now() - pushed.getTime()) / (1000 * 60 * 60 * 24)) : 365;
    
    const lastCommitDate = pushed ? pushed.toISOString().split('T')[0] : '2026-01-01';
    const maintenanceStatus = data.archived ? 'Archived' : (daysSincePush <= 365 ? 'Active' : (daysSincePush <= 730 ? 'Stable' : 'Archived'));

    return {
      stars: data.stargazers_count,
      lastCommit: lastCommitDate,
      last_commit_date: lastCommitDate,
      issues: data.open_issues_count || 0,
      status: maintenanceStatus,
      maintenance_status: maintenanceStatus,
      latestRelease: data.default_branch || 'main',
      verified: true,
      synthetic: false
    };
  } catch (err) {
    console.error(`Error fetching ${repoKey}:`, err.message);
    return null;
  }
}

async function main() {
  const toolsToFetch = [];
  
  for (const tool of seed.tools) {
    if (tool.category === 'Comparisons') continue;
    const slug = tool.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    if (CLOSED_SOURCE_OR_FREEWARE.has(slug) || CLOSED_LICENSES.has(tool.license) || tool.pricing === 'Paid') {
      continue;
    }
    if (!tool.github || !tool.github.startsWith('https://github.com/')) continue;
    
    try {
      const url = new URL(tool.github);
      const parts = url.pathname.slice(1).split('/').filter(Boolean);
      if (parts.length >= 2 && !['orgs', 'topics', 'features'].includes(parts[0].toLowerCase())) {
        const repoKey = `${parts[0]}/${parts[1]}`.toLowerCase();
        if (!cache[repoKey]) {
          toolsToFetch.push(repoKey);
        }
      }
    } catch (e) {}
  }

  console.log(`Tools available to fetch from GitHub API: ${toolsToFetch.length}. Cached valid repos: ${Object.keys(cache).length}`);

  // Fetch as many as permitted without blowing unauthenticated rate limits
  let fetchedCount = 0;
  for (const repoKey of toolsToFetch) {
    if (!token && fetchedCount >= 45) {
      console.log('Stopping unauthenticated batch at 45 requests to preserve API quota.');
      break;
    }
    console.log(`Fetching real GitHub metrics for [${repoKey}]...`);
    const metrics = await fetchRepoMetrics(repoKey);
    if (metrics && metrics.rateLimited) {
      break;
    }
    if (metrics && typeof metrics.stars === 'number') {
      cache[repoKey] = metrics;
      fetchedCount++;
    }
    // Small delay to be courteous to GitHub API
    await new Promise(r => setTimeout(r, 200));
  }

  // Ensure no closed-source entries survived in cache
  for (const tool of seed.tools) {
    const slug = tool.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    if (CLOSED_SOURCE_OR_FREEWARE.has(slug) || CLOSED_LICENSES.has(tool.license) || tool.pricing === 'Paid') {
      if (tool.github) {
        try {
          const url = new URL(tool.github);
          const parts = url.pathname.slice(1).split('/').filter(Boolean);
          if (parts.length >= 2) {
            delete cache[`${parts[0]}/${parts[1]}`.toLowerCase()];
          }
        } catch (e) {}
      }
    }
  }

  fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2) + '\n', 'utf8');
  console.log(`GitHub Metrics Cache updated with REAL data: ${Object.keys(cache).length} repos cached (${fetchedCount} newly fetched).`);
}

main();
