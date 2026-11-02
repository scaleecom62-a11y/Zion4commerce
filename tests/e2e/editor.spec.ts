import { expect, test, type Page } from "@playwright/test";

// The editor in demo mode: everything works except saving and publishing.
const preview = (page: Page) => page.frameLocator('iframe[title="Page preview"]');

test.beforeEach(async ({ page }) => {
  await page.goto("/admin");
  await expect(preview(page).locator("h1")).toBeVisible();
});

test("clicking the preview selects the field, and typing updates the page", async ({ page }) => {
  await preview(page).getByText("profit", { exact: true }).click();
  const field = page.getByRole("textbox", { name: "Headline line 2" });
  await expect(field).toBeFocused();
  await field.fill("margin");
  await expect(preview(page).locator("h1")).toHaveText(/grow on\s*margin/i);
  await page.keyboard.press("Control+z");
  await expect(preview(page).locator("h1")).toHaveText(/grow on\s*profit/i);
});

test("sections can be added, hidden and removed", async ({ page }) => {
  const sections = preview(page).locator("[data-section-id]");
  const before = await sections.count();
  await page.getByRole("button", { name: "+ Add section" }).click();
  await page.getByRole("button", { name: /^Text A heading/ }).click();
  await expect(sections).toHaveCount(before + 1);
  await page.getByRole("listitem").filter({ hasText: "Questions (bands)" }).hover();
  await page.getByRole("button", { name: "Hide Questions" }).click();
  await expect(sections).toHaveCount(before);
  page.once("dialog", (d) => d.accept());
  await page.getByRole("listitem").filter({ hasText: "One big figure" }).hover();
  await page.getByRole("button", { name: "Delete Revenue we manage" }).click();
  await expect(sections).toHaveCount(before - 1);
});

test("site colours change the preview", async ({ page }) => {
  await page.getByRole("tab", { name: "Site" }).click();
  await page.getByRole("button", { name: "Colours" }).click();
  await page.getByRole("textbox", { name: "Navy (logo outline)", exact: true }).fill("#123456");
  await expect
    .poll(() => preview(page).locator(".site").evaluate((el) => getComputedStyle(el).getPropertyValue("--c-navy").trim()))
    .toBe("#123456");
});

test("clicking the footer opens footer settings", async ({ page }) => {
  await preview(page).locator("footer").click({ position: { x: 20, y: 20 } });
  await expect(page.locator("[data-inspector] h2")).toHaveText("Footer");
});

test("preview never submits the real audit form", async ({ page }) => {
  await page.getByLabel("Page").selectOption("contact");
  const frame = preview(page);
  await frame.getByLabel("Your name").fill("Test");
  await frame.getByLabel("Work email").fill("test@example.com");
  await frame.getByRole("button", { name: "Send request" }).click();
  await expect(frame.getByText("Request received")).toHaveCount(0);
});
