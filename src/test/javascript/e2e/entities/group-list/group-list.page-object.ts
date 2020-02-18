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
  groupSelect = element(by.id('field_group'));
  playlistSelect = element(by.id('field_playlist'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
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
