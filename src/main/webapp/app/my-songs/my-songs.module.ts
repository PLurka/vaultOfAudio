import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { VaultOfAudioSharedModule } from '../shared/shared.module';

import { MY_SONGS_ROUTE, MySongsComponent } from './';

@NgModule({
  imports: [VaultOfAudioSharedModule, RouterModule.forRoot([MY_SONGS_ROUTE], { useHash: true })],
  declarations: [MySongsComponent],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VaultOfAudioAppMySongsModule {}
