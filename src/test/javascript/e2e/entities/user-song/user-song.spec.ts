/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { UserSongComponentsPage, UserSongDeleteDialog, UserSongUpdatePage } from './user-song.page-object';

const expect = chai.expect;

describe('UserSong e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let userSongUpdatePage: UserSongUpdatePage;
  let userSongComponentsPage: UserSongComponentsPage;
  let userSongDeleteDialog: UserSongDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load UserSongs', async () => {
    await navBarPage.goToEntity('user-song');
    userSongComponentsPage = new UserSongComponentsPage();
    await browser.wait(ec.visibilityOf(userSongComponentsPage.title), 5000);
    expect(await userSongComponentsPage.getTitle()).to.eq('vaultOfAudioApp.userSong.home.title');
  });

  it('should load create UserSong page', async () => {
    await userSongComponentsPage.clickOnCreateButton();
    userSongUpdatePage = new UserSongUpdatePage();
    expect(await userSongUpdatePage.getPageTitle()).to.eq('vaultOfAudioApp.userSong.home.createOrEditLabel');
    await userSongUpdatePage.cancel();
  });

  it('should create and save UserSongs', async () => {
    const nbButtonsBeforeCreate = await userSongComponentsPage.countDeleteButtons();

    await userSongComponentsPage.clickOnCreateButton();
    await promise.all([userSongUpdatePage.songSelectLastOption(), userSongUpdatePage.userSelectLastOption()]);
    await userSongUpdatePage.save();
    expect(await userSongUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await userSongComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last UserSong', async () => {
    const nbButtonsBeforeDelete = await userSongComponentsPage.countDeleteButtons();
    await userSongComponentsPage.clickOnLastDeleteButton();

    userSongDeleteDialog = new UserSongDeleteDialog();
    expect(await userSongDeleteDialog.getDialogTitle()).to.eq('vaultOfAudioApp.userSong.delete.question');
    await userSongDeleteDialog.clickOnConfirmButton();

    expect(await userSongComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
