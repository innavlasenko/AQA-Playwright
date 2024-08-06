import { userGaragePageTest as test } from "../../fixtures/userGaragePage";

test("log as user", async ({ userGaragePage }) => {
  await userGaragePage.goto("/");
  await await userGaragePage.pause();
});
