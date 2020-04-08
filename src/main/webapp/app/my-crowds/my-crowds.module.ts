import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { VaultOfAudioSharedModule } from '../shared/shared.module';

import { MY_CROWDS_ROUTE, MyCrowdsComponent } from './';

@NgModule({
  imports: [VaultOfAudioSharedModule, RouterModule.forRoot([MY_CROWDS_ROUTE], { useHash: true })],
  declarations: [MyCrowdsComponent],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VaultOfAudioAppMyCrowdsModule {}
