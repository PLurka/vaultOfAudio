import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { VaultOfAudioSharedModule } from 'app/shared';
import {
  CrowdComponent,
  CrowdDetailComponent,
  CrowdUpdateComponent,
  CrowdDeletePopupComponent,
  CrowdDeleteDialogComponent,
  crowdRoute,
  crowdPopupRoute
} from './';

const ENTITY_STATES = [...crowdRoute, ...crowdPopupRoute];

@NgModule({
  imports: [VaultOfAudioSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [CrowdComponent, CrowdDetailComponent, CrowdUpdateComponent, CrowdDeleteDialogComponent, CrowdDeletePopupComponent],
  entryComponents: [CrowdComponent, CrowdUpdateComponent, CrowdDeleteDialogComponent, CrowdDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VaultOfAudioCrowdModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
