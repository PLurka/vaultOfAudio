import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { VaultOfAudioSharedModule } from '../shared/shared.module';

import { MY_EQ_ROUTE, MyEqComponent } from './';

@NgModule({
  imports: [VaultOfAudioSharedModule, RouterModule.forRoot([MY_EQ_ROUTE], { useHash: true })],
  declarations: [MyEqComponent],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VaultOfAudioAppMyEqModule {}
