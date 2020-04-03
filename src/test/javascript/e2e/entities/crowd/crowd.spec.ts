/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { CrowdComponentsPage, CrowdDeleteDialog, CrowdUpdatePage } from './crowd.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('Crowd e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let crowdUpdatePage: CrowdUpdatePage;
  let crowdComponentsPage: CrowdComponentsPage;
  let crowdDeleteDialog: CrowdDeleteDialog;
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

  it('should load Crowds', async () => {
    await navBarPage.goToEntity('crowd');
    crowdComponentsPage = new CrowdComponentsPage();
    await browser.wait(ec.visibilityOf(crowdComponentsPage.title), 5000);
    expect(await crowdComponentsPage.getTitle()).to.eq('vaultOfAudioApp.crowd.home.title');
  });

  it('should load create Crowd page', async () => {
    await crowdComponentsPage.clickOnCreateButton();
    crowdUpdatePage = new CrowdUpdatePage();
    expect(await crowdUpdatePage.getPageTitle()).to.eq('vaultOfAudioApp.crowd.home.createOrEditLabel');
    await crowdUpdatePage.cancel();
  });

  it('should create and save Crowds', async () => {
    const nbButtonsBeforeCreate = await crowdComponentsPage.countDeleteButtons();

    await crowdComponentsPage.clickOnCreateButton();
    await promise.all([
      crowdUpdatePage.setCrowdNameInput('crowdName'),
      crowdUpdatePage.setCrowdDescriptionInput('crowdDescription'),
      crowdUpdatePage.setCrowdPhotoInput(absolutePath),
      // crowdUpdatePage.userSelectLastOption(),
      // crowdUpdatePage.acceptedSelectLastOption(),
      // crowdUpdatePage.playlistSelectLastOption(),
      crowdUpdatePage.createdBySelectLastOption()
    ]);
    expect(await crowdUpdatePage.getCrowdNameInput()).to.eq('crowdName', 'Expected CrowdName value to be equals to crowdName');
    expect(await crowdUpdatePage.getCrowdDescriptionInput()).to.eq(
      'crowdDescription',
      'Expected CrowdDescription value to be equals to crowdDescription'
    );
    expect(await crowdUpdatePage.getCrowdPhotoInput()).to.endsWith(
      fileNameToUpload,
      'Expected CrowdPhoto value to be end with ' + fileNameToUpload
    );
    await crowdUpdatePage.save();
    expect(await crowdUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await crowdComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Crowd', async () => {
    const nbButtonsBeforeDelete = await crowdComponentsPage.countDeleteButtons();
    await crowdComponentsPage.clickOnLastDeleteButton();

    crowdDeleteDialog = new CrowdDeleteDialog();
    expect(await crowdDeleteDialog.getDialogTitle()).to.eq('vaultOfAudioApp.crowd.delete.question');
    await crowdDeleteDialog.clickOnConfirmButton();

    expect(await crowdComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
