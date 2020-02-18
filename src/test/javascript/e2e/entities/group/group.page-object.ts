import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class GroupComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-group div table .btn-danger'));
  title = element.all(by.css('jhi-group div h2#page-heading span')).first();

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

export class GroupUpdatePage {
  pageTitle = element(by.id('jhi-group-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  groupIdInput = element(by.id('field_groupId'));
  groupNameInput = element(by.id('field_groupName'));
  groupDescriptionInput = element(by.id('field_groupDescription'));
  groupPhotoInput = element(by.id('file_groupPhoto'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setGroupIdInput(groupId) {
    await this.groupIdInput.sendKeys(groupId);
  }

  async getGroupIdInput() {
    return await this.groupIdInput.getAttribute('value');
  }

  async setGroupNameInput(groupName) {
    await this.groupNameInput.sendKeys(groupName);
  }

  async getGroupNameInput() {
    return await this.groupNameInput.getAttribute('value');
  }

  async setGroupDescriptionInput(groupDescription) {
    await this.groupDescriptionInput.sendKeys(groupDescription);
  }

  async getGroupDescriptionInput() {
    return await this.groupDescriptionInput.getAttribute('value');
  }

  async setGroupPhotoInput(groupPhoto) {
    await this.groupPhotoInput.sendKeys(groupPhoto);
  }

  async getGroupPhotoInput() {
    return await this.groupPhotoInput.getAttribute('value');
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

export class GroupDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-group-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-group'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
