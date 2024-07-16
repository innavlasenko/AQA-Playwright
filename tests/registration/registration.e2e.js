const { test, expect } = require("@playwright/test");
import { HomeComponents } from "../../src/pages/HomeComponents";
import { Registration } from "../../src/pages/Registration";

test.describe("Registration_TEST", () => {
  let registrationprocedure = Registration;

  test.beforeEach(async ({ page }) => {
    const newPage = new HomeComponents(page);
    await newPage.navigate();
    registrationprocedure = await newPage.openRegistration();
  });

  /*test("Registration positive scenario", async ({ page }) => {
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
*/
  test("Registration negative scenario (1):Register Data is disabled", async () => {
    /*const modal = page.locator(".modal-content");
    const inputFirstName = modal.locator("#signupName");
    const inputLastName = modal.locator("#signupLastName");
    const inputEmail = modal.locator("#signupEmail");
    const inputPassword = modal.locator("#signupPassword");
    const inputReEnterPassword = modal.locator("#signupRepeatPassword");
    const registerBtn = modal.getByRole("button", { name: "Register" });*/

    await registrationprocedure.inputFirstName.fill("Inna");
    await registrationprocedure.inputLastName.fill("Vlasenko");
    await registrationprocedure.inputEmail.fill("aqa-ivlasenko@test.com");
    await registrationprocedure.inputPassword.fill("Vlas@1007");
    await registrationprocedure.inputReEnterPassword.fill("Vlas@0806");
    await expect.soft(registrationprocedure.registerBtn).toBeDisabled();
  });

  test("Registration negative scenario (2):Passwords don't match", async () => {
    /*const modal = page.locator(".modal-content");
    const inputPassword = modal.locator("#signupPassword");
    const inputReEnterPassword = modal.locator("#signupRepeatPassword");*/

    await registrationprocedure.inputPassword.fill("Peace@2024");
    await registrationprocedure.inputReEnterPassword.fill("Pe@ce2024");
    await registrationprocedure.inputReEnterPassword.blur();
    await expect
      .soft(
        registrationprocedure.modal.getByText("Passwords do not match"),
        "Passwords do not match"
      )
      .toBeVisible();
    await expect
      .soft(
        registrationprocedure.modal.getByText("Passwords do not match"),
        "Passwords do not match"
      )
      .toHaveCSS("border-color", "rgb(220, 53, 69)");
  });

  test("Registration negative scenario (3):E-mail is required", async () => {
    /*const modal = page.locator(".modal-content");
    const inputEmail = modal.locator("#signupEmail");*/
    await registrationprocedure.inputEmail.fill("aqa-ivashchenko.com");
    await registrationprocedure.inputEmail.blur();
    await expect
      .soft(
        registrationprocedure.modal.getByText("Email is incorrect"),
        "Email is incorrect"
      )
      .toBeVisible();
    await expect
      .soft(
        registrationprocedure.modal.getByText("Email is incorrect"),
        "Email is incorrect"
      )
      .toHaveCSS("color", "rgb(220, 53, 69)");

    await registrationprocedure.inputEmail.clear();
    await registrationprocedure.inputEmail.fill("aqa-ivashchenko.test");
    await registrationprocedure.inputEmail.blur();
    await expect
      .soft(
        registrationprocedure.modal.getByText("Email is incorrect"),
        "Email is incorrect"
      )
      .toBeVisible();
    await expect
      .soft(
        registrationprocedure.modal.getByText("Email is incorrect"),
        "Email is incorrect"
      )
      .toHaveCSS("color", "rgb(220, 53, 69)");
  });

  test("Registration negative scenario (4): First name is required", async () => {
    /*const modal = page.locator(".modal-content");
    const inputFirstName = modal.locator("#signupName");
    const errorMsg = modal.locator(".invalid-feedback");*/
    await registrationprocedure.inputFirstName.focus();
    await registrationprocedure.inputFirstName.blur();
    await expect
      .soft(registrationprocedure.errorMsg, 'Error "Name required" is shown')
      .toHaveText("Name required");
    await expect
      .soft(registrationprocedure.inputFirstName)
      .toHaveClass(/is-invalid/gm);
    await expect
      .soft(registrationprocedure.inputFirstName, "Input with red border")
      .toHaveCSS("border-color", "rgb(220, 53, 69)");
  });

  test("Registration negative scenario (5): Last name is required", async () => {
    /*const modal = page.locator(".modal-content");
    const inputLastName = modal.locator("#signupLastName");
    const errorMsg = modal.locator(".invalid-feedback");*/
    await registrationprocedure.inputLastName.focus();
    await registrationprocedure.inputLastName.blur();
    await expect
      .soft(
        registrationprocedure.errorMsg,
        'Error "Last name required" is shown'
      )
      .toHaveText("Last name required");
    await expect
      .soft(registrationprocedure.inputLastName)
      .toHaveClass(/is-invalid/gm);
    await expect
      .soft(registrationprocedure.inputLastName, "Input with red border")
      .toHaveCSS("border-color", "rgb(220, 53, 69)");
  });

  test("Registration negative scenario (6): Password wrong data", async () => {
    /*const modal = page.locator(".modal-content");
    const inputPassword = modal.locator("#signupPassword");
    const errorMsg = modal.locator(".invalid-feedback");*/
    await registrationprocedure.inputPassword.fill("Inna");
    await registrationprocedure.inputPassword.blur();
    await expect
      .soft(
        registrationprocedure.errorMsg,
        'Error "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"'
      )
      .toHaveText(
        "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
      );
    await expect
      .soft(registrationprocedure.inputPassword)
      .toHaveClass(/is-invalid/gm);
  });
});
