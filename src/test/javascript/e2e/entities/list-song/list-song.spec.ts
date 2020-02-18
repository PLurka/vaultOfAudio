/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ListSongComponentsPage, ListSongDeleteDialog, ListSongUpdatePage } from './list-song.page-object';

const expect = chai.expect;

describe('ListSong e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let listSongUpdatePage: ListSongUpdatePage;
  let listSongComponentsPage: ListSongComponentsPage;
  let listSongDeleteDialog: ListSongDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load ListSongs', async () => {
    await navBarPage.goToEntity('list-song');
    listSongComponentsPage = new ListSongComponentsPage();
    await browser.wait(ec.visibilityOf(listSongComponentsPage.title), 5000);
    expect(await listSongComponentsPage.getTitle()).to.eq('vaultOfAudioApp.listSong.home.title');
  });

  it('should load create ListSong page', async () => {
    await listSongComponentsPage.clickOnCreateButton();
    listSongUpdatePage = new ListSongUpdatePage();
    expect(await listSongUpdatePage.getPageTitle()).to.eq('vaultOfAudioApp.listSong.home.createOrEditLabel');
    await listSongUpdatePage.cancel();
  });

  it('should create and save ListSongs', async () => {
    const nbButtonsBeforeCreate = await listSongComponentsPage.countDeleteButtons();

    await listSongComponentsPage.clickOnCreateButton();
    await promise.all([listSongUpdatePage.listIdSelectLastOption(), listSongUpdatePage.songIdSelectLastOption()]);
    await listSongUpdatePage.save();
    expect(await listSongUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await listSongComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last ListSong', async () => {
    const nbButtonsBeforeDelete = await listSongComponentsPage.countDeleteButtons();
    await listSongComponentsPage.clickOnLastDeleteButton();

    listSongDeleteDialog = new ListSongDeleteDialog();
    expect(await listSongDeleteDialog.getDialogTitle()).to.eq('vaultOfAudioApp.listSong.delete.question');
    await listSongDeleteDialog.clickOnConfirmButton();

    expect(await listSongComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
