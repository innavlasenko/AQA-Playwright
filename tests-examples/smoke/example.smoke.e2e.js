const { test, expect } = require("@playwright/test");

test("has title", { tag: "@smoke" }, async ({ page }) => {
  await page.goto("/");
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Admin/);
});

test("get started link", { tag: "@smoke" }, async ({ page }) => {
  await page.goto("/");

  // Click the get started link.
  await page.getByRole("link", { name: "Get started" }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(
    page.getByRole("heading", { name: "Installation" })
  ).toBeVisible();
});
