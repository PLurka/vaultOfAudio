import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { VaultOfAudioSharedModule } from 'app/shared';
import {
  UserSongComponent,
  UserSongDetailComponent,
  UserSongUpdateComponent,
  UserSongDeletePopupComponent,
  UserSongDeleteDialogComponent,
  userSongRoute,
  userSongPopupRoute
} from './';

const ENTITY_STATES = [...userSongRoute, ...userSongPopupRoute];

@NgModule({
  imports: [VaultOfAudioSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    UserSongComponent,
    UserSongDetailComponent,
    UserSongUpdateComponent,
    UserSongDeleteDialogComponent,
    UserSongDeletePopupComponent
  ],
  entryComponents: [UserSongComponent, UserSongUpdateComponent, UserSongDeleteDialogComponent, UserSongDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VaultOfAudioUserSongModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
