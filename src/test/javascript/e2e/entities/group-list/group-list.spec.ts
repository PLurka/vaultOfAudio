/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { GroupListComponentsPage, GroupListDeleteDialog, GroupListUpdatePage } from './group-list.page-object';

const expect = chai.expect;

describe('GroupList e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let groupListUpdatePage: GroupListUpdatePage;
  let groupListComponentsPage: GroupListComponentsPage;
  let groupListDeleteDialog: GroupListDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load GroupLists', async () => {
    await navBarPage.goToEntity('group-list');
    groupListComponentsPage = new GroupListComponentsPage();
    await browser.wait(ec.visibilityOf(groupListComponentsPage.title), 5000);
    expect(await groupListComponentsPage.getTitle()).to.eq('vaultOfAudioApp.groupList.home.title');
  });

  it('should load create GroupList page', async () => {
    await groupListComponentsPage.clickOnCreateButton();
    groupListUpdatePage = new GroupListUpdatePage();
    expect(await groupListUpdatePage.getPageTitle()).to.eq('vaultOfAudioApp.groupList.home.createOrEditLabel');
    await groupListUpdatePage.cancel();
  });

  it('should create and save GroupLists', async () => {
    const nbButtonsBeforeCreate = await groupListComponentsPage.countDeleteButtons();

    await groupListComponentsPage.clickOnCreateButton();
    await promise.all([groupListUpdatePage.groupSelectLastOption(), groupListUpdatePage.playlistSelectLastOption()]);
    await groupListUpdatePage.save();
    expect(await groupListUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await groupListComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last GroupList', async () => {
    const nbButtonsBeforeDelete = await groupListComponentsPage.countDeleteButtons();
    await groupListComponentsPage.clickOnLastDeleteButton();

    groupListDeleteDialog = new GroupListDeleteDialog();
    expect(await groupListDeleteDialog.getDialogTitle()).to.eq('vaultOfAudioApp.groupList.delete.question');
    await groupListDeleteDialog.clickOnConfirmButton();

    expect(await groupListComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
