import { test, expect } from "@playwright/test";
import fs from "node:fs";
const original = JSON.parse(
  fs.readFileSync("src/data/original-prompts.json", "utf8"),
);
test("강의 원문 10종 표시와 실제 복사", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  const groups = {
    1: ["inquiry"],
    2: ["activity"],
    4: ["feedback"],
    6: [
      "selfAssessment",
      "selfAssessmentApp",
      "rubric",
      "evaluation",
      "mapRubric",
    ],
    7: ["extract", "record"],
  };
  for (const [step, keys] of Object.entries(groups)) {
    await page.goto(`/lesson/${step}`);
    for (const key of keys) {
      const prompt = page
        .locator(".prompt")
        .filter({ has: page.locator("pre").filter({ hasText: original[key] }) })
        .first();
      await expect(prompt.locator("pre")).toHaveText(original[key]);
      await prompt.getByRole("button", { name: "프롬프트 복사" }).click();
      expect((await page.evaluate(() => navigator.clipboard.readText())).replaceAll('\r\n','\n')).toBe(
        original[key],
      );
    }
  }
});
test("이름과 실제 활동 교체 시 원문 조건 보존", async ({ page }) => {
  await page.goto("/lesson/7");
  await page.getByLabel("학생 이름 또는 익명 기호").fill("학생 B");
  await page
    .getByLabel("도화지 그림 활동 내용", { exact: true })
    .fill("도서관을 크게 그리고 책을 읽던 경험을 표현함.");
  await page
    .getByRole("button", { name: "프롬프트 만들기", exact: true })
    .click();
  const text = await page.locator(".prompt pre").first().textContent();
  expect(text).toContain("학생 B");
  expect(text).toContain("도서관을 크게");
  expect(text).toContain("(예: 소방서/경찰서 관련 토론에 남긴 의견)");
  expect(text).not.toContain("태권도장");
  expect(text).not.toContain("지훈");
  await page.goto("/create");
  await page
    .getByRole("button", { name: "과정중심평가", exact: true })
    .click();
  expect(await page.locator(".prompt pre").textContent()).toContain(
    original.rubric,
  );
  await page
    .getByRole("button", { name: "자기평가 루브릭", exact: true })
    .click();
  expect(await page.locator(".prompt pre").textContent()).toContain(
    "'자기 평가 루브릭(기준표)'",
  );
});
