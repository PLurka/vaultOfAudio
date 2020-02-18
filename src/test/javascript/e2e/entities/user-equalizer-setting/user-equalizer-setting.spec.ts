/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  UserEqualizerSettingComponentsPage,
  UserEqualizerSettingDeleteDialog,
  UserEqualizerSettingUpdatePage
} from './user-equalizer-setting.page-object';

const expect = chai.expect;

describe('UserEqualizerSetting e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let userEqualizerSettingUpdatePage: UserEqualizerSettingUpdatePage;
  let userEqualizerSettingComponentsPage: UserEqualizerSettingComponentsPage;
  let userEqualizerSettingDeleteDialog: UserEqualizerSettingDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load UserEqualizerSettings', async () => {
    await navBarPage.goToEntity('user-equalizer-setting');
    userEqualizerSettingComponentsPage = new UserEqualizerSettingComponentsPage();
    await browser.wait(ec.visibilityOf(userEqualizerSettingComponentsPage.title), 5000);
    expect(await userEqualizerSettingComponentsPage.getTitle()).to.eq('vaultOfAudioApp.userEqualizerSetting.home.title');
  });

  it('should load create UserEqualizerSetting page', async () => {
    await userEqualizerSettingComponentsPage.clickOnCreateButton();
    userEqualizerSettingUpdatePage = new UserEqualizerSettingUpdatePage();
    expect(await userEqualizerSettingUpdatePage.getPageTitle()).to.eq('vaultOfAudioApp.userEqualizerSetting.home.createOrEditLabel');
    await userEqualizerSettingUpdatePage.cancel();
  });

  it('should create and save UserEqualizerSettings', async () => {
    const nbButtonsBeforeCreate = await userEqualizerSettingComponentsPage.countDeleteButtons();

    await userEqualizerSettingComponentsPage.clickOnCreateButton();
    await promise.all([
      userEqualizerSettingUpdatePage.equalizerIdSelectLastOption(),
      userEqualizerSettingUpdatePage.userIdSelectLastOption()
    ]);
    await userEqualizerSettingUpdatePage.save();
    expect(await userEqualizerSettingUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await userEqualizerSettingComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last UserEqualizerSetting', async () => {
    const nbButtonsBeforeDelete = await userEqualizerSettingComponentsPage.countDeleteButtons();
    await userEqualizerSettingComponentsPage.clickOnLastDeleteButton();

    userEqualizerSettingDeleteDialog = new UserEqualizerSettingDeleteDialog();
    expect(await userEqualizerSettingDeleteDialog.getDialogTitle()).to.eq('vaultOfAudioApp.userEqualizerSetting.delete.question');
    await userEqualizerSettingDeleteDialog.clickOnConfirmButton();

    expect(await userEqualizerSettingComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
