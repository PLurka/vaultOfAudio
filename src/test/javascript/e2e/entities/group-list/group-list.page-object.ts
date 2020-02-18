import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class GroupListComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-group-list div table .btn-danger'));
  title = element.all(by.css('jhi-group-list div h2#page-heading span')).first();

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

export class GroupListUpdatePage {
  pageTitle = element(by.id('jhi-group-list-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  groupIdSelect = element(by.id('field_groupId'));
  listIdSelect = element(by.id('field_listId'));

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

export class GroupListDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-groupList-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-groupList'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
