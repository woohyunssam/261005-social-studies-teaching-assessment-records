import {chromium} from '@playwright/test';
import fs from 'node:fs';
import assert from 'node:assert/strict';
const original=JSON.parse(fs.readFileSync('src/data/original-prompts.json','utf8'));
const browser=await chromium.launch({channel:'msedge',headless:true});
try {
 const context=await browser.newContext({permissions:['clipboard-read','clipboard-write']});
 const page=await context.newPage();
 for(const [step,keys] of Object.entries({1:['inquiry'],2:['activity'],4:['feedback'],6:['selfAssessment','selfAssessmentApp','rubric','evaluation','mapRubric'],7:['extract','record']})){
  await page.goto(`http://127.0.0.1:3000/lesson/${step}`);
  await page.locator('.prompt').first().waitFor();
  for(const key of keys){
   const blocks=await page.locator('.prompt pre').allTextContents();
   const index=blocks.indexOf(original[key]);assert(index>=0,`원문 불일치: ${key}`);
   await page.locator('.prompt').nth(index).getByRole('button',{name:'프롬프트 복사'}).click();
   assert.equal((await page.evaluate(()=>navigator.clipboard.readText())).replaceAll('\r\n','\n'),original[key]);
   console.log(`${key}: 화면 및 복사 일치`);
  }
 }
 await page.getByLabel('학생 이름 또는 익명 기호').fill('학생 B');
 await page.getByLabel('도화지 그림 활동 내용',{exact:true}).fill('도서관을 크게 그리고 책을 읽던 경험을 표현함.');
 await page.getByRole('button',{name:'프롬프트 만들기',exact:true}).click();
 const extracted=await page.locator('.prompt pre').first().textContent();assert(extracted.includes('학생 B'));assert(extracted.includes('도서관을 크게'));assert(!extracted.includes('지훈'));assert(!extracted.includes('태권도장'));
 await page.goto('http://127.0.0.1:3000/create');
 await page.getByRole('button',{name:'과정중심평가',exact:true}).click();
 assert((await page.locator('.prompt pre').textContent()).includes(original.rubric));
 console.log('학생 이름·활동 교체 및 수업 생성 원문 보존 통과');
} finally {await browser.close();}
