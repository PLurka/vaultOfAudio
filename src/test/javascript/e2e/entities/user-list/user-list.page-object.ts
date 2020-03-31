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
  createdByInput = element(by.id('field_createdBy'));
  playlistSelect = element(by.id('field_playlist'));
  userSelect = element(by.id('field_user'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  getCreatedByInput(timeout?: number) {
    return this.createdByInput;
  }

  async playlistSelectLastOption(timeout?: number) {
    await this.playlistSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async playlistSelectOption(option) {
    await this.playlistSelect.sendKeys(option);
  }

  getPlaylistSelect(): ElementFinder {
    return this.playlistSelect;
  }

  async getPlaylistSelectedOption() {
    return await this.playlistSelect.element(by.css('option:checked')).getText();
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
