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
  playlistSelect = element(by.id('field_playlist'));
  songSelect = element(by.id('field_song'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
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
