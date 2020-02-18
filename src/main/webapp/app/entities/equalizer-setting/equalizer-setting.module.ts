import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { VaultOfAudioSharedModule } from 'app/shared';
import {
  EqualizerSettingComponent,
  EqualizerSettingDetailComponent,
  EqualizerSettingUpdateComponent,
  EqualizerSettingDeletePopupComponent,
  EqualizerSettingDeleteDialogComponent,
  equalizerSettingRoute,
  equalizerSettingPopupRoute
} from './';

const ENTITY_STATES = [...equalizerSettingRoute, ...equalizerSettingPopupRoute];

@NgModule({
  imports: [VaultOfAudioSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    EqualizerSettingComponent,
    EqualizerSettingDetailComponent,
    EqualizerSettingUpdateComponent,
    EqualizerSettingDeleteDialogComponent,
    EqualizerSettingDeletePopupComponent
  ],
  entryComponents: [
    EqualizerSettingComponent,
    EqualizerSettingUpdateComponent,
    EqualizerSettingDeleteDialogComponent,
    EqualizerSettingDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VaultOfAudioEqualizerSettingModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
