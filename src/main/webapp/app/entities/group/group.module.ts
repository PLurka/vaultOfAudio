import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { VaultOfAudioSharedModule } from 'app/shared';
import {
  GroupComponent,
  GroupDetailComponent,
  GroupUpdateComponent,
  GroupDeletePopupComponent,
  GroupDeleteDialogComponent,
  groupRoute,
  groupPopupRoute
} from './';

const ENTITY_STATES = [...groupRoute, ...groupPopupRoute];

@NgModule({
  imports: [VaultOfAudioSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [GroupComponent, GroupDetailComponent, GroupUpdateComponent, GroupDeleteDialogComponent, GroupDeletePopupComponent],
  entryComponents: [GroupComponent, GroupUpdateComponent, GroupDeleteDialogComponent, GroupDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VaultOfAudioGroupModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
