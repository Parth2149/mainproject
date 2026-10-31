import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
import path from 'node:path';

// Keep the development/build tool from writing a telemetry profile outside the project.
const require = createRequire(import.meta.url);
const cli = path.join(path.dirname(require.resolve('astro/package.json')), require('astro/package.json').bin.astro);
const result = spawnSync(process.execPath, [cli, ...process.argv.slice(2)], {
  stdio: 'inherit',
  env: { ...process.env, ASTRO_TELEMETRY_DISABLED: '1' },
});
if (result.error) throw result.error;
process.exit(result.status ?? 1);
