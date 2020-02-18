import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class ListSongComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-list-song div table .btn-danger'));
  title = element.all(by.css('jhi-list-song div h2#page-heading span')).first();

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

export class ListSongUpdatePage {
  pageTitle = element(by.id('jhi-list-song-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  listIdSelect = element(by.id('field_listId'));
  songIdSelect = element(by.id('field_songId'));

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

  async songIdSelectLastOption(timeout?: number) {
    await this.songIdSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async songIdSelectOption(option) {
    await this.songIdSelect.sendKeys(option);
  }

  getSongIdSelect(): ElementFinder {
    return this.songIdSelect;
  }

  async getSongIdSelectedOption() {
    return await this.songIdSelect.element(by.css('option:checked')).getText();
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

export class ListSongDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-listSong-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-listSong'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
