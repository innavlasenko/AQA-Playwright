const { test, expect } = require("@playwright/test");

export class Registration {
  constructor(modal) {
    this._modal = modal;
    this._inputFirstName = modal.locator("#signupName");
    this._inputLastName = modal.locator("#signupLastName");
    this._inputEmail = modal.locator("#signupEmail");
    this._inputPassword = modal.locator("#signupPassword");
    this._inputReEnterPassword = modal.locator("#signupRepeatPassword");
    this._registerBtn = modal.getByRole("button", { name: "Register" });
    this._errorMsg = modal.locator(".invalid-feedback");
  }
  get modal() {
    return this._modal;
  }
  get inputFirstName() {
    return this._inputFirstName;
  }

  get inputLastName() {
    return this._inputLastName;
  }

  get inputPassword() {
    return this._inputPassword;
  }

  get inputEmail() {
    return this._inputEmail;
  }

  get inputReEnterPassword() {
    return this._inputReEnterPassword;
  }

  get registerBtn() {
    return this._registerBtn;
  }

  get errorMsg() {
    return this._errorMsg;
  }
}
