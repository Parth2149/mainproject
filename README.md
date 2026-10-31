# RevKit.online

A light, responsive reverse engineering directory built with **Astro, React/JSX, and JavaScript**. Astro renders React components at build time, preserving full HTML and clean URLs without shipping the React runtime. The background uses a fine grid, hex bytes, assembly instructions, and a control-flow diagram in a light palette. Decorative elements are hidden from assistive technology; ambient motion respects reduced-motion preferences.

See [SEO.md](SEO.md) for implemented SEO improvements, automated checks, and post-deployment indexing steps.

## Run locally

Requires Node.js 22.23.4+ or Node 24.

```powershell
npm ci
npm run build
npm test
npm run dev
```

Open http://127.0.0.1:4321. `npm run preview` serves the production build. Astro dev serves the frontend and static JSON endpoint; it does not emulate Cloudflare Functions. To test the optional backend locally after building:

```powershell
npx wrangler pages dev dist
```

## Source structure

- `src/components/`: React JSX for the directory, cards, detail pages, comparisons, contribution form, header/footer, and background.
- `src/layouts/Layout.astro`: layout, SEO metadata, OpenGraph, JSON-LD, browser scripts.
- `src/pages/[...path].astro`: routes generated from the catalog.
- `src/lib/catalog.js`: validated seed data, routes, comparisons, alternatives ranking.
- `src/lib/search.js`: runtime-independent catalog matching.
- `functions/api/tools.js`: optional JavaScript backend for Cloudflare Pages.
- `public/assets/`: styles, small interaction scripts, favicon, and social image.
- `scripts/check.mjs`: generated-page, link, schema, sitemap, and page-size checks.
- `tests/api.test.mjs`: API filtering, pagination, and error handling.

## Content & contributions

`revkit-seed-data.json` remains the source of truth: 40 tools, 11 categories. The comparison placeholder is excluded from tool listings. No new tools or repository URLs were invented. Features fall back to the description; add a verified `features` array for richer details. Alternatives rank same-category entries first, then platform overlap and pricing. Sparse categories show related tools rather than direct substitutes.

`site.config.json` configures the canonical origin, actual public contribution repository URL, and comparison slug pairs. Add a pair to generate a comparison page. The IDA comparison uses IDA Free, the actual seed entry.

Set `repository` to your real public GitHub repository. The contribution form creates a JSON entry locally for a contributor to add to the tools array on a fork and submit via pull request. No data is uploaded or stored.

Review seed claims against upstream documentation before publication, particularly licenses, platform support, and edition restrictions. Repository URLs are preserved from the supplied data, not independently verified. Expansion to 150+ verified entries and tutorials is a separate editorial phase.

## Frontend & backend

The frontend works independently on GitHub Pages and Cloudflare Pages. All listings exist in initial HTML; JavaScript enhances search, shareable filter URLs, reset/empty states, and contribution generation. Static data is available at `/api/tools.json` on both hosts.

On Cloudflare Pages, the optional backend exposes:

```text
GET /api/tools?q=ghidra
GET /api/tools?category=Android&platform=Windows&pricing=Free&license=Apache-2.0&limit=10&offset=0
```

It returns `{ total, offset, limit, tools }`. Filters follow the seed dataset. `limit` ranges from 1–100; `offset` is nonnegative. HEAD is supported; unsupported methods return 405 and invalid pagination returns 400. It reads bundled public data; no database or secrets are needed. GitHub Pages cannot execute the backend; use `/api/tools.json` there.

No content images or web fonts are required. If adding screenshots, compress them, specify dimensions, and use `loading="lazy"`. Tests enforce an uncompressed 100KB budget for each HTML page plus CSS, scripts, and favicon, excluding the social-crawler-only OpenGraph image.

## Deploy free: Cloudflare Pages

Run in PowerShell from this folder:

```powershell
npm ci
npm run build
npm test
npx wrangler login
npx wrangler pages project create revkit-online --production-branch main
npx wrangler pages deploy dist --project-name revkit-online --branch main
```

Pick another project name in both commands if unavailable. Deploy from the project root so Wrangler discovers `functions/`. Add `revkit.online` under Custom domains in the dashboard and follow DNS instructions. A CNAME file alone does not configure a Cloudflare custom domain. API requests use Cloudflare's applicable function quota; the static directory does not depend on the API.

For Git integration choose framework Astro, build command `npm run build`, output `dist`, and Node 22.23.4+ or 24. Git integration and Direct Upload are separate project setup paths.

References: [Direct Upload](https://developers.cloudflare.com/pages/get-started/direct-upload/), [Functions routing](https://developers.cloudflare.com/pages/functions/routing/).

## Deploy free: GitHub Pages

The included workflow installs locked dependencies, builds, tests, and deploys `dist` on pushes to `main`. Requires GitHub CLI and a public repository on GitHub Free. Replace `YOUR-USER` with your account. Skip creation if the repository exists and connect its remote instead.

```powershell
gh auth login
git add .
git commit -m "Build RevKit with Astro and React"
git branch -M main
gh repo create YOUR-USER/revkit.online --public --source . --remote origin --push
gh api --method POST repos/YOUR-USER/revkit.online/pages -f build_type=workflow
gh workflow run deploy.yml
```

If Pages exists, use Settings > Pages > Source > GitHub Actions instead of the POST command. The initial push already triggers deployment. Set custom domain `revkit.online` in Settings > Pages, configure DNS, and enable HTTPS after certificate issuance. The CNAME file does not configure the domain with Actions deployment.

For a project URL (`https://YOUR-USER.github.io/revkit.online/`) before attaching the domain, change `url` in `site.config.json` to `https://YOUR-USER.github.io`, set `BASE_PATH: /revkit.online` in workflow build and test environments, and remove `public/CNAME` for that deployment. Locally:

```powershell
$env:BASE_PATH = '/revkit.online'
npm run build
npm test
Remove-Item Env:BASE_PATH
```

For the custom domain, use an empty base path and canonical origin `https://revkit.online`, then rebuild. See [GitHub custom domain instructions](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site) for current DNS values.
