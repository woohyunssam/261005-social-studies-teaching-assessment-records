import { chromium } from "@playwright/test";
const browser = await chromium.launch({ channel: "msedge", headless: true });
const page = await browser.newPage({ viewport: { width: 390, height: 900 } });
await page.goto("http://localhost:3000");
console.log(
  await page.evaluate(() => ({
    width: innerWidth,
    scroll: document.documentElement.scrollWidth,
    over: [...document.querySelectorAll("body *")]
      .filter((e) => e.getBoundingClientRect().right > innerWidth + 1)
      .map((e) => ({
        tag: e.tagName,
        cls: e.className,
        width: e.getBoundingClientRect().width,
        right: e.getBoundingClientRect().right,
      }))
      .slice(0, 25),
  })),
);
await page.screenshot({
  path: "test-results/mobile-debug.png",
  fullPage: true,
});
await browser.close();
