import fs from 'node:fs';

const filePath = 'src/layouts/Layout.astro';
let content = fs.readFileSync(filePath, 'utf-8');

const target = '<head>';
const gtmTag = `<head>
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtm.js?id=GTM-TXZQLP2R"></script>
    <script is:inline>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
    </script>`;

if (!content.includes('GTM-TXZQLP2R')) {
  content = content.replace(target, gtmTag);
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log('GTM tag added successfully.');
} else {
  console.log('GTM tag already present.');
}

