const { test, expect } = require("@playwright/test");
import { test as setup } from "@playwright/test";
import { HomePage } from "../../src/pages/HomePage";

const login = process.env.APP_USER_EMAIL;
const password = process.env.APP_USER_PASSWORD;

setup("Login", async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigate();
  await homePage.loginAsUser(login, password);
  await page.getByRole("button", { name: "Add car" }).waitFor();
  await page.context().storageState({ path: "session-storage.json" });
});
