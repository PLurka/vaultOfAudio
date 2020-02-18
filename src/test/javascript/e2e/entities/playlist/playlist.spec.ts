/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { PlaylistComponentsPage, PlaylistDeleteDialog, PlaylistUpdatePage } from './playlist.page-object';

const expect = chai.expect;

describe('Playlist e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let playlistUpdatePage: PlaylistUpdatePage;
  let playlistComponentsPage: PlaylistComponentsPage;
  let playlistDeleteDialog: PlaylistDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Playlists', async () => {
    await navBarPage.goToEntity('playlist');
    playlistComponentsPage = new PlaylistComponentsPage();
    await browser.wait(ec.visibilityOf(playlistComponentsPage.title), 5000);
    expect(await playlistComponentsPage.getTitle()).to.eq('vaultOfAudioApp.playlist.home.title');
  });

  it('should load create Playlist page', async () => {
    await playlistComponentsPage.clickOnCreateButton();
    playlistUpdatePage = new PlaylistUpdatePage();
    expect(await playlistUpdatePage.getPageTitle()).to.eq('vaultOfAudioApp.playlist.home.createOrEditLabel');
    await playlistUpdatePage.cancel();
  });

  it('should create and save Playlists', async () => {
    const nbButtonsBeforeCreate = await playlistComponentsPage.countDeleteButtons();

    await playlistComponentsPage.clickOnCreateButton();
    await promise.all([playlistUpdatePage.setListNameInput('listName'), playlistUpdatePage.setListDescriptionInput('listDescription')]);
    expect(await playlistUpdatePage.getListNameInput()).to.eq('listName', 'Expected ListName value to be equals to listName');
    expect(await playlistUpdatePage.getListDescriptionInput()).to.eq(
      'listDescription',
      'Expected ListDescription value to be equals to listDescription'
    );
    await playlistUpdatePage.save();
    expect(await playlistUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await playlistComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Playlist', async () => {
    const nbButtonsBeforeDelete = await playlistComponentsPage.countDeleteButtons();
    await playlistComponentsPage.clickOnLastDeleteButton();

    playlistDeleteDialog = new PlaylistDeleteDialog();
    expect(await playlistDeleteDialog.getDialogTitle()).to.eq('vaultOfAudioApp.playlist.delete.question');
    await playlistDeleteDialog.clickOnConfirmButton();

    expect(await playlistComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
