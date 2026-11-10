import { expect, test } from "@playwright/test";

test("home page says what it is and leads to the audit form", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("h1")).toHaveText(/grow your marketplace sales, profitably/i);
  await expect(page.getByText("runs Amazon and TikTok Shop")).toBeVisible();
  await page.getByRole("link", { name: "Get a free audit" }).first().click();
  await expect(page).toHaveURL(/\/contact$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(/free audit/i);
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

test("audit form keeps what the visitor typed when a field is missing", async ({ page }) => {
  await page.goto("/contact");
  await page.getByLabel("Brand or company").fill("Acme Linen");
  await page.getByLabel("Work email").fill("owner@acme.example");
  await page.getByRole("button", { name: "Send request" }).click();
  await expect(page.getByText("Please enter your name.")).toBeVisible();
  await expect(page.getByLabel("Your name")).toBeFocused();
  await expect(page.getByLabel("Brand or company")).toHaveValue("Acme Linen");
  await expect(page.getByLabel("Work email")).toHaveValue("owner@acme.example");
});
