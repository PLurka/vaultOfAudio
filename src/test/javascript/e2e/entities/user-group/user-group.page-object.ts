import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class UserGroupComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-user-group div table .btn-danger'));
  title = element.all(by.css('jhi-user-group div h2#page-heading span')).first();

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

export class UserGroupUpdatePage {
  pageTitle = element(by.id('jhi-user-group-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  groupIdSelect = element(by.id('field_groupId'));
  userIdSelect = element(by.id('field_userId'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async groupIdSelectLastOption(timeout?: number) {
    await this.groupIdSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async groupIdSelectOption(option) {
    await this.groupIdSelect.sendKeys(option);
  }

  getGroupIdSelect(): ElementFinder {
    return this.groupIdSelect;
  }

  async getGroupIdSelectedOption() {
    return await this.groupIdSelect.element(by.css('option:checked')).getText();
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

export class UserGroupDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-userGroup-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-userGroup'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
