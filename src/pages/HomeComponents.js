//Lesson 20. Codegen & POM in Playwright
const { test, expect } = require("@playwright/test");
import { BaseComponents } from "./BaseComponents";
import { Registration } from "./Registration";

export class HomeComponents extends BaseComponents {
  constructor(page) {
    super(page, "/");
    this._header = this._page.locator(".header");
    this._modal = this._page.locator(".modal-content");
    this._signInBtn = this._header.getByRole("button", { name: "Sign In" });
    this._registrationBtn = this._modal.getByRole("button", {
      name: "registration",
    });
  }
  async openRegistration() {
    await this._signInBtn.click();
    await this._registrationBtn.click();
    return new Registration(this._modal);
  }
}
