const { test, expect } = require("@playwright/test");
import { GaragePage } from "../../src/pages/GaragePage";
import { HomePage } from "../../src/pages/HomePage";

//const login = process.env.APP_USER_EMAIL;
//const password = process.env.APP_USER_PASSWORD;

test.describe("Check storage", async () => {
  /*test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigate();
    await homePage.loginAsUser(login, password);
  });*/
  test("Create car", async ({ page }) => {
    const garagePage = new GaragePage(page);
    await garagePage.navigate();
    await garagePage.addCar("Porsche", "911", 12312);
    await page.pause();
  });
});
