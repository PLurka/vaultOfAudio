import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class SongComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-song div table .btn-danger'));
  title = element.all(by.css('jhi-song div h2#page-heading span')).first();

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

export class SongUpdatePage {
  pageTitle = element(by.id('jhi-song-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  songIdInput = element(by.id('field_songId'));
  songNameInput = element(by.id('field_songName'));
  lyricsInput = element(by.id('field_lyrics'));
  authorsInput = element(by.id('field_authors'));
  songMetadataInput = element(by.id('field_songMetadata'));
  yearInput = element(by.id('field_year'));
  songDescriptionInput = element(by.id('field_songDescription'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setSongIdInput(songId) {
    await this.songIdInput.sendKeys(songId);
  }

  async getSongIdInput() {
    return await this.songIdInput.getAttribute('value');
  }

  async setSongNameInput(songName) {
    await this.songNameInput.sendKeys(songName);
  }

  async getSongNameInput() {
    return await this.songNameInput.getAttribute('value');
  }

  async setLyricsInput(lyrics) {
    await this.lyricsInput.sendKeys(lyrics);
  }

  async getLyricsInput() {
    return await this.lyricsInput.getAttribute('value');
  }

  async setAuthorsInput(authors) {
    await this.authorsInput.sendKeys(authors);
  }

  async getAuthorsInput() {
    return await this.authorsInput.getAttribute('value');
  }

  async setSongMetadataInput(songMetadata) {
    await this.songMetadataInput.sendKeys(songMetadata);
  }

  async getSongMetadataInput() {
    return await this.songMetadataInput.getAttribute('value');
  }

  async setYearInput(year) {
    await this.yearInput.sendKeys(year);
  }

  async getYearInput() {
    return await this.yearInput.getAttribute('value');
  }

  async setSongDescriptionInput(songDescription) {
    await this.songDescriptionInput.sendKeys(songDescription);
  }

  async getSongDescriptionInput() {
    return await this.songDescriptionInput.getAttribute('value');
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

export class SongDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-song-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-song'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
