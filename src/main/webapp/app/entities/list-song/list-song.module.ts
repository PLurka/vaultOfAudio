import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { VaultOfAudioSharedModule } from 'app/shared';
import {
  ListSongComponent,
  ListSongDetailComponent,
  ListSongUpdateComponent,
  ListSongDeletePopupComponent,
  ListSongDeleteDialogComponent,
  listSongRoute,
  listSongPopupRoute
} from './';

const ENTITY_STATES = [...listSongRoute, ...listSongPopupRoute];

@NgModule({
  imports: [VaultOfAudioSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ListSongComponent,
    ListSongDetailComponent,
    ListSongUpdateComponent,
    ListSongDeleteDialogComponent,
    ListSongDeletePopupComponent
  ],
  entryComponents: [ListSongComponent, ListSongUpdateComponent, ListSongDeleteDialogComponent, ListSongDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VaultOfAudioListSongModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
