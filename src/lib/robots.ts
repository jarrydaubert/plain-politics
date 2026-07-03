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

# OpenAI training crawler. Review separately if the training policy changes.
User-agent: GPTBot
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;
