import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class PlaylistComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-playlist div table .btn-danger'));
  title = element.all(by.css('jhi-playlist div h2#page-heading span')).first();

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

export class PlaylistUpdatePage {
  pageTitle = element(by.id('jhi-playlist-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  listNameInput = element(by.id('field_listName'));
  listDescriptionInput = element(by.id('field_listDescription'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setListNameInput(listName) {
    await this.listNameInput.sendKeys(listName);
  }

  async getListNameInput() {
    return await this.listNameInput.getAttribute('value');
  }

  async setListDescriptionInput(listDescription) {
    await this.listDescriptionInput.sendKeys(listDescription);
  }

  async getListDescriptionInput() {
    return await this.listDescriptionInput.getAttribute('value');
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

export class PlaylistDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-playlist-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-playlist'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
