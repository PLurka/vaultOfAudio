import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class UserEqualizerSettingComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-user-equalizer-setting div table .btn-danger'));
  title = element.all(by.css('jhi-user-equalizer-setting div h2#page-heading span')).first();

  async clickOnCreateButton(timeout?: number) {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(timeout?: number) {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons() {
    return this.deleteButtons.count();
  }

  async getTitle() {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class UserEqualizerSettingUpdatePage {
  pageTitle = element(by.id('jhi-user-equalizer-setting-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  equalizerIdSelect = element(by.id('field_equalizerId'));
  userIdSelect = element(by.id('field_userId'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async equalizerIdSelectLastOption(timeout?: number) {
    await this.equalizerIdSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async equalizerIdSelectOption(option) {
    await this.equalizerIdSelect.sendKeys(option);
  }

  getEqualizerIdSelect(): ElementFinder {
    return this.equalizerIdSelect;
  }

  async getEqualizerIdSelectedOption() {
    return await this.equalizerIdSelect.element(by.css('option:checked')).getText();
  }

  async userIdSelectLastOption(timeout?: number) {
    await this.userIdSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async userIdSelectOption(option) {
    await this.userIdSelect.sendKeys(option);
  }

  getUserIdSelect(): ElementFinder {
    return this.userIdSelect;
  }

  async getUserIdSelectedOption() {
    return await this.userIdSelect.element(by.css('option:checked')).getText();
  }

  async save(timeout?: number) {
    await this.saveButton.click();
  }

  async cancel(timeout?: number) {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class UserEqualizerSettingDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-userEqualizerSetting-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-userEqualizerSetting'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
