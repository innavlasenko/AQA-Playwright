const { test, expect } = require("@playwright/test");
export class BaseComponent {
  constructor(page, container) {
    (this._page = page), (this._container = container);
  }
}
