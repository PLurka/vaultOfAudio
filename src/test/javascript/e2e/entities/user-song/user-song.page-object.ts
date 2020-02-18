import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class UserSongComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-user-song div table .btn-danger'));
  title = element.all(by.css('jhi-user-song div h2#page-heading span')).first();

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

export class UserSongUpdatePage {
  pageTitle = element(by.id('jhi-user-song-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  songIdSelect = element(by.id('field_songId'));
  userIdSelect = element(by.id('field_userId'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
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

export class UserSongDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-userSong-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-userSong'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
