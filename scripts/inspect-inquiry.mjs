import { chromium } from "@playwright/test";
const b = await chromium.launch({ channel: "msedge", headless: true });
const p = await b.newPage({ viewport: { width: 390, height: 844 } });
await p.goto("http://127.0.0.1:3000");
console.log(
  await p.evaluate(() =>
    [...document.querySelectorAll("body *")]
      .map((e) => ({
        tag: e.tagName,
        cls: e.className,
        left: e.getBoundingClientRect().left,
        right: e.getBoundingClientRect().right,
      }))
      .filter((e) => e.right > 391 || e.left < 0),
  ),
);
await b.close();
