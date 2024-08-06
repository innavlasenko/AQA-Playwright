const { test, expect } = require("@playwright/test");

export const userGaragePageTest = test.extend({
  userGaragePage: async ({ browser }, use) => {
    const pageFormStorage = await browser.newPage({
      storageState: "session-storage.json",
    });
    await use(pageFormStorage);
  },
});
