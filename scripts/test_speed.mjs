import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import path from 'node:path';

const execFileAsync = promisify(execFile);
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

process.env.CHROME_PATH = CHROME_PATH;

async function runLighthouse(url, formFactor) {
  const isDesktop = formFactor === 'desktop';
  const args = [
    url,
    '--output=json',
    '--chrome-flags=--headless --no-sandbox --disable-gpu',
    '--only-categories=performance,accessibility,best-practices,seo',
    isDesktop ? '--preset=desktop' : '--form-factor=mobile',
    '--quiet'
  ];

  console.log(`Running Lighthouse for ${formFactor.toUpperCase()} on ${url}...`);
  try {
    const npxCmd = process.platform === 'win32' ? 'npx.cmd' : 'npx';
    const { stdout } = await execFileAsync(npxCmd, ['lighthouse', ...args], {
      shell: true,
      maxBuffer: 50 * 1024 * 1024,
      env: { ...process.env, CHROME_PATH }
    });
    const result = JSON.parse(stdout);
    const cats = result.categories;
    const audits = result.audits;

    return {
      scores: {
        performance: Math.round(cats.performance.score * 100),
        accessibility: Math.round(cats.accessibility.score * 100),
        bestPractices: Math.round(cats['best-practices'].score * 100),
        seo: Math.round(cats.seo.score * 100),
      },
      metrics: {
        FCP: audits['first-contentful-paint']?.displayValue,
        LCP: audits['largest-contentful-paint']?.displayValue,
        TBT: audits['total-blocking-time']?.displayValue,
        CLS: audits['cumulative-layout-shift']?.displayValue,
        SpeedIndex: audits['speed-index']?.displayValue,
      }
    };
  } catch (err) {
    return { error: err.message };
  }
}

async function main() {
  const url = process.argv[2] || 'https://revkit.online/';
  console.log('Testing target URL:', url);
  
  const mobile = await runLighthouse(url, 'mobile');
  const desktop = await runLighthouse(url, 'desktop');

  console.log('\n========================================');
  console.log('         LIGHTHOUSE AUDIT REPORT        ');
  console.log('========================================');
  console.log('TARGET:', url);
  console.log('\n[ MOBILE AUDIT ]');
  if (mobile.error) {
    console.error('Error:', mobile.error);
  } else {
    console.log('  Scores:');
    console.log('    Performance:    ', mobile.scores.performance, '/ 100');
    console.log('    Accessibility:  ', mobile.scores.accessibility, '/ 100');
    console.log('    Best Practices: ', mobile.scores.bestPractices, '/ 100');
    console.log('    SEO:            ', mobile.scores.seo, '/ 100');
    console.log('  Core Web Vitals:');
    console.log('    First Contentful Paint (FCP):  ', mobile.metrics.FCP);
    console.log('    Largest Contentful Paint (LCP):', mobile.metrics.LCP);
    console.log('    Total Blocking Time (TBT):     ', mobile.metrics.TBT);
    console.log('    Cumulative Layout Shift (CLS): ', mobile.metrics.CLS);
    console.log('    Speed Index:                   ', mobile.metrics.SpeedIndex);
  }

  console.log('\n[ DESKTOP AUDIT ]');
  if (desktop.error) {
    console.error('Error:', desktop.error);
  } else {
    console.log('  Scores:');
    console.log('    Performance:    ', desktop.scores.performance, '/ 100');
    console.log('    Accessibility:  ', desktop.scores.accessibility, '/ 100');
    console.log('    Best Practices: ', desktop.scores.bestPractices, '/ 100');
    console.log('    SEO:            ', desktop.scores.seo, '/ 100');
    console.log('  Core Web Vitals:');
    console.log('    First Contentful Paint (FCP):  ', desktop.metrics.FCP);
    console.log('    Largest Contentful Paint (LCP):', desktop.metrics.LCP);
    console.log('    Total Blocking Time (TBT):     ', desktop.metrics.TBT);
    console.log('    Cumulative Layout Shift (CLS): ', desktop.metrics.CLS);
    console.log('    Speed Index:                   ', desktop.metrics.SpeedIndex);
  }
  console.log('========================================\n');
}

main();
