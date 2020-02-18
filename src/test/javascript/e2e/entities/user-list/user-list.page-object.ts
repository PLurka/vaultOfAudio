import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class UserListComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-user-list div table .btn-danger'));
  title = element.all(by.css('jhi-user-list div h2#page-heading span')).first();

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

export class UserListUpdatePage {
  pageTitle = element(by.id('jhi-user-list-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  listIdSelect = element(by.id('field_listId'));
  userIdSelect = element(by.id('field_userId'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async listIdSelectLastOption(timeout?: number) {
    await this.listIdSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async listIdSelectOption(option) {
    await this.listIdSelect.sendKeys(option);
  }

  getListIdSelect(): ElementFinder {
    return this.listIdSelect;
  }

  async getListIdSelectedOption() {
    return await this.listIdSelect.element(by.css('option:checked')).getText();
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

export class UserListDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-userList-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-userList'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
