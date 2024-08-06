const { test, expect } = require("@playwright/test");
import { HomePage } from "../src/pages/HomePage";

const login = process.env.APP_USER_EMAIL;
const password = process.env.APP_USER_PASSWORD;

export const loggedPageTest = test.extend({
  adminPage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await homePage.navigate();
    await homePage.loginAsUser(login, password);
    await page.getByRole("button", { name: "Add car" }).waitFor();
    await use(page);
  },
  guestPage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await homePage.navigate();
    await homePage.loginAsGuest();
    await page.getByRole("button", { name: "Add car" }).waitFor();
    await use(page);
  },
  storagePage: async ({ browser }, use) => {
    const pageFormStorage = await browser.newPage({
      storageState: "session-storage.json",
    });
    await use(pageFormStorage);
  },
});
