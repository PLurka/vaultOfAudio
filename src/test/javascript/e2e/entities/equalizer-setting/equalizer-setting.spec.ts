/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { EqualizerSettingComponentsPage, EqualizerSettingDeleteDialog, EqualizerSettingUpdatePage } from './equalizer-setting.page-object';

const expect = chai.expect;

describe('EqualizerSetting e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let equalizerSettingUpdatePage: EqualizerSettingUpdatePage;
  let equalizerSettingComponentsPage: EqualizerSettingComponentsPage;
  let equalizerSettingDeleteDialog: EqualizerSettingDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load EqualizerSettings', async () => {
    await navBarPage.goToEntity('equalizer-setting');
    equalizerSettingComponentsPage = new EqualizerSettingComponentsPage();
    await browser.wait(ec.visibilityOf(equalizerSettingComponentsPage.title), 5000);
    expect(await equalizerSettingComponentsPage.getTitle()).to.eq('vaultOfAudioApp.equalizerSetting.home.title');
  });

  it('should load create EqualizerSetting page', async () => {
    await equalizerSettingComponentsPage.clickOnCreateButton();
    equalizerSettingUpdatePage = new EqualizerSettingUpdatePage();
    expect(await equalizerSettingUpdatePage.getPageTitle()).to.eq('vaultOfAudioApp.equalizerSetting.home.createOrEditLabel');
    await equalizerSettingUpdatePage.cancel();
  });

  it('should create and save EqualizerSettings', async () => {
    const nbButtonsBeforeCreate = await equalizerSettingComponentsPage.countDeleteButtons();

    await equalizerSettingComponentsPage.clickOnCreateButton();
    await promise.all([
      equalizerSettingUpdatePage.setEqualizerIdInput('5'),
      equalizerSettingUpdatePage.setEqualizerNameInput('equalizerName'),
      equalizerSettingUpdatePage.setFirstInput('5'),
      equalizerSettingUpdatePage.setSecondInput('5'),
      equalizerSettingUpdatePage.setThirdInput('5'),
      equalizerSettingUpdatePage.setFourthInput('5'),
      equalizerSettingUpdatePage.setFifthInput('5'),
      equalizerSettingUpdatePage.setSixthInput('5'),
      equalizerSettingUpdatePage.setSeventhInput('5'),
      equalizerSettingUpdatePage.setEightInput('5'),
      equalizerSettingUpdatePage.setNinthInput('5'),
      equalizerSettingUpdatePage.setTenthInput('5')
    ]);
    expect(await equalizerSettingUpdatePage.getEqualizerIdInput()).to.eq('5', 'Expected equalizerId value to be equals to 5');
    expect(await equalizerSettingUpdatePage.getEqualizerNameInput()).to.eq(
      'equalizerName',
      'Expected EqualizerName value to be equals to equalizerName'
    );
    expect(await equalizerSettingUpdatePage.getFirstInput()).to.eq('5', 'Expected first value to be equals to 5');
    expect(await equalizerSettingUpdatePage.getSecondInput()).to.eq('5', 'Expected second value to be equals to 5');
    expect(await equalizerSettingUpdatePage.getThirdInput()).to.eq('5', 'Expected third value to be equals to 5');
    expect(await equalizerSettingUpdatePage.getFourthInput()).to.eq('5', 'Expected fourth value to be equals to 5');
    expect(await equalizerSettingUpdatePage.getFifthInput()).to.eq('5', 'Expected fifth value to be equals to 5');
    expect(await equalizerSettingUpdatePage.getSixthInput()).to.eq('5', 'Expected sixth value to be equals to 5');
    expect(await equalizerSettingUpdatePage.getSeventhInput()).to.eq('5', 'Expected seventh value to be equals to 5');
    expect(await equalizerSettingUpdatePage.getEightInput()).to.eq('5', 'Expected eight value to be equals to 5');
    expect(await equalizerSettingUpdatePage.getNinthInput()).to.eq('5', 'Expected ninth value to be equals to 5');
    expect(await equalizerSettingUpdatePage.getTenthInput()).to.eq('5', 'Expected tenth value to be equals to 5');
    await equalizerSettingUpdatePage.save();
    expect(await equalizerSettingUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await equalizerSettingComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last EqualizerSetting', async () => {
    const nbButtonsBeforeDelete = await equalizerSettingComponentsPage.countDeleteButtons();
    await equalizerSettingComponentsPage.clickOnLastDeleteButton();

    equalizerSettingDeleteDialog = new EqualizerSettingDeleteDialog();
    expect(await equalizerSettingDeleteDialog.getDialogTitle()).to.eq('vaultOfAudioApp.equalizerSetting.delete.question');
    await equalizerSettingDeleteDialog.clickOnConfirmButton();

    expect(await equalizerSettingComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
