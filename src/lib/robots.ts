import { SITE_URL } from "@/lib/seo";

export const ROBOTS_TXT = `# Plain Politics crawl policy
# Search and answer-engine discovery is allowed for public pages.
User-agent: *
Allow: /

# OpenAI search crawler for ChatGPT search results.
User-agent: OAI-SearchBot
Allow: /

# OpenAI user-triggered browsing requests.
User-agent: ChatGPT-User
Allow: /

# OpenAI training crawler. Keep disabled unless Plain Politics explicitly opts into training use.
User-agent: GPTBot
Disallow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;
