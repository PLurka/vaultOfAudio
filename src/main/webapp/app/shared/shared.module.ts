import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { VaultOfAudioSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

import { JhMaterialModule } from 'app/shared/jh-material.module';
@NgModule({
  imports: [JhMaterialModule, VaultOfAudioSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [JhMaterialModule, VaultOfAudioSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VaultOfAudioSharedModule {
  static forRoot() {
    return {
      ngModule: VaultOfAudioSharedModule
    };
  }
}
