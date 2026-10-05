import { chromium } from "@playwright/test";
const browser = await chromium.launch({ channel: "msedge", headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
await page.goto("http://127.0.0.1:3000", { waitUntil: "networkidle" });
console.log(await page.locator("h1").innerText());
await page.getByRole("button", { name: "변화", exact: true }).click();
await page
  .getByText("“사람들의 생활이 달라지면 동네의 모습은 어떻게 바뀔까?”")
  .waitFor();
await page.getByRole("button", { name: "04 실천적 질문 Action" }).click();
await page
  .getByText("우리 동네 공간 개선 제안서 만들기", { exact: false })
  .waitFor();
const downloadPromise = page.waitForEvent("download");
await page.getByRole("button", { name: "설계 노트 내려받기" }).click();
const download = await downloadPromise;
await page.evaluate(() => window.scrollTo(0, 0));
await page.screenshot({ path: "docs/inquiry-desktop.png", fullPage: true });
await page.setViewportSize({ width: 390, height: 844 });
await page.getByRole("button", { name: "메뉴 열기", exact: true }).click();
await page
  .getByRole("navigation", { name: "주 메뉴" })
  .getByRole("link", { name: "핵심 설계 원리" })
  .click();
const overflow = await page.evaluate(
  () => document.documentElement.scrollWidth > window.innerWidth,
);
await page.evaluate(() => window.scrollTo(0, 0));
await page.screenshot({ path: "docs/inquiry-mobile.png", fullPage: true });
console.log(
  JSON.stringify({
    errors,
    overflow,
    download: download.suggestedFilename(),
    title: await page.title(),
  }),
);
await browser.close();
if (errors.length || overflow) process.exit(1);
