/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { UserListComponentsPage, UserListDeleteDialog, UserListUpdatePage } from './user-list.page-object';

const expect = chai.expect;

describe('UserList e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let userListUpdatePage: UserListUpdatePage;
  let userListComponentsPage: UserListComponentsPage;
  let userListDeleteDialog: UserListDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load UserLists', async () => {
    await navBarPage.goToEntity('user-list');
    userListComponentsPage = new UserListComponentsPage();
    await browser.wait(ec.visibilityOf(userListComponentsPage.title), 5000);
    expect(await userListComponentsPage.getTitle()).to.eq('vaultOfAudioApp.userList.home.title');
  });

  it('should load create UserList page', async () => {
    await userListComponentsPage.clickOnCreateButton();
    userListUpdatePage = new UserListUpdatePage();
    expect(await userListUpdatePage.getPageTitle()).to.eq('vaultOfAudioApp.userList.home.createOrEditLabel');
    await userListUpdatePage.cancel();
  });

  it('should create and save UserLists', async () => {
    const nbButtonsBeforeCreate = await userListComponentsPage.countDeleteButtons();

    await userListComponentsPage.clickOnCreateButton();
    await promise.all([userListUpdatePage.playlistSelectLastOption(), userListUpdatePage.userSelectLastOption()]);
    const selectedCreatedBy = userListUpdatePage.getCreatedByInput();
    if (await selectedCreatedBy.isSelected()) {
      await userListUpdatePage.getCreatedByInput().click();
      expect(await userListUpdatePage.getCreatedByInput().isSelected(), 'Expected createdBy not to be selected').to.be.false;
    } else {
      await userListUpdatePage.getCreatedByInput().click();
      expect(await userListUpdatePage.getCreatedByInput().isSelected(), 'Expected createdBy to be selected').to.be.true;
    }
    await userListUpdatePage.save();
    expect(await userListUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await userListComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last UserList', async () => {
    const nbButtonsBeforeDelete = await userListComponentsPage.countDeleteButtons();
    await userListComponentsPage.clickOnLastDeleteButton();

    userListDeleteDialog = new UserListDeleteDialog();
    expect(await userListDeleteDialog.getDialogTitle()).to.eq('vaultOfAudioApp.userList.delete.question');
    await userListDeleteDialog.clickOnConfirmButton();

    expect(await userListComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
