import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { VaultOfAudioSharedModule } from 'app/shared';
import {
  UserEqualizerSettingComponent,
  UserEqualizerSettingDetailComponent,
  UserEqualizerSettingUpdateComponent,
  UserEqualizerSettingDeletePopupComponent,
  UserEqualizerSettingDeleteDialogComponent,
  userEqualizerSettingRoute,
  userEqualizerSettingPopupRoute
} from './';

const ENTITY_STATES = [...userEqualizerSettingRoute, ...userEqualizerSettingPopupRoute];

@NgModule({
  imports: [VaultOfAudioSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    UserEqualizerSettingComponent,
    UserEqualizerSettingDetailComponent,
    UserEqualizerSettingUpdateComponent,
    UserEqualizerSettingDeleteDialogComponent,
    UserEqualizerSettingDeletePopupComponent
  ],
  entryComponents: [
    UserEqualizerSettingComponent,
    UserEqualizerSettingUpdateComponent,
    UserEqualizerSettingDeleteDialogComponent,
    UserEqualizerSettingDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VaultOfAudioUserEqualizerSettingModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
