import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { VaultOfAudioSharedModule } from 'app/shared';
import {
  UserListComponent,
  UserListDetailComponent,
  UserListUpdateComponent,
  UserListDeletePopupComponent,
  UserListDeleteDialogComponent,
  userListRoute,
  userListPopupRoute
} from './';

const ENTITY_STATES = [...userListRoute, ...userListPopupRoute];

@NgModule({
  imports: [VaultOfAudioSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    UserListComponent,
    UserListDetailComponent,
    UserListUpdateComponent,
    UserListDeleteDialogComponent,
    UserListDeletePopupComponent
  ],
  entryComponents: [UserListComponent, UserListUpdateComponent, UserListDeleteDialogComponent, UserListDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VaultOfAudioUserListModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
