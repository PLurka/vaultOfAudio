import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { VaultOfAudioSharedModule } from 'app/shared';
import {
  GroupListComponent,
  GroupListDetailComponent,
  GroupListUpdateComponent,
  GroupListDeletePopupComponent,
  GroupListDeleteDialogComponent,
  groupListRoute,
  groupListPopupRoute
} from './';

const ENTITY_STATES = [...groupListRoute, ...groupListPopupRoute];

@NgModule({
  imports: [VaultOfAudioSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    GroupListComponent,
    GroupListDetailComponent,
    GroupListUpdateComponent,
    GroupListDeleteDialogComponent,
    GroupListDeletePopupComponent
  ],
  entryComponents: [GroupListComponent, GroupListUpdateComponent, GroupListDeleteDialogComponent, GroupListDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VaultOfAudioGroupListModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
