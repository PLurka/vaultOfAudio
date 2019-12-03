import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { VaultOfAudioSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [VaultOfAudioSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [VaultOfAudioSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VaultOfAudioSharedModule {
  static forRoot() {
    return {
      ngModule: VaultOfAudioSharedModule
    };
  }
}
