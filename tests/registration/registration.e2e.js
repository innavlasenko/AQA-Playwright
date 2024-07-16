const { test, expect } = require("@playwright/test");

test.describe("Registration_TEST", async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    const signInBtn = page.getByRole("button", { name: "Sign in" });
    const modal = page.locator(".modal-content");
    const registrationBtn = modal.getByRole("button", {
      name: "registration",
    });

    await signInBtn.click();
    await registrationBtn.click();
  });

  test("Registration positive scenario", async ({ page }) => {
    const modal = page.locator(".modal-content");
    const inputFirstName = modal.locator("#signupName");
    const inputLastName = modal.locator("#signupLastName");
    const inputEmail = modal.locator("#signupEmail");
    const inputPassword = modal.locator("#signupPassword");
    const inputReEnterPassword = modal.locator("#signupRepeatPassword");
    const registerBtn = modal.getByRole("button", { name: "Register" });

    await inputFirstName.fill("Sergii");
    await inputLastName.fill("Vlasenko");
    await inputEmail.fill("aqa-svlasenko@test.com");
    await inputPassword.fill("Vlas@0204");
    await inputReEnterPassword.fill("Vlas@0204");
    await registerBtn.click();
  });

  test("Registration negative scenario (1):Register Data is disabled", async ({
    page,
  }) => {
    const modal = page.locator(".modal-content");
    const inputFirstName = modal.locator("#signupName");
    const inputLastName = modal.locator("#signupLastName");
    const inputEmail = modal.locator("#signupEmail");
    const inputPassword = modal.locator("#signupPassword");
    const inputReEnterPassword = modal.locator("#signupRepeatPassword");
    const registerBtn = modal.getByRole("button", { name: "Register" });

    await inputFirstName.fill("Inna");
    await inputLastName.fill("Vlasenko");
    await inputEmail.fill("aqa-ivlasenko@test.com");
    await inputPassword.fill("Vlas@1007");
    await inputReEnterPassword.fill("Vlas@0806");
    await expect.soft(registerBtn).toBeDisabled();
  });

  test("Registration negative scenario (2):Passwords don't match", async ({
    page,
  }) => {
    const modal = page.locator(".modal-content");
    const inputPassword = modal.locator("#signupPassword");
    const inputReEnterPassword = modal.locator("#signupRepeatPassword");

    await inputPassword.fill("Peace@2024");
    await inputReEnterPassword.fill("Pe@ce2024");
    await inputReEnterPassword.blur();
    await expect
      .soft(modal.getByText("Passwords do not match"), "Passwords do not match")
      .toBeVisible();
    await expect
      .soft(modal.getByText("Passwords do not match"), "Passwords do not match")
      .toHaveCSS("border-color", "rgb(220, 53, 69)");
  });

  test("Registration negative scenario (3):E-mail is required", async ({
    page,
  }) => {
    const modal = page.locator(".modal-content");
    const inputEmail = modal.locator("#signupEmail");
    await inputEmail.fill("aqa-ivashchenko.com");
    await inputEmail.blur();
    await expect
      .soft(modal.getByText("Email is incorrect"), "Email is incorrect")
      .toBeVisible();
    await expect
      .soft(modal.getByText("Email is incorrect"), "Email is incorrect")
      .toHaveCSS("color", "rgb(220, 53, 69)");

    await inputEmail.clear();
    await inputEmail.fill("aqa-ivashchenko.test");
    await inputEmail.blur();
    await expect
      .soft(modal.getByText("Email is incorrect"), "Email is incorrect")
      .toBeVisible();
    await expect
      .soft(modal.getByText("Email is incorrect"), "Email is incorrect")
      .toHaveCSS("color", "rgb(220, 53, 69)");
  });

  test("Registration negative scenario (4): First name is required", async ({
    page,
  }) => {
    const modal = page.locator(".modal-content");
    const inputFirstName = modal.locator("#signupName");
    const errorMsg = modal.locator(".invalid-feedback");
    await inputFirstName.focus();
    await inputFirstName.blur();
    await expect
      .soft(errorMsg, 'Error "Name required" is shown')
      .toHaveText("Name required");
    await expect.soft(inputFirstName).toHaveClass(/is-invalid/gm);
    await expect
      .soft(inputFirstName, "Input with red border")
      .toHaveCSS("border-color", "rgb(220, 53, 69)");
  });

  test("Registration negative scenario (4): Last name is required", async ({
    page,
  }) => {
    const modal = page.locator(".modal-content");
    const inputLastName = modal.locator("#signupLastName");
    const errorMsg = modal.locator(".invalid-feedback");
    await inputLastName.focus();
    await inputLastName.blur();
    await expect
      .soft(errorMsg, 'Error "Last name required" is shown')
      .toHaveText("Last name required");
    await expect.soft(inputLastName).toHaveClass(/is-invalid/gm);
    await expect
      .soft(inputLastName, "Input with red border")
      .toHaveCSS("border-color", "rgb(220, 53, 69)");
  });

  test("Registration negative scenario (6): Password wrong data", async ({
    page,
  }) => {
    const modal = page.locator(".modal-content");
    const inputPassword = modal.locator("#signupPassword");
    const errorMsg = modal.locator(".invalid-feedback");
    await inputPassword.fill("Inna");
    await inputPassword.blur();
    await expect
      .soft(
        errorMsg,
        'Error "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"'
      )
      .toHaveText(
        "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
      );
    await expect.soft(inputPassword).toHaveClass(/is-invalid/gm);
  });
});
