import { test } from "@playwright/test";

export const userInfoTest = test.extend({
  userInfo: async ({ page }, use) => {
    const data = {
      email: "ivlasenko@test.com",
      pass: "Test@0509",
    };
    console.log("FIXTURE BEFORE");
    use(data);
    console.log("FIXTURE AFTER");
  },
});
