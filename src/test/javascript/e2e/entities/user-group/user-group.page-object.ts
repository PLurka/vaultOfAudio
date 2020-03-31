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
  createdByInput = element(by.id('field_createdBy'));
  groupAcceptedInput = element(by.id('field_groupAccepted'));
  userAcceptedInput = element(by.id('field_userAccepted'));
  groupSelect = element(by.id('field_group'));
  userSelect = element(by.id('field_user'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  getCreatedByInput(timeout?: number) {
    return this.createdByInput;
  }
  getGroupAcceptedInput(timeout?: number) {
    return this.groupAcceptedInput;
  }
  getUserAcceptedInput(timeout?: number) {
    return this.userAcceptedInput;
  }

  async groupSelectLastOption(timeout?: number) {
    await this.groupSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async groupSelectOption(option) {
    await this.groupSelect.sendKeys(option);
  }

  getGroupSelect(): ElementFinder {
    return this.groupSelect;
  }

  async getGroupSelectedOption() {
    return await this.groupSelect.element(by.css('option:checked')).getText();
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
