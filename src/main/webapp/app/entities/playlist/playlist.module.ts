import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { VaultOfAudioSharedModule } from 'app/shared';
import {
  PlaylistComponent,
  PlaylistDetailComponent,
  PlaylistUpdateComponent,
  PlaylistDeletePopupComponent,
  PlaylistDeleteDialogComponent,
  playlistRoute,
  playlistPopupRoute
} from './';

const ENTITY_STATES = [...playlistRoute, ...playlistPopupRoute];

@NgModule({
  imports: [VaultOfAudioSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    PlaylistComponent,
    PlaylistDetailComponent,
    PlaylistUpdateComponent,
    PlaylistDeleteDialogComponent,
    PlaylistDeletePopupComponent
  ],
  entryComponents: [PlaylistComponent, PlaylistUpdateComponent, PlaylistDeleteDialogComponent, PlaylistDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VaultOfAudioPlaylistModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
