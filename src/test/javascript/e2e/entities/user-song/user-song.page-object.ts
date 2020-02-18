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
  songSelect = element(by.id('field_song'));
  userSelect = element(by.id('field_user'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async songSelectLastOption(timeout?: number) {
    await this.songSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async songSelectOption(option) {
    await this.songSelect.sendKeys(option);
  }

  getSongSelect(): ElementFinder {
    return this.songSelect;
  }

  async getSongSelectedOption() {
    return await this.songSelect.element(by.css('option:checked')).getText();
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
