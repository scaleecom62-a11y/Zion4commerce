import { expect, test } from "@playwright/test";

test("home page says what it is and leads to the audit form", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("h1")).toHaveText(/grow on\s*profit/i);
  await expect(page.getByText("runs Amazon and TikTok Shop")).toBeVisible();
  await page.getByRole("link", { name: "Get a free audit" }).first().click();
  await expect(page).toHaveURL(/\/contact$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(/free audit/i);
});

test("TACoS calculator updates as numbers change", async ({ page }) => {
  await page.goto("/");
  const calc = page.locator("#calculator");
  await calc.getByLabel(/monthly sales/i).fill("100000");
  await calc.getByLabel(/monthly ad spend/i).fill("25000");
  await expect(calc.getByText("Your TACoS today:")).toContainText("25.0%");
  await expect(calc.locator(".calc__figure")).toHaveText(/\$10,000/);
});

test("audit form validates required fields", async ({ page }) => {
  await page.goto("/contact");
  await page.getByRole("button", { name: "Send request" }).click();
  await expect(page.getByText("Please enter your name.")).toBeVisible();
  await expect(page.getByText("Please enter a valid email address.")).toBeVisible();
});

test("old /connect link redirects and unknown pages are 404", async ({ page, request }) => {
  await page.goto("/connect");
  await expect(page).toHaveURL(/\/contact$/);
  const res = await request.get("/this-page-does-not-exist");
  expect(res.status()).toBe(404);
});
