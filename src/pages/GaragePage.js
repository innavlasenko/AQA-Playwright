const { test, expect } = require("@playwright/test");
import { BasePage } from "./BasePage";
import { SideBarComponent } from "../components/SideBarComponent";

export class GaragePage extends BasePage {
  constructor(page) {
    super(page, "/panel/garage");
    this._addCarBtn = page.getByRole("button", { name: "Add car" });
    this._addCarModal = page.locator("app-add-car-modal");
    this._addCarBrandSelect = this._addCarModal.locator("#addCarBrand");
    this._addCarModelSelect = this._addCarModal.locator("#addCarModel");
    //(this._mileageInput = this._addCarModal.locator("#addCarMileage")),
    this._mileageInput = this._addCarModal.locator(
      'input[formcontrolname="mileage"]'
    );
    this._addBtn = this._addCarModal.getByRole("button", { name: "Add" });
    this._carItem = this._page.locator(".car-item");
    this._sideBar = new SideBarComponent(this._page);
  }

  async selectBrand(brand) {
    return this._addCarBrandSelect.selectOption(brand);
  }

  async selectModel(model) {
    return this._addCarModelSelect.selectOption(model);
  }

  async addCar(brand, model, mileage) {
    await this._addCarBtn.click();
    await this.selectBrand(brand);
    await this._addCarModelSelect.selectOption(model);
    await this._mileageInput.fill(mileage.toString());
    await this._addBtn.click();
  }

  get addCarBtn() {
    return this._addCarBtn;
  }

  get addCarModelSelect() {
    return this._addCarBrandSelect;
  }

  get mileageInput() {
    return this._mileageInput;
  }

  get addBtn() {
    return this._addBtn;
  }

  get carItem() {
    return this._carItem;
  }

  get sideBar() {
    return this._sideBar;
  }
}
