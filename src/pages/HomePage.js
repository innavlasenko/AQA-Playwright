const { test, expect } = require("@playwright/test");

import { BasePage } from "./BasePage";
import { GaragePage } from "./GaragePage";
import { LogInPopUp } from "../components/LogInPopUp";

export class HomePage extends BasePage {
  constructor(page) {
    super(page, "/");
    this._header = this._page.locator(".header");
    this._guestLogInBtn = this._header.getByRole("button", {
      name: "Guest log in",
    });
    this._signInBtn = this._header.getByRole("button", {
      name: "Sign in",
    });
    this._loginPopUp = new LogInPopUp(this._page);
  }

  async loginAsGuest() {
    await this._guestLogInBtn.click();
    return new GaragePage(this._page);
  }

  async loginAsUser(login, password) {
    await this._signInBtn.click();
    await this._loginPopUp.login(login, password);
  }

  get header() {
    return this._header;
  }
}
