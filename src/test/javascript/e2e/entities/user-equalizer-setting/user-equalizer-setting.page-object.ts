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
  equalizerSettingSelect = element(by.id('field_equalizerSetting'));
  userSelect = element(by.id('field_user'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async equalizerSettingSelectLastOption(timeout?: number) {
    await this.equalizerSettingSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async equalizerSettingSelectOption(option) {
    await this.equalizerSettingSelect.sendKeys(option);
  }

  getEqualizerSettingSelect(): ElementFinder {
    return this.equalizerSettingSelect;
  }

  async getEqualizerSettingSelectedOption() {
    return await this.equalizerSettingSelect.element(by.css('option:checked')).getText();
  }

  async userSelectLastOption(timeout?: number) {
    await this.userSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async userSelectOption(option) {
    await this.userSelect.sendKeys(option);
  }

  getUserSelect(): ElementFinder {
    return this.userSelect;
  }

  async getUserSelectedOption() {
    return await this.userSelect.element(by.css('option:checked')).getText();
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
