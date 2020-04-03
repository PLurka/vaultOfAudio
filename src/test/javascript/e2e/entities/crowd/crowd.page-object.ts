import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class CrowdComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-crowd div table .btn-danger'));
  title = element.all(by.css('jhi-crowd div h2#page-heading span')).first();

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

export class CrowdUpdatePage {
  pageTitle = element(by.id('jhi-crowd-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  crowdNameInput = element(by.id('field_crowdName'));
  crowdDescriptionInput = element(by.id('field_crowdDescription'));
  crowdPhotoInput = element(by.id('file_crowdPhoto'));
  userSelect = element(by.id('field_user'));
  acceptedSelect = element(by.id('field_accepted'));
  playlistSelect = element(by.id('field_playlist'));
  createdBySelect = element(by.id('field_createdBy'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setCrowdNameInput(crowdName) {
    await this.crowdNameInput.sendKeys(crowdName);
  }

  async getCrowdNameInput() {
    return await this.crowdNameInput.getAttribute('value');
  }

  async setCrowdDescriptionInput(crowdDescription) {
    await this.crowdDescriptionInput.sendKeys(crowdDescription);
  }

  async getCrowdDescriptionInput() {
    return await this.crowdDescriptionInput.getAttribute('value');
  }

  async setCrowdPhotoInput(crowdPhoto) {
    await this.crowdPhotoInput.sendKeys(crowdPhoto);
  }

  async getCrowdPhotoInput() {
    return await this.crowdPhotoInput.getAttribute('value');
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

  async acceptedSelectLastOption(timeout?: number) {
    await this.acceptedSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async acceptedSelectOption(option) {
    await this.acceptedSelect.sendKeys(option);
  }

  getAcceptedSelect(): ElementFinder {
    return this.acceptedSelect;
  }

  async getAcceptedSelectedOption() {
    return await this.acceptedSelect.element(by.css('option:checked')).getText();
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

  async createdBySelectLastOption(timeout?: number) {
    await this.createdBySelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async createdBySelectOption(option) {
    await this.createdBySelect.sendKeys(option);
  }

  getCreatedBySelect(): ElementFinder {
    return this.createdBySelect;
  }

  async getCreatedBySelectedOption() {
    return await this.createdBySelect.element(by.css('option:checked')).getText();
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

export class CrowdDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-crowd-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-crowd'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
