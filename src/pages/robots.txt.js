import { canonical } from '../lib/catalog';

export function GET() {
  const content = `# RevKit Robots Policy — Full Open Access for Web & AI Search
# Allow all standard search engines
User-agent: *
Allow: /

# OpenAI / ChatGPT / SearchGPT (Citations & Direct Answers)
User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

# Perplexity AI Search & Citations
User-agent: PerplexityBot
Allow: /

# Anthropic Claude Search & Knowledge Graph
User-agent: ClaudeBot
Allow: /

User-agent: anthropic-ai
Allow: /

# Google Gemini & AI Overviews Grounding
User-agent: Google-Extended
Allow: /

# Apple Intelligence (Siri, Spotlight & Safari AI Suggestions)
User-agent: Applebot-Extended
Allow: /

# Meta AI & Open Llama Assistants
User-agent: Meta-ExternalAgent
Allow: /

User-agent: Meta-ExternalFetcher
Allow: /

# Enterprise AI (Cohere & Amazon)
User-agent: Cohere-ai
Allow: /

User-agent: Amazonbot
Allow: /

Sitemap: ${canonical('/sitemap.xml')}
`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
