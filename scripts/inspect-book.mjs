import { chromium } from '@playwright/test';
const browser = await chromium.launch({channel:'msedge',headless:true});
const page = await browser.newPage();
for (const width of [1440,390]) {
  await page.setViewportSize({width,height:1000});
  await page.goto('http://127.0.0.1:3000');
  await page.locator('.hero-book-cover').waitFor();
  await page.locator('.hero-book-cover').evaluate(img => img.decode());
  console.log(await page.locator('.hero-book').evaluate(el => ({href:el.href,target:el.target,imageLoaded:el.querySelector('img').naturalWidth>0,overflow:document.documentElement.scrollWidth>innerWidth})));
  await page.screenshot({path:`test-results/book-${width}.png`});
}
await browser.close();
