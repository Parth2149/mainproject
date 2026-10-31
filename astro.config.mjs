import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import config from './site.config.json' with { type: 'json' };

export default defineConfig({
  site: config.url,
  base: process.env.BASE_PATH || '/',
  output: 'static',
  trailingSlash: 'always',
  integrations: [react()],
  build: { assets: '_astro' },
});
