import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class EqualizerSettingComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-equalizer-setting div table .btn-danger'));
  title = element.all(by.css('jhi-equalizer-setting div h2#page-heading span')).first();

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

export class EqualizerSettingUpdatePage {
  pageTitle = element(by.id('jhi-equalizer-setting-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  equalizerNameInput = element(by.id('field_equalizerName'));
  firstInput = element(by.id('field_first'));
  secondInput = element(by.id('field_second'));
  thirdInput = element(by.id('field_third'));
  fourthInput = element(by.id('field_fourth'));
  fifthInput = element(by.id('field_fifth'));
  sixthInput = element(by.id('field_sixth'));
  seventhInput = element(by.id('field_seventh'));
  eightInput = element(by.id('field_eight'));
  ninthInput = element(by.id('field_ninth'));
  tenthInput = element(by.id('field_tenth'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setEqualizerNameInput(equalizerName) {
    await this.equalizerNameInput.sendKeys(equalizerName);
  }

  async getEqualizerNameInput() {
    return await this.equalizerNameInput.getAttribute('value');
  }

  async setFirstInput(first) {
    await this.firstInput.sendKeys(first);
  }

  async getFirstInput() {
    return await this.firstInput.getAttribute('value');
  }

  async setSecondInput(second) {
    await this.secondInput.sendKeys(second);
  }

  async getSecondInput() {
    return await this.secondInput.getAttribute('value');
  }

  async setThirdInput(third) {
    await this.thirdInput.sendKeys(third);
  }

  async getThirdInput() {
    return await this.thirdInput.getAttribute('value');
  }

  async setFourthInput(fourth) {
    await this.fourthInput.sendKeys(fourth);
  }

  async getFourthInput() {
    return await this.fourthInput.getAttribute('value');
  }

  async setFifthInput(fifth) {
    await this.fifthInput.sendKeys(fifth);
  }

  async getFifthInput() {
    return await this.fifthInput.getAttribute('value');
  }

  async setSixthInput(sixth) {
    await this.sixthInput.sendKeys(sixth);
  }

  async getSixthInput() {
    return await this.sixthInput.getAttribute('value');
  }

  async setSeventhInput(seventh) {
    await this.seventhInput.sendKeys(seventh);
  }

  async getSeventhInput() {
    return await this.seventhInput.getAttribute('value');
  }

  async setEightInput(eight) {
    await this.eightInput.sendKeys(eight);
  }

  async getEightInput() {
    return await this.eightInput.getAttribute('value');
  }

  async setNinthInput(ninth) {
    await this.ninthInput.sendKeys(ninth);
  }

  async getNinthInput() {
    return await this.ninthInput.getAttribute('value');
  }

  async setTenthInput(tenth) {
    await this.tenthInput.sendKeys(tenth);
  }

  async getTenthInput() {
    return await this.tenthInput.getAttribute('value');
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

export class EqualizerSettingDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-equalizerSetting-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-equalizerSetting'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
