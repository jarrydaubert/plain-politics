import { resolve } from "node:path";
import { chromium } from "@playwright/test";

const baseUrl = process.env.BASE_URL ?? "http://127.0.0.1:3000";
const outputPath = resolve(process.cwd(), "public/og-image.png");
const browser = await chromium.launch({ headless: true });

try {
  const page = await browser.newPage({
    deviceScaleFactor: 1,
    viewport: { height: 630, width: 1200 }
  });

  await page.goto(baseUrl, { waitUntil: "networkidle" });
  await page.evaluate(() => {
    document.body.innerHTML = `
      <main class="og-card">
        <div class="og-rule"></div>
        <div class="og-brand">
          <img alt="" height="74" src="/plain-politics-mark.svg" width="74" />
          <span>Plain Politics<span class="og-stop">.</span></span>
        </div>
        <div class="og-content">
          <p class="og-kicker">UK POLITICS &middot; PUBLIC RECORDS &middot; PLAIN ENGLISH</p>
          <h1>British politics,<br />without the fog<span class="og-stop">.</span></h1>
          <p class="og-lede">Find your MP, decode the words, and see what Parliament did today.</p>
          <p class="og-receipt">plainpolitics.co.uk</p>
        </div>
      </main>
    `;

    const style = document.createElement("style");
    style.textContent = `
      * { box-sizing: border-box; }
      html, body { width: 1200px; height: 630px; margin: 0; overflow: hidden; }
      body { background: #071f3a; color: #f8fafc; }
      .og-card {
        position: relative;
        width: 1200px;
        height: 630px;
        padding: 56px 72px 58px;
        background: #071f3a;
      }
      .og-rule {
        position: absolute;
        inset: 0 0 auto;
        height: 6px;
        background: #e4425c;
      }
      .og-brand {
        display: flex;
        align-items: center;
        gap: 20px;
        color: #f8fafc;
        font-family: var(--font-literata), Georgia, serif;
        font-size: 38px;
        font-weight: 600;
      }
      .og-brand img { border-radius: 16px; }
      .og-content { margin-top: 48px; max-width: 1000px; }
      .og-kicker {
        margin: 0 0 20px;
        color: #9db0c7;
        font-family: var(--font-plex-mono), monospace;
        font-size: 18px;
        font-weight: 600;
        letter-spacing: 0;
      }
      h1 {
        margin: 0;
        color: #f8fafc;
        font-family: var(--font-literata), Georgia, serif;
        font-size: 76px;
        font-weight: 600;
        letter-spacing: 0;
        line-height: 0.99;
      }
      .og-stop { color: #e4425c; }
      .og-lede {
        margin: 28px 0 0;
        color: #9db0c7;
        font-family: var(--font-atkinson), system-ui, sans-serif;
        font-size: 27px;
        line-height: 1.35;
      }
      .og-receipt {
        display: inline-flex;
        margin: 30px 0 0;
        padding: 10px 14px;
        border: 1px solid rgba(248, 250, 252, 0.16);
        border-radius: 6px;
        color: #8bd3ff;
        background: #0d2942;
        font-family: var(--font-plex-mono), monospace;
        font-size: 18px;
        font-weight: 600;
      }
    `;
    document.head.append(style);
  });

  await page.locator(".og-card img").waitFor({ state: "visible" });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: outputPath });
} finally {
  await browser.close();
}
