import { canonical } from '../lib/catalog';

export function GET() {
  const content = `# RevKit Robots Policy — Full Open Access for Web & AI Search Engines

User-agent: *
Allow: /
Allow: /alternatives/
Allow: /stacks/
Allow: /compare/
Allow: /tools/
Allow: /category/
Allow: /llms.txt
Allow: /llms-full.txt

# Googlebot & Bingbot (Primary Search Engines)
User-agent: Googlebot
Allow: /
Allow: /alternatives/
Allow: /stacks/
Allow: /compare/
Allow: /tools/
Allow: /category/
Allow: /llms.txt
Allow: /llms-full.txt

User-agent: Bingbot
Allow: /
Allow: /alternatives/
Allow: /stacks/
Allow: /compare/
Allow: /tools/
Allow: /category/
Allow: /llms.txt
Allow: /llms-full.txt

# OpenAI / ChatGPT / SearchGPT (Citations & Direct Answers)
User-agent: GPTBot
Allow: /
Allow: /alternatives/
Allow: /stacks/
Allow: /compare/
Allow: /tools/
Allow: /category/
Allow: /llms.txt
Allow: /llms-full.txt

User-agent: OAI-SearchBot
Allow: /
Allow: /alternatives/
Allow: /stacks/
Allow: /compare/
Allow: /tools/
Allow: /category/
Allow: /llms.txt
Allow: /llms-full.txt

User-agent: ChatGPT-User
Allow: /
Allow: /alternatives/
Allow: /stacks/
Allow: /compare/
Allow: /tools/
Allow: /category/
Allow: /llms.txt
Allow: /llms-full.txt

# Perplexity AI Search & Citations
User-agent: PerplexityBot
Allow: /
Allow: /alternatives/
Allow: /stacks/
Allow: /compare/
Allow: /tools/
Allow: /category/
Allow: /llms.txt
Allow: /llms-full.txt

# Anthropic Claude Search & Knowledge Graph
User-agent: ClaudeBot
Allow: /
Allow: /alternatives/
Allow: /stacks/
Allow: /compare/
Allow: /tools/
Allow: /category/
Allow: /llms.txt
Allow: /llms-full.txt

User-agent: anthropic-ai
Allow: /
Allow: /alternatives/
Allow: /stacks/
Allow: /compare/
Allow: /tools/
Allow: /category/
Allow: /llms.txt
Allow: /llms-full.txt

# Google Gemini & AI Overviews Grounding
User-agent: Google-Extended
Allow: /
Allow: /alternatives/
Allow: /stacks/
Allow: /compare/
Allow: /tools/
Allow: /category/
Allow: /llms.txt
Allow: /llms-full.txt

# Apple Intelligence (Siri, Spotlight & Safari AI Suggestions)
User-agent: Applebot-Extended
Allow: /
Allow: /alternatives/
Allow: /stacks/
Allow: /compare/
Allow: /tools/
Allow: /category/
Allow: /llms.txt
Allow: /llms-full.txt

# Meta AI & Llama Assistants
User-agent: Meta-ExternalAgent
Allow: /
Allow: /alternatives/
Allow: /stacks/
Allow: /compare/
Allow: /tools/
Allow: /category/
Allow: /llms.txt
Allow: /llms-full.txt

User-agent: Meta-ExternalFetcher
Allow: /
Allow: /alternatives/
Allow: /stacks/
Allow: /compare/
Allow: /tools/
Allow: /category/
Allow: /llms.txt
Allow: /llms-full.txt

# Enterprise AI (Cohere & Amazon)
User-agent: Cohere-ai
Allow: /
Allow: /alternatives/
Allow: /stacks/
Allow: /compare/
Allow: /tools/
Allow: /category/
Allow: /llms.txt
Allow: /llms-full.txt

User-agent: Amazonbot
Allow: /
Allow: /alternatives/
Allow: /stacks/
Allow: /compare/
Allow: /tools/
Allow: /category/
Allow: /llms.txt
Allow: /llms-full.txt

Sitemap: ${canonical('/sitemap-index.xml')}
Sitemap: ${canonical('/sitemap.xml')}
`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
