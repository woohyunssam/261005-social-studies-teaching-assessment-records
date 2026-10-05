import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
const browser=await chromium.launch({channel:'msedge',headless:true});
try {
 const page=await browser.newPage();await page.goto('http://127.0.0.1:3000/create');
 await page.locator('.type-options button').first().waitFor();
 assert.equal(await page.locator('input[type=radio]').count(),0);
 assert.equal(await page.locator('.type-options button').count(),6);
 for(const label of ['탐구 질문','Padlet 활동','자기평가 루브릭','과정중심평가','학생 데이터 추출','NEIS 평어']){
  await page.getByRole('button',{name:label,exact:true}).click();
  assert.equal(await page.locator('.prompt h3').textContent(),`${label} 프롬프트`);
  console.log(`${label}: 한 번 클릭 생성 확인`);
 }
} finally {await browser.close();}
