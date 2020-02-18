/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { SongComponentsPage, SongDeleteDialog, SongUpdatePage } from './song.page-object';

const expect = chai.expect;

describe('Song e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let songUpdatePage: SongUpdatePage;
  let songComponentsPage: SongComponentsPage;
  let songDeleteDialog: SongDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Songs', async () => {
    await navBarPage.goToEntity('song');
    songComponentsPage = new SongComponentsPage();
    await browser.wait(ec.visibilityOf(songComponentsPage.title), 5000);
    expect(await songComponentsPage.getTitle()).to.eq('vaultOfAudioApp.song.home.title');
  });

  it('should load create Song page', async () => {
    await songComponentsPage.clickOnCreateButton();
    songUpdatePage = new SongUpdatePage();
    expect(await songUpdatePage.getPageTitle()).to.eq('vaultOfAudioApp.song.home.createOrEditLabel');
    await songUpdatePage.cancel();
  });

  it('should create and save Songs', async () => {
    const nbButtonsBeforeCreate = await songComponentsPage.countDeleteButtons();

    await songComponentsPage.clickOnCreateButton();
    await promise.all([
      songUpdatePage.setSongNameInput('songName'),
      songUpdatePage.setLyricsInput('lyrics'),
      songUpdatePage.setAuthorsInput('authors'),
      songUpdatePage.setSongMetadataInput('songMetadata'),
      songUpdatePage.setYearInput('5'),
      songUpdatePage.setSongDescriptionInput('songDescription')
    ]);
    expect(await songUpdatePage.getSongNameInput()).to.eq('songName', 'Expected SongName value to be equals to songName');
    expect(await songUpdatePage.getLyricsInput()).to.eq('lyrics', 'Expected Lyrics value to be equals to lyrics');
    expect(await songUpdatePage.getAuthorsInput()).to.eq('authors', 'Expected Authors value to be equals to authors');
    expect(await songUpdatePage.getSongMetadataInput()).to.eq('songMetadata', 'Expected SongMetadata value to be equals to songMetadata');
    expect(await songUpdatePage.getYearInput()).to.eq('5', 'Expected year value to be equals to 5');
    expect(await songUpdatePage.getSongDescriptionInput()).to.eq(
      'songDescription',
      'Expected SongDescription value to be equals to songDescription'
    );
    await songUpdatePage.save();
    expect(await songUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await songComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Song', async () => {
    const nbButtonsBeforeDelete = await songComponentsPage.countDeleteButtons();
    await songComponentsPage.clickOnLastDeleteButton();

    songDeleteDialog = new SongDeleteDialog();
    expect(await songDeleteDialog.getDialogTitle()).to.eq('vaultOfAudioApp.song.delete.question');
    await songDeleteDialog.clickOnConfirmButton();

    expect(await songComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
