import { test, expect } from "@playwright/test";
test("강의 이동, 진행 저장 및 초기화", async ({ page }) => {
  await page.goto("/lesson/1");
  await page.getByRole("button", { name: "이 단계 완료", exact: true }).click();
  await page.reload();
  await expect(
    page.getByRole("button", { name: "완료됨 · 취소" }),
  ).toBeVisible();
  await page.getByRole("button", { name: /진행 상황/ }).click();
  await expect(page.locator("progress")).toHaveAttribute("value", "1");
  await page.getByRole("button", { name: "진행 초기화" }).click();
  await expect(page.locator("progress")).toHaveAttribute("value", "0");
  for (let i = 2; i <= 7; i++) {
    await page.goto(`/lesson/${i}`);
    await expect(page.locator("h1")).toBeVisible();
  }
});
test("맞춤 프롬프트와 복사, 자료 검색", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/create");
  await page.getByLabel("교과", { exact: true }).fill("과학");
  await page.getByLabel("단원명", { exact: true }).fill("동물의 생활");
  await page
    .getByRole("button", { name: "탐구 질문", exact: true })
    .click();
  await expect(page.locator(".prompt-text")).toContainText("과학");
  await expect(page.locator(".prompt-text")).toContainText("동물의 생활");
  await page.getByRole("button", { name: "프롬프트 복사" }).click();
  await expect(page.getByRole("status")).toContainText("복사했습니다");
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain(
    "동물의 생활",
  );
  await page.getByLabel("학생 이름 또는 익명 기호").fill("학생 Z");
  await page
    .getByRole("button", { name: "학생 데이터 추출", exact: true })
    .click();
  await expect(page.locator(".prompt-text")).toContainText("학생 Z");
  await page.goto("/resources");
  await page.getByRole("button", { name: "템플릿", exact: true }).click();
  await expect(page.locator(".resource-card")).toHaveCount(1);
  await page.getByRole("textbox", { name: "자료 검색" }).fill("없는검색어");
  await expect(page.getByText("검색 결과가 없어요.")).toBeVisible();
});
test("활동 수정과 학생별 추출", async ({ page }) => {
  await page.goto("/lesson/2");
  await page.getByLabel("새 활동 아이디어").fill("우리 동네 인터뷰");
  await page.getByRole("button", { name: "추가", exact: true }).click();
  await expect(page.getByLabel("활동 4 내용 수정")).toHaveValue(
    "우리 동네 인터뷰",
  );
  await page.getByRole("button", { name: "활동 4 제거" }).click();
  await expect(page.getByLabel("활동 4 내용 수정")).toHaveCount(0);
  await page.goto("/lesson/7");
  await page.getByLabel("학생 이름 또는 익명 기호").fill("학생 A");
  await page
    .getByRole("button", { name: "프롬프트 만들기", exact: true })
    .click();
  await expect(page.locator(".prompt-text").first()).toContainText("학생 A");
});
test("모바일과 데스크톱 레이아웃", async ({ page }) => {
  for (const width of [390, 768, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const path of [
      "/",
      "/lesson/1",
      "/lesson/3",
      "/lesson/6",
      "/create",
      "/resources",
      "/books",
    ]) {
      await page.goto(path);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
        `${width}px ${path}`,
      ).toBeTruthy();
    }
    await page.goto("/");
    await page.screenshot({
      path: `test-results/home-${width}.png`,
      fullPage: true,
    });
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "메뉴 열기" }).click();
  await page
    .getByRole("navigation", { name: "주 메뉴" })
    .getByRole("link", { name: "내 수업 만들기" })
    .click();
  await expect(page).toHaveURL(/create/);
});
