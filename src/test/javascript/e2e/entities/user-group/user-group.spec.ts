/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { UserGroupComponentsPage, UserGroupDeleteDialog, UserGroupUpdatePage } from './user-group.page-object';

const expect = chai.expect;

describe('UserGroup e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let userGroupUpdatePage: UserGroupUpdatePage;
  let userGroupComponentsPage: UserGroupComponentsPage;
  let userGroupDeleteDialog: UserGroupDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load UserGroups', async () => {
    await navBarPage.goToEntity('user-group');
    userGroupComponentsPage = new UserGroupComponentsPage();
    await browser.wait(ec.visibilityOf(userGroupComponentsPage.title), 5000);
    expect(await userGroupComponentsPage.getTitle()).to.eq('vaultOfAudioApp.userGroup.home.title');
  });

  it('should load create UserGroup page', async () => {
    await userGroupComponentsPage.clickOnCreateButton();
    userGroupUpdatePage = new UserGroupUpdatePage();
    expect(await userGroupUpdatePage.getPageTitle()).to.eq('vaultOfAudioApp.userGroup.home.createOrEditLabel');
    await userGroupUpdatePage.cancel();
  });

  it('should create and save UserGroups', async () => {
    const nbButtonsBeforeCreate = await userGroupComponentsPage.countDeleteButtons();

    await userGroupComponentsPage.clickOnCreateButton();
    await promise.all([userGroupUpdatePage.groupSelectLastOption(), userGroupUpdatePage.userSelectLastOption()]);
    const selectedCreatedBy = userGroupUpdatePage.getCreatedByInput();
    if (await selectedCreatedBy.isSelected()) {
      await userGroupUpdatePage.getCreatedByInput().click();
      expect(await userGroupUpdatePage.getCreatedByInput().isSelected(), 'Expected createdBy not to be selected').to.be.false;
    } else {
      await userGroupUpdatePage.getCreatedByInput().click();
      expect(await userGroupUpdatePage.getCreatedByInput().isSelected(), 'Expected createdBy to be selected').to.be.true;
    }
    const selectedGroupAccepted = userGroupUpdatePage.getGroupAcceptedInput();
    if (await selectedGroupAccepted.isSelected()) {
      await userGroupUpdatePage.getGroupAcceptedInput().click();
      expect(await userGroupUpdatePage.getGroupAcceptedInput().isSelected(), 'Expected groupAccepted not to be selected').to.be.false;
    } else {
      await userGroupUpdatePage.getGroupAcceptedInput().click();
      expect(await userGroupUpdatePage.getGroupAcceptedInput().isSelected(), 'Expected groupAccepted to be selected').to.be.true;
    }
    const selectedUserAccepted = userGroupUpdatePage.getUserAcceptedInput();
    if (await selectedUserAccepted.isSelected()) {
      await userGroupUpdatePage.getUserAcceptedInput().click();
      expect(await userGroupUpdatePage.getUserAcceptedInput().isSelected(), 'Expected userAccepted not to be selected').to.be.false;
    } else {
      await userGroupUpdatePage.getUserAcceptedInput().click();
      expect(await userGroupUpdatePage.getUserAcceptedInput().isSelected(), 'Expected userAccepted to be selected').to.be.true;
    }
    await userGroupUpdatePage.save();
    expect(await userGroupUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await userGroupComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last UserGroup', async () => {
    const nbButtonsBeforeDelete = await userGroupComponentsPage.countDeleteButtons();
    await userGroupComponentsPage.clickOnLastDeleteButton();

    userGroupDeleteDialog = new UserGroupDeleteDialog();
    expect(await userGroupDeleteDialog.getDialogTitle()).to.eq('vaultOfAudioApp.userGroup.delete.question');
    await userGroupDeleteDialog.clickOnConfirmButton();

    expect(await userGroupComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
