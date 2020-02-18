/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { GroupComponentsPage, GroupDeleteDialog, GroupUpdatePage } from './group.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('Group e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let groupUpdatePage: GroupUpdatePage;
  let groupComponentsPage: GroupComponentsPage;
  let groupDeleteDialog: GroupDeleteDialog;
  const fileNameToUpload = 'logo-jhipster.png';
  const fileToUpload = '../../../../../../src/main/webapp/content/images/' + fileNameToUpload;
  const absolutePath = path.resolve(__dirname, fileToUpload);

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Groups', async () => {
    await navBarPage.goToEntity('group');
    groupComponentsPage = new GroupComponentsPage();
    await browser.wait(ec.visibilityOf(groupComponentsPage.title), 5000);
    expect(await groupComponentsPage.getTitle()).to.eq('vaultOfAudioApp.group.home.title');
  });

  it('should load create Group page', async () => {
    await groupComponentsPage.clickOnCreateButton();
    groupUpdatePage = new GroupUpdatePage();
    expect(await groupUpdatePage.getPageTitle()).to.eq('vaultOfAudioApp.group.home.createOrEditLabel');
    await groupUpdatePage.cancel();
  });

  it('should create and save Groups', async () => {
    const nbButtonsBeforeCreate = await groupComponentsPage.countDeleteButtons();

    await groupComponentsPage.clickOnCreateButton();
    await promise.all([
      groupUpdatePage.setGroupIdInput('5'),
      groupUpdatePage.setGroupNameInput('groupName'),
      groupUpdatePage.setGroupDescriptionInput('groupDescription'),
      groupUpdatePage.setGroupPhotoInput(absolutePath)
    ]);
    expect(await groupUpdatePage.getGroupIdInput()).to.eq('5', 'Expected groupId value to be equals to 5');
    expect(await groupUpdatePage.getGroupNameInput()).to.eq('groupName', 'Expected GroupName value to be equals to groupName');
    expect(await groupUpdatePage.getGroupDescriptionInput()).to.eq(
      'groupDescription',
      'Expected GroupDescription value to be equals to groupDescription'
    );
    expect(await groupUpdatePage.getGroupPhotoInput()).to.endsWith(
      fileNameToUpload,
      'Expected GroupPhoto value to be end with ' + fileNameToUpload
    );
    await groupUpdatePage.save();
    expect(await groupUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await groupComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Group', async () => {
    const nbButtonsBeforeDelete = await groupComponentsPage.countDeleteButtons();
    await groupComponentsPage.clickOnLastDeleteButton();

    groupDeleteDialog = new GroupDeleteDialog();
    expect(await groupDeleteDialog.getDialogTitle()).to.eq('vaultOfAudioApp.group.delete.question');
    await groupDeleteDialog.clickOnConfirmButton();

    expect(await groupComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
